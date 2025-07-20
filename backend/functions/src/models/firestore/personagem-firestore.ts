import {Timestamp} from "firebase-admin/firestore";
import {ClassePersonagem, InformacoesPersonagem, PersonagemBase} from "../personagem";
import { QuantificadorFirestore, QuantificadorPericiaFirestore } from "./quantificador-firestore";

export class PersonagemFirestore implements PersonagemBase {
  _id: string | null;

  dataCriacao: Timestamp;
  excluido: boolean;

  atributos: AtributosFirestore;
  informacoes: InformacoesPersonagem;
  pericias: PericiasFirestore;

  constructor(personagem?: Partial<PersonagemFirestore>) {
    const {_id, dataCriacao, excluido, atributos, informacoes, pericias} = personagem || {};

    this._id = _id ?? null;

    this.dataCriacao = dataCriacao ?? Timestamp.fromDate(new Date());
    this.excluido = excluido ?? false;

    this.atributos = {
      car: new QuantificadorFirestore(atributos?.car),
      con: new QuantificadorFirestore(atributos?.con),
      des: new QuantificadorFirestore(atributos?.des),
      for: new QuantificadorFirestore(atributos?.for),
      int: new QuantificadorFirestore(atributos?.int),
      sab: new QuantificadorFirestore(atributos?.sab)
    };

    this.informacoes = {
        classe: informacoes?.classe ?? ClassePersonagem.BARBARO,
        linhagem: informacoes?.linhagem ?? '',
        nivel: informacoes?.nivel ?? 1,
        nome: informacoes?.nome ?? '',
        origem: informacoes?.origem ?? ''
    };

    this.pericias = {
      acrobacia: new QuantificadorPericiaFirestore(pericias?.acrobacia),
      adestramento: new QuantificadorPericiaFirestore(pericias?.adestramento),
      atletismo: new QuantificadorPericiaFirestore(pericias?.atletismo),
      atuacao: new QuantificadorPericiaFirestore(pericias?.atuacao),
      cavalgar: new QuantificadorPericiaFirestore(pericias?.cavalgar),
      conhecimento: new QuantificadorPericiaFirestore(pericias?.conhecimento),
      cura: new QuantificadorPericiaFirestore(pericias?.cura),
      diplomacia: new QuantificadorPericiaFirestore(pericias?.diplomacia),
      enganacao: new QuantificadorPericiaFirestore(pericias?.enganacao),
      fortitude: new QuantificadorPericiaFirestore(pericias?.fortitude),
      guerra: new QuantificadorPericiaFirestore(pericias?.guerra),
      iniciativa: new QuantificadorPericiaFirestore(pericias?.iniciativa),
      intimidacao: new QuantificadorPericiaFirestore(pericias?.intimidacao),
      intuicao: new QuantificadorPericiaFirestore(pericias?.intuicao),
      investigacao: new QuantificadorPericiaFirestore(pericias?.investigacao),
      jogatina: new QuantificadorPericiaFirestore(pericias?.jogatina),
      ladinagem: new QuantificadorPericiaFirestore(pericias?.ladinagem),
      luta: new QuantificadorPericiaFirestore(pericias?.luta),
      misticismo: new QuantificadorPericiaFirestore(pericias?.misticismo),
      nobreza: new QuantificadorPericiaFirestore(pericias?.nobreza),
      oficio: [new QuantificadorPericiaFirestore(pericias?.oficio[0]), new QuantificadorPericiaFirestore(pericias?.oficio[1])],
      percepcao: new QuantificadorPericiaFirestore(pericias?.percepcao),
      pilotagem: new QuantificadorPericiaFirestore(pericias?.pilotagem),
      pontaria: new QuantificadorPericiaFirestore(pericias?.pontaria),
      reflexos: new QuantificadorPericiaFirestore(pericias?.reflexos),
      religiao: new QuantificadorPericiaFirestore(pericias?.religiao),
      sobrevivencia: new QuantificadorPericiaFirestore(pericias?.sobrevivencia),
      vontade: new QuantificadorPericiaFirestore(pericias?.vontade)
    };
  }
}

export interface AtributosFirestore {
    car: QuantificadorFirestore;
    con: QuantificadorFirestore;
    des: QuantificadorFirestore;
    for: QuantificadorFirestore;
    int: QuantificadorFirestore;
    sab: QuantificadorFirestore;
}

export interface PericiasFirestore {
    acrobacia: QuantificadorPericiaFirestore;
    adestramento: QuantificadorPericiaFirestore;
    atletismo: QuantificadorPericiaFirestore;
    atuacao: QuantificadorPericiaFirestore;
    cavalgar: QuantificadorPericiaFirestore;
    conhecimento: QuantificadorPericiaFirestore;
    cura: QuantificadorPericiaFirestore;
    diplomacia: QuantificadorPericiaFirestore;
    enganacao: QuantificadorPericiaFirestore;
    fortitude: QuantificadorPericiaFirestore;
    guerra: QuantificadorPericiaFirestore;
    iniciativa: QuantificadorPericiaFirestore;
    intimidacao: QuantificadorPericiaFirestore;
    intuicao: QuantificadorPericiaFirestore;
    investigacao: QuantificadorPericiaFirestore;
    jogatina: QuantificadorPericiaFirestore;
    ladinagem: QuantificadorPericiaFirestore;
    luta: QuantificadorPericiaFirestore;
    misticismo: QuantificadorPericiaFirestore;
    nobreza: QuantificadorPericiaFirestore;
    oficio: QuantificadorPericiaFirestore[];
    percepcao: QuantificadorPericiaFirestore;
    pilotagem: QuantificadorPericiaFirestore;
    pontaria: QuantificadorPericiaFirestore;
    reflexos: QuantificadorPericiaFirestore;
    religiao: QuantificadorPericiaFirestore;
    sobrevivencia: QuantificadorPericiaFirestore;
    vontade: QuantificadorPericiaFirestore;
}