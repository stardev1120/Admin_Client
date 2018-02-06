import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ScriptLoaderService } from "../../../../../_services/script-loader.service";
import { AdminUsersService } from "../../../../../_services/apis/admin-users.service";


@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./admin-users.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AdminUsersComponent implements OnInit, AfterViewInit {


    constructor(private _script: ScriptLoaderService, public _adminUserService: AdminUsersService) {

    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            'assets/grids/admin-users.js');

    }

}
