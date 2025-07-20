import {HttpsError} from "firebase-functions/v2/https";
import {HttpsErrorMiddleware} from "../middlewares/httpsError.middleware";
import {PersonagemService} from "../services/personagem.service";
import {BasicController} from "./basic.controller";
import {PersonagemParser} from "../models/parsers/personagem.parser";

import {OnCallBuscarPersonagemJogadorResponse, OnCallGerarBufferImagemPersonagemRequest, OnCallGerarBufferImagemPersonagemResponse} from "../models/contracts/controllers/personagem-controller.contract";

export class PersonagemController extends BasicController {
  // -----------------------------------------------------------------------------------------------------
  // @ Métodos públicos
  // -----------------------------------------------------------------------------------------------------

  async buscarPersonagemJogador(): Promise<OnCallBuscarPersonagemJogadorResponse> {
    try {
      const personagemFirestore = await PersonagemService.buscarPersonagemJogador({
        userId: this.uid,
      });

      if (!personagemFirestore) throw new HttpsErrorMiddleware("not-found", "Personagem jogador não existe").get();
      return {personagemJogador: PersonagemParser.toJson(personagemFirestore)};
    } catch (error: HttpsError | Error | any) {
      throw this.retornarErroController(error);
    }
  }

  async gerarBufferImagemPersonagem({personagemId}: OnCallGerarBufferImagemPersonagemRequest): Promise<OnCallGerarBufferImagemPersonagemResponse> {
    try {
      const buffer = await PersonagemService.gerarBufferImagemPersonagem({
        userId: this.uid,
        personagemId: personagemId
      });

      if (!buffer) throw new HttpsErrorMiddleware("not-found", "Imagem do personagem não encontrada").get();
      return {base64: buffer.toString('base64')};
    } catch (error: HttpsError | Error | any) {
      throw this.retornarErroController(error);
    }
  }
}
