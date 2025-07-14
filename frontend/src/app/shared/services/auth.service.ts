import { Injectable, inject } from '@angular/core';
import { Auth, IdTokenResult, User, authState, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { CollectionReference, Firestore, Query, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, firstValueFrom, map, take } from 'rxjs';
import { SubscriptionManager } from 'rxjs-sub-manager';
import { Usuario } from '../models/usuario';
import { UsuarioFireConvert, UsuarioFirestoreData } from '../models/usuario/usuario-fire-convert';
import { RetornoSucessoErro } from '../models/retorno-sucesso-ou-erro';
import { FirebaseError } from '@angular/fire/app';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly firebaseAuth: Auth = inject(Auth);
    private readonly firestore: Firestore = inject(Firestore);

    private readonly usuariosCollection: CollectionReference = collection(this.firestore, '/usuarios');

    private readonly subscriptionManager = new SubscriptionManager({ prefixId: 'AuthService' });

    private readonly aguardarAutenticacao = new Subject<boolean>();

    readonly usuarioAuth$ = new BehaviorSubject<User | null>(null);
    readonly usuario$ = new BehaviorSubject<Usuario | null>(null);
    readonly userIdTokenResult$ = new BehaviorSubject<IdTokenResult | null>(null);

    constructor(private router: Router) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos públicos
    // -----------------------------------------------------------------------------------------------------

    async signIn(email: string, senha: string): Promise<RetornoSucessoErro> {
        try {
            await signInWithEmailAndPassword(this.firebaseAuth, email, senha);
            await firstValueFrom(this.aguardarAutenticacao.pipe(take(1)));
            await this.router.navigateByUrl('/ficha-de-personagem');

            return {
                sucesso: true,
                tipo: 'success',
            };
        } catch (error) {
            let tipo: 'succes' | 'error' | 'warning' = 'error';
            let mensagem = 'Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.';

            if (error instanceof FirebaseError) {
                switch (error.code) {
                    case 'auth/invalid-login-credentials':
                        tipo = 'warning';
                        mensagem = 'E-mail ou senha inválidos.';
                        break;

                    case 'auth/user-not-found':
                        tipo = 'warning';
                        mensagem = 'E-mail ou senha inválidos.';
                        break;

                    case 'auth/user-disabled':
                        tipo = 'warning';
                        mensagem = 'E-mail ou senha inválidos.';
                        break;

                    case 'auth/too-many-requests':
                        mensagem = 'Muitas tentativas de login. Tente novamente mais tarde.';
                        break;
                }
            }

            return {
                sucesso: false,
                tipo,
                mensagem,
                titulo: tipo === 'error' ? 'Error!' : 'Aviso!',
                error,
            };
        }
    }

    async signOut(): Promise<RetornoSucessoErro> {
        try {
            await signOut(this.firebaseAuth);
            await firstValueFrom(this.aguardarAutenticacao.pipe(take(1)));
            await this.router.navigateByUrl('/login');

            return {
                sucesso: true,
                tipo: 'success',
            };
        } catch (error) {
            return {
                sucesso: false,
                tipo: 'error',
                mensagem: 'Ocorreu um erro ao tentar deslogar o usuário. Tente novamente mais tarde.',
                titulo: 'Error!',
                error,
            };
        }
    }

    async enviarEmailRefinicaoDeSenha(email: string): Promise<RetornoSucessoErro> {
        try {
            await sendPasswordResetEmail(this.firebaseAuth, email);

            return {
                sucesso: true,
                tipo: 'success',
                mensagem: 'Verifique a caixa de entrada do seu e-mail.',
                titulo: 'E-mail de Redefinição de Senha Enviado',
            };
        } catch (error: any) {
            let mensagem = 'Ocorreu um erro ao tentar enviar o e-mail de redefinição de senha. Tente novamente mais tarde.';

            if (error instanceof FirebaseError && (error.code === 'auth/user-not-found' || error.code === 'auth/user-disabled')) {
                mensagem = 'Usuário não encontrado.';
            }

            return {
                sucesso: false,
                tipo: 'error',
                mensagem,
                titulo: 'Error!',
                error,
            };
        }
    }

    async observarAuthState(): Promise<boolean> {
        if (this.subscriptionManager.hasActive('observarAuthState')) return true;

        return await new Promise<boolean>((resolve, reject) => {
            const sub = authState(this.firebaseAuth).subscribe({
                next: async (user: User | null) => {
                    if (user) {
                        const idTokenResult = await user.getIdTokenResult();

                        this.usuarioAuth$.next(user);
                        this.userIdTokenResult$.next(idTokenResult);

                        const usuario = await this.buscarUsuarioBanco(user.uid, idTokenResult.token);

                        if (usuario) {
                            this.usuario$.next(usuario);
                            this.aguardarAutenticacao.next(true);

                            return resolve(true);
                        }
                    }

                    this.signOut();
                    this.limparDadosServico();
                    this.aguardarAutenticacao.next(false);
                    return resolve(false);
                },
                error: error => {
                    this.signOut();
                    this.limparDadosServico();
                    this.aguardarAutenticacao.next(false);
                    reject(error);
                },
            });

            this.subscriptionManager.add({ ref: 'observarAuthState', sub });
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos privados
    // -----------------------------------------------------------------------------------------------------

    private limparDadosServico(): void {
        this.usuarioAuth$.next(null);
        this.usuario$.next(null);
        this.userIdTokenResult$.next(null);
    }

    private async buscarUsuarioBanco(uid: string, token: string): Promise<Usuario | null> {
        return new Promise(resolve => {
            const collectionQuery = query(this.usuariosCollection, where('uid', '==', uid));

            collectionData<UsuarioFirestoreData>(collectionQuery as Query<UsuarioFirestoreData>)
                .pipe(take(1))
                .subscribe(usuarioFirestore => {
                    resolve(usuarioFirestore ? UsuarioFireConvert.fromFirestore(usuarioFirestore[0], token) : null);
                });
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Getters
    // -----------------------------------------------------------------------------------------------------

    get usuario(): Usuario | null {
        return this.usuario$.value;
    }

    get usuarioPermitido(): boolean {
        return this.usuario !== null;
    }

    get usuarioPermitido$(): Observable<boolean> {
        return this.usuario$.pipe(map(usuario => usuario !== null));
    }
}
