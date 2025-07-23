import { Timestamp } from "firebase-admin/firestore";
import { AlcanceAtaque, AtaqueBase, TipoAtaque, TipoDano } from "../ataque";
import { Pericia } from "../personagem";
import { QuantificadorFirestore } from "./quantificador-firestore";

export class AtaqueArmaFirestore implements AtaqueBase {
    dataAtualizacao: Timestamp | null;
    dataCriacao: Timestamp;
    excluido: boolean;

    alcance: AlcanceAtaque | null;
    bonus: QuantificadorFirestore;
    dano: string;
    descricao: string;
    tipo: TipoAtaque | null;
    tipoDano: TipoDano | null;

    critico: string | null;
    pericia: Pericia | null;

    constructor(ataque?: Partial<AtaqueArmaFirestore>) {
        const {
            alcance, bonus, dano, dataAtualizacao, dataCriacao,
            descricao, excluido, tipo, tipoDano, critico, pericia
        } = ataque ?? {};

        this.dataAtualizacao = dataAtualizacao ?? null;
        this.dataCriacao = dataCriacao ?? Timestamp.fromDate(new Date());
        this.excluido = excluido ?? false;

        this.alcance = alcance ?? null;
        this.dano = dano ?? '';
        this.descricao = descricao ?? '';
        this.tipo = tipo ?? null;
        this.tipoDano = tipoDano ?? null;
        this.critico = critico ?? null;
        this.pericia = pericia ?? null;

        this.bonus = new QuantificadorFirestore(bonus);
    }
}

export class AtaqueEfeitoFirestore implements AtaqueBase {
    dataAtualizacao: Timestamp | null;
    dataCriacao: Timestamp;
    excluido: boolean;

    alcance: AlcanceAtaque | null;
    bonus: QuantificadorFirestore;
    dano: string;
    descricao: string;
    tipo: TipoAtaque | null;
    tipoDano: TipoDano | null;

    resistencia: Pericia | null;

    constructor(ataque?: Partial<AtaqueEfeitoFirestore>) {
        const {
            alcance, bonus, dano, dataAtualizacao, dataCriacao,
            descricao, excluido, tipo, tipoDano, resistencia
        } = ataque ?? {};

        this.dataAtualizacao = dataAtualizacao ?? null;
        this.dataCriacao = dataCriacao ?? Timestamp.fromDate(new Date());
        this.excluido = excluido ?? false;

        this.alcance = alcance ?? null;
        this.dano = dano ?? '';
        this.descricao = descricao ?? '';
        this.tipo = tipo ?? null;
        this.tipoDano = tipoDano ?? null;
        this.resistencia = resistencia ?? null;

        this.bonus = new QuantificadorFirestore(bonus);
    }
}

export enum OrdenacaoRegistrosAtaque {
    descricao = "descricao",
    tipo = "tipo",
    tipoDano = "tipoDano"
}