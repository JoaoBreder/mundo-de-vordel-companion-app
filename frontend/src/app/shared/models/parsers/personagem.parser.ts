import { Personagem } from '../personagem';
import { PersonagemJson } from '../json/personagem-json';

export abstract class PersonagemParser {
    static fromJson(personagemJson: PersonagemJson): Personagem {
        const { dataCriacao, informacoes } = personagemJson;

        const dadosPersonagem: Omit<Personagem, 'informacoes'> = {
            ...personagemJson,
            dataCriacao: new Date(dataCriacao),
        };

        return new Personagem(informacoes, dadosPersonagem);
    }
}
