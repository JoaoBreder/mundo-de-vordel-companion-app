import { Timestamp } from "firebase-admin/firestore";
import { PersonagemFirestore } from "../firestore/personagem-firestore";
import { Personagem } from "../personagem";

export abstract class PersonagemParser {
    static fromFirestore(personagemFirestore: PersonagemFirestore): Personagem {
        const { dataCriacao, informacoes } = personagemFirestore;

        const dadosPersonagem: Omit<Personagem, 'informacoes'> = {
            ...personagemFirestore,
            dataCriacao: dataCriacao.toDate()
        };

        return new Personagem(informacoes, dadosPersonagem);
    }

    static toFirestore(personagem: Personagem): PersonagemFirestore {
        const { dataCriacao, informacoes } = personagem;

        const dadosPersonagem: Omit<PersonagemFirestore, 'informacoes'> = {
            ...personagem,
            dataCriacao: Timestamp.fromDate(dataCriacao)
        };

        return new PersonagemFirestore(informacoes, dadosPersonagem);
    }
}