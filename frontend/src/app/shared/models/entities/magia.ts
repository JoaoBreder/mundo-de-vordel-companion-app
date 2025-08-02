import { Pericia } from "./personagem";

export interface MagiaBase {
    dataAtualizacao: any;
    dataCriacao: any;
    excluido: boolean;

    alcance: AlcanceMagia | null;
    area: string | null;
    circulo: CirculoMagia | null;
    duracao: DuracaoMagia | string | null;
    efeito: string;
    escola: EscolaMagia | null;
    execucao: ExecucaoMagia | null;
    nome: string;
    resistencia: Resistencia | null;
    tipo: TipoMagia | null;
}

export class Magia implements MagiaBase {
    private _dataAtualizacao: Date | null;
    private _dataCriacao: Date;
    private _excluido: boolean;

    private _alcance: AlcanceMagia | null;
    private _area: string | null;
    private _circulo: CirculoMagia | null;
    private _duracao: DuracaoMagia |string | null;
    private _efeito: string;
    private _escola: EscolaMagia | null;
    private _execucao: ExecucaoMagia | null;
    private _nome: string;
    private _resistencia: Resistencia | null;
    private _tipo: TipoMagia | null;

    constructor(magia?: Partial<Magia>) {
        const {
            alcance, area, circulo, dataCriacao, dataAtualizacao, duracao, efeito, escola, excluido, execucao, nome, resistencia, tipo
        } = magia ?? {};

        this._dataAtualizacao = dataAtualizacao ?? null;
        this._dataCriacao = dataCriacao ?? new Date();
        this._excluido = excluido ?? false;

        this._alcance = alcance ?? null;
        this._area = area ?? null;
        this._circulo = circulo ?? null;
        this._duracao = duracao ?? null;
        this._efeito = efeito ?? '';
        this._escola = escola ?? null;
        this._execucao = execucao ?? null;
        this._nome = nome ?? '';
        this._resistencia = resistencia ?? null;
        this._tipo = tipo ?? null;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos públicos
    // -----------------------------------------------------------------------------------------------------

    modificarMagia(magia: Partial<Magia>) {
        const {
            alcance, circulo, duracao, efeito, escola, execucao, resistencia, tipo
        } = magia;

        this._alcance = alcance ?? this.alcance;
        this._circulo = circulo ?? this.circulo;
        this._duracao = duracao ?? this.duracao;
        this._efeito = efeito ?? this.efeito;
        this._escola = escola ?? this.escola;
        this._execucao = execucao ?? this.execucao;
        this._resistencia = resistencia ?? this.resistencia;
        this._tipo = tipo ?? this.tipo;

        this._dataAtualizacao = new Date();
    }

    marcarComoExcluido() {
        this._excluido = false;
        this._dataAtualizacao = new Date();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Getters
    // -----------------------------------------------------------------------------------------------------

    get alcance(): AlcanceMagia | null {
        return this._alcance;
    }

    get area(): string | null {
        return this._area;
    }

    get circulo(): CirculoMagia | null {
        return this._circulo;
    }

    get dataAtualizacao(): Date | null {
        return this._dataAtualizacao;
    }

    get dataCriacao(): Date {
        return this._dataCriacao;
    }

    get duracao(): DuracaoMagia |string | null {
        return this._duracao;
    }

    get efeito(): string {
        return this._efeito;
    }

    get escola(): EscolaMagia | null {
        return this._escola;
    }

    get excluido(): boolean {
        return this._excluido;
    }

    get execucao(): ExecucaoMagia | null {
        return this._execucao;
    }

    get nome(): string {
        return this._nome;
    }

    get resistencia(): Resistencia | null {
        return this._resistencia;
    }

    get tipo(): TipoMagia | null {
        return this._tipo;
    }
}

export enum TipoResistencia {
    ANULA = "ANULA",
    PARCIAL = "PARCIAL",
    REDUZ_A_METADE = "REDUZ_A_METADE",
    DESACREDITA = "DESACREDITA"
}

export enum AlcanceMagia {
    PESSOAL = "PESSOAL",
    TOQUE = "TOQUE",
    CURTO = "CURTO",
    MEDIO = "MEDIO",
    LONGO = "LONGO",
    ILIMITADO = "ILIMITADO",
}

export enum CirculoMagia {
    PRIMEIRO_CIRCULO = "PRIMEIRO_CIRCULO",
    SEGUNDO_CIRCULO = "SEGUNDO_CIRCULO",
    TERCEIRO_CIRCULO = "TERCEIRO_CIRCULO",
    QUARTO_CIRCULO = "QUARTO_CIRCULO",
    QUINTOIRCULO = "QUINTO_CIRCULO"
}

export enum DuracaoMagia {
    INSTANTANEA = "INSTANTANEA",
    CENA = "CENA",
    SUSTENTADA = "SUSTENTADA",
    DEFINIDA = "DEFINIDA",
    PERMANENTE = "PERMANENTE"
}

export enum EscolaMagia {
    ABJURACAO = "ABJURACAO",
    ADVINHACAO = "ADVINHACAO",
    CONVOCACAO = "CONVOCACAO",
    ENCANTAMENTO = "ENCANTAMENTO",
    EVOCACAO = "EVOCACAO",
    ILUSAO = "ILUSAO",
    NECROMANCIA = "NECROMANCIA",
    TRANSMUTACAO = "TRANSMUTACAO"
}

export enum ExecucaoMagia {
    ACAO_COMPLETA = "ACAO_COMPLETA",
    ACAO_PADRAO = "ACAO_PADRAO",
    ACAO_LIVRE = "ACAO_LIVRE",
    REACAO = "REACAO",
}

export interface Resistencia {
    pericia: Pericia;
    tipo: TipoResistencia | string;
}

export enum TipoMagia {
    MAGIA_ARCANA = "MAGIA_ARCANA",
    MAGIA_DIVINA = "MAGIA_DIVINA"
}
