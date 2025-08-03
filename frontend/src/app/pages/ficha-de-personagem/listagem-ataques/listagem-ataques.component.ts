import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FichaDePersonagemService } from '../ficha-de-personagem.service';
import { AlcanceAtaqueLabel, PericiaLabel, TipoAtaqueLabel, TipoDanoLabel, TipoModificadorLabel } from '../../../shared/helpers/label-helpers';
import { BehaviorSubject, combineLatest, distinctUntilChanged, startWith } from 'rxjs';
import { OrdenacaoRegistrosAtaque } from '../../../shared/models/firestore/ataque-firestore';
import { SubscriptionManager } from 'rxjs-sub-manager';
import { TipoAtaque, AtaqueArma, AtaqueEfeito, AlcanceAtaque, TipoDano } from '../../../shared/models/entities/ataque';
import { Pericia } from '../../../shared/models/entities/personagem';
import { DetalhesFicha } from '../detalhes-ficha/detalhes-ficha.component';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'listagem-ataques-component',
    templateUrl: './listagem-ataques.component.html',
    styleUrls: ['./listagem-ataques.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ListagemAtaquesComponent implements OnInit, OnDestroy {
    private subscriptionManager = new SubscriptionManager({ prefixId: 'ListagemAtaquesComponent' });

    private ordenacaoLista$ = new BehaviorSubject<OrdenacaoRegistrosAtaque>(OrdenacaoRegistrosAtaque.descricao);
    private filtroLista$ = new BehaviorSubject<TipoAtaque | null>(null);

    displayedColumns: string[] = ['ataque', 'teste', 'dano', 'critico', 'tipoDano', 'alcance'];
    ataquesDataSource: MatTableDataSource<any> = new MatTableDataSource<AtaqueArma | AtaqueEfeito>();

    constructor(private fichaDePersonagemService: FichaDePersonagemService) {}

    async ngOnInit(): Promise<void> {
        await this.buscarAtaquesDataSource(this.ordenacaoLista);

        this.observarActionButtons();
    }

    ngOnDestroy(): void {
        this.subscriptionManager.destroy();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos privados
    // -----------------------------------------------------------------------------------------------------

    private async buscarAtaquesDataSource(ordenacao: OrdenacaoRegistrosAtaque, filtroTipo?: TipoAtaque): Promise<void> {
        const ataques = await this.fichaDePersonagemService.buscarAtaquesPersonagem(ordenacao, filtroTipo);
        this.ataquesDataSource.data = ataques;
    }

    private observarActionButtons(): void {
        const sub = combineLatest([
            this.ordenacaoLista$.pipe(startWith(this.ordenacaoLista), distinctUntilChanged()),
            this.filtroLista$.pipe(startWith(this.filtroLista), distinctUntilChanged()),
        ]).subscribe(([ordenacao, filtro]) => this.buscarAtaquesDataSource(ordenacao, filtro ?? undefined));

        this.subscriptionManager.add({ ref: 'observarActionButtons', sub });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos públicos
    // -----------------------------------------------------------------------------------------------------

    botaoFiltroAtivado(valorBotao: string | null): boolean {
        return this.filtroLista === valorBotao;
    }

    botaoOrdenacaoAtivado(valorBotao: string): boolean {
        return this.ordenacaoLista === valorBotao;
    }

    getAlcanceAtaqueLabel(alcanceAtaque: AlcanceAtaque): string {
        return AlcanceAtaqueLabel[alcanceAtaque];
    }

    getPericiaLabel(pericia: Pericia): string {
        return PericiaLabel[pericia];
    }

    getTipoAtaqueIcon(tipo: TipoAtaque): string {
        let icon = '';

        switch (tipo) {
            case TipoAtaque.ATAQUE_A_DISTANCIA:
                icon = 'gamePocketBow';
                break;

            case TipoAtaque.CORPO_A_CORPO:
                icon = 'gameAxeSword';
                break;

            case TipoAtaque.EFEITO:
                icon = 'gameGoldShell';
                break;
        }

        return icon;
    }

    getTipoAtaqueLabel(tipo: TipoAtaque): string {
        return TipoAtaqueLabel[tipo];
    }

    getTipoDanoLabel(tipoDano: TipoDano): string {
        return TipoDanoLabel[tipoDano];
    }

    modificarFiltro(valor: string | null): void {
        this.filtroLista$.next(valor as TipoAtaque);
    }

    modificarOrdenacao(valor: string): void {
        this.ordenacaoLista$.next(valor as OrdenacaoRegistrosAtaque);
    }

    atualizarDetalhesFichaComponent(ataque: AtaqueArma | AtaqueEfeito) {
        const conteudo = [];

        const informacoesAtaque = `
              ${ataque instanceof AtaqueArma && ataque?.pericia ? `<p><b>Teste de Ataque:</b> ${PericiaLabel[ataque.pericia]}${ataque.bonusAtaque ? ` + ${ataque.bonusAtaque.valorTotal}` : ''}.</p>` : ''}
              ${`<p><b>Dano:</b> ${ataque.dano}${ataque.bonusDano ? ` + ${ataque.bonusDano.valorTotal}` : ''}.</p>`}
              ${ataque instanceof AtaqueArma && ataque.critico ? `<p><b>Crítico:</b> ${ataque.critico}.</p>` : ''}
              ${ataque.tipoDano ? `<p><b>Tipo:</b> ${TipoDanoLabel[ataque.tipoDano]}.</p>` : ''}
              ${ataque.alcance ? `<p><b>Alcance:</b> ${AlcanceAtaqueLabel[ataque.alcance]}.</p>` : ''}
            `;
        conteudo.push(informacoesAtaque);

        if (ataque.bonusAtaque) {
            let bonusAtaqueDescricao = ataque.bonusAtaque.modificadores.map(
                modificador => `<p><b>${TipoModificadorLabel[modificador.tipo]}:</b> ${modificador.valor > 0 ? '+' : '-'}${modificador.valor.toString()}</p>`
            );

            if (ataque.bonusAtaque.modificadoresTemporarios.length) {
                bonusAtaqueDescricao = bonusAtaqueDescricao.concat(
                    ataque.bonusAtaque.modificadoresTemporarios.map(
                        modificador => `<p><b>${TipoModificadorLabel[modificador.tipo]}:</b> ${modificador.valor > 0 ? '+' : '-'}${modificador.valor.toString()}</p>`
                    )
                );
            }

            conteudo.push(`<p><b>Bônus Total Ataque:</b> ${ataque.bonusAtaque.valorTotal}</p> ${bonusAtaqueDescricao.join('')}`);
        }

        if (ataque.bonusDano) {
            let bonusDanoDescricao = ataque.bonusDano.modificadores.map(
                modificador => `<p><b>${TipoModificadorLabel[modificador.tipo]}:</b> ${modificador.valor > 0 ? '+' : '-'}${modificador.valor.toString()}</p>`
            );

            if (ataque.bonusDano.modificadoresTemporarios.length) {
                bonusDanoDescricao = bonusDanoDescricao.concat(
                    ataque.bonusDano.modificadoresTemporarios.map(
                        modificador => `<p><b>${TipoModificadorLabel[modificador.tipo]}:</b> ${modificador.valor > 0 ? '+' : '-'}${modificador.valor.toString()}</p>`
                    )
                );
            }

            conteudo.push(`<p><b>Bônus Total Dano:</b> ${ataque.bonusDano.valorTotal}</p> ${bonusDanoDescricao.join('')}`);
        }

        const detalhesFicha: DetalhesFicha = {
            conteudo,
            icone: this.getTipoAtaqueIcon(ataque.tipo!),
            titulo: ataque.descricao,
            subtitulo: TipoAtaqueLabel[ataque.tipo!],
        };

        this.fichaDePersonagemService.detalhesFicha$.next(detalhesFicha);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Getters
    // -----------------------------------------------------------------------------------------------------

    get ordenacaoLista(): OrdenacaoRegistrosAtaque {
        return this.ordenacaoLista$.getValue();
    }

    get filtroLista(): TipoAtaque | null {
        return this.filtroLista$.getValue();
    }
}
