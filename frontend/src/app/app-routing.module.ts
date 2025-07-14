import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {
		path: 'login',
		// loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule),
		canActivate: [AuthGuard],
	},
	{
		path: 'ficha-de-personagem/:personagem_id',
		// loadChildren: () => import('./pages/ambiente-jogo/ambiente-jogo.module').then((m) => m.AmbienteModule),
		canActivate: [AuthGuard],
	},

	{ path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
