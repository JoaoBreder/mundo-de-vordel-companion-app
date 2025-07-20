import { InformacoesPersonagem, PersonagemBase } from '../personagem';

export class PersonagemJson implements PersonagemBase {
    _id: string | null;

    dataCriacao: string;
    excluido: boolean;

    informacoes: InformacoesPersonagem;

    constructor(informacoesPersonagem: InformacoesPersonagem, personagem?: Partial<Omit<PersonagemJson, 'informacoes'>>) {
        const { _id, dataCriacao, excluido } = personagem || {};

        this._id = _id ?? null;

        this.informacoes = informacoesPersonagem;

        this.dataCriacao = dataCriacao ?? new Date().toISOString();
        this.excluido = excluido ?? false;
    }
}
