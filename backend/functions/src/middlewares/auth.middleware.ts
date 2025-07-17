import { DecodedIdToken } from 'firebase-admin/auth';
import { AuthData, HttpsError } from 'firebase-functions/lib/common/providers/https';
import { HttpsErrorMiddleware } from './httpsError.middleware';

export class AuthCheckMiddleware {
    private readonly decodedIdToken?: DecodedIdToken;

    next: (uid: string) => Promise<any>;

    constructor(authData: AuthData | undefined, next: (uid: string) => Promise<any>) {
        this.decodedIdToken = authData?.token ?? undefined;
        this.next = next;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos públicos
    // -----------------------------------------------------------------------------------------------------

    async verificarIdToken<T>(): Promise<T | HttpsError>  {
        const { uid } = this.decodedIdToken ?? {};
        if (!this.decodedIdToken || !uid) return new HttpsErrorMiddleware('permission-denied').get();

        return await this.next(uid);
    }
}