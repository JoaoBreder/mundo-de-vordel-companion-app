import {InformacoesPersonagem, PersonagemBase} from "../personagem";

export class PersonagemJson implements PersonagemBase {
  dataCriacao: string;
  excluido: boolean;
  informacoes: InformacoesPersonagem;

  constructor(
    informacoesPersonagem: InformacoesPersonagem,
    personagem?: Partial<Omit<PersonagemJson, "informacoes">>
  ) {
    const {dataCriacao, excluido} = personagem || {};

    this.informacoes = informacoesPersonagem;

    this.dataCriacao = dataCriacao ?? new Date().toISOString();
    this.excluido = excluido ?? false;
  }
}
