import {FunctionsErrorCode, HttpsError} from "firebase-functions/v2/https";

export class HttpsErrorMiddleware {
  private readonly code: FunctionsErrorCode;
  private readonly descricao?: string;

  constructor(code: FunctionsErrorCode, descricao?: string) {
    this.code = code;
    this.descricao = descricao;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Métodos públicos
  // -----------------------------------------------------------------------------------------------------

  get(): HttpsError {
    let mensagem = "";
    let detalhes = null;

    switch (this.code) {
    case "internal":
      mensagem = "Erro interno";
      break;

    case "permission-denied":
      mensagem = "Acesso não permitido";
      detalhes = "Autenticação inválida";
      break;

    case "not-found":
      mensagem = "Registro não encontrado";
      break;
    }

    return new HttpsError(this.code, mensagem, this.descricao ?? detalhes);
  }
}
