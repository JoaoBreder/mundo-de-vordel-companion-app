import {HttpsError} from "firebase-functions/v2/https";
import {HttpsErrorMiddleware} from "../middlewares/httpsError.middleware";
import {BasicController} from "./basic.controller";
import {PersonagemService} from "../services/personagem.service";

import { AtaqueParser } from "../models/parsers/ataque.parser";
import { MagiaParser } from "../models/parsers/magia.parser";
import { PersonagemParser } from "../models/parsers/personagem.parser";

import {
  OnCallBuscarAtaquesPersonagemRequest, 
  OnCallBuscarAtaquesPersonagemResponse, 
  OnCallBuscarMagiasPersonagemRequest, 
  OnCallBuscarMagiasPersonagemResponse, 
  OnCallBuscarPersonagemJogadorResponse, 
  OnCallGerarBufferImagemPersonagemRequest, 
  OnCallGerarBufferImagemPersonagemResponse
} from "../models/contracts/personagem-controller.contract";
import { CirculoMagia } from "../models/entities/magia";
import { MagiaJson } from "../models/json/magia-json";

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

  async buscarMagiasPersonagem(requestData: OnCallBuscarMagiasPersonagemRequest): Promise<OnCallBuscarMagiasPersonagemResponse> {
    try {
      const magias = await PersonagemService.buscarMagiasPersonagem(this.uid, requestData);

      const magiasResponse: Record<CirculoMagia, MagiaJson[]> = {
        [CirculoMagia.PRIMEIRO_CIRCULO]: [],
        [CirculoMagia.SEGUNDO_CIRCULO]: [],
        [CirculoMagia.TERCEIRO_CIRCULO]: [],
        [CirculoMagia.QUARTO_CIRCULO]: [],
        [CirculoMagia.QUINTOIRCULO]: []
      };

      magias.forEach((magia) => magiasResponse[magia.circulo!].push(MagiaParser.toJson(magia)));

      return {
        magias: magiasResponse, 
        quantidade: magias.length
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
