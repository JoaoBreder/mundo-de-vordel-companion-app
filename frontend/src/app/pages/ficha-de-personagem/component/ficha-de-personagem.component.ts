import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { BehaviorSubject, distinctUntilChanged, filter } from 'rxjs';
import { FichaDePersonagemService } from '../ficha-de-personagem.service';
import { SubscriptionManager } from 'rxjs-sub-manager';
import { Personagem } from '../../../shared/models/personagem';
import { ClassePersonagemLabel } from '../../../shared/models/parsers/enum.parser';

@Component({
    selector: 'app-ficha-de-personagem',
    templateUrl: './ficha-de-personagem.component.html',
    styleUrls: ['./ficha-de-personagem.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FichaDePersonagemComponent {
    private subscriptionManager = new SubscriptionManager({ prefixId: 'FichaDePersonagemComponent' });

    loading$ = new BehaviorSubject<boolean>(false);
    telaCheia$ = new BehaviorSubject<boolean>(false);

    personagem: Personagem | null = null;

    constructor(
        private authService: AuthService,
        private fichaDePersonagemService: FichaDePersonagemService
    ) {
        this.observarPersonagemJogador();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos públicos
    // -----------------------------------------------------------------------------------------------------

    async sairDaPlataforma(): Promise<void> {
        this.loading$.next(true);

        const pageLayoutElement = document.querySelector('div.page-layout');

        this.authService.signOut(pageLayoutElement!).then(() => {
            pageLayoutElement?.classList.toggle('animation-fade-out');
            this.loading$.next(false);
        });
    }

    async trocarEstadoTelaCheia(): Promise<void> {
        const telaCheia = this.telaCheia$.getValue();
        this.telaCheia$.next(!telaCheia);

        const element = document.getElementById('ficha-de-personagem-page-layout');

        if (!telaCheia && element?.requestFullscreen) return element.requestFullscreen();
        document.exitFullscreen();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos públicos
    // -----------------------------------------------------------------------------------------------------

    private observarPersonagemJogador() {
        const sub = this.fichaDePersonagemService.personagemJogador$
            .pipe(
                distinctUntilChanged(),
                filter(value => value !== null)
            )
            .subscribe(personagemJogador => {
                if (personagemJogador) this.personagem = personagemJogador;
            });

        this.subscriptionManager.add({ sub, ref: 'observarPersonagemJogador' });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Getters
    // -----------------------------------------------------------------------------------------------------

    get nomeJogador() {
        return this.authService.usuario?.identificacao;
    }

    get descricaoPersonagemJogador() {
        return this.personagem
            ? `${this.personagem.informacoes.linhagem}, ${this.personagem.informacoes.origem}, ${ClassePersonagemLabel[this.personagem.informacoes.classe]}`
            : '';
    }
}
