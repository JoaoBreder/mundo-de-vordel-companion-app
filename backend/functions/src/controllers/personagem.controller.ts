import {HttpsError} from "firebase-functions/v2/https";
import {HttpsErrorMiddleware} from "../middlewares/httpsError.middleware";
import {OnCallBuscarPersonagemJogadorResponse} from "../models/contracts/controllers/personagem-controller.contract";
import {PersonagemService} from "../services/personagem.service";
import {BasicController} from "./basic.controller";
import {PersonagemParser} from "../models/parsers/personagem.parser";

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
}
