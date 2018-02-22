import {Component, OnInit, ViewEncapsulation, AfterViewInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {AdminUserAccessService} from "../../../../_services/apis/admin-user-access.service";
import {AdminUserAccess} from "../../../../models/admin-user-access";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./admin-user-access.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AdminUserAccessComponent implements OnInit, AfterViewInit, OnDestroy {
    stateUrl: any;
    userId: any;
    user: any;
    code: string;
    submitted = false;
    error: string;
    hasError = false;

    constructor(private _router: Router,
                private route: ActivatedRoute,
                private _adminUserAccessService: AdminUserAccessService) {

    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.stateUrl = params['stateUrl'];
            this.userId = params['userId'] * 1;
            let adminUserAccess = new AdminUserAccess();
            adminUserAccess.user_id = this.userId;
            this._adminUserAccessService.save(adminUserAccess).subscribe((userInfo: any) => {
                this.user = userInfo.user;
            }, error => {
                console.log(error);
                this.error = error.error.text;
                this.hasError = true;
            });
        })
    }

    ngAfterViewInit() {

    }

    ngOnDestroy() {
    }

    verifyAccess() {
        this.submitted = true;
        this.error = '';
        this.hasError = false;
        if (!this.code) {
            return;
        }

        this._adminUserAccessService.verifyOTP(this.code, this.userId).subscribe((valid: any) => {
            if (valid && valid.message === 'done') {
                this.submitted = false;
                this.error = '';
                this._router.navigate([this.stateUrl]).then();
            } else {
                console.log('code is invalid');
                this.hasError = true;
                this.error = 'code is invalid.'
            }
        }, error => {
            console.log(error.error.text);
            this.hasError = true;
            this.error = error.error.text
        })

    }

    onChangeOtp() {
        this.submitted = false;
        this.error = '';
        this.hasError = false;
    }

    goBack() {
        window.history.back();
    }
}