import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';

import { ScriptLoaderService } from "../../../../../_services/script-loader.service";
import { AdminUsersService } from "../../../../../_services/apis/admin-users.service";
import { environment } from "../../../../../../environments/environment";


@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./roles.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class RolesComponent implements OnInit, AfterViewInit {
    filter: any = {};
    grid: any;

    constructor(private _script: ScriptLoaderService,
        public _adminUserService: AdminUsersService) {

    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            'assets/grids/roles.js').then(() => {
                this.grid = (window as any).Datatable_Roles_AJAX_DEMO;
                if (this.grid) {
                    this.grid.init(this.filter, environment.baseUrl);
                }
            });
    }

    onChangeName(event: any) {
        this.setFilterAndReload('role_name', event.target.value);
    }

    private setFilterAndReload(key: string, value: string) {
        if (value) {
            this.filter[key] = value;
        } else {
            delete this.filter[key]
        }
        if (this.grid) {
            this.grid.query(this.filter);
        }
    }
}