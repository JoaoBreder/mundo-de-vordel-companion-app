import { QuantificadorFirestore } from "../firestore/quantificador-firestore";
import { Quantificador } from "../quantificador";
import { QuantificadorJson } from "../json/quantificador-json";

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
