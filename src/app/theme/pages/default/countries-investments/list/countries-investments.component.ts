import {Component, OnInit, ViewEncapsulation, AfterViewInit, OnDestroy} from '@angular/core';
import { ScriptLoaderService } from "../../../../../_services/script-loader.service";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../../../environments/environment";
// import { Helpers } from '../../../../../../../helpers';
// import { ScriptLoaderService } from '../../../../../../../_services/script-loader.service';


@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./countries-investments.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class CountriesInvestmentsComponent implements OnInit, AfterViewInit, OnDestroy {
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
            'assets/grids/countries-investments-1.js').then(() => {
            this.grid = (window as any).Datatable_Investement_AJAX_DEMO;
            if (this.grid) {
                this.grid.init(this.filter, environment.baseUrl);
            }
        });

    }


    onChangeName(event: any) {
        this.setFilterAndReload('name', event.target.value);
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