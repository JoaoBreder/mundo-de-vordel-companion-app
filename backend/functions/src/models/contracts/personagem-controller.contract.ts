import { TipoAtaque, TipoDano } from "../entities/ataque";
import { CirculoMagia, EscolaMagia, ExecucaoMagia } from "../entities/magia";
import { OrdenacaoRegistrosAtaque } from "../firestore/ataque-firestore";
import { OrdenacaoRegistrosMagia } from "../firestore/magia-firestore";
import { AtaqueArmaJson, AtaqueEfeitoJson } from "../json/ataque-json";
import { MagiaJson } from "../json/magia-json";
import { PersonagemJson } from "../json/personagem-json";


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

export interface OnCallBuscarMagiasPersonagemRequest {
    personagemId: string;
    orderBy: OrdenacaoRegistrosMagia;
    filter?: {
        circulo?: CirculoMagia;
        escola?: EscolaMagia;
        execucao?: ExecucaoMagia;
    };
}

export interface OnCallBuscarMagiasPersonagemResponse {
    quantidade: number;
    magias: Record<CirculoMagia, MagiaJson[]>;
}

// TODO: Criar modelo de request da função de busca de personagem, quando for possível criar mais de um personagem por usuário
// export class OnCallBuscarPersonagemJogadorRequest {}

export interface OnCallBuscarPersonagemJogadorResponse {
    personagemJogador: PersonagemJson
}

export interface OnCallGerarBufferImagemPersonagemRequest {
    personagemId: string;
}

export interface OnCallGerarBufferImagemPersonagemResponse {
    base64: string;
}