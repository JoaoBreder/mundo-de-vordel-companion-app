import { QuantificadorFirestore, QuantificadorPericiaFirestore, QuantificadorVariavelFirestore } from "../firestore/quantificador-firestore";
import { Quantificador, QuantificadorPericia, QuantificadorVariavel } from "../quantificador";
import { QuantificadorJson, QuantificadorPericiaJson, QuantificadorVariavelJson } from "../json/quantificador-json";

export abstract class QuantificadorParser {
  static quantificador(quantificador: QuantificadorFirestore | QuantificadorJson): Quantificador {
    return new Quantificador(quantificador);
  }

  static toFirestore(quantificador: Quantificador | QuantificadorJson): QuantificadorFirestore {
    return new QuantificadorFirestore(quantificador);
  }

  static toJson(quantificador: Quantificador | QuantificadorFirestore): QuantificadorJson {
    return new QuantificadorJson(quantificador);
  }
}

export abstract class QuantificadorPericiaParser {
  static quantificadorPericia(quantificador: QuantificadorPericiaFirestore | QuantificadorPericiaJson): QuantificadorPericia {
    return new QuantificadorPericia(quantificador);
  }

  static toFirestore(quantificador: QuantificadorPericia | QuantificadorPericiaJson): QuantificadorPericiaFirestore {
    return new QuantificadorPericiaFirestore(quantificador);
  }

  static toJson(quantificador: QuantificadorPericia | QuantificadorPericiaFirestore): QuantificadorPericiaJson {
    return new QuantificadorPericiaJson(quantificador);
  }
}

export abstract class QuantificadorVariavelParser {
  static quantificadorVariavel(quantificador: QuantificadorVariavelFirestore | QuantificadorVariavelJson): QuantificadorVariavel {
    return new QuantificadorVariavel(quantificador);
  }

  static toFirestore(quantificador: QuantificadorVariavel | QuantificadorVariavelJson): QuantificadorVariavelFirestore {
    return new QuantificadorVariavelFirestore(quantificador);
  }

  static toJson(quantificador: QuantificadorVariavel | QuantificadorVariavelFirestore): QuantificadorVariavelJson {
    return new QuantificadorVariavelJson(quantificador);
  }
}