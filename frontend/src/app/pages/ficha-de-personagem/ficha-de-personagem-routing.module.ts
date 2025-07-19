import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FichaDePersonagemComponent } from './component/ficha-de-personagem.component';
import { FichaDePersonagemService } from './ficha-de-personagem.service';

const routes: Routes = [
    {
        path: '',
        component: FichaDePersonagemComponent,
        resolve: {
            data: FichaDePersonagemService,
        },
        canDeactivate: [FichaDePersonagemService],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FichaDePersonagemRoutingModule {}
