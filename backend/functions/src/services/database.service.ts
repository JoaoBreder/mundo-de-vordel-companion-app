import {CollectionReference, DocumentData, DocumentReference, Firestore, Query, QuerySnapshot} from "firebase-admin/firestore";


// Implementação provisória do DatabaseService para ver como vai se comportar
export abstract class DatabaseService {
  static firestore: Firestore;

  // -----------------------------------------------------------------------------------------------------
  // @ Métodos privados
  // -----------------------------------------------------------------------------------------------------

  private static async get(documentRef: Query<DocumentData> | DocumentReference): Promise<any> {
    const snapshot = await documentRef.get();

    if (snapshot instanceof QuerySnapshot) {
      if (snapshot.empty) return [];
      return snapshot.docs.map((doc) => ({ ...doc.data(), _id: doc.id}));
    }

    if (!snapshot.exists) return undefined;
    return {...snapshot.data(), _id: snapshot.id};
  }

  private static montarCollectionRef(collectionsPath: string[]): CollectionReference {
    return this.firestore.collection(`/${collectionsPath.join("/")}`);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Métodos públicos
  // -----------------------------------------------------------------------------------------------------

  static async buscarPorDocId<T>(docId: string, collectionsPath: string[]): Promise<T | undefined> {
    const collectionRef = this.montarCollectionRef(collectionsPath);
    return await this.get(collectionRef.doc(docId));
  }

  static async buscarDocsColecao<T>(collectionsPath: string[], limite = 100): Promise<T> {
    const collectionRef = this.montarCollectionRef(collectionsPath);
    return await this.get(collectionRef.limit(limite));
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Setters
  // -----------------------------------------------------------------------------------------------------

  static set firestoreInstance(firestore: Firestore) {
    this.firestore = firestore;
  }
}
