import {
    Component,
    ComponentFactoryResolver, OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {cloneDeep} from 'lodash'

import {ScriptLoaderService} from "../_services/script-loader.service";
import {AuthenticationService, AlertService, UserService} from "./_services";
import {AlertComponent} from './_directives';
import {LoginCustom} from "./_helpers/login-custom";
import {Helpers} from "../helpers";
import {AdminUsersService} from "../_services/apis/admin-users.service";
import {RequestResetPasswordService} from "./_services/request-reset-password.service";
import {environment} from '../../environments/environment'
import {RecaptchaComponent} from "ng-recaptcha";

@Component({
    selector: ".m-grid.m-grid--hor.m-grid--root.m-page",
    templateUrl: './templates/login-1.component.html',
    encapsulation: ViewEncapsulation.None
})

export class AuthComponent implements OnInit, OnDestroy {
    model: any = {};
    loading = false;
    returnUrl: string;
    public lottieConfig: Object;
    private anim: any;
    show2FA: boolean = false;
    clonedCurrentUser: any;
    clonedAdminUser: any;
    siteKey = environment.siteKey;
    @ViewChild('alertSignin', {read: ViewContainerRef}) alertSignin: ViewContainerRef;
    @ViewChild('alertSignup', {read: ViewContainerRef}) alertSignup: ViewContainerRef;
    @ViewChild('alertForgotPass', {read: ViewContainerRef}) alertForgotPass: ViewContainerRef;
    @ViewChild('alert2FA', {read: ViewContainerRef}) alert2FA: ViewContainerRef;
    @ViewChild('captchaRef') captchaRef: RecaptchaComponent;

    constructor(private _router: Router,
                private _script: ScriptLoaderService,
                private _userService: UserService,
                private _route: ActivatedRoute,
                private _authService: AuthenticationService,
                private _alertService: AlertService,
                private cfr: ComponentFactoryResolver,
                private _requestResetPasswordService: RequestResetPasswordService,
                private _adminUserService: AdminUsersService) {
        this.lottieConfig = {
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'assets/app/logo-anim.json'
        };
    }

    handleAnimation(anim: any) {
        this.anim = anim;
    }

    ngOnInit() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentCountry');
        localStorage.clear();
        this.model.remember = true;
        // get return url from route parameters or default to '/'
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
        //this._router.navigate([this.returnUrl]);

        this._script.load('body', 'assets/vendors/base/vendors.bundle.js', 'assets/demo/default/base/scripts.bundle.js')
            .then(() => {
                Helpers.setLoading(false);
                LoginCustom.init();
            });
    }

    signin() {
        if (this.model['g-recaptcha-response'] === '' || this.model['g-recaptcha-response'] == null) {
            return
        }
        this.show2FA = false;
        this.loading = true;
        this._authService.login(this.model.email, this.model.password, this.model['g-recaptcha-response'])
            .subscribe(
                data => {
                    this._adminUserService.verify().subscribe(() => {
                        if (this._adminUserService.checkModuleOtherRight('admin-users', '2FA') && !this._adminUserService.currentAdminUser.is2FAVerified) {
                            this.show2FA = true;
                            this.loading = false;
                            this.clonedCurrentUser = (JSON.parse(localStorage.getItem('currentUser'))) ?
                                cloneDeep(JSON.parse(localStorage.getItem('currentUser'))) : null;
                            localStorage.removeItem('currentUser');
                            this.clonedAdminUser = cloneDeep(this._adminUserService.currentAdminUser);
                            this._adminUserService.currentAdminUser = null;
                        } else {
                            this._router.navigate([this.returnUrl]);
                        }
                    }, (error: any) => {
                        this.model['g-recaptcha-response'] = '';
                        this.captchaRef.reset();
                        this.showAlert('alertSignin');
                        if (error.error) {
                            this._alertService.error(error.error.text);
                        } else {
                            this._alertService.error(error._body);
                        }

                        this.loading = false;
                    })

                },
                (error: any) => {
                    this.model['g-recaptcha-response'] = '';
                    this.captchaRef.reset();
                    this.showAlert('alertSignin');
                    this._alertService.error(error._body);
                    this.loading = false;
                });
    }

    verification2FA() {
        this.loading = true;

        this._authService.faVerification(this.model.faCode, this.clonedCurrentUser)
            .subscribe(
                (data: any) => {
                    if (data.verified) {
                        this._router.navigate([this.returnUrl]);
                    } else {
                        this.showAlert('alert2FA');
                        this._alertService.error('2 FA code is invalid.');
                        this.loading = false;
                    }
                },
                error => {
                    this.showAlert('alert2FA');
                    this._alertService.error(error);
                    this.loading = false;
                });
    }

    onHide2FA() {
        this.loading = false;
        this.show2FA = false;
        this.model.faCode = '';
    }

    signup() {
        this.loading = true;
        this._userService.create(this.model)
            .subscribe(
                data => {
                    this.showAlert('alertSignin');
                    this._alertService.success('Thank you. To complete your registration please check your email.', true);
                    this.loading = false;
                    LoginCustom.displaySignInForm();
                    this.model = {};
                },
                error => {
                    this.showAlert('alertSignup');
                    this._alertService.error(error);
                    this.loading = false;
                });
    }

    forgotPass() {
        this.loading = true;
        this._requestResetPasswordService.requestReset(this.model.email)
            .subscribe(
                data => {
                    this.showAlert('alertSignin');
                    this._alertService.success('Cool! Password recovery instruction has been sent to your email.', true);
                    this.loading = false;
                    LoginCustom.displaySignInForm();
                    this.model = {};
                },
                error => {
                    this.showAlert('alertForgotPass');
                    console.log('error ==> ', error)
                    if (error.error) {
                        this._alertService.error(error.error.text);
                    } else {
                        this._alertService.error(error._body);
                    }

                    this.loading = false;
                });
    }

    showAlert(target) {
        if (this[target]) {
            this[target].clear();
            let factory = this.cfr.resolveComponentFactory(AlertComponent);
            let ref = this[target].createComponent(factory);
            ref.changeDetectorRef.detectChanges();
        }

    }

    ngOnDestroy() {
        if (this.captchaRef) {
            this.captchaRef.reset();
            this.captchaRef.ngOnDestroy();
            this.captchaRef = null;
        }
    }
}
