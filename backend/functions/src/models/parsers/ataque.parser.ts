import { Timestamp } from "firebase-admin/firestore";
import { AtaqueArma, AtaqueEfeito } from "../ataque";
import { AtaqueArmaFirestore, AtaqueEfeitoFirestore } from "../firestore/ataque-firestore";
import { AtaqueArmaJson, AtaqueEfeitoJson } from "../json/ataque-json";
import { Quantificador } from "../quantificador";

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

        if (ataque instanceof AtaqueArmaFirestore || ataque instanceof AtaqueArmaJson)
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

        if (ataque instanceof AtaqueArmaFirestore || ataque instanceof AtaqueArmaJson)
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

        if (ataque instanceof AtaqueArmaFirestore || ataque instanceof AtaqueArmaJson)
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