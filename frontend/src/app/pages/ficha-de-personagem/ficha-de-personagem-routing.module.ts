import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FichaDePersonagemComponent } from './component/ficha-de-personagem.component';

const routes: Routes = [
    {
        path: '',
        component: FichaDePersonagemComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FichaDePersonagemRoutingModule {}
