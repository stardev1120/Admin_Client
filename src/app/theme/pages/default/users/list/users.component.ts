import { Component, OnInit, ViewEncapsulation, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { ScriptLoaderService } from "../../../../../_services/script-loader.service";
import { environment } from '../../../../../../environments/environment';


@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./users.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {
    sub: any;
    filter: any = {};
    grid: any;

    constructor(private _script: ScriptLoaderService,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.sub = this.route
            .queryParams
            .subscribe(params => {
                if (params && params.filter) {
                    this.filter = JSON.parse(params.filter);
                }
            });
    }

    ngAfterViewInit() {
        this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            'assets/grids/users.js').then(() => {
                this.grid = (window as any).Datatable_Users_AJAX_DEMO;
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
        this.sub.unsubscribe();
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