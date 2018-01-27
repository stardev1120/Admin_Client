import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';

import { Country } from "../../../../../models/country";
import { CountriesService } from "../../../../../_services/apis/countries.service";
import { ScriptLoaderService } from "../../../../../_services/script-loader.service";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./country-view.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class CountryViewComponent implements OnInit {
    data: Country;
    currencies: any;


    constructor(private _script: ScriptLoaderService, private api: CountriesService,
        private router: Router,
        private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.data = this.route.snapshot.data.country as Country;
    }
    ngAfterViewInit() {
        this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            'assets/grids/countries-investments.js');
        this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            'assets/grids/countries-settings.js');

    }
}
