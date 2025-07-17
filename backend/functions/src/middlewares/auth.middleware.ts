import { DecodedIdToken } from 'firebase-admin/auth';

export abstract class AuthMiddleware {
    // -----------------------------------------------------------------------------------------------------
    // @ Métodos públicos
    // -----------------------------------------------------------------------------------------------------

    static verificarIdToken(idToken?: DecodedIdToken): { uid: string } | null {
        const { uid } = idToken ?? {};
        if (!idToken || !uid) return null;

        return { uid };
    }
}