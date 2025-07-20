import { Modificador, QuantificadorBase } from "../quantificador";

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