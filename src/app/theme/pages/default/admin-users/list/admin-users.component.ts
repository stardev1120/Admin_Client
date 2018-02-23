import { Component, OnInit, ViewEncapsulation, AfterViewInit, OnDestroy } from '@angular/core';
import { ScriptLoaderService } from "../../../../../_services/script-loader.service";
import { AdminUsersService } from "../../../../../_services/apis/admin-users.service";
import { environment } from "../../../../../../environments/environment";


@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./admin-users.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AdminUsersComponent implements OnInit, AfterViewInit, OnDestroy {
    filter: any = {};
    grid: any;

    constructor(private _script: ScriptLoaderService, public _adminUserService: AdminUsersService) {

    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            'assets/grids/admin-users.js').then(() => {
                this.grid = (window as any).Datatable_Admin_Users_AJAX_DEMO;
                if (this.grid) {
                    this.grid.init(this.filter, environment.baseUrl);
                }
            });
    }

    onChangeEmail(event: any) {
        this.setFilterAndReload('email', event.target.value);
    }

    onChangeName(event: any) {
        this.setFilterAndReload('name', event.target.value);
    }

    onChangePhoneNumber(event: any) {
        this.setFilterAndReload('phone_number', event.target.value);
    }

    ngOnDestroy() {
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
