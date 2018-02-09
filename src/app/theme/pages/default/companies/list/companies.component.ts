import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ScriptLoaderService } from "../../../../../_services/script-loader.service";
import { Company } from "../../../../../models/company";
import {AdminUsersService} from "../../../../../_services/apis/admin-users.service";
// import { Helpers } from '../../../../../../../helpers';
// import { ScriptLoaderService } from '../../../../../../../_services/script-loader.service';


@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./companies.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class CompaniesComponent implements OnInit, AfterViewInit {


    constructor(private _script: ScriptLoaderService,
                public _adminUserService: AdminUsersService) {

    }
    ngOnInit() {

    }
    ngAfterViewInit() {
        this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            'assets/grids/companies.js');

    }

}
