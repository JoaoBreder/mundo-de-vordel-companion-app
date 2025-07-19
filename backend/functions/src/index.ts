import {onCall} from "firebase-functions/v2/https";
import {PersonagemController} from "./controllers/personagem.controller";
import {AuthCheckMiddleware} from "./middlewares/auth.middleware";
import {OnCallBuscarPersonagemJogadorResponse} from "./models/contracts/controllers/personagem-controller.contract";
import {initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";
import {DatabaseService} from "./services/database.service";


const firebaseAppAdmin = initializeApp();
const firestore = getFirestore(firebaseAppAdmin);

DatabaseService.firestoreInstance = firestore;


// -----------------------------------------------------------------------------------------------------
// @ Funções onCall
// -----------------------------------------------------------------------------------------------------

export const onCallBuscarPersonagemJogador = onCall(async ({data, auth}): Promise<OnCallBuscarPersonagemJogadorResponse> => {
  const next = async (uid: string) => await (new PersonagemController(uid)).buscarPersonagemJogador();
  return new AuthCheckMiddleware(auth, next).verificarIdToken();
});
