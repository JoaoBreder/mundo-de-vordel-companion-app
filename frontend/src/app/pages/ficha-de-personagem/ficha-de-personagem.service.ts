import { Injectable } from '@angular/core';
import { SubscriptionManager } from 'rxjs-sub-manager';
import { ActivatedRouteSnapshot, CanDeactivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { FunctionsService } from '../../shared/services/functions.service';
import { TipoAtaque, AtaqueArma, AtaqueEfeito } from '../../shared/models/entities/ataque';
import { Personagem } from '../../shared/models/entities/personagem';
import { CirculoMagia, EscolaMagia, Magia } from '../../shared/models/entities/magia';
import { CloudFunction } from '../../shared/helpers/cloud-function';

import { OnCallBuscarPersonagemJogadorResponse } from '../../shared/models/contracts/cloud-functions/oncall-buscar-personagem-jogador';
import { OnCallBuscarAtaquesPersonagemRequest, OnCallBuscarAtaquesPersonagemResponse } from '../../shared/models/contracts/cloud-functions/oncall-buscar-ataques-personagem';
import { OnCallBuscarMagiasPersonagemRequest, OnCallBuscarMagiasPersonagemResponse } from '../../shared/models/contracts/cloud-functions/oncall-buscar-magias-personagem';
import {
    OnCallGerarBufferImagemPersonagemRequest,
    OnCallGerarBufferImagemPersonagemResponse,
} from '../../shared/models/contracts/cloud-functions/oncall-gerar-buffer-imagem-personagem';

import { OrdenacaoRegistrosMagia } from '../../shared/models/firestore/magia-firestore';
import { OrdenacaoRegistrosAtaque } from '../../shared/models/firestore/ataque-firestore';

import { AtaqueParser } from '../../shared/models/parsers/ataque.parser';
import { PersonagemParser } from '../../shared/models/parsers/personagem.parser';
import { MagiaParser } from '../../shared/models/parsers/magia.parser';
import { DetalhesFicha } from './detalhes-ficha/detalhes-ficha.component';

/* eslint-disable @typescript-eslint/no-unused-vars */
@Injectable({
    providedIn: 'root',
})
export class FichaDePersonagemService implements Resolve<boolean>, CanDeactivate<boolean> {
    private readonly subscriptionManager = new SubscriptionManager({ prefixId: 'HistoricoEnvioAppService' });

    personagemJogador$ = new BehaviorSubject<Personagem | null>(null);
    detalhesFicha$ = new BehaviorSubject<DetalhesFicha | null>(null);

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
                CloudFunction.ONCALL_BUSCAR_PERSONAGEM_JOGADOR,
                requestData,
                true
            );

            this.personagemJogador$.next(PersonagemParser.personagem(personagemJogador));
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
                personagemId: personagem._id,
            };

            const { base64 } = await this.functionsService.callCloudFunction<OnCallGerarBufferImagemPersonagemRequest, OnCallGerarBufferImagemPersonagemResponse>(
                CloudFunction.ONCALL_GERAR_BUFFER_IMAGEM_PERSONAGEM,
                requestData,
                true
            );

            return `data:image/png;base64,${base64}`;
        } catch (error) {
            console.error(error);
            return '';
        }
    }

    async buscarAtaquesPersonagem(orderBy: OrdenacaoRegistrosAtaque, filtroTipo?: TipoAtaque): Promise<(AtaqueArma | AtaqueEfeito)[]> {
        const personagem = this.personagemJogador$.getValue();
        if (!personagem || !personagem?._id) return [];

        try {
            const requestData: OnCallBuscarAtaquesPersonagemRequest = {
                orderBy,
                personagemId: personagem._id,
                filter: {
                    tipo: filtroTipo,
                },
            };

            const { ataques } = await this.functionsService.callCloudFunction<OnCallBuscarAtaquesPersonagemRequest, OnCallBuscarAtaquesPersonagemResponse>(
                CloudFunction.ONCALL_BUSCAR_ATAQUES_PERSONAGEM,
                requestData,
                true
            );

            const ataquesParsed = ataques.map(ataque => AtaqueParser.ataque(ataque));
            return ataquesParsed;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async buscarMagiasPersonagem(orderBy: OrdenacaoRegistrosMagia, filter: { circulo?: CirculoMagia; escola?: EscolaMagia }): Promise<Record<CirculoMagia, Magia[]> | null> {
        const personagem = this.personagemJogador$.getValue();
        if (!personagem || !personagem?._id) return null;

        try {
            const requestData: OnCallBuscarMagiasPersonagemRequest = {
                orderBy,
                filter,
                personagemId: personagem._id,
            };

            const { magias } = await this.functionsService.callCloudFunction<OnCallBuscarMagiasPersonagemRequest, OnCallBuscarMagiasPersonagemResponse>(
                CloudFunction.ONCALL_BUSCAR_MAGIAS_PERSONAGEM,
                requestData,
                true
            );

            const magiasParsed: Record<CirculoMagia, Magia[]> = {
              [CirculoMagia.PRIMEIRO_CIRCULO]: magias[CirculoMagia.PRIMEIRO_CIRCULO].map(magia => MagiaParser.magia(magia)),
              [CirculoMagia.SEGUNDO_CIRCULO]: magias[CirculoMagia.SEGUNDO_CIRCULO].map(magia => MagiaParser.magia(magia)),
              [CirculoMagia.TERCEIRO_CIRCULO]: magias[CirculoMagia.TERCEIRO_CIRCULO].map(magia => MagiaParser.magia(magia)),
              [CirculoMagia.QUARTO_CIRCULO]: magias[CirculoMagia.QUARTO_CIRCULO].map(magia => MagiaParser.magia(magia)),
              [CirculoMagia.QUINTO_CIRCULO]: magias[CirculoMagia.QUINTO_CIRCULO].map(magia => MagiaParser.magia(magia))
            }

            return magiasParsed;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
