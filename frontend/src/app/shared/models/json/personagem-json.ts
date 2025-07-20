import {InformacoesPersonagem, PersonagemBase} from "../personagem";

export class PersonagemJson implements PersonagemBase {
  dataCriacao: string;
  excluido: boolean;
  fotoPersonagemPath: string;

  informacoes: InformacoesPersonagem;

  constructor(
    informacoesPersonagem: InformacoesPersonagem,
    personagem?: Partial<Omit<PersonagemJson, "informacoes">>
  ) {
    const {dataCriacao, excluido, fotoPersonagemPath} = personagem || {};

    this.informacoes = informacoesPersonagem;

    this.dataCriacao = dataCriacao ?? new Date().toISOString();
    this.excluido = excluido ?? false;
    this.fotoPersonagemPath = fotoPersonagemPath ?? "arquivos_plataforma/foto-padrao-personagem.png";
  }
}
