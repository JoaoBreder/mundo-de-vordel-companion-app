export interface QuantificadorBase {
    valorTotal: number;
    modificadores: Modificador[];
    modificadoresTemporarios: Modificador[];
}

export class Quantificador implements QuantificadorBase {
    private _valorTotal: number;
    private _modificadores: Map<TipoModificador, Modificador>;
    private _modificadoresTemporarios: Map<TipoModificador, Modificador>;

    constructor(quantificador?: Partial<Quantificador>) {
        const { valorTotal, modificadores, modificadoresTemporarios } = quantificador || {};

        this._valorTotal = valorTotal ?? 0;

        this._modificadores = new Map<TipoModificador, Modificador>();
        this._modificadoresTemporarios = new Map<TipoModificador, Modificador>();

        modificadores?.forEach(modificador => this._modificadores.set(modificador.tipo, modificador));
        modificadoresTemporarios?.forEach(modificadorTemporario => this._modificadoresTemporarios.set(modificadorTemporario.tipo, modificadorTemporario));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos privados
    // -----------------------------------------------------------------------------------------------------

    private calcularValorTotal(): number {
        let valorTotal = 0;

        this.modificadores.forEach(modificador => (valorTotal += modificador.valor));

        // TODO: Ver uma forma de no futuro tratar modificadores temporários que ficam de forma separada
        this.modificadoresTemporarios.forEach(modificadorTemporario => (valorTotal += modificadorTemporario.valor));

        return valorTotal;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos públicos
    // -----------------------------------------------------------------------------------------------------

    adicionarModificador(modificador: Modificador, temporario = false): void {
        temporario ? this._modificadores.set(modificador.tipo, modificador) : this._modificadoresTemporarios.set(modificador.tipo, modificador);
        this._valorTotal = this.calcularValorTotal();
    }

    removerModificador(modificador: Modificador, temporario = false): void {
        temporario ? this._modificadores.delete(modificador.tipo) : this._modificadoresTemporarios.delete(modificador.tipo);
        this._valorTotal = this.calcularValorTotal();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Getters
    // -----------------------------------------------------------------------------------------------------

    get valorTotal(): number {
        return this._valorTotal;
    }

    get modificadores(): Modificador[] {
        return Array.from(this.modificadores.values());
    }

    get modificadoresTemporarios(): Modificador[] {
        return Array.from(this.modificadoresTemporarios.values());
    }
}

export class QuantificadorPericia extends Quantificador {
    descricao: string | null;
    treinado: boolean;

    constructor(quantificador?: Partial<QuantificadorPericia>) {
        super(quantificador);

        const { descricao, treinado } = quantificador || {};

        this.descricao = descricao ?? '';
        this.treinado = treinado ?? false;
    }
}

export class QuantificadorVariavel extends Quantificador {
    private _valorAtual: number;

    constructor(quantificador?: Partial<QuantificadorVariavel>) {
        super(quantificador);

        const { valorAtual, valorTotal } = quantificador || {};

        this._valorAtual = valorAtual ?? valorTotal ?? 0;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos públicos
    // -----------------------------------------------------------------------------------------------------

    modificarValorAtual(valor: number, operacao: OperacaoModificarValor): void {
        if (operacao === OperacaoModificarValor.SOMAR) this._valorAtual += valor;
        if (operacao === OperacaoModificarValor.SOMAR) this._valorAtual -= valor;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Getters
    // -----------------------------------------------------------------------------------------------------

    get valorAtual(): number {
        return this._valorAtual;
    }
}

export interface Modificador {
    tipo: TipoModificador;
    valor: number;
}

export enum OperacaoModificarValor {
    SOMAR = 'SOMAR',
    SUBTRAIR = 'SUBTRAIR',
}

export enum TipoModificador {
    BONUS_LINHAGEM = 'BONUS_LINHAGEM',
    BONUS_NIVEL = 'BONUS_NIVEL',
    BONUS_PODER = 'BONUS_PODER',
    CONDICAO = 'CONDICAO',
    EFEITO = 'EFEITO',
    VALOR_BASE = 'VALOR_BASE',
    TREINAMENTO = 'TREINAMENTO',

    EQUIPAMENTO_MAO_ESQUERDA = 'EQUIPAMENTO_MAO_ESQUERDA',
    EQUIPAMENTO_MAO_DIREITA = 'EQUIPAMENTO_MAO_DIREITA',

    VESTIMENTA_1 = 'VESTIMENTA_1',
    VESTIMENTA_2 = 'VESTIMENTA_2',
    VESTIMENTA_3 = 'VESTIMENTA_3',
    VESTIMENTA_4 = 'VESTIMENTA_4',

    NIVEL_1 = 'NIVEL_1',
    NIVEL_2 = 'NIVEL_2',
    NIVEL_3 = 'NIVEL_3',
    NIVEL_4 = 'NIVEL_4',
    NIVEL_5 = 'NIVEL_5',
    NIVEL_6 = 'NIVEL_6',
    NIVEL_7 = 'NIVEL_7',
    NIVEL_8 = 'NIVEL_8',
    NIVEL_9 = 'NIVEL_9',
    NIVEL_10 = 'NIVEL_10',
    NIVEL_11 = 'NIVEL_11',
    NIVEL_12 = 'NIVEL_12',
    NIVEL_13 = 'NIVEL_13',
    NIVEL_14 = 'NIVEL_14',
    NIVEL_15 = 'NIVEL_15',
    NIVEL_16 = 'NIVEL_16',
    NIVEL_17 = 'NIVEL_17',
    NIVEL_18 = 'NIVEL_18',
    NIVEL_19 = 'NIVEL_19',
    NIVEL_20 = 'NIVEL_20',
}
