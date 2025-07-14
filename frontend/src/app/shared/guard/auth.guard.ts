import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
	rotasAutenticacao = ['login'];

	constructor(
		private router: Router,
		// private authService: AuthService
	) {}

	public async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
		const rotaAtual: string = route.url[0].path;
    const usuarioConectado = /*this.authService.usuarioPermitido &&*/ this.rotasAutenticacao.includes(rotaAtual);

		if (usuarioConectado) {
			await this.router.navigateByUrl('/ficha-de-personagem');
		}

    if (!usuarioConectado) {
			await this.router.navigateByUrl('/login');
		}

		return true;
	}
}
