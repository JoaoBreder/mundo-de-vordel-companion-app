import { Storage } from "firebase-admin/lib/storage/storage";

export abstract class StorageService {
    private static storage: Storage;

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos públicos
    // -----------------------------------------------------------------------------------------------------

    static async buscarBufferArquivo(path: string): Promise<Buffer<ArrayBufferLike> | undefined> {
        const bucket = this.storage.bucket();
        const file = bucket.file(path);

        const [exists] = await file.exists();
        if(exists) return undefined;

        const [buffer] = await file.download();
        return buffer;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Setters
    // -----------------------------------------------------------------------------------------------------

    static set storageInstance(storage: Storage) {
        this.storage = storage;
    }
}