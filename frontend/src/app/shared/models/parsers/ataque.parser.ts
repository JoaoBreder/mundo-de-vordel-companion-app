import { Timestamp } from 'firebase/firestore';
import { AtaqueArma, AtaqueEfeito } from '../ataque';
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

        return new AtaqueEfeito({
            ...ataque,
            bonusAtaque: bonusAtaque ? new Quantificador(bonusAtaque) : null,
            bonusDano: bonusDano ? new Quantificador(bonusDano) : null,
            dataAtualizacao: dataAtualizacao ? this.converterData(dataAtualizacao) : null,
            dataCriacao: this.converterData(dataCriacao),
        });
    }

    static toJson(ataque: AtaqueArma | AtaqueEfeito): AtaqueArmaJson | AtaqueEfeitoJson {
        const { bonusAtaque, bonusDano, dataAtualizacao, dataCriacao } = ataque;

        return new AtaqueEfeitoJson({
            ...ataque,
            bonusAtaque: bonusAtaque ? new Quantificador(bonusAtaque) : null,
            bonusDano: bonusDano ? new Quantificador(bonusDano) : null,
            dataAtualizacao: dataAtualizacao ? this.converterData(dataAtualizacao).toISOString() : null,
            dataCriacao: this.converterData(dataCriacao).toISOString(),
        });
    }
}
