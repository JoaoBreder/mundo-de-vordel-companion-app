import { CollectionReference, DocumentReference, Firestore } from "firebase-admin/firestore";


export abstract class DatabaseMiddleware { // Implementação provisória do DatabaseMiddleWare para ver como vai se comportar
    static firestore: Firestore;

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos privados
    // -----------------------------------------------------------------------------------------------------

    static async get<T>(documentRef: DocumentReference): Promise<T | undefined> {
        const snapshot = await documentRef.get();

        if (!snapshot.exists) return undefined;
        return snapshot.data() as T;
    }

    static montarCollectionRef(collectionsPath: string[]): CollectionReference {
        return this.firestore.collection(`/${collectionsPath.join('/')}`);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos públicos
    // -----------------------------------------------------------------------------------------------------

    static async buscarPorDocId<T>(docId: string, collectionsPath: string[]): Promise<T | undefined> {
        const collectionRef = this.montarCollectionRef(collectionsPath);
        return await this.get<T>(collectionRef.doc(docId)); 
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Setters
    // -----------------------------------------------------------------------------------------------------

    static set firestoreInstance(firestore: Firestore) {
        this.firestore = firestore;
    }
}