import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';

import { Country } from "../../../../../models/country";
import { CountriesService } from "../../../../../_services/apis/countries.service";
import { ScriptLoaderService } from "../../../../../_services/script-loader.service";
import { environment } from "../../../../../../environments/environment";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./countries-form.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class CountriesFormComponent implements OnInit {
    data: Country;
    currencies: any;
    isEditMode = false;
    filter: any = {};
    grid1: any;
    grid2: any;

    constructor(private _script: ScriptLoaderService, private api: CountriesService,
        private router: Router,
        private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.data = this.route.snapshot.data.country as Country;
        this.isEditMode = !!this.data.id;
    }

    ngAfterViewInit() {
        this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            'assets/grids/countries-investments.js').then(() => {
                this.grid1 = (window as any).Datatable_Countries_Investments_AJAX_DEMO;
                if (this.grid1) {
                    if (this.data.id) {
                        this.filter = {
                            country_id: this.data.id
                        }
                    } else {
                        this.filter = { country_id: -1 };
                    }
                    this.grid1.init(this.filter, environment.baseUrl);
                }
            });
        this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            'assets/grids/countries-settings.js').then(() => {
                this.grid2 = (window as any).Datatable_Countries_Settings_AJAX_DEMO;
                if (this.grid2) {
                    if (this.data.id) {
                        this.filter = {
                            country_id: this.data.id
                        }
                    } else {
                        this.filter = { country_id: -1 };
                    }
                    console.log('this.filter => ', this.filter)
                    this.grid2.init(this.filter, environment.baseUrl);
                }
            });
    }

    onSubmit(mForm: any) {
        if (mForm.valid) {
            this.api.save(this.data)
                .subscribe(r => {
                    this.data = r;
                    if (this.isEditMode) {
                        this.router.navigate(["/countries"])
                    }
                });
        }
    }

}
