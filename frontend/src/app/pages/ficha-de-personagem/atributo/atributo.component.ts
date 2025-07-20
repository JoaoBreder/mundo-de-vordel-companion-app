import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Modificador } from '../../../shared/models/quantificador';
import { TipoModificadorLabel } from '../../../shared/models/parsers/enum.parser';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'atributo-component',
    templateUrl: './atributo.component.html',
    styleUrls: ['./atributo.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AtributoComponent implements OnInit {
    @Input() public nome = '';
    @Input() public valorTotal = 0;
    @Input() public modificadores: Modificador[] = [];
    @Input() public modificadoresTemporarios: Modificador[] = [];

    detalhesAtributo = '';

    ngOnInit(): void {
        this.montarDescricaoDetalhes();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos privados
    // -----------------------------------------------------------------------------------------------------

    private montarDescricaoDetalhes() {
        const detalhesAtributoArray: string[] = [];

        this.modificadores.forEach(modificador => {
            detalhesAtributoArray.push(`${TipoModificadorLabel[modificador.tipo]} ${modificador.valor > 0 ? '+' : ''}${modificador.valor.toString()}`);
        });

        this.detalhesAtributo = detalhesAtributoArray.join(', ');
    }
}
