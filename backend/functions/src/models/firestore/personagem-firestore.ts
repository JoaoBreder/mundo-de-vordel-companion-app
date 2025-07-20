import {Timestamp} from "firebase-admin/firestore";
import {InformacoesPersonagem, PersonagemBase} from "../personagem";

export class PersonagemFirestore implements PersonagemBase {
  _id: string | null;

  dataCriacao: Timestamp;
  excluido: boolean;

  informacoes: InformacoesPersonagem;

  constructor(
    informacoesPersonagem: InformacoesPersonagem,
    personagem?: Partial<Omit<PersonagemFirestore, "informacoes">>
  ) {
    const {_id, dataCriacao, excluido} = personagem || {};

    this._id = _id ?? null;

    this.informacoes = informacoesPersonagem;

    this.dataCriacao = dataCriacao ?? Timestamp.fromDate(new Date());
    this.excluido = excluido ?? false;
  }
}
