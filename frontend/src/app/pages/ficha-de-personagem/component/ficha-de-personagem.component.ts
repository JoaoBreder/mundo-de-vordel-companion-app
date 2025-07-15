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

        const pageLayoutElement = document.querySelector('div.page-layout');

        this.authService.signOut(pageLayoutElement!).then(() => {
            pageLayoutElement?.classList.toggle('animation-fade-out');
            this.loading$.next(false);
        });
    }

    async trocarEstadoTelaCheia() {
        const telaCheia = this.telaCheia$.getValue();
        this.telaCheia$.next(!telaCheia);

        const element = document.getElementById('ficha-de-personagem-page-layout');

        if (!telaCheia && element?.requestFullscreen) return element.requestFullscreen();
        document.exitFullscreen();
    }
}
