import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FichaDePersonagemService } from '../ficha-de-personagem.service';
import { AlcanceAtaque, AtaqueArma, AtaqueEfeito, TipoAtaque, TipoDano } from '../../../shared/models/ataque';
import { Pericia } from '../../../shared/models/personagem';
import { AlcanceAtaqueLabel, PericiaLabel, TipoAtaqueLabel, TipoDanoLabel } from '../../../shared/helpers/label-helpers';
import { BehaviorSubject, combineLatest, startWith } from 'rxjs';
import { OrdenacaoRegistrosAtaque } from '../../../shared/models/firestore/ataque-firestore';
import { SubscriptionManager } from 'rxjs-sub-manager';

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
        const sub = combineLatest([this.ordenacaoLista$.pipe(startWith(this.ordenacaoLista)), this.filtroLista$.pipe(startWith(this.filtroLista))])
          .subscribe(([ordenacao, filtro]) => this.buscarAtaquesDataSource(ordenacao, filtro ?? undefined));

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
