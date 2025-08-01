import { AtributoAbreviado } from "../entities/personagem";
import { Modificador, QuantificadorBase } from "../entities/quantificador";

export class QuantificadorFirestore implements QuantificadorBase {
    valorTotal: number;
    modificadores: Modificador[];
    modificadoresTemporarios: Modificador[];
    
    constructor(quantificador?: Partial<QuantificadorFirestore>) {
        const {valorTotal, modificadores, modificadoresTemporarios} = quantificador || {};

        this.valorTotal = valorTotal ?? 0;
        this.modificadores = modificadores ?? [];
        this.modificadoresTemporarios = modificadoresTemporarios ?? [];
    }
}

export class QuantificadorPericiaFirestore extends QuantificadorFirestore {
    atributo: AtributoAbreviado | null;
    descricao: string | null;
    treinado: boolean;

    constructor(quantificador?: Partial<QuantificadorPericiaFirestore>) {
        super(quantificador);

        const {atributo, descricao, treinado} = quantificador || {};
        
        this.atributo = atributo ?? null;
        this.descricao = descricao ?? '';
        this.treinado = treinado ?? false;
    }
}

export class QuantificadorVariavelFirestore extends QuantificadorFirestore {
    valorAtual: number;

    constructor(quantificador?: Partial<QuantificadorVariavelFirestore>) {
        super(quantificador);

        const {valorAtual, valorTotal} = quantificador || {};

        this.valorAtual = valorAtual ?? valorTotal ?? 0;
    }
}