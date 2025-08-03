import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FichaDePersonagemRoutingModule } from './ficha-de-personagem-routing.module';
import { FichaDePersonagemComponent } from './component/ficha-de-personagem.component';
import { AtributoComponent } from './atributo/atributo.component';
import { PericiasComponent } from './pericias/pericias.component';

import { NgIconsModule } from '@ng-icons/core';
import {
    gameAxeSword,
    gameBorderedShield,
    gameBrainTentacle,
    gameCrystalBall,
    gameDoorway,
    gameDreadSkull,
    gameGoldShell,
    gameMagicSwirl,
    gamePocketBow,
    gameRubElHizb,
    gameThunderball,
    gameDramaMasks,
    gameAbdominalArmor,
    gameRun,
    gameBiceps,
    gameBrain,
    gameWisdom
} from '@ng-icons/game-icons';

import { NgScrollbarModule } from 'ngx-scrollbar';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { ListagemAtaquesComponent } from './listagem-ataques/listagem-ataques.component';
import { ListagemMagiasComponent } from './listagem-magias/listagem-magias.component';
import { DetalhesFichaComponent } from './detalhes-ficha/detalhes-ficha.component';

@NgModule({
    declarations: [FichaDePersonagemComponent, AtributoComponent, PericiasComponent, ListagemAtaquesComponent, ListagemMagiasComponent, DetalhesFichaComponent],
    imports: [
        CommonModule,
        FichaDePersonagemRoutingModule,

        NgIconsModule,
        NgIconsModule.withIcons({
            gameAxeSword,
            gameGoldShell,
            gamePocketBow,
            gameBorderedShield,
            gameCrystalBall,
            gameDoorway,
            gameThunderball,
            gameDreadSkull,
            gameRubElHizb,
            gameMagicSwirl,
            gameBrainTentacle,
            gameDramaMasks,
            gameAbdominalArmor,
            gameRun,
            gameBiceps,
            gameBrain,
            gameWisdom
        }),

        NgScrollbarModule,

        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatTableModule,
        MatCheckboxModule,
        MatTabsModule,
    ],
})
export class FichaDePersonagemModule {}
