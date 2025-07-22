import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { Pericias } from '../../../shared/models/personagem';
import { PericiaLabel, TipoModificadorLabel } from '../../../shared/helpers/label-helpers';
import { MatTableDataSource } from '@angular/material/table';
import { QuantificadorPericia } from '../../../shared/models/quantificador';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'pericias-component',
    templateUrl: './pericias.component.html',
    styleUrls: ['./pericias.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class PericiasComponent implements OnInit {
    @Input() public pericias!: Pericias;

    displayedColumns: string[] = ['pericia', 'atributo', 'bonus', 'treinado'];
    periciasDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

    ngOnInit(): void {
        this.montarPericiasDataSource();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos privados
    // -----------------------------------------------------------------------------------------------------

    private montarPericiasDataSource(): void {
        const data: any = [];
        const listaPericias = Object.keys(this.pericias);

        listaPericias.forEach(key => {
            const pericia = this.pericias[key as keyof Pericias];
            const detalhesAtributoArray: string[] = [];

            if (!(pericia instanceof QuantificadorPericia)) {
                pericia.forEach(oficio => {
                    oficio.modificadores.forEach(modificador => {
                        detalhesAtributoArray.push(`${TipoModificadorLabel[modificador.tipo]} ${modificador.valor > 0 ? '+' : ''}${modificador.valor.toString()}`);
                    });

                    data.push({
                        atributo: 'FOR',
                        bonus: `${oficio.valorTotal > 0 ? '+' : ''}${oficio.valorTotal}`,
                        pericia: `${PericiaLabel[key as keyof Pericias]} ${oficio.descricao}`,
                        treinado: oficio.treinado,
                        detalhes: detalhesAtributoArray.join(', '),
                    });
                });

                return;
            }

            pericia.modificadores.forEach(modificador => {
                detalhesAtributoArray.push(`${TipoModificadorLabel[modificador.tipo]} ${modificador.valor > 0 ? '+' : ''}${modificador.valor.toString()}`);
            });

            data.push({
                atributo: 'FOR',
                bonus: `${pericia.valorTotal > 0 ? '+' : ''}${pericia.valorTotal}`,
                pericia: PericiaLabel[key as keyof Pericias],
                treinado: pericia.treinado,
                detalhes: detalhesAtributoArray.join(', '),
            });
        });

        this.periciasDataSource.data = data;
    }
}
