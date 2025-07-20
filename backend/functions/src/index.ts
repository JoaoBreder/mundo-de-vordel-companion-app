import {onCall} from "firebase-functions/v2/https";
import {PersonagemController} from "./controllers/personagem.controller";
import {AuthCheckMiddleware} from "./middlewares/auth.middleware";
import {OnCallBuscarPersonagemJogadorResponse, OnCallGerarBufferImagemPersonagemResponse} from "./models/contracts/controllers/personagem-controller.contract";
import {initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";
import {getStorage} from "firebase-admin/storage";
import {DatabaseService} from "./services/database.service";
import { StorageService } from "./services/storage.service";


const firebaseAppAdmin = initializeApp();
const firestore = getFirestore(firebaseAppAdmin);
const storage = getStorage(firebaseAppAdmin);

DatabaseService.firestoreInstance = firestore;
StorageService.storageInstance = storage;


// -----------------------------------------------------------------------------------------------------
// @ Funções onCall
// -----------------------------------------------------------------------------------------------------

export const onCallBuscarPersonagemJogador = onCall(async ({data, auth}): Promise<OnCallBuscarPersonagemJogadorResponse> => {
  const next = async (uid: string) => await (new PersonagemController(uid)).buscarPersonagemJogador();
  return new AuthCheckMiddleware(auth, next).verificarIdToken();
});

export const onCallGerarBufferImagemPersonagem = onCall(async ({data, auth}): Promise<OnCallGerarBufferImagemPersonagemResponse> => {
  const next = async (uid: string) => await (new PersonagemController(uid)).gerarBufferImagemPersonagem(data);
  return new AuthCheckMiddleware(auth, next).verificarIdToken();
});