import { Timestamp } from "firebase-admin/firestore";
import { MagiaBase, AlcanceMagia, CirculoMagia, DuracaoMagia, EscolaMagia, ExecucaoMagia, Resistencia, TipoMagia } from "../entities/magia";

export class MagiaFirestore implements MagiaBase {
    dataAtualizacao: Timestamp | null;
    dataCriacao: Timestamp;
    excluido: boolean;

    alcance: AlcanceMagia | null;
    alvo: string | null;
    area: string | null;
    circulo: CirculoMagia | null;
    duracao: DuracaoMagia |string | null;
    efeito: string;
    escola: EscolaMagia | null;
    execucao: ExecucaoMagia | null;
    nome: string;
    resistencias: Resistencia[];
    tipo: TipoMagia | null;

    constructor(magia?: Partial<MagiaFirestore>) {
        const {
            alcance, alvo, area, circulo, dataCriacao, dataAtualizacao, duracao, efeito, escola, excluido, execucao, nome, resistencias, tipo
        } = magia ?? {};

        this.dataCriacao = dataCriacao ?? Timestamp.fromDate(new Date());
        this.dataAtualizacao = dataAtualizacao ?? null;
        this.excluido = excluido ?? false;

        this.alcance = alcance ?? null; 
        this.alvo = alvo ?? null; 
        this.area = area ?? null;
        this.circulo = circulo ?? null; 
        this.duracao = duracao ?? null; 
        this.efeito = efeito ?? ''; 
        this.escola = escola ?? null; 
        this.execucao = execucao ?? null;
        this.nome = nome ?? '';
        this.resistencias = resistencias ?? []; 
        this.tipo = tipo ?? null; 
    }
}

export enum OrdenacaoRegistrosMagia {
    circulo = "circulo",
    nome = "nome"
}