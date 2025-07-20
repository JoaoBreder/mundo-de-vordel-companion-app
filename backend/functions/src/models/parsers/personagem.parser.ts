import {Timestamp} from "firebase-admin/firestore";
import {PersonagemFirestore} from "../firestore/personagem-firestore";
import {Personagem} from "../personagem";
import {PersonagemJson} from "../json/personagem-json";

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

  static fromFirestore(personagemFirestore: PersonagemFirestore): Personagem {
    const {dataCriacao, informacoes} = personagemFirestore;

    const dadosPersonagem: Omit<Personagem, "informacoes"> = {
      ...personagemFirestore,
      dataCriacao: this.converterData(dataCriacao),
    };

    return new Personagem(informacoes, dadosPersonagem);
  }

  static toFirestore(personagem: Personagem): PersonagemFirestore {
    const {dataCriacao, informacoes} = personagem;

    const dadosPersonagem: Omit<PersonagemFirestore, "informacoes"> = {
      ...personagem,
      dataCriacao: Timestamp.fromDate(dataCriacao),
    };

    return new PersonagemFirestore(informacoes, dadosPersonagem);
  }

  static toJson(personagem: Personagem | PersonagemFirestore): PersonagemJson {
    const {dataCriacao, informacoes} = personagem;

    const dadosPersonagem: Omit<PersonagemJson, "informacoes"> = {
      ...personagem,
      dataCriacao: this.converterData(dataCriacao).toISOString(),
    };

    return new PersonagemJson(informacoes, dadosPersonagem);
  }
}
