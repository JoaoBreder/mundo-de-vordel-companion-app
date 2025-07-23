import { AlcanceAtaque, AtaqueBase, TipoAtaque, TipoDano } from "../ataque";
import { Pericia } from "../personagem";
import { QuantificadorJson } from "./quantificador-json";

export class AtaqueArmaJson implements AtaqueBase {
    dataAtualizacao: string | null;
    dataCriacao: string;
    excluido: boolean;

    alcance: AlcanceAtaque | null;
    bonus: QuantificadorJson;
    dano: string;
    descricao: string;
    tipo: TipoAtaque | null;
    tipoDano: TipoDano | null;

    critico: string | null;
    pericia: Pericia | null;

    constructor(ataque?: Partial<AtaqueArmaJson>) {
        const {
            alcance, bonus, dano, dataAtualizacao, dataCriacao,
            descricao, excluido, tipo, tipoDano, critico, pericia
        } = ataque ?? {};

        this.dataAtualizacao = dataAtualizacao ?? null;
        this.dataCriacao = dataCriacao ?? new Date().toISOString();
        this.excluido = excluido ?? false;

        this.alcance = alcance ?? null;
        this.dano = dano ?? '';
        this.descricao = descricao ?? '';
        this.tipo = tipo ?? null;
        this.tipoDano = tipoDano ?? null;
        this.critico = critico ?? null;
        this.pericia = pericia ?? null;

        this.bonus = new QuantificadorJson(bonus);
    }
}

export class AtaqueEfeitoJson implements AtaqueBase {
    dataAtualizacao: string | null;
    dataCriacao: string;
    excluido: boolean;

    alcance: AlcanceAtaque | null;
    bonus: QuantificadorJson;
    dano: string;
    descricao: string;
    tipo: TipoAtaque | null;
    tipoDano: TipoDano | null;

    resistencia: Pericia | null;

    constructor(ataque?: Partial<AtaqueEfeitoJson>) {
        const {
            alcance, bonus, dano, dataAtualizacao, dataCriacao,
            descricao, excluido, tipo, tipoDano, resistencia
        } = ataque ?? {};

        this.dataAtualizacao = dataAtualizacao ?? null;
        this.dataCriacao = dataCriacao ?? new Date().toISOString();
        this.excluido = excluido ?? false;

        this.alcance = alcance ?? null;
        this.dano = dano ?? '';
        this.descricao = descricao ?? '';
        this.tipo = tipo ?? null;
        this.tipoDano = tipoDano ?? null;
        this.resistencia = resistencia ?? null;

        this.bonus = new QuantificadorJson(bonus);
    }
}