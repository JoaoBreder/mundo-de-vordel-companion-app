import { OnCallBuscarAtaquesPersonagemRequest, OnCallGerarBufferImagemPersonagemRequest } from "../models/contracts/personagem-controller.contract";
import { AtaqueArmaFirestore, AtaqueEfeitoFirestore } from "../models/firestore/ataque-firestore";
import {PersonagemFirestore} from "../models/firestore/personagem-firestore";
import {DatabaseService} from "./database.service";
import { StorageService } from "./storage.service";

export abstract class PersonagemService {
  // -----------------------------------------------------------------------------------------------------
  // @ Métodos públicos
  // -----------------------------------------------------------------------------------------------------

  static async buscarAtaquesPersonagem(
    userId: string, 
    {personagemId, orderBy, filter}: OnCallBuscarAtaquesPersonagemRequest
  ): Promise<(AtaqueArmaFirestore | AtaqueEfeitoFirestore)[]> {
    const collectionsPath = ["usuarios", userId, "personagens", personagemId, "ataques"];
    const ataquesFirestore = (await DatabaseService.buscarDocsColecao<(AtaqueArmaFirestore | AtaqueEfeitoFirestore)[]>(collectionsPath, orderBy, filter));
    return ataquesFirestore;
  }

  static async buscarPersonagemJogador(userId: string): Promise<PersonagemFirestore | undefined> {
    const collectionsPath = ["usuarios", userId, "personagens"];
    const limiteBusca = 1;

    const personagemFirestore = (await DatabaseService.buscarDocsColecao<PersonagemFirestore[]>(collectionsPath, undefined, undefined, limiteBusca))[0];
    return personagemFirestore;
  }

  static async gerarBufferImagemPersonagem(userId: string, {personagemId}: OnCallGerarBufferImagemPersonagemRequest): Promise<Buffer | undefined> {
    const filePath = `usuarios/${userId}/imagens_personagem/${personagemId}.png`;
    const buffer = await StorageService.buscarBufferArquivo(filePath);
    return buffer;
  }
}
