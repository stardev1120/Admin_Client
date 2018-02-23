import {
    Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef,
    ViewEncapsulation
} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import 'rxjs/add/observable/forkJoin';
import * as _ from 'lodash';

import {AdminUsersService} from "../../../../../_services/apis/admin-users.service";
import {AdminUser} from "../../../../../models/admin-user";
import {AlertComponent} from "../../../../../auth/_directives";
import {AlertService} from "../../../../../auth/_services";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./admin-user-change-password.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AdminUserChangePasswordComponent implements OnInit {
    data: AdminUser;
    currentAdminUser: any;
    matched: boolean;
    renewPassword: string;
    @ViewChild('alertChangePassword', {read: ViewContainerRef}) alertChangePassword: ViewContainerRef;

    constructor(private api: AdminUsersService,
                private router: Router,
                private cfr: ComponentFactoryResolver,
                private _alertService: AlertService,
                private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.data = this.route.snapshot.data.adminUser as AdminUser;
        this.data.password = '';
        if (this.api.currentAdminUser.id === this.data.id) {
            this.router.navigate(["/admin-users"]);
            return;
        }
    }

    onSubmit(mForm: any) {
        if (mForm.valid && (this.matched || this.data.id)) {
            this.api.changePasswordByAdmin({password: this.data.password})
                .subscribe(r => {

                    this.router.navigate(["/admin-users"])
                }, error => {
                    console.log(error)
                    this.showAlert('alertChangePassword');
                    this._alertService.error('The password is wrong.', true);
                });
        }
    }

    goBack() {
        window.history.back();
    }


    passwordMatching() {
        this.matched = this.renewPassword === this.data.password;
    }

    showAlert(target) {
        if (this[target]) {
            this[target].clear();
            let factory = this.cfr.resolveComponentFactory(AlertComponent);
            let ref = this[target].createComponent(factory);
            ref.changeDetectorRef.detectChanges();
        }
    }
}
