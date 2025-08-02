import { AlcanceAtaque, TipoAtaque, TipoDano } from '../models/entities/ataque';
import { AlcanceMagia, CirculoMagia, DuracaoMagia, EscolaMagia, ExecucaoMagia, TipoResistencia } from '../models/entities/magia';
import { ClassePersonagem, Pericia, Pericias } from '../models/entities/personagem';
import { TipoModificador } from '../models/entities/quantificador';

export const AlcanceAtaqueLabel: Record<AlcanceAtaque, string> = {
    [AlcanceAtaque.TOQUE]: 'Toque',
    [AlcanceAtaque.CURTO]: 'Curto',
    [AlcanceAtaque.MEDIO]: 'Médio',
    [AlcanceAtaque.LONGO]: 'Longo',
};

export const AlcanceMagiaLabel: Record<AlcanceMagia, string> = {
    [AlcanceMagia.PESSOAL]: 'Pessoal',
    [AlcanceMagia.TOQUE]: 'Toque',
    [AlcanceMagia.CURTO]: 'Curto',
    [AlcanceMagia.MEDIO]: 'Médio',
    [AlcanceMagia.LONGO]: 'Longo',
    [AlcanceMagia.ILIMITADO]: 'Ilimitado',
};

export const CirculoMagiaLabel: Record<CirculoMagia, string> = {
  [CirculoMagia.PRIMEIRO_CIRCULO]: '1º Círculo',
  [CirculoMagia.SEGUNDO_CIRCULO]: '2º Círculo',
  [CirculoMagia.TERCEIRO_CIRCULO]: '3º Círculo',
  [CirculoMagia.QUARTO_CIRCULO]: '4º Círculo',
  [CirculoMagia.QUINTO_CIRCULO]: '5º Círculo'
}

export const ClassePersonagemLabel: Record<ClassePersonagem, string> = {
    [ClassePersonagem.BARBARO]: 'Bárbaro',
    [ClassePersonagem.BARDO]: 'Bardo',
    [ClassePersonagem.BUCANEIRO]: 'Bucaneiro',
    [ClassePersonagem.BRUXO]: 'Bruxo',
    [ClassePersonagem.CACADOR]: 'Caçador',
    [ClassePersonagem.CAVALEIRO]: 'Cavaleiro',
    [ClassePersonagem.DRUIDA]: 'Druida',
    [ClassePersonagem.FEITICEIRO]: 'Feiticeiro',
    [ClassePersonagem.GUERREIRO]: 'Guerreiro',
    [ClassePersonagem.INVENTOR]: 'Inventor',
    [ClassePersonagem.LADINO]: 'Ladino',
    [ClassePersonagem.LUTADOR]: 'Lutador',
    [ClassePersonagem.MAGO]: 'Mago',
    [ClassePersonagem.NOBRE]: 'Nobre',
    [ClassePersonagem.PALADINO]: 'Paladino',
};

export const DuracaoMagiaLabel: Record<DuracaoMagia, string> = {
    [DuracaoMagia.INSTANTANEA]: 'Instantânea',
    [DuracaoMagia.CENA]: 'Cena',
    [DuracaoMagia.SUSTENTADA]: 'Sustentada',
    [DuracaoMagia.DEFINIDA]: 'Definida',
    [DuracaoMagia.PERMANENTE]: 'Permanente'
};

export const EscolaMagiaLabel: Record<EscolaMagia, string> = {
    [EscolaMagia.ABJURACAO]: 'Abjuração',
    [EscolaMagia.ADVINHACAO]: 'Advinhação',
    [EscolaMagia.CONVOCACAO]: 'Convocação',
    [EscolaMagia.ENCANTAMENTO]: 'Encantamento',
    [EscolaMagia.EVOCACAO]: 'Evocação',
    [EscolaMagia.ILUSAO]: 'Ilusão',
    [EscolaMagia.NECROMANCIA]: 'Necromancia',
    [EscolaMagia.TRANSMUTACAO]: 'Transmutação',
};

export const ExecucaoMagiaLabel: Record<ExecucaoMagia, string> = {
    [ExecucaoMagia.ACAO_COMPLETA]: 'Ação Completa',
    [ExecucaoMagia.ACAO_PADRAO]: 'Ação Padrão',
    [ExecucaoMagia.ACAO_LIVRE]: 'Ação Livre',
    [ExecucaoMagia.REACAO]: 'Reação',
};

export const PericiaLabel: Record<Pericia, string> = {
    [Pericia.ACROBACIA]: 'Acrobacia',
    [Pericia.ADESTRAMENTO]: 'Adestramento',
    [Pericia.ATLETISMO]: 'Atletismo',
    [Pericia.ATUACAO]: 'Atuação',
    [Pericia.CAVALGAR]: 'Cavalgar',
    [Pericia.CONHECIMENTO]: 'Conhecimento',
    [Pericia.CURA]: 'Cura',
    [Pericia.DIPLOMACIA]: 'Diplomacia',
    [Pericia.ENGANACAO]: 'Enganação',
    [Pericia.FORTITUDE]: 'Fortitude',
    [Pericia.GUERRA]: 'Guerra',
    [Pericia.INICIATIVA]: 'Iniciativa',
    [Pericia.INTIMIDACAO]: 'Intimidação',
    [Pericia.INTUICAO]: 'Intuição',
    [Pericia.INVESTIGACAO]: 'Investigação',
    [Pericia.JOGATINA]: 'Jogatina',
    [Pericia.LADINAGEM]: 'Ladinagem',
    [Pericia.LUTA]: 'Luta',
    [Pericia.MISTICISMO]: 'Misticismo',
    [Pericia.NOBREZA]: 'Nobreza',
    [Pericia.OFICIO]: 'Ofício',
    [Pericia.PERCEPCAO]: 'Percepção',
    [Pericia.PILOTAGEM]: 'Pilotagem',
    [Pericia.PONTARIA]: 'Pontaria',
    [Pericia.REFLEXOS]: 'Reflexos',
    [Pericia.RELIGIAO]: 'Religião',
    [Pericia.SOBREVIVENCIA]: 'Sobrevivência',
    [Pericia.VONTADE]: 'Vontade',
};

export const PericiaKeyLabel: Record<keyof Pericias, string> = {
    acrobacia: 'Acrobacia',
    adestramento: 'Adestramento',
    atletismo: 'Atletismo',
    atuacao: 'Atuação',
    cavalgar: 'Cavalgar',
    conhecimento: 'Conhecimento',
    cura: 'Cura',
    diplomacia: 'Diplomacia',
    enganacao: 'Enganação',
    fortitude: 'Fortitude',
    guerra: 'Guerra',
    iniciativa: 'Iniciativa',
    intimidacao: 'Intimidação',
    intuicao: 'Intuição',
    investigacao: 'Investigação',
    jogatina: 'Jogatina',
    ladinagem: 'Ladinagem',
    luta: 'Luta',
    misticismo: 'Misticismo',
    nobreza: 'Nobreza',
    oficio: 'Ofício',
    percepcao: 'Percepção',
    pilotagem: 'Pilotagem',
    pontaria: 'Pontaria',
    reflexos: 'Reflexos',
    religiao: 'Religião',
    sobrevivencia: 'Sobrevivência',
    vontade: 'Vontade',
};

export const TipoAtaqueLabel: Record<TipoAtaque, string> = {
    [TipoAtaque.ATAQUE_A_DISTANCIA]: 'Ataque à Distância',
    [TipoAtaque.CORPO_A_CORPO]: 'Corpo a Corpo',
    [TipoAtaque.EFEITO]: 'Efeito',
};

export const TipoDanoLabel: Record<TipoDano, string> = {
    [TipoDano.ACIDO]: 'Ácido',
    [TipoDano.CORTE]: 'Corte',
    [TipoDano.ELETRICIDADE]: 'Eletricidade',
    [TipoDano.ESSENCIA]: 'Essência',
    [TipoDano.FOGO]: 'Fogo',
    [TipoDano.FRIO]: 'Frio',
    [TipoDano.IMPACTO]: 'Impacto',
    [TipoDano.LUZ]: 'Luz',
    [TipoDano.PERFURACAO]: 'Perfuração',
    [TipoDano.PSIQUICO]: 'Psíquico',
    [TipoDano.TREVAS]: 'Trevas',
};

export const TipoModificadorLabel: Record<TipoModificador, string> = {
    [TipoModificador.BONUS_LINHAGEM]: 'Linhagem',
    [TipoModificador.BONUS_NIVEL]: 'Nível',
    [TipoModificador.BONUS_PODER]: 'Poder',
    [TipoModificador.CONDICAO]: 'Condição',
    [TipoModificador.EFEITO]: 'Efeito',
    [TipoModificador.VALOR_BASE]: 'Valor Base',
    [TipoModificador.TREINAMENTO]: 'Treinamento',
    [TipoModificador.EQUIPAMENTO_MAO_ESQUERDA]: 'Equipamento',
    [TipoModificador.EQUIPAMENTO_MAO_DIREITA]: 'Equipamento',
    [TipoModificador.VESTIMENTA_1]: 'Vestimenta',
    [TipoModificador.VESTIMENTA_2]: 'Vestimenta',
    [TipoModificador.VESTIMENTA_3]: 'Vestimenta',
    [TipoModificador.VESTIMENTA_4]: 'Vestimenta',
    [TipoModificador.NIVEL_1]: 'Nível 1',
    [TipoModificador.NIVEL_2]: 'Nível 2',
    [TipoModificador.NIVEL_3]: 'Nível 3',
    [TipoModificador.NIVEL_4]: 'Nível 4',
    [TipoModificador.NIVEL_5]: 'Nível 5',
    [TipoModificador.NIVEL_6]: 'Nível 6',
    [TipoModificador.NIVEL_7]: 'Nível 7',
    [TipoModificador.NIVEL_8]: 'Nível 8',
    [TipoModificador.NIVEL_9]: 'Nível 9',
    [TipoModificador.NIVEL_10]: 'Nível 10',
    [TipoModificador.NIVEL_11]: 'Nível 11',
    [TipoModificador.NIVEL_12]: 'Nível 12',
    [TipoModificador.NIVEL_13]: 'Nível 13',
    [TipoModificador.NIVEL_14]: 'Nível 14',
    [TipoModificador.NIVEL_15]: 'Nível 15',
    [TipoModificador.NIVEL_16]: 'Nível 16',
    [TipoModificador.NIVEL_17]: 'Nível 17',
    [TipoModificador.NIVEL_18]: 'Nível 18',
    [TipoModificador.NIVEL_19]: 'Nível 19',
    [TipoModificador.NIVEL_20]: 'Nível 20',
};

export const TipoResistenciaLabel: Record<TipoResistencia, string> = {
  [TipoResistencia.ANULA]: 'anula',
  [TipoResistencia.PARCIAL]: 'parcial',
  [TipoResistencia.REDUZ_A_METADE]: 'reduz à metade',
  [TipoResistencia.DESACREDITA]: 'desacredita'
}
