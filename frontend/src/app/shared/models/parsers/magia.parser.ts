import { Magia } from "../entities/magia";
import { MagiaJson } from "../json/magia-json";


export abstract class MagiaParser {
    // -----------------------------------------------------------------------------------------------------
    // @ Métodos privados
    // -----------------------------------------------------------------------------------------------------

    private static converterData(data: string | Date): Date {
        if (typeof data === "string") return new Date(data);
        return data as Date;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos públicos
    // -----------------------------------------------------------------------------------------------------

    static magia(magia: MagiaJson): Magia {
        const {dataCriacao, dataAtualizacao} = magia;

        return new Magia({
            ...magia,
            dataAtualizacao: dataAtualizacao ? this.converterData(dataAtualizacao) : null,
            dataCriacao: this.converterData(dataCriacao)
        });
    }
}
