import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FichaDePersonagemRoutingModule } from './ficha-de-personagem-routing.module';
import { FichaDePersonagemComponent } from './component/ficha-de-personagem.component';
import { AtributoComponent } from './atributo/atributo.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    declarations: [FichaDePersonagemComponent, AtributoComponent],
    imports: [CommonModule, FichaDePersonagemRoutingModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatTooltipModule],
})
export class FichaDePersonagemModule {}
