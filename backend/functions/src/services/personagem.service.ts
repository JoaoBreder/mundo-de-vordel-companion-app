import { BuscarPersonagemJogador } from "../models/contracts/services/personagem-service.contract";
import { PersonagemFirestore } from "../models/firestore/personagem-firestore";
import { PersonagemParser } from "../models/parsers/personagem.parser";
import { Personagem } from "../models/personagem";
import { DatabaseService } from "./database.service";

export abstract class PersonagemService extends DatabaseService {
    // -----------------------------------------------------------------------------------------------------
    // @ Métodos públicos
    // -----------------------------------------------------------------------------------------------------

    static async buscarPersonagemJogador({ userId }: BuscarPersonagemJogador): Promise<Personagem | undefined> {
        const collectionsPath = ['usuarios', userId, 'personagens'];
        const limiteBusca = 1;
        
        const personagemFirestore = (await this.buscarDocsColecao<PersonagemFirestore[]>(collectionsPath, limiteBusca))[0];
        return personagemFirestore ? PersonagemParser.fromFirestore(personagemFirestore) : undefined;
    }
}