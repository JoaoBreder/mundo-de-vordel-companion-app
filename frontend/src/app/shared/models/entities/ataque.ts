import { Resistencia } from './magia';
import { Pericia } from './personagem';
import { Quantificador } from './quantificador';

export interface AtaqueBase {
    dataAtualizacao: any;
    dataCriacao: any;
    excluido: boolean;

    alcance: any;
    bonusAtaque: any;
    bonusDano: any;
    dano: string;
    descricao: string;
    tipo: TipoAtaque | null;
    tipoDano: TipoDano | null;
}

export class AtaqueArma implements AtaqueBase {
    private _dataAtualizacao: Date | null;
    private _dataCriacao: Date;
    private _excluido: boolean;

    private _alcance: AlcanceAtaque | null;
    private _dano: string;
    private _descricao: string;
    private _tipo: TipoAtaque | null;
    private _tipoDano: TipoDano | null;

    private _critico: string | null;
    private _pericia: Pericia | null;

    bonusAtaque: Quantificador | null;
    bonusDano: Quantificador | null;

    constructor(ataque?: Partial<AtaqueArma>) {
        const { alcance, bonusAtaque, bonusDano, dano, dataAtualizacao, dataCriacao, descricao, excluido, tipo, tipoDano, critico, pericia } = ataque ?? {};

        this._dataCriacao = dataCriacao ?? new Date();
        this._dataAtualizacao = dataAtualizacao ?? null;
        this._excluido = excluido ?? false;

        this._alcance = alcance ?? null;
        this._dano = dano ?? '';
        this._descricao = descricao ?? '';
        this._tipo = tipo ?? null;
        this._tipoDano = tipoDano ?? null;
        this._critico = critico ?? null;
        this._pericia = pericia ?? null;

        this.bonusAtaque = bonusAtaque ? new Quantificador(bonusAtaque) : null;
        this.bonusDano = bonusDano ? new Quantificador(bonusDano) : null;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos públicos
    // -----------------------------------------------------------------------------------------------------

    modificarAtaque(ataque: Partial<AtaqueArma>) {
        const { alcance, bonusAtaque, bonusDano, dano, descricao, tipo, tipoDano, critico, pericia } = ataque;

        this._alcance = alcance ?? this.alcance;
        this._dano = dano ?? this.dano;
        this._descricao = descricao ?? this.descricao;
        this._tipo = tipo ?? this.tipo;
        this._tipoDano = tipoDano ?? this.tipoDano;
        this._critico = critico ?? this.critico;
        this._pericia = pericia ?? this.pericia;

        this.bonusAtaque = bonusAtaque ? new Quantificador(bonusAtaque) : this.bonusAtaque;
        this.bonusDano = bonusDano ? new Quantificador(bonusDano) : this.bonusDano;

        this._dataAtualizacao = new Date();
    }

    marcarComoExcluido() {
        this._excluido = false;
        this._dataAtualizacao = new Date();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Getters
    // -----------------------------------------------------------------------------------------------------

    get alcance(): AlcanceAtaque | null {
        return this._alcance;
    }

    get dano(): string {
        return this._dano;
    }

    get dataAtualizacao(): Date | null {
        return this._dataAtualizacao;
    }

    get dataCriacao(): Date {
        return this._dataCriacao;
    }

    get descricao(): string {
        return this._descricao;
    }

    get excluido(): boolean {
        return this._excluido;
    }

    get tipo(): TipoAtaque | null {
        return this._tipo;
    }

    get tipoDano(): TipoDano | null {
        return this._tipoDano;
    }

    get critico(): string | null {
        return this._critico;
    }

    get pericia(): Pericia | null {
        return this._pericia;
    }
}

export class AtaqueEfeito implements AtaqueBase {
    private _dataAtualizacao: Date | null;
    private _dataCriacao: Date;
    private _excluido: boolean;

    private _alcance: AlcanceAtaque | null;
    private _dano: string;
    private _descricao: string;
    private _tipo: TipoAtaque | null;
    private _tipoDano: TipoDano | null;

    private _resistencias: Resistencia[];

    bonusAtaque: Quantificador | null;
    bonusDano: Quantificador | null;

    constructor(ataque?: Partial<AtaqueEfeito>) {
        const { alcance, bonusAtaque, bonusDano, dano, dataAtualizacao, dataCriacao, descricao, excluido, tipo, tipoDano, resistencias } = ataque ?? {};

        this._dataCriacao = dataCriacao ?? new Date();
        this._dataAtualizacao = dataAtualizacao ?? null;
        this._excluido = excluido ?? false;

        this._alcance = alcance ?? null;
        this._dano = dano ?? '';
        this._descricao = descricao ?? '';
        this._excluido = excluido ?? false;
        this._tipo = tipo ?? null;
        this._tipoDano = tipoDano ?? null;
        this._resistencias = resistencias ?? [];

        this.bonusAtaque = bonusAtaque ? new Quantificador(bonusAtaque) : null;
        this.bonusDano = bonusDano ? new Quantificador(bonusDano) : null;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos públicos
    // -----------------------------------------------------------------------------------------------------

    modificarAtaque(ataque: Partial<AtaqueEfeito>) {
        const { alcance, bonusAtaque, bonusDano, dano, descricao, tipo, tipoDano, resistencias } = ataque;

        this._alcance = alcance ?? this.alcance;
        this._dano = dano ?? this.dano;
        this._descricao = descricao ?? this.descricao;
        this._tipo = tipo ?? this.tipo;
        this._tipoDano = tipoDano ?? this.tipoDano;
        this._resistencias = resistencias ?? this.resistencias;

        this.bonusAtaque = bonusAtaque ? new Quantificador(bonusAtaque) : this.bonusAtaque;
        this.bonusDano = bonusDano ? new Quantificador(bonusDano) : this.bonusDano;

        this._dataAtualizacao = new Date();
    }

    marcarComoExcluido() {
        this._excluido = false;
        this._dataAtualizacao = new Date();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Getters
    // -----------------------------------------------------------------------------------------------------

    get alcance(): AlcanceAtaque | null {
        return this._alcance;
    }

    get dano(): string {
        return this._dano;
    }

    get dataAtualizacao(): Date | null {
        return this._dataAtualizacao;
    }

    get dataCriacao(): Date {
        return this._dataCriacao;
    }

    get descricao(): string {
        return this._descricao;
    }

    get excluido(): boolean {
        return this._excluido;
    }

    get tipo(): TipoAtaque | null {
        return this._tipo;
    }

    get tipoDano(): TipoDano | null {
        return this._tipoDano;
    }

    get resistencias(): Resistencia[] {
        return this._resistencias;
    }
}

export enum AlcanceAtaque {
    TOQUE = 'TOQUE',
    CURTO = 'CURTO',
    MEDIO = 'MEDIO',
    LONGO = 'LONGO',
}

export enum TipoAtaque {
    ATAQUE_A_DISTANCIA = 'ATAQUE_A_DISTANCIA',
    CORPO_A_CORPO = 'CORPO_A_CORPO',
    EFEITO = 'EFEITO',
}

export enum TipoDano {
    ACIDO = 'ACIDO',
    CORTE = 'CORTE',
    ELETRICIDADE = 'ELETRICIDADE',
    ESSENCIA = 'ESSENCIA',
    FOGO = 'FOGO',
    FRIO = 'FRIO',
    IMPACTO = 'IMPACTO',
    LUZ = 'LUZ',
    PERFURACAO = 'PERFURACAO',
    PSIQUICO = 'PSIQUICO',
    TREVAS = 'TREVAS',
}
