import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
    loginForm: FormGroup;

    mostrarPrefixSufixSenha = false;
    tipoInputSenha = 'password';

    loading$ = new BehaviorSubject(false);

    constructor(
        private authService: AuthService,
        private toastrService: ToastrService
    ) {
        this.loginForm = this.criarFormularioLogin();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos públicos
    // -----------------------------------------------------------------------------------------------------

    async entrarNaPlataforma() {
        this.loading$.next(true);

        const { email, senha }: { email: string; senha: string } = this.loginForm.getRawValue();
        const pageLayoutElement = document.querySelector('div.page-layout');

        this.authService.signIn(email, senha, pageLayoutElement!).then(({ sucesso, tipo, mensagem, titulo }) => {
            pageLayoutElement?.classList.toggle('animation-fade-out');

            if (!sucesso) {
                this.loading$.next(false);

                this.senhaFormControl.setValue('');
                this.toastrService[tipo](mensagem, titulo);
            }
        });
    }

    esqueciMinhaSenha() {
        if (this.emailFormControl.hasError('required')) {
            this.toastrService.warning('O E-mail deve ser informado para que possamos enviar o link de recuperação da senha.', 'Informe o seu E-mail');
            return;
        }

        const { email }: { email: string } = this.loginForm.getRawValue();

        this.authService.enviarEmailRefinicaoDeSenha(email).then(async ({ tipo, mensagem, titulo }) => {
            this.toastrService[tipo](mensagem, titulo);
        });
    }

    mostrarPrefixSufix(booleano: boolean) {
        const valorCampo = this.senhaFormControl?.value;

        if (!valorCampo || valorCampo === '') {
            this.mostrarPrefixSufixSenha = booleano;
        }
    }

    mostrarSenha() {
        if (this.tipoInputSenha === 'password') {
            this.tipoInputSenha = 'text';
            return;
        }

        this.tipoInputSenha = 'password';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos privados
    // -----------------------------------------------------------------------------------------------------

    private criarFormularioLogin(): FormGroup {
        return new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Getters
    // -----------------------------------------------------------------------------------------------------

    get emailFormControl(): FormControl {
        return this.loginForm.get('email') as FormControl;
    }

    get senhaFormControl(): FormControl {
        return this.loginForm.get('senha') as FormControl;
    }
}
