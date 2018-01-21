import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import { CountrySetting } from "../../../../../models/country-setting";
import { CountriesSettingsService } from "../../../../../_services/apis/countries-settings.service";
import { CompaniesService } from "../../../../../_services/apis/company.service";
import { Company } from "../../../../../models/company";
import { DistributionCenter } from "../../../../../models/distribution-center";
import { DistributionCentersService } from "../../../../../_services/apis/distribution-center.service";
import {Location} from "@angular/common";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./distribution-center-form.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class DistributionCenterFormComponent implements OnInit {
    data: DistributionCenter;
    countries: any;
    companies: any;

    constructor(private api: DistributionCentersService,
        private router: Router,
        private route: ActivatedRoute,
                public location: Location) {

    }

    ngOnInit() {
        this.data = this.route.snapshot.data.distributionCenter as DistributionCenter;
        this.countries = this.route.snapshot.data.countries;
        this.companies = this.route.snapshot.data.companies;
    }

    onSubmit(mForm: any) {

        if (mForm.valid) {
            console.log(mForm.valid, mForm)
            this.api.save(this.data)
                .subscribe(r => {
                    this.router.navigate(["/distribution-centers"])
                });
        }
    }

}
