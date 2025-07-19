import {HttpsError} from "firebase-functions/v2/https";
import {HttpsErrorMiddleware} from "../middlewares/httpsError.middleware";

export class BasicController {
  public uid: string;

  constructor(uid: string) {
    this.uid = uid;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Métodos públicos
  // -----------------------------------------------------------------------------------------------------

  retornarErroController(error: HttpsError | Error | any): HttpsError {
    if (error instanceof HttpsError) return error;
    if (error instanceof Error) return new HttpsErrorMiddleware("internal", error.message).get();

    return new HttpsErrorMiddleware("internal").get();
  }
}
