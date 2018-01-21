import { Component, OnInit, ViewEncapsulation, AfterViewInit, OnDestroy } from '@angular/core';
import { ScriptLoaderService } from "../../../../_services/script-loader.service";
import { ActivatedRoute, Router } from "@angular/router";
// import { Helpers } from '../../../../../../../helpers';
// import { ScriptLoaderService } from '../../../../../../../_services/script-loader.service';


@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./admin-user-access.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AdminUserAccessComponent implements OnInit, AfterViewInit, OnDestroy {
    stateUrl: any;
    code: string;
    private sub: any;
    constructor(private _router: Router, private route: ActivatedRoute) {

    }
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.stateUrl = params['stateUrl'];
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
        let stateUrl = this.removeLastDirectoryPartOf(this.stateUrl);
        this._router.navigate([stateUrl, 'new']);
    }

    removeLastDirectoryPartOf(the_url) {
        let the_arr = the_url.split('/');
        the_arr.pop();
        return (the_arr.join('/'));
    }
}