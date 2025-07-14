import { Timestamp } from '@angular/fire/firestore';
import { Usuario, UsuarioBase } from '.';

export class UsuarioFirestoreData implements UsuarioBase {
    uid: string;
    email: string;

    nome: string;
    identificacao: string;

    dataCadastro: Timestamp;

    constructor(usuarioFirestore: Partial<UsuarioFirestoreData>) {
        const { uid, email, nome, identificacao, dataCadastro } = usuarioFirestore;

        this.uid = uid ?? '';
        this.email = email ?? '';

        this.nome = nome ?? '';
        this.identificacao = identificacao ?? '';

        this.dataCadastro = dataCadastro ?? Timestamp.fromDate(new Date());
    }
}

export abstract class UsuarioFireConvert {
    static fromFirestore(data: UsuarioFirestoreData, token: string): Usuario {
        return new Usuario({
            uid: data.uid,
            email: data.email,
            nome: data.nome,
            identificacao: data.identificacao,
            dataCadastro: data.dataCadastro.toDate(),
            token: token,
        });
    }

    static toFirestore(usuario: Omit<Usuario, 'token'>): UsuarioFirestoreData {
        return {
            uid: usuario.uid,
            email: usuario.email,
            nome: usuario.nome,
            identificacao: usuario.identificacao,
            dataCadastro: Timestamp.fromDate(usuario.dataCadastro),
        };
    }
}
