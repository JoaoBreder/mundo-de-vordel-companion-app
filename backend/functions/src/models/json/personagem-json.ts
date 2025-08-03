import { ClassePersonagem, InformacoesPersonagem, PersonagemBase } from "../entities/personagem";
import { QuantificadorJson, QuantificadorPericiaJson } from "./quantificador-json";

export class PersonagemJson implements PersonagemBase {
  _id: string | null;

  dataCriacao: string;
  excluido: boolean;

  atributos: AtributosJson;
  informacoes: InformacoesPersonagem;
  pericias: PericiasJson;

  constructor(personagem?: Partial<PersonagemJson>) {
    const {_id, dataCriacao, excluido, atributos, informacoes, pericias} = personagem || {};

    this._id = _id ?? null;

    this.dataCriacao = dataCriacao ?? new Date().toISOString();
    this.excluido = excluido ?? false;

    this.atributos = {
      car: new QuantificadorJson(atributos?.car),
      con: new QuantificadorJson(atributos?.con),
      des: new QuantificadorJson(atributos?.des),
      for: new QuantificadorJson(atributos?.for),
      int: new QuantificadorJson(atributos?.int),
      sab: new QuantificadorJson(atributos?.sab)
    };

    this.informacoes = {
        classe: informacoes?.classe ?? ClassePersonagem.BARBARO,
        linhagem: informacoes?.linhagem ?? '',
        nivel: informacoes?.nivel ?? 1,
        nome: informacoes?.nome ?? '',
        origem: informacoes?.origem ?? ''
    };

    this.pericias = {
      acrobacia: new QuantificadorPericiaJson(pericias?.acrobacia),
      adestramento: new QuantificadorPericiaJson(pericias?.adestramento),
      atletismo: new QuantificadorPericiaJson(pericias?.atletismo),
      atuacao: new QuantificadorPericiaJson(pericias?.atuacao),
      cavalgar: new QuantificadorPericiaJson(pericias?.cavalgar),
      conhecimento: new QuantificadorPericiaJson(pericias?.conhecimento),
      cura: new QuantificadorPericiaJson(pericias?.cura),
      diplomacia: new QuantificadorPericiaJson(pericias?.diplomacia),
      enganacao: new QuantificadorPericiaJson(pericias?.enganacao),
      fortitude: new QuantificadorPericiaJson(pericias?.fortitude),
      guerra: new QuantificadorPericiaJson(pericias?.guerra),
      iniciativa: new QuantificadorPericiaJson(pericias?.iniciativa),
      intimidacao: new QuantificadorPericiaJson(pericias?.intimidacao),
      intuicao: new QuantificadorPericiaJson(pericias?.intuicao),
      investigacao: new QuantificadorPericiaJson(pericias?.investigacao),
      jogatina: new QuantificadorPericiaJson(pericias?.jogatina),
      ladinagem: new QuantificadorPericiaJson(pericias?.ladinagem),
      luta: new QuantificadorPericiaJson(pericias?.luta),
      misticismo: new QuantificadorPericiaJson(pericias?.misticismo),
      nobreza: new QuantificadorPericiaJson(pericias?.nobreza),
      oficio: [new QuantificadorPericiaJson(pericias?.oficio[0]), new QuantificadorPericiaJson(pericias?.oficio[1])],
      percepcao: new QuantificadorPericiaJson(pericias?.percepcao),
      pilotagem: new QuantificadorPericiaJson(pericias?.pilotagem),
      pontaria: new QuantificadorPericiaJson(pericias?.pontaria),
      reflexos: new QuantificadorPericiaJson(pericias?.reflexos),
      religiao: new QuantificadorPericiaJson(pericias?.religiao),
      sobrevivencia: new QuantificadorPericiaJson(pericias?.sobrevivencia),
      vontade: new QuantificadorPericiaJson(pericias?.vontade)
    };
  }
}

export interface AtributosJson {
    car: QuantificadorJson;
    con: QuantificadorJson;
    des: QuantificadorJson;
    for: QuantificadorJson;
    int: QuantificadorJson;
    sab: QuantificadorJson;
}

export interface PericiasJson {
    acrobacia: QuantificadorPericiaJson;
    adestramento: QuantificadorPericiaJson;
    atletismo: QuantificadorPericiaJson;
    atuacao: QuantificadorPericiaJson;
    cavalgar: QuantificadorPericiaJson;
    conhecimento: QuantificadorPericiaJson;
    cura: QuantificadorPericiaJson;
    diplomacia: QuantificadorPericiaJson;
    enganacao: QuantificadorPericiaJson;
    fortitude: QuantificadorPericiaJson;
    guerra: QuantificadorPericiaJson;
    iniciativa: QuantificadorPericiaJson;
    intimidacao: QuantificadorPericiaJson;
    intuicao: QuantificadorPericiaJson;
    investigacao: QuantificadorPericiaJson;
    jogatina: QuantificadorPericiaJson;
    ladinagem: QuantificadorPericiaJson;
    luta: QuantificadorPericiaJson;
    misticismo: QuantificadorPericiaJson;
    nobreza: QuantificadorPericiaJson;
    oficio: QuantificadorPericiaJson[];
    percepcao: QuantificadorPericiaJson;
    pilotagem: QuantificadorPericiaJson;
    pontaria: QuantificadorPericiaJson;
    reflexos: QuantificadorPericiaJson;
    religiao: QuantificadorPericiaJson;
    sobrevivencia: QuantificadorPericiaJson;
    vontade: QuantificadorPericiaJson;
}