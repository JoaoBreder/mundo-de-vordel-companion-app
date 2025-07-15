import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FichaDePersonagemRoutingModule } from './ficha-de-personagem-routing.module';
import { FichaDePersonagemComponent } from './component/ficha-de-personagem.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    declarations: [FichaDePersonagemComponent],
    imports: [CommonModule, FichaDePersonagemRoutingModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
})
export class FichaDePersonagemModule {}
