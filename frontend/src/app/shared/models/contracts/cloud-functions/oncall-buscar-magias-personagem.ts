import { CirculoMagia, EscolaMagia, ExecucaoMagia } from '../../entities/magia';
import { OrdenacaoRegistrosMagia } from '../../firestore/magia-firestore';
import { MagiaJson } from '../../json/magia-json';

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
