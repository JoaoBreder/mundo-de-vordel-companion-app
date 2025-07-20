import { Injectable } from '@angular/core';
import { FunctionsService } from '../../shared/services/functions.service';
import { SubscriptionManager } from 'rxjs-sub-manager';
import { ActivatedRouteSnapshot, CanDeactivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { OnCallBuscarPersonagemJogadorResponse } from '../../shared/models/contracts/cloud-functions/oncall-buscar-personagem-jogador';
import { Personagem } from '../../shared/models/personagem';
import { PersonagemParser } from '../../shared/models/parsers/personagem.parser';
import { OnCallGerarBufferImagemPersonagemRequest, OnCallGerarBufferImagemPersonagemResponse } from '../../shared/models/contracts/cloud-functions/oncall-gerar-buffer-imagem-personagem';

/* eslint-disable @typescript-eslint/no-unused-vars */
@Injectable({
    providedIn: 'root',
})
export class FichaDePersonagemService implements Resolve<boolean>, CanDeactivate<boolean> {
    private readonly subscriptionManager = new SubscriptionManager({ prefixId: 'HistoricoEnvioAppService' });

    private onCallBuscarPersonagemJogador = 'onCallBuscarPersonagemJogador';
    private onCallGerarBufferImagemPersonagem = 'onCallGerarBufferImagemPersonagem';

    personagemJogador$ = new BehaviorSubject<Personagem | null>(null);

    constructor(private functionsService: FunctionsService) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Ganchos do ciclo de vida
    // -----------------------------------------------------------------------------------------------------

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return Promise.allSettled([this.buscarInformacoesPersonagem()])
            .then(() => {
                return true;
            })
            .catch(error => {
                console.error('Erro -> resolve -> FichaDePersonagemService', error);
                return false;
            });
    }

    canDeactivate(
        component: boolean,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        this.subscriptionManager.closeAll();
        return true;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos privados
    // -----------------------------------------------------------------------------------------------------

    private async buscarInformacoesPersonagem(): Promise<void> {
        try {
            const requestData = {}; // TODO: Quando for implementado a possibilidade de mais personagens, vai ser preciso modificar esse objeto

            const { personagemJogador } = await this.functionsService.callCloudFunction<any, OnCallBuscarPersonagemJogadorResponse>(
                this.onCallBuscarPersonagemJogador,
                requestData,
                true
            );

            this.personagemJogador$.next(PersonagemParser.fromJson(personagemJogador));
        } catch (error) {
            console.error(error);
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos públicos
    // -----------------------------------------------------------------------------------------------------

    async gerarBase64ImagemPersonagem(): Promise<string> {
        const personagem = this.personagemJogador$.getValue();
        if (!personagem || !personagem?._id) return '';

        try {
            const requestData: OnCallGerarBufferImagemPersonagemRequest = {
              personagemId: personagem._id
            };

            const { base64 } = await this.functionsService.callCloudFunction<any, OnCallGerarBufferImagemPersonagemResponse>(
                this.onCallGerarBufferImagemPersonagem,
                requestData,
                true
            );

            return `data:image/png;base64,${base64}`;
        } catch (error) {
            console.error(error);
            return '';
        }
    }
}
