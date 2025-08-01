import { TipoAtaque, TipoDano } from '../../entities/ataque';
import { OrdenacaoRegistrosAtaque } from '../../firestore/ataque-firestore';
import { AtaqueArmaJson, AtaqueEfeitoJson } from '../../json/ataque-json';

export interface OnCallBuscarAtaquesPersonagemRequest {
    personagemId: string;
    orderBy: OrdenacaoRegistrosAtaque;
    filter?: {
        tipo?: TipoAtaque;
        tipoDano?: TipoDano;
    };
}

export interface OnCallBuscarAtaquesPersonagemResponse {
    quantidade: number;
    ataques: (AtaqueArmaJson | AtaqueEfeitoJson)[];
}
