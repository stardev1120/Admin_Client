import {Component, OnInit, ViewEncapsulation, AfterViewInit, OnDestroy} from '@angular/core';
import {ScriptLoaderService} from "../../../../_services/script-loader.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AdminUserAccessService} from "../../../../_services/apis/admin-user-access.service";
import {AdminUserAccess} from "../../../../models/admin-user-access";
// import { Helpers } from '../../../../../../../helpers';
// import { ScriptLoaderService } from '../../../../../../../_services/script-loader.service';


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
    private sub: any;

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
                console.log('this.stateUrl ==> ', this.stateUrl, this.userId, userInfo.user)
            });
        })
    }

    ngAfterViewInit() {

    }

    ngOnDestroy() {
        //this.sub.unsubscribe();
    }

    sendRequestAccess() {
        // todo: send request access
        // user_id
    }

    verifyAccess() {
        // todo verify code and then redirect to user view
        this._adminUserAccessService.verifyOTP(this.code, this.userId).subscribe(valid => {
            console.log('valid ==> ', valid)
            if (valid) {
                //let stateUrl = this.removeLastDirectoryPartOf(this.stateUrl);
                this._router.navigate([this.stateUrl]);
            } else {
                console.log('code is invalid')
            }

        }, error => {
            console.log(error)
        })

    }

    /*    removeLastDirectoryPartOf(the_url) {
            let the_arr = the_url.split('/');
            the_arr.pop();
            return (the_arr.join('/'));
        }*/
}