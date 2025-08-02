import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SubscriptionManager } from 'rxjs-sub-manager';
import { FichaDePersonagemService } from '../ficha-de-personagem.service';

// TODO: Passar para parte de modelos
export interface DetalhesFicha {
    titulo: string;
    subtitulo: string;
    conteudo: string[];
    icone?: string;
}

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'detalhes-ficha-component',
    templateUrl: './detalhes-ficha.component.html',
    styleUrls: ['./detalhes-ficha.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DetalhesFichaComponent implements OnInit {
    private subscriptionManager = new SubscriptionManager({ prefixId: 'DetalhesFichaComponent' });

    detalhesFicha: DetalhesFicha | null = null;

    displayedColumns: string[] = ['conteudo'];
    conteudoDataSource: MatTableDataSource<string> = new MatTableDataSource<string>();

    constructor(private fichaDePersonagemService: FichaDePersonagemService) {}

    ngOnInit(): void {
        this.observarAtualizacaoDetalhesFicha();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos privados
    // -----------------------------------------------------------------------------------------------------

    observarAtualizacaoDetalhesFicha(): void {
        const sub = this.fichaDePersonagemService.detalhesFicha$.subscribe(detalhesFicha => {
            if (detalhesFicha) {
                this.detalhesFicha = detalhesFicha;
                this.conteudoDataSource.data = detalhesFicha.conteudo;
            }
        });

        this.subscriptionManager.add({ ref: 'observarAtualizacaoDetalhesFicha', sub });
    }
}
