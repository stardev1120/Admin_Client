import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';

import {Country} from "../../../../../models/country";
import {CountriesService} from "../../../../../_services/apis/countries.service";
import {CountryInvestment} from "../../../../../models/country-investment";
import {CountriesInvestmentService} from "../../../../../_services/apis/countries-investment.service";
import {Location} from "@angular/common";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./country-investment-form.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class CountryInvestmentFormComponent implements OnInit {
    data: CountryInvestment;
    country: Country;

    statuses: any = [{
        id: 'Active',
        title: 'Active'
    }, {
        id: 'Disabled',
        title: 'Disabled'
    }];

    constructor(private api: CountriesInvestmentService,
                private countryApi: CountriesService,
                private router: Router,
                private route: ActivatedRoute,
                public location: Location) {

    }

    ngOnInit() {
        this.data = this.route.snapshot.data.countryInvestment as CountryInvestment;
        this.route.params
            .map(params => params['countryId'])
            .subscribe(countryId => {
                this.data.country_id = countryId * 1;
                this.countryApi.get(countryId).subscribe(country => {
                    this.country = country;
                })
            });
    }

    onChangeStatus(){
        this.data.status && this.data.status === 'Active' ? this.data.status = 'Disabled' : this.data.status = 'Active';
    }

    onSubmit(mForm: any) {

        if (mForm.valid) {
            this.api.save(this.data)
                .subscribe(() => {
                    //this.router.navigate(["/countries-investments"])
                    //this.location.back();
                    this.router.navigate(['/countries', this.data.country_id])
                });
        }
    }

}
