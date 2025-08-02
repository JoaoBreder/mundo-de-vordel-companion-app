import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FichaDePersonagemService } from '../ficha-de-personagem.service';
import { AlcanceMagiaLabel, DuracaoMagiaLabel, EscolaMagiaLabel, ExecucaoMagiaLabel, PericiaLabel, TipoResistenciaLabel } from '../../../shared/helpers/label-helpers';
import { BehaviorSubject, distinctUntilChanged, startWith } from 'rxjs';
import { SubscriptionManager } from 'rxjs-sub-manager';
import { AlcanceMagia, CirculoMagia, DuracaoMagia, EscolaMagia, ExecucaoMagia, Magia, Resistencia, TipoResistencia } from '../../../shared/models/entities/magia';
import { OrdenacaoRegistrosMagia } from '../../../shared/models/firestore/magia-firestore';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'listagem-magias-component',
    templateUrl: './listagem-magias.component.html',
    styleUrls: ['./listagem-magias.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ListagemMagiasComponent implements OnInit, OnDestroy {
    private subscriptionManager = new SubscriptionManager({ prefixId: 'ListagemAtaquesComponent' });

    private filtroLista$ = new BehaviorSubject<CirculoMagia | null>(null);

    displayedColumns: string[] = ['magia', 'execucao', 'alcance', 'duracao', 'resistencias', 'conjurar'];
    magiasDataSource: MatTableDataSource<any> = new MatTableDataSource<Magia>();

    constructor(private fichaDePersonagemService: FichaDePersonagemService) {}

    async ngOnInit(): Promise<void> {
        await this.buscarMagiasDataSource();

        this.observarActionButtons();
    }

    ngOnDestroy(): void {
        this.subscriptionManager.destroy();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos privados
    // -----------------------------------------------------------------------------------------------------

    private async buscarMagiasDataSource(filtroCirculo?: CirculoMagia): Promise<void> {
        const magias = await this.fichaDePersonagemService.buscarMagiasPersonagem(OrdenacaoRegistrosMagia.nome, {
            circulo: filtroCirculo,
        });

        this.magiasDataSource.data = magias;
    }

    private observarActionButtons(): void {
        const sub = this.filtroLista$.pipe(startWith(this.filtroLista), distinctUntilChanged()).subscribe(filtro => this.buscarMagiasDataSource(filtro ?? undefined));

        this.subscriptionManager.add({ ref: 'observarActionButtons', sub });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos públicos
    // -----------------------------------------------------------------------------------------------------

    botaoFiltroAtivado(valorBotao: string | null): boolean {
        return this.filtroLista === valorBotao;
    }

    getAlcanceMagiaLabel(alcanceMagia: AlcanceMagia): string {
        return AlcanceMagiaLabel[alcanceMagia];
    }

    getEscolaMagiaIcon(tipo: EscolaMagia): string {
        let icon = '';

        switch (tipo) {
            case EscolaMagia.ABJURACAO:
                icon = 'gameBorderedShield';
                break;

            case EscolaMagia.ADVINHACAO:
                icon = 'gameCrystalBall';
                break;

            case EscolaMagia.CONVOCACAO:
                icon = 'gameDoorway';
                break;

            case EscolaMagia.ENCANTAMENTO:
                icon = 'gameBrainTentacle';
                break;

            case EscolaMagia.EVOCACAO:
                icon = 'gameThunderball';
                break;

            case EscolaMagia.ILUSAO:
                icon = 'gameMagicSwirl';
                break;

            case EscolaMagia.NECROMANCIA:
                icon = 'gameDreadSkull';
                break;

            case EscolaMagia.TRANSMUTACAO:
                icon = 'gameRubElHizb';
                break;
        }

        return icon;
    }

    getEscolaMagiaLabel(tipo: EscolaMagia): string {
        return EscolaMagiaLabel[tipo];
    }

    getExecucaoMagiaLabel(execucaoMagia: ExecucaoMagia): string {
        return ExecucaoMagiaLabel[execucaoMagia].replace('Ação ', '');
    }

    getDuracaoMagiaLabel(duracaoMagia: DuracaoMagia | string): string {
        return DuracaoMagiaLabel[duracaoMagia as DuracaoMagia] ?? duracaoMagia;
    }

    getResistenciaLabel(resistencias: Resistencia[]): string {
        return resistencias.map((resistencia) => {
          const { pericia, tipo } = resistencia;
          return `${PericiaLabel[pericia]} ${TipoResistenciaLabel[tipo as TipoResistencia] ?? tipo}`;
        }).join(', ');
    }

    modificarFiltro(valor: string | null): void {
        this.filtroLista$.next(valor as CirculoMagia);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Getters
    // -----------------------------------------------------------------------------------------------------

    get filtroLista(): CirculoMagia | null {
        return this.filtroLista$.getValue();
    }
}
