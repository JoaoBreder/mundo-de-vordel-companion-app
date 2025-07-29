import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FichaDePersonagemRoutingModule } from './ficha-de-personagem-routing.module';
import { FichaDePersonagemComponent } from './component/ficha-de-personagem.component';
import { AtributoComponent } from './atributo/atributo.component';
import { PericiasComponent } from './pericias/pericias.component';

import { NgIconsModule } from '@ng-icons/core';
import { gameAxeSword, gameGoldShell, gamePocketBow } from '@ng-icons/game-icons';

import { NgScrollbarModule } from 'ngx-scrollbar';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { ListagemAtaquesComponent } from './listagem-ataques/listagem-ataques.component';

@NgModule({
    declarations: [FichaDePersonagemComponent, AtributoComponent, PericiasComponent, ListagemAtaquesComponent],
    imports: [
        CommonModule,
        FichaDePersonagemRoutingModule,

        NgIconsModule,
        NgIconsModule.withIcons({ gameAxeSword, gameGoldShell, gamePocketBow }),

        NgScrollbarModule,

        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatTableModule,
        MatCheckboxModule,
        MatTabsModule
    ],
})
export class FichaDePersonagemModule {}
