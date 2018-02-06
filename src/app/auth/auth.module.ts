import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {BaseRequestOptions, HttpModule} from "@angular/http";
import {MockBackend} from "@angular/http/testing";

import {RecaptchaModule} from 'ng-recaptcha'
import {RecaptchaFormsModule} from 'ng-recaptcha/forms';

import {AuthRoutingModule} from "./auth-routing.routing";
import {AuthComponent} from "./auth.component";
import {AlertComponent} from "./_directives/alert.component";
import {LogoutComponent} from "./logout/logout.component";
import {AuthGuard} from "./_guards/auth.guard";
import {AlertService} from "./_services/alert.service";
import {AuthenticationService} from "./_services/authentication.service";
import {UserService} from "./_services/user.service";
import {QRCodeModule} from 'angular2-qrcode';
//import { fakeBackendProvider } from "./_helpers/fake-backend";
import {LottieAnimationViewModule} from "ng-lottie";
import {ResetPasswordService} from "./_services/reset-password.service";
import {RequestResetPasswordService} from "./_services/request-reset-password.service";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";

@NgModule({
    declarations: [
        AuthComponent,
        AlertComponent,
        LogoutComponent,
        ResetPasswordComponent
    ],
    imports: [
        LottieAnimationViewModule.forRoot(),
        CommonModule,
        FormsModule,
        HttpModule,
        AuthRoutingModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        QRCodeModule
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        // api backend simulation
        //fakeBackendProvider,
        //MockBackend,
        BaseRequestOptions,
        ResetPasswordService,
        RequestResetPasswordService,
    ],
    entryComponents: [AlertComponent]
})

export class AuthModule {
}
