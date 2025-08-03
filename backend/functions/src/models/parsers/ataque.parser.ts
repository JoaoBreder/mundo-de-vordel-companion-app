import { Timestamp } from "firebase-admin/firestore";
import { AtaqueArmaFirestore, AtaqueEfeitoFirestore } from "../firestore/ataque-firestore";
import { AtaqueArmaJson, AtaqueEfeitoJson } from "../json/ataque-json";
import { Quantificador } from "../entities/quantificador";
import { AtaqueArma, AtaqueEfeito, TipoAtaque } from "../entities/ataque";

export abstract class AtaqueParser {
    // -----------------------------------------------------------------------------------------------------
    // @ Métodos privados
    // -----------------------------------------------------------------------------------------------------

    private static converterData(data: string | Date | Timestamp): Date {
        if (typeof data === "string") return new Date(data);
        if ((data as Timestamp)?.seconds !== undefined && (data as Timestamp)?.nanoseconds !== undefined) return (data as Timestamp).toDate();
        return data as Date;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos públicos
    // -----------------------------------------------------------------------------------------------------

    static ataque(ataque: AtaqueArmaFirestore | AtaqueArmaJson | AtaqueEfeitoFirestore | AtaqueEfeitoJson): AtaqueArma | AtaqueEfeito {
        const {bonusAtaque, bonusDano, dataAtualizacao, dataCriacao} = ataque;

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
            dataCriacao: this.converterData(dataCriacao)
        }); 
    }

    static toFirestore(ataque: AtaqueArma | AtaqueArmaJson | AtaqueEfeito | AtaqueEfeitoJson): AtaqueArmaFirestore | AtaqueEfeitoFirestore {
        const {bonusAtaque, bonusDano, dataAtualizacao, dataCriacao} = ataque;

        if (ataque.tipo === TipoAtaque.ATAQUE_A_DISTANCIA || ataque.tipo === TipoAtaque.CORPO_A_CORPO)
            return new AtaqueArmaFirestore({
                ...ataque,
                bonusAtaque: bonusAtaque ? new Quantificador(bonusAtaque) : null,
                bonusDano: bonusDano ? new Quantificador(bonusDano) : null,
                dataAtualizacao: dataAtualizacao ? Timestamp.fromDate(this.converterData(dataAtualizacao)) : null,
                dataCriacao: Timestamp.fromDate(this.converterData(dataCriacao))
            });

        return new AtaqueEfeitoFirestore({
            ...ataque,
            bonusAtaque: bonusAtaque ? new Quantificador(bonusAtaque) : null,
            bonusDano: bonusDano ? new Quantificador(bonusDano) : null,
            dataAtualizacao: dataAtualizacao ? Timestamp.fromDate(this.converterData(dataAtualizacao)) : null,
            dataCriacao: Timestamp.fromDate(this.converterData(dataCriacao))
        }); 
    }

    static toJson(ataque: AtaqueArma | AtaqueArmaFirestore | AtaqueEfeito | AtaqueEfeitoFirestore): AtaqueArmaJson | AtaqueEfeitoJson {
        const {bonusAtaque, bonusDano, dataAtualizacao, dataCriacao} = ataque;

        if (ataque.tipo === TipoAtaque.ATAQUE_A_DISTANCIA || ataque.tipo === TipoAtaque.CORPO_A_CORPO)
            return new AtaqueArmaJson({
                ...ataque,
                bonusAtaque: bonusAtaque ? new Quantificador(bonusAtaque) : null,
                bonusDano: bonusDano ? new Quantificador(bonusDano) : null,
                dataAtualizacao: dataAtualizacao ? this.converterData(dataAtualizacao).toISOString() : null,
                dataCriacao: this.converterData(dataCriacao).toISOString()
            });

        return new AtaqueEfeitoJson({
            ...ataque,
            bonusAtaque: bonusAtaque ? new Quantificador(bonusAtaque) : null,
            bonusDano: bonusDano ? new Quantificador(bonusDano) : null,
            dataAtualizacao: dataAtualizacao ? this.converterData(dataAtualizacao).toISOString() : null,
            dataCriacao: this.converterData(dataCriacao).toISOString()
        }); 
    }
}