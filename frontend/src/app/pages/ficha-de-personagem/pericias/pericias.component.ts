import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { AtributoAbreviadoLabel, PericiaKeyLabel, TipoModificadorLabel } from '../../../shared/helpers/label-helpers';
import { MatTableDataSource } from '@angular/material/table';
import { Pericias } from '../../../shared/models/entities/personagem';
import { AtributoAbreviado, QuantificadorPericia } from '../../../shared/models/entities/quantificador';
import { DetalhesFicha } from '../detalhes-ficha/detalhes-ficha.component';
import { FichaDePersonagemService } from '../ficha-de-personagem.service';

// TODO: Melhorar data source de perícias
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

    periciasSomenteTreinado: string[] = ['adestramento', 'conhecimento', 'guerra', 'jogatina', 'ladinagem', 'misticismo', 'nobreza', 'oficio', 'pilotagem', 'religiao'];

    constructor(private fichaDePersonagemService: FichaDePersonagemService) {}

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

            if (!(pericia instanceof QuantificadorPericia)) {
                pericia.forEach(oficio => {
                    data.push({
                        atributo: oficio.atributo,
                        bonus: this.periciasSomenteTreinado.includes(key) && !oficio.treinado ? '—' : `${oficio.valorTotal > 0 ? '+' : ''}${oficio.valorTotal}`,
                        pericia: `${PericiaKeyLabel[key as keyof Pericias]} ${oficio.descricao}`,
                        periciaKey: key,
                        treinado: oficio.treinado,
                        quantificador: oficio,
                    });
                });

                return;
            }

            data.push({
                atributo: pericia.atributo,
                bonus: this.periciasSomenteTreinado.includes(key) && !pericia.treinado ? '—' : `${pericia.valorTotal > 0 ? '+' : ''}${pericia.valorTotal}`,
                pericia: PericiaKeyLabel[key as keyof Pericias],
                periciaKey: key,
                treinado: pericia.treinado,
                quantificador: pericia,
            });
        });

        this.periciasDataSource.data = data;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos públicos
    // -----------------------------------------------------------------------------------------------------

    atualizarDetalhesFichaComponent({
        quantificador,
        periciaKey,
        pericia,
        treinado,
    }: {
        quantificador: QuantificadorPericia;
        periciaKey: string;
        pericia: string;
        treinado: boolean;
    }) {
        const conteudo: string[] = [
          `<p><b>Atributo:</b> ${AtributoAbreviadoLabel[ quantificador.atributo as AtributoAbreviado]}.</p>
          <p><b>Treinado:</b> ${treinado ? 'Sim' : 'Não'}.</p>`,
          `<p><b>Total:</b> ${quantificador.valorTotal}</p>`
        ];

        const modificadoresDescricao = quantificador.modificadores.map(
            modificador => `<p><b>${TipoModificadorLabel[modificador.tipo]}:</b> ${modificador.valor > 0 ? '+' : '-'}${modificador.valor.toString()}</p>`
        );

        conteudo.push(modificadoresDescricao.join(''));

        if (quantificador.modificadoresTemporarios.length) {
            const modificadoresTemporariosDescricao = quantificador.modificadoresTemporarios.map(
                modificador => `<p><b>${TipoModificadorLabel[modificador.tipo]}:</b> ${modificador.valor > 0 ? '+' : '-'}${modificador.valor.toString()}</p>`
            );

            conteudo.push(modificadoresTemporariosDescricao.join(''));
        }

        const detalhesFicha: DetalhesFicha = {
            titulo: pericia,
            subtitulo: 'Perícia',
            conteudo: this.periciasSomenteTreinado.includes(periciaKey) && !treinado ? ['Somente treinado.'] : conteudo,
        };

        this.fichaDePersonagemService.detalhesFicha$.next(detalhesFicha);
    }
}
