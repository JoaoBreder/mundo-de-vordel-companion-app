import {Timestamp} from "firebase-admin/firestore";
import {PersonagemFirestore} from "../firestore/personagem-firestore";
import {Personagem} from "../personagem";
import {PersonagemJson} from "../json/personagem-json";
import { QuantificadorParser, QuantificadorPericiaParser } from "./quantificador.parser";

export abstract class PersonagemParser {
  // -----------------------------------------------------------------------------------------------------
  // @ Métodos privados
  // -----------------------------------------------------------------------------------------------------

  private static converterData(data: string | Date | Timestamp): Date {
    if (typeof data === "string") return new Date(data);
    if ((data as Timestamp)?.seconds !== undefined && (data as Timestamp)?.nanoseconds !== undefined) return (data as Timestamp).toDate();
    return data as Date;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Métodos públicos
  // -----------------------------------------------------------------------------------------------------

  static personagem(personagem: PersonagemFirestore): Personagem {
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

  static toFirestore(personagem: Personagem | PersonagemJson): PersonagemFirestore {
    const {
      dataCriacao, 
      atributos, 
      pericias
    } = personagem;

    const _atributos = {
      car: QuantificadorParser.toFirestore(atributos.car),
      con: QuantificadorParser.toFirestore(atributos.con),
      des: QuantificadorParser.toFirestore(atributos.des),
      for: QuantificadorParser.toFirestore(atributos.for),
      int: QuantificadorParser.toFirestore(atributos.int),
      sab: QuantificadorParser.toFirestore(atributos.sab)
    };

    const _pericias = {
      acrobacia: QuantificadorPericiaParser.toFirestore(pericias.acrobacia),
      adestramento: QuantificadorPericiaParser.toFirestore(pericias.adestramento),
      atletismo: QuantificadorPericiaParser.toFirestore(pericias.atletismo),
      atuacao: QuantificadorPericiaParser.toFirestore(pericias.atuacao),
      cavalgar: QuantificadorPericiaParser.toFirestore(pericias.cavalgar),
      conhecimento: QuantificadorPericiaParser.toFirestore(pericias.conhecimento),
      cura: QuantificadorPericiaParser.toFirestore(pericias.cura),
      diplomacia: QuantificadorPericiaParser.toFirestore(pericias.diplomacia),
      enganacao: QuantificadorPericiaParser.toFirestore(pericias.enganacao),
      fortitude: QuantificadorPericiaParser.toFirestore(pericias.fortitude),
      guerra: QuantificadorPericiaParser.toFirestore(pericias.guerra),
      iniciativa: QuantificadorPericiaParser.toFirestore(pericias.iniciativa),
      intimidacao: QuantificadorPericiaParser.toFirestore(pericias.intimidacao),
      intuicao: QuantificadorPericiaParser.toFirestore(pericias.intuicao),
      investigacao: QuantificadorPericiaParser.toFirestore(pericias.investigacao),
      jogatina: QuantificadorPericiaParser.toFirestore(pericias.jogatina),
      ladinagem: QuantificadorPericiaParser.toFirestore(pericias.ladinagem),
      luta: QuantificadorPericiaParser.toFirestore(pericias.luta),
      misticismo: QuantificadorPericiaParser.toFirestore(pericias.misticismo),
      nobreza: QuantificadorPericiaParser.toFirestore(pericias.nobreza),
      oficio: [
        QuantificadorPericiaParser.toFirestore(pericias.oficio[0]), 
        QuantificadorPericiaParser.toFirestore(pericias.oficio[1])
      ],
      percepcao: QuantificadorPericiaParser.toFirestore(pericias.percepcao),
      pilotagem: QuantificadorPericiaParser.toFirestore(pericias.pilotagem),
      pontaria: QuantificadorPericiaParser.toFirestore(pericias.pontaria),
      reflexos: QuantificadorPericiaParser.toFirestore(pericias.reflexos),
      religiao: QuantificadorPericiaParser.toFirestore(pericias.religiao),
      sobrevivencia: QuantificadorPericiaParser.toFirestore(pericias.sobrevivencia),
      vontade: QuantificadorPericiaParser.toFirestore(pericias.vontade)
    };

    const dadosPersonagem: PersonagemFirestore = {
      ...personagem,
      atributos: _atributos,
      pericias: _pericias,
      dataCriacao: Timestamp.fromDate(this.converterData(dataCriacao)),
    };

    return new PersonagemFirestore(dadosPersonagem);
  }

  static toJson(personagem: Personagem | PersonagemFirestore): PersonagemJson {
    const {
      dataCriacao, 
      atributos, 
      pericias
    } = personagem;

    const _atributos = {
      car: QuantificadorParser.toJson(atributos.car),
      con: QuantificadorParser.toJson(atributos.con),
      des: QuantificadorParser.toJson(atributos.des),
      for: QuantificadorParser.toJson(atributos.for),
      int: QuantificadorParser.toJson(atributos.int),
      sab: QuantificadorParser.toJson(atributos.sab)
    };

    const _pericias = {
      acrobacia: QuantificadorPericiaParser.toJson(pericias.acrobacia),
      adestramento: QuantificadorPericiaParser.toJson(pericias.adestramento),
      atletismo: QuantificadorPericiaParser.toJson(pericias.atletismo),
      atuacao: QuantificadorPericiaParser.toJson(pericias.atuacao),
      cavalgar: QuantificadorPericiaParser.toJson(pericias.cavalgar),
      conhecimento: QuantificadorPericiaParser.toJson(pericias.conhecimento),
      cura: QuantificadorPericiaParser.toJson(pericias.cura),
      diplomacia: QuantificadorPericiaParser.toJson(pericias.diplomacia),
      enganacao: QuantificadorPericiaParser.toJson(pericias.enganacao),
      fortitude: QuantificadorPericiaParser.toJson(pericias.fortitude),
      guerra: QuantificadorPericiaParser.toJson(pericias.guerra),
      iniciativa: QuantificadorPericiaParser.toJson(pericias.iniciativa),
      intimidacao: QuantificadorPericiaParser.toJson(pericias.intimidacao),
      intuicao: QuantificadorPericiaParser.toJson(pericias.intuicao),
      investigacao: QuantificadorPericiaParser.toJson(pericias.investigacao),
      jogatina: QuantificadorPericiaParser.toJson(pericias.jogatina),
      ladinagem: QuantificadorPericiaParser.toJson(pericias.ladinagem),
      luta: QuantificadorPericiaParser.toJson(pericias.luta),
      misticismo: QuantificadorPericiaParser.toJson(pericias.misticismo),
      nobreza: QuantificadorPericiaParser.toJson(pericias.nobreza),
      oficio: [
        QuantificadorPericiaParser.toJson(pericias.oficio[0]), 
        QuantificadorPericiaParser.toJson(pericias.oficio[1])
      ],
      percepcao: QuantificadorPericiaParser.toJson(pericias.percepcao),
      pilotagem: QuantificadorPericiaParser.toJson(pericias.pilotagem),
      pontaria: QuantificadorPericiaParser.toJson(pericias.pontaria),
      reflexos: QuantificadorPericiaParser.toJson(pericias.reflexos),
      religiao: QuantificadorPericiaParser.toJson(pericias.religiao),
      sobrevivencia: QuantificadorPericiaParser.toJson(pericias.sobrevivencia),
      vontade: QuantificadorPericiaParser.toJson(pericias.vontade)
    };

    const dadosPersonagem: PersonagemJson = {
      ...personagem,
      atributos: _atributos,
      pericias: _pericias,
      dataCriacao: this.converterData(dataCriacao).toISOString(),
    };

    return new PersonagemJson(dadosPersonagem);
  }
}
