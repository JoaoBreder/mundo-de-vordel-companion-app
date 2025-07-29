import { Timestamp } from 'firebase/firestore';
import { AtaqueArma, AtaqueEfeito, TipoAtaque } from '../ataque';
import { Quantificador } from '../quantificador';
import { AtaqueArmaJson, AtaqueEfeitoJson } from '../json/ataque-json';

export abstract class AtaqueParser {
    // -----------------------------------------------------------------------------------------------------
    // @ Métodos privados
    // -----------------------------------------------------------------------------------------------------

    private static converterData(data: string | Date | Timestamp): Date {
        if (typeof data === 'string') return new Date(data);
        if ((data as Timestamp)?.seconds !== undefined && (data as Timestamp)?.nanoseconds !== undefined) return (data as Timestamp).toDate();
        return data as Date;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos públicos
    // -----------------------------------------------------------------------------------------------------

    static ataque(ataque: AtaqueArmaJson | AtaqueEfeitoJson): AtaqueArma | AtaqueEfeito {
        const { bonusAtaque, bonusDano, dataAtualizacao, dataCriacao } = ataque;

        if (ataque.tipo === TipoAtaque.ATAQUE_A_DISTANCIA || ataque.tipo === TipoAtaque.CORPO_A_CORPO)
            return new AtaqueArma({
                ...ataque,
                bonusAtaque: bonusAtaque ? new Quantificador(bonusAtaque) : null,
                bonusDano: bonusDano ? new Quantificador(bonusDano) : null,
                dataAtualizacao: dataAtualizacao ? this.converterData(dataAtualizacao) : null,
                dataCriacao: this.converterData(dataCriacao)
            });

        return new AtaqueEfeito({
            ...ataque,
            bonusAtaque: bonusAtaque ? new Quantificador(bonusAtaque) : null,
            bonusDano: bonusDano ? new Quantificador(bonusDano) : null,
            dataAtualizacao: dataAtualizacao ? this.converterData(dataAtualizacao) : null,
            dataCriacao: this.converterData(dataCriacao),
        });
    }
}
