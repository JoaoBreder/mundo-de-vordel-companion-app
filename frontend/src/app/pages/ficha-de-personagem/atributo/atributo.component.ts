import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AtributoAbreviadoLabel, TipoModificadorLabel } from '../../../shared/helpers/label-helpers';
import { AtributoAbreviado, Modificador } from '../../../shared/models/entities/quantificador';
import { DetalhesFicha } from '../detalhes-ficha/detalhes-ficha.component';
import { FichaDePersonagemService } from '../ficha-de-personagem.service';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'atributo-component',
    templateUrl: './atributo.component.html',
    styleUrls: ['./atributo.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AtributoComponent {
    @Input() public nome!: AtributoAbreviado;
    @Input() public valorTotal = 0;
    @Input() public modificadores: Modificador[] = [];
    @Input() public modificadoresTemporarios: Modificador[] = [];

    constructor(private fichaDePersonagemService: FichaDePersonagemService) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos públicos
    // -----------------------------------------------------------------------------------------------------
    getAtributoIcon(atributo: AtributoAbreviado): string {
        let icon = '';

        switch (atributo) {
            case AtributoAbreviado.CAR:
                icon = 'gameDramaMasks';
                break;

            case AtributoAbreviado.CON:
                icon = 'gameAbdominalArmor';
                break;

            case AtributoAbreviado.DES:
                icon = 'gameRun';
                break;

            case AtributoAbreviado.FOR:
                icon = 'gameBiceps';
                break;

            case AtributoAbreviado.INT:
                icon = 'gameBrain';
                break;

            case AtributoAbreviado.SAB:
                icon = 'gameWisdom';
                break;
        }

        return icon;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos públicos
    // -----------------------------------------------------------------------------------------------------

    atualizarDetalhesFichaComponent() {
        const conteudo: string[] = [`<p><b>Total:</b> ${this.valorTotal}</p>`];

        const modificadoresDescricao = this.modificadores.map(
            modificador => `<p><b>${TipoModificadorLabel[modificador.tipo]}:</b> ${modificador.valor > 0 ? '+' : '-'}${modificador.valor.toString()}</p>`
        );

        conteudo.push(modificadoresDescricao.join(''));

        if (this.modificadoresTemporarios.length) {
            const modificadoresTemporariosDescricao = this.modificadoresTemporarios.map(
                modificador => `<p><b>${TipoModificadorLabel[modificador.tipo]}:</b> ${modificador.valor > 0 ? '+' : '-'}${modificador.valor.toString()}</p>`
            );

            conteudo.push(modificadoresTemporariosDescricao.join(''));
        }

        const detalhesFicha: DetalhesFicha = {
            conteudo,
            icone: this.getAtributoIcon(this.nome),
            titulo: AtributoAbreviadoLabel[this.nome],
            subtitulo: 'Atributo',
        };

        this.fichaDePersonagemService.detalhesFicha$.next(detalhesFicha);
    }
}
