import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';

import { ScriptLoaderService } from "../../../../../_services/script-loader.service";
import {environment} from "../../../../../../environments/environment";


@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./non-supported-country-leads.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class NonSupportedCountryLeadsComponent implements OnInit, AfterViewInit {
    filter: any = {};
    grid: any;

    constructor(private _script: ScriptLoaderService) {

    }
    ngOnInit() {

    }
    ngAfterViewInit() {
        this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            'assets/grids/non-supported-country-leads.js').then(() => {
            this.grid = (window as any).Datatable_Leads_AJAX_DEMO;
            if (this.grid) {
                this.grid.init(this.filter, environment.baseUrl);
            }
        });
    }

    onChangeName(event: any) {
        this.setFilterAndReload('country', event.target.value);
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