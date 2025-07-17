import { FunctionsErrorCode, HttpsError } from "firebase-functions/v2/https";

export class HttpsErrorMiddleware {
    private readonly code: FunctionsErrorCode;

    constructor(code: FunctionsErrorCode) {
        this.code = code;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos públicos
    // -----------------------------------------------------------------------------------------------------

    get(): HttpsError {
        let mensagem = '';
        let detalhes = null;

        switch (this.code) {
            case 'permission-denied':
                mensagem = 'Acesso não permitido';
                detalhes = 'Autenticação inválida';
                break;
        
            default:
                mensagem = 'Erro interno';
                break;
        }

        return new HttpsError(this.code, mensagem, detalhes);
    }
}