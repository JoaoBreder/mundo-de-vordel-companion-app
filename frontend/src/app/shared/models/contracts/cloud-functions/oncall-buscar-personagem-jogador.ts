import { PersonagemJson } from '../../json/personagem-json';

// TODO: Criar modelo de request da função de busca de personagem, quando for possível criar mais de um personagem por usuário
// export class OnCallBuscarPersonagemJogadorRequest {}

export interface OnCallBuscarPersonagemJogadorResponse {
    personagemJogador: PersonagemJson;
}
