export interface PersonagemBase {
    _id: string | null;

    dataCriacao: any;
    excluido: boolean;

    informacoes: InformacoesPersonagem;
}

export class Personagem implements PersonagemBase {
  _id: string | null;

  dataCriacao: Date;
  excluido: boolean;

  informacoes: InformacoesPersonagem;

  constructor(
    informacoesPersonagem: InformacoesPersonagem,
    personagem?: Partial<Omit<Personagem, "informacoes">>
  ) {
    const {_id, dataCriacao, excluido} = personagem || {};

    this._id = _id ?? null;

    this.informacoes = informacoesPersonagem;

    this.dataCriacao = dataCriacao ?? new Date();
    this.excluido = excluido ?? false;
  }
}

export interface InformacoesPersonagem {
    classe: ClassePersonagem;
    linhagem: string;
    nivel: number;
    nome: string;
    origem: string;
}

export enum ClassePersonagem {
    BARBARO = "BARBARO",
    BARDO = "BARDO",
    BUCANEIRO = "BUCANEIRO",
    BRUXO = "BRUXO",
    CACADOR = "CACADOR",
    CAVALEIRO = "CAVALEIRO",
    DRUIDA = "DRUIDA",
    FEITICEIRO = "FEITICEIRO",
    GUERREIRO = "GUERREIRO",
    INVENTOR = "INVENTOR",
    LADINO = "LADINO",
    LUTADOR = "LUTADOR",
    MAGO = "MAGO",
    NOBRE = "NOBRE",
    PALADINO = "PALADINO"
}
