import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';

import { Country } from "../../../../../models/country";
import { CountriesService } from "../../../../../_services/apis/countries.service";
import { CountryInvestment } from "../../../../../models/country-investment";
import { CountriesInvestmentService } from "../../../../../_services/apis/countries-investment.service";
import { Location } from "@angular/common";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./country-investment-form.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class CountryInvestmentFormComponent implements OnInit {
    data: CountryInvestment;

    statuses: any = [{
        id: 'status1',
        title: 'Status 1'
    }, {
        id: 'status2',
        title: 'Status 2'
    }, {
        id: 'status3',
        title: 'Status 3'
    }, {
        id: 'status4',
        title: 'Status 4'
    }];
    constructor(private api: CountriesInvestmentService,
        private router: Router,
        private route: ActivatedRoute,
        public location: Location) {

    }

    ngOnInit() {
        this.data = this.route.snapshot.data.countryInvestment as CountryInvestment;
        this.route.params
            .map(params => params['countryId'])
            .subscribe(countryId => this.data.country_id = countryId * 1);
    }

    onSubmit(mForm: any) {

        if (mForm.valid) {
            console.log(mForm.valid, mForm)
            this.api.save(this.data)
                .subscribe(r => {
                    //this.router.navigate(["/countries-investments"])
                    this.location.back();
                });
        }
    }

}
