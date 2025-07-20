import { Quantificador, QuantificadorPericia, QuantificadorVariavel } from '../quantificador';
import { QuantificadorJson, QuantificadorPericiaJson, QuantificadorVariavelJson } from '../json/quantificador-json';

export abstract class QuantificadorParser {
    static quantificador(quantificador: QuantificadorJson): Quantificador {
        return new Quantificador(quantificador);
    }
}

export abstract class QuantificadorPericiaParser {
    static quantificadorPericia(quantificador: QuantificadorPericiaJson): QuantificadorPericia {
        return new QuantificadorPericia(quantificador);
    }
}

export abstract class QuantificadorVariavelParser {
    static quantificadorVariavel(quantificador: QuantificadorVariavelJson): QuantificadorVariavel {
        return new QuantificadorVariavel(quantificador);
    }
}
