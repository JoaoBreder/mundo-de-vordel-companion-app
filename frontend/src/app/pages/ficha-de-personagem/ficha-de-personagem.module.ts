import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FichaDePersonagemRoutingModule } from './ficha-de-personagem-routing.module';
import { FichaDePersonagemComponent } from './component/ficha-de-personagem.component';
import { AtributoComponent } from './atributo/atributo.component';
import { PericiasComponent } from './pericias/pericias.component';

import { NgScrollbarModule } from 'ngx-scrollbar';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
    declarations: [FichaDePersonagemComponent, AtributoComponent, PericiasComponent],
    imports: [
        CommonModule,
        FichaDePersonagemRoutingModule,

        NgScrollbarModule,

        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatTableModule,
        MatCheckboxModule,
    ],
})
export class FichaDePersonagemModule {}
