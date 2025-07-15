import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-ficha-de-personagem',
    templateUrl: './ficha-de-personagem.component.html',
    styleUrls: ['./ficha-de-personagem.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FichaDePersonagemComponent {
    loading$ = new BehaviorSubject<boolean>(false);
    telaCheia$ = new BehaviorSubject<boolean>(false);

    constructor(private authService: AuthService) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos públicos
    // -----------------------------------------------------------------------------------------------------

    async sairDaPlataforma() {
        this.loading$.next(true);
        setTimeout(() => this.authService.signOut().then(() => this.loading$.next(false)), 500);
    }

    async trocarEstadoTelaCheia() {
        const telaCheia = this.telaCheia$.getValue();
        this.telaCheia$.next(!telaCheia);

        const element = document.getElementById('ficha-de-personagem-page-layout');

        if (!telaCheia && element?.requestFullscreen) return element.requestFullscreen();
        document.exitFullscreen();
    }
}
