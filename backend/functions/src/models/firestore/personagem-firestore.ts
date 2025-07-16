import { Timestamp } from 'firebase-admin/firestore';
import { InformacoesPersonagem, PersonagemBase } from '../personagem';

export class PersonagemFirestore implements PersonagemBase {
    dataCriacao: Timestamp;
    excluido: boolean;
    informacoes: InformacoesPersonagem;

    constructor(
        informacoesPersonagem: InformacoesPersonagem, 
        personagem?: Partial<Omit<PersonagemFirestore, 'informacoes'>>
    ) {
        const { dataCriacao, excluido } = personagem || {};

        this.informacoes = informacoesPersonagem;

        this.dataCriacao = dataCriacao ?? Timestamp.fromDate(new Date());
        this.excluido = excluido ?? false;
    }
}