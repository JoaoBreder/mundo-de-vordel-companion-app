import { FunctionsErrorCode, HttpsError } from "firebase-functions/v2/https";

export class HttpsErrorMiddleware {
    private readonly code: FunctionsErrorCode;
    private readonly mensagem?: string;

    constructor(code: FunctionsErrorCode, mensagem?: string) {
        this.code = code;
        this.mensagem = mensagem;
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
        
            case 'internal':
                mensagem = 'Erro interno';
                break;
        }

        return new HttpsError(this.code, this.mensagem ?? mensagem, detalhes);
    }
}