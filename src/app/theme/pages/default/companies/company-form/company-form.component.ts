import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';

import {CompaniesService} from "../../../../../_services/apis/company.service";
import {Company} from "../../../../../models/company";
import {ScriptLoaderService} from "../../../../../_services/script-loader.service";
import {CountriesService} from "../../../../../_services/apis/countries.service";
import {environment} from "../../../../../../environments/environment";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./company-form.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class CompanyFormComponent implements OnInit {
    data: Company;
    countries: any;
    filter: any = {};
    grid: any;

    constructor(private _script: ScriptLoaderService,
                private api: CompaniesService,
                private country: CountriesService,
                private router: Router,
                private route: ActivatedRoute) {

    }

    ngAfterViewInit() {
        this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            'assets/grids/distribution-centers.js').then(() => {
            this.grid = (window as any).Datatable_Distribution_AJAX_DEMO;
            if (this.grid) {
                if (this.data.id) {
                    this.filter = {
                        company_id: this.data.id
                    }
                } else {
                    this.filter = {company_id: -1};
                }
                this.grid.init(this.filter, environment.baseUrl);
            }
        });
    }

    ngOnInit() {
        this.data = this.route.snapshot.data.company as Company;
        this.countries = this.route.snapshot.data.countries;
    }

    onSubmit(mForm: any) {
        if (mForm.valid) {
            this.api.save(this.data)
                .subscribe(r => {
                    this.router.navigate(["/companies"])
                });
        }
    }

}
