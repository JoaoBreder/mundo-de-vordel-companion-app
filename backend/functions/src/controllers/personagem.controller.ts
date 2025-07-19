import { HttpsError } from "firebase-functions/v2/https";
import { HttpsErrorMiddleware } from "../middlewares/httpsError.middleware";
import { OnCallBuscarPersonagemJogadorResponse } from "../models/contracts/controllers/personagem-controller.contract";
import { PersonagemService } from "../services/personagem.service";

export class PersonagemController {
    private uid: string;

    constructor(uid: string) {
        this.uid = uid;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos privados
    // -----------------------------------------------------------------------------------------------------

    private retornarErroController(error: HttpsError | Error | any): HttpsError {
        if (error instanceof HttpsError) return error;
        if (error instanceof Error) return new HttpsErrorMiddleware('internal', error.message).get();

        return new HttpsErrorMiddleware('internal').get();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos públicos
    // -----------------------------------------------------------------------------------------------------

    async buscarPersonagemJogador(): Promise<OnCallBuscarPersonagemJogadorResponse> {
        try {
            const personagemJogador = await PersonagemService.buscarPersonagemJogador({
                userId: this.uid
            });

            if (!personagemJogador) throw new HttpsErrorMiddleware('not-found', 'Personagem jogador não existe').get()
            return { personagemJogador };
        } catch(error: HttpsError | Error | any) { 
            throw this.retornarErroController(error) 
        }
    }
}