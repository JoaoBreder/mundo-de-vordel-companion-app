import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from './shared/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [AppComponent],
    imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideFunctions(() => getFunctions()),

        BrowserModule,
        BrowserAnimationsModule,

        AppRoutingModule,

        ToastrModule.forRoot(),

        HttpClientModule
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: (authService: AuthService) => {
                return async () => await authService.observarAuthState();
            },
            deps: [AuthService],
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
