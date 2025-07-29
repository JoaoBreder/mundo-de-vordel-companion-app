import {HttpsError} from "firebase-functions/v2/https";
import {HttpsErrorMiddleware} from "../middlewares/httpsError.middleware";
import {PersonagemService} from "../services/personagem.service";
import {BasicController} from "./basic.controller";
import {PersonagemParser} from "../models/parsers/personagem.parser";

import {
  OnCallBuscarAtaquesPersonagemRequest, 
  OnCallBuscarAtaquesPersonagemResponse, 
  OnCallBuscarPersonagemJogadorResponse, 
  OnCallGerarBufferImagemPersonagemRequest, 
  OnCallGerarBufferImagemPersonagemResponse
} from "../models/contracts/personagem-controller.contract";
import { AtaqueParser } from "../models/parsers/ataque.parser";

export class PersonagemController extends BasicController {
  // -----------------------------------------------------------------------------------------------------
  // @ Métodos públicos
  // -----------------------------------------------------------------------------------------------------

  async buscarAtaquesPersonagem(requestData: OnCallBuscarAtaquesPersonagemRequest): Promise<OnCallBuscarAtaquesPersonagemResponse> {
    try {
      const ataques = await PersonagemService.buscarAtaquesPersonagem(this.uid, requestData);

      return {
        ataques: ataques.map((ataque) => AtaqueParser.toJson(ataque)), 
        quantidade: ataques.length
      };
    } catch (error: HttpsError | Error | any) {
      throw this.retornarErroController(error);
    }
  }

  async buscarPersonagemJogador(): Promise<OnCallBuscarPersonagemJogadorResponse> {
    try {
      const personagemFirestore = await PersonagemService.buscarPersonagemJogador(this.uid);

      if (!personagemFirestore) throw new HttpsErrorMiddleware("not-found", "Personagem jogador não existe").get();
      return {personagemJogador: PersonagemParser.toJson(personagemFirestore)};
    } catch (error: HttpsError | Error | any) {
      throw this.retornarErroController(error);
    }
  }

  async gerarBufferImagemPersonagem(requestData: OnCallGerarBufferImagemPersonagemRequest): Promise<OnCallGerarBufferImagemPersonagemResponse> {
    try {
      const buffer = await PersonagemService.gerarBufferImagemPersonagem(this.uid, requestData);

      if (!buffer) throw new HttpsErrorMiddleware("not-found", "Imagem do personagem não encontrada").get();
      return {base64: buffer.toString('base64')};
    } catch (error: HttpsError | Error | any) {
      throw this.retornarErroController(error);
    }
  }
}
