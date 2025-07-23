import { TipoAtaque, TipoDano } from "../ataque";
import { OrdenacaoRegistrosAtaque } from "../firestore/ataque-firestore";
import { AtaqueArmaJson, AtaqueEfeitoJson } from "../json/ataque-json";
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