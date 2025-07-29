import { Timestamp } from "firebase-admin/firestore";
import { Magia } from "../magia";
import { MagiaFirestore } from "../firestore/magia-firestore";
import { MagiaJson } from "../json/magia-json";

export abstract class MagiaParser {
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

    static magia(magia: MagiaFirestore | MagiaJson): Magia {
        const {dataCriacao, dataAtualizacao} = magia;

        return new Magia({
            ...magia,
            dataAtualizacao: dataAtualizacao ? this.converterData(dataAtualizacao) : null,
            dataCriacao: this.converterData(dataCriacao)
        }); 
    }

    static toFirestore(magia: Magia | MagiaJson): MagiaFirestore {
        const {dataCriacao, dataAtualizacao} = magia;

        return new MagiaFirestore({
            ...magia,
            dataAtualizacao: dataAtualizacao ? Timestamp.fromDate(this.converterData(dataAtualizacao)) : null,
            dataCriacao: Timestamp.fromDate(this.converterData(dataCriacao))
        }); 
    }

    static toJson(magia: Magia | MagiaFirestore): MagiaJson {
        const {dataCriacao, dataAtualizacao} = magia;

        return new MagiaJson({
            ...magia,
            dataAtualizacao: dataAtualizacao ? this.converterData(dataAtualizacao).toISOString() : null,
            dataCriacao: this.converterData(dataCriacao).toISOString()
        }); 
    }
}