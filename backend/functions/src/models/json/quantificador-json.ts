import { AtributoAbreviado } from "../personagem";
import { Modificador, QuantificadorBase } from "../entities/quantificador";

export class QuantificadorJson implements QuantificadorBase {
    valorTotal: number;
    modificadores: Modificador[];
    modificadoresTemporarios: Modificador[];
    
    constructor(quantificador?: Partial<QuantificadorJson>) {
        const {valorTotal, modificadores, modificadoresTemporarios} = quantificador || {};

        this.valorTotal = valorTotal ?? 0;
        this.modificadores = modificadores ?? [];
        this.modificadoresTemporarios = modificadoresTemporarios ?? [];
    }
}

export class QuantificadorPericiaJson extends QuantificadorJson {
    atributo: AtributoAbreviado | null;
    descricao: string | null;
    treinado: boolean;

    constructor(quantificador?: Partial<QuantificadorPericiaJson>) {
        super(quantificador);

        const {atributo, descricao, treinado} = quantificador || {};
        
        this.atributo = atributo ?? null;
        this.descricao = descricao ?? '';
        this.treinado = treinado ?? false;
    }
}

export class QuantificadorVariavelJson extends QuantificadorJson {
    valorAtual: number;

    constructor(quantificador?: Partial<QuantificadorVariavelJson>) {
        super(quantificador);

        const {valorAtual, valorTotal} = quantificador || {};

        this.valorAtual = valorAtual ?? valorTotal ?? 0;
    }
}