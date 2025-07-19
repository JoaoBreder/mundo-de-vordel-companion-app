import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class FunctionsService {
    private app = inject(FirebaseApp);

    constructor(
        private authService: AuthService,
        private httpClient: HttpClient
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Métodos públicos
    // -----------------------------------------------------------------------------------------------------

    async callCloudFunction<T = any, R = any>(name: string, data: T, auth: boolean, region = 'us-central1'): Promise<R> {
        if (!this.app.options.projectId) {
            throw new Error('Não foi possível encontrar o projectId');
        }

        const url = `https://${region}-${this.app.options.projectId}.cloudfunctions.net/${name}`;
        const authorization = auth ? `Bearer ${await this.authService.getAuthToken()}` : '';

        const res = await firstValueFrom(
            this.httpClient
                .post(
                    url,
                    { data },
                    {
                        headers: {
                            Authorization: authorization,
                        },
                    }
                )
                .pipe(take(1))
        );

        return (res as any).result as R;
    }
}
