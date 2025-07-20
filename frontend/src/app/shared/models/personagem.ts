import { Quantificador, QuantificadorPericia } from './quantificador';

export interface PersonagemBase {
    _id: string | null;

    dataCriacao: any;
    excluido: boolean;

    atributos: any;
    informacoes: InformacoesPersonagem;
    pericias: any;
}

export class Personagem implements PersonagemBase {
    _id: string | null;

    dataCriacao: Date;
    excluido: boolean;

    atributos: Atributos;
    informacoes: InformacoesPersonagem;
    pericias: Pericias;

    constructor(personagem?: Partial<Personagem>) {
        const { _id, dataCriacao, excluido, atributos, informacoes, pericias } = personagem || {};

        this._id = _id ?? null;

        this.dataCriacao = dataCriacao ?? new Date();
        this.excluido = excluido ?? false;

        this.atributos = {
            car: new Quantificador(atributos?.car),
            con: new Quantificador(atributos?.con),
            des: new Quantificador(atributos?.des),
            for: new Quantificador(atributos?.for),
            int: new Quantificador(atributos?.int),
            sab: new Quantificador(atributos?.sab),
        };

        this.informacoes = {
            classe: informacoes?.classe ?? ClassePersonagem.BARBARO,
            linhagem: informacoes?.linhagem ?? '',
            nivel: informacoes?.nivel ?? 1,
            nome: informacoes?.nome ?? '',
            origem: informacoes?.origem ?? '',
        };

        this.pericias = {
            acrobacia: new QuantificadorPericia(pericias?.acrobacia),
            adestramento: new QuantificadorPericia(pericias?.adestramento),
            atletismo: new QuantificadorPericia(pericias?.atletismo),
            atuacao: new QuantificadorPericia(pericias?.atuacao),
            cavalgar: new QuantificadorPericia(pericias?.cavalgar),
            conhecimento: new QuantificadorPericia(pericias?.conhecimento),
            cura: new QuantificadorPericia(pericias?.cura),
            diplomacia: new QuantificadorPericia(pericias?.diplomacia),
            enganacao: new QuantificadorPericia(pericias?.enganacao),
            fortitude: new QuantificadorPericia(pericias?.fortitude),
            guerra: new QuantificadorPericia(pericias?.guerra),
            iniciativa: new QuantificadorPericia(pericias?.iniciativa),
            intimidacao: new QuantificadorPericia(pericias?.intimidacao),
            intuicao: new QuantificadorPericia(pericias?.intuicao),
            investigacao: new QuantificadorPericia(pericias?.investigacao),
            jogatina: new QuantificadorPericia(pericias?.jogatina),
            ladinagem: new QuantificadorPericia(pericias?.ladinagem),
            luta: new QuantificadorPericia(pericias?.luta),
            misticismo: new QuantificadorPericia(pericias?.misticismo),
            nobreza: new QuantificadorPericia(pericias?.nobreza),
            oficio: [new QuantificadorPericia(pericias?.oficio[0]), new QuantificadorPericia(pericias?.oficio[1])],
            percepcao: new QuantificadorPericia(pericias?.percepcao),
            pilotagem: new QuantificadorPericia(pericias?.pilotagem),
            pontaria: new QuantificadorPericia(pericias?.pontaria),
            reflexos: new QuantificadorPericia(pericias?.reflexos),
            religiao: new QuantificadorPericia(pericias?.religiao),
            sobrevivencia: new QuantificadorPericia(pericias?.sobrevivencia),
            vontade: new QuantificadorPericia(pericias?.vontade),
        };
    }
}

export interface Atributos {
    car: Quantificador;
    con: Quantificador;
    des: Quantificador;
    for: Quantificador;
    int: Quantificador;
    sab: Quantificador;
}

export interface InformacoesPersonagem {
    classe: ClassePersonagem;
    linhagem: string;
    nivel: number;
    nome: string;
    origem: string;
}

export interface Pericias {
    acrobacia: QuantificadorPericia;
    adestramento: QuantificadorPericia;
    atletismo: QuantificadorPericia;
    atuacao: QuantificadorPericia;
    cavalgar: QuantificadorPericia;
    conhecimento: QuantificadorPericia;
    cura: QuantificadorPericia;
    diplomacia: QuantificadorPericia;
    enganacao: QuantificadorPericia;
    fortitude: QuantificadorPericia;
    guerra: QuantificadorPericia;
    iniciativa: QuantificadorPericia;
    intimidacao: QuantificadorPericia;
    intuicao: QuantificadorPericia;
    investigacao: QuantificadorPericia;
    jogatina: QuantificadorPericia;
    ladinagem: QuantificadorPericia;
    luta: QuantificadorPericia;
    misticismo: QuantificadorPericia;
    nobreza: QuantificadorPericia;
    oficio: QuantificadorPericia[];
    percepcao: QuantificadorPericia;
    pilotagem: QuantificadorPericia;
    pontaria: QuantificadorPericia;
    reflexos: QuantificadorPericia;
    religiao: QuantificadorPericia;
    sobrevivencia: QuantificadorPericia;
    vontade: QuantificadorPericia;
}

export enum ClassePersonagem {
    BARBARO = 'BARBARO',
    BARDO = 'BARDO',
    BUCANEIRO = 'BUCANEIRO',
    BRUXO = 'BRUXO',
    CACADOR = 'CACADOR',
    CAVALEIRO = 'CAVALEIRO',
    DRUIDA = 'DRUIDA',
    FEITICEIRO = 'FEITICEIRO',
    GUERREIRO = 'GUERREIRO',
    INVENTOR = 'INVENTOR',
    LADINO = 'LADINO',
    LUTADOR = 'LUTADOR',
    MAGO = 'MAGO',
    NOBRE = 'NOBRE',
    PALADINO = 'PALADINO',
}
