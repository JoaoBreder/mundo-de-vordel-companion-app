import {PersonagemJson} from "../json/personagem-json";
import { Personagem } from "../personagem";
import { QuantificadorParser, QuantificadorPericiaParser } from "./quantificador.parser";

export abstract class PersonagemParser {
  // -----------------------------------------------------------------------------------------------------
  // @ Métodos privados
  // -----------------------------------------------------------------------------------------------------

  private static converterData(data: string | Date): Date {
    if (typeof data === "string") return new Date(data);
    return data as Date;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Métodos públicos
  // -----------------------------------------------------------------------------------------------------

  static personagem(personagem: PersonagemJson): Personagem {
    const {
      dataCriacao,
      atributos,
      pericias
    } = personagem;

    const _atributos = {
      car: QuantificadorParser.quantificador(atributos.car),
      con: QuantificadorParser.quantificador(atributos.con),
      des: QuantificadorParser.quantificador(atributos.des),
      for: QuantificadorParser.quantificador(atributos.for),
      int: QuantificadorParser.quantificador(atributos.int),
      sab: QuantificadorParser.quantificador(atributos.sab)
    };

    const _pericias = {
      acrobacia: QuantificadorPericiaParser.quantificadorPericia(pericias.acrobacia),
      adestramento: QuantificadorPericiaParser.quantificadorPericia(pericias.adestramento),
      atletismo: QuantificadorPericiaParser.quantificadorPericia(pericias.atletismo),
      atuacao: QuantificadorPericiaParser.quantificadorPericia(pericias.atuacao),
      cavalgar: QuantificadorPericiaParser.quantificadorPericia(pericias.cavalgar),
      conhecimento: QuantificadorPericiaParser.quantificadorPericia(pericias.conhecimento),
      cura: QuantificadorPericiaParser.quantificadorPericia(pericias.cura),
      diplomacia: QuantificadorPericiaParser.quantificadorPericia(pericias.diplomacia),
      enganacao: QuantificadorPericiaParser.quantificadorPericia(pericias.enganacao),
      fortitude: QuantificadorPericiaParser.quantificadorPericia(pericias.fortitude),
      guerra: QuantificadorPericiaParser.quantificadorPericia(pericias.guerra),
      iniciativa: QuantificadorPericiaParser.quantificadorPericia(pericias.iniciativa),
      intimidacao: QuantificadorPericiaParser.quantificadorPericia(pericias.intimidacao),
      intuicao: QuantificadorPericiaParser.quantificadorPericia(pericias.intuicao),
      investigacao: QuantificadorPericiaParser.quantificadorPericia(pericias.investigacao),
      jogatina: QuantificadorPericiaParser.quantificadorPericia(pericias.jogatina),
      ladinagem: QuantificadorPericiaParser.quantificadorPericia(pericias.ladinagem),
      luta: QuantificadorPericiaParser.quantificadorPericia(pericias.luta),
      misticismo: QuantificadorPericiaParser.quantificadorPericia(pericias.misticismo),
      nobreza: QuantificadorPericiaParser.quantificadorPericia(pericias.nobreza),
      oficio: [
        QuantificadorPericiaParser.quantificadorPericia(pericias.oficio[0]),
        QuantificadorPericiaParser.quantificadorPericia(pericias.oficio[1])
      ],
      percepcao: QuantificadorPericiaParser.quantificadorPericia(pericias.percepcao),
      pilotagem: QuantificadorPericiaParser.quantificadorPericia(pericias.pilotagem),
      pontaria: QuantificadorPericiaParser.quantificadorPericia(pericias.pontaria),
      reflexos: QuantificadorPericiaParser.quantificadorPericia(pericias.reflexos),
      religiao: QuantificadorPericiaParser.quantificadorPericia(pericias.religiao),
      sobrevivencia: QuantificadorPericiaParser.quantificadorPericia(pericias.sobrevivencia),
      vontade: QuantificadorPericiaParser.quantificadorPericia(pericias.vontade)
    };

    const dadosPersonagem: Personagem = {
      ...personagem,
      atributos: _atributos,
      pericias: _pericias,
      dataCriacao: this.converterData(dataCriacao),
    };

    return new Personagem(dadosPersonagem);
  }
}
