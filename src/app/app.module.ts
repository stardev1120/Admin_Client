import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ThemeComponent} from './theme/theme.component';
import {LayoutModule} from './theme/layouts/layout.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RecaptchaModule} from 'ng-recaptcha';
import {QRCodeModule} from 'angular2-qrcode';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ScriptLoaderService} from "./_services/script-loader.service";
import {ThemeRoutingModule} from "./theme/theme-routing.module";
import {AuthModule} from "./auth/auth.module";
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ApisModule} from "./_services/apis/apis.module";
import {TranslateModule} from '@ngx-translate/core';
import {I18nService} from "./_services/i18n.service";
import {AuthInterceptor} from "./_services/auth-http-interceptor.service";

@NgModule({
    declarations: [
        ThemeComponent,
        AppComponent,

    ],
    imports: [
        LayoutModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ThemeRoutingModule,
        AuthModule,
        HttpClientModule,
        ApisModule,
        TranslateModule.forRoot(),
        RecaptchaModule.forRoot(),
        QRCodeModule
    ],
    providers: [
        ScriptLoaderService,
        I18nService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}