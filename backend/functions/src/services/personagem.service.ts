import {BuscarPersonagemJogador, GerarBufferImagemPersonagem} from "../models/contracts/services/personagem-service.contract";
import {PersonagemFirestore} from "../models/firestore/personagem-firestore";
import {DatabaseService} from "./database.service";
import { StorageService } from "./storage.service";

export abstract class PersonagemService {
  // -----------------------------------------------------------------------------------------------------
  // @ Métodos públicos
  // -----------------------------------------------------------------------------------------------------

  static async buscarPersonagemJogador({userId}: BuscarPersonagemJogador): Promise<PersonagemFirestore | undefined> {
    const collectionsPath = ["usuarios", userId, "personagens"];
    const limiteBusca = 1;

    const personagemFirestore = (await DatabaseService.buscarDocsColecao<PersonagemFirestore[]>(collectionsPath, limiteBusca))[0];
    return personagemFirestore;
  }

  static async gerarBufferImagemPersonagem({userId, personagemId}: GerarBufferImagemPersonagem): Promise<Buffer | undefined> {
    const filePath = `usuarios/${userId}/imagens_personagem/${personagemId}.png`;
    const buffer = await StorageService.buscarBufferArquivo(filePath);
    return buffer;
  }
}
