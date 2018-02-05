import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import { Location } from "@angular/common";

import { DistributionCenter } from "../../../../../models/distribution-center";
import { DistributionCentersService } from "../../../../../_services/apis/distribution-center.service";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./distribution-center-form.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class DistributionCenterFormComponent implements OnInit {
    data: DistributionCenter;
    countries: any;
    companies: any;
    isRequestError = false;
    errorMessage: string;
    constructor(private api: DistributionCentersService,
        private router: Router,
        private route: ActivatedRoute,
        public location: Location) {

    }

    ngOnInit() {
        this.data = this.route.snapshot.data.distributionCenter as DistributionCenter;
        this.countries = this.route.snapshot.data.countries;
        this.companies = this.route.snapshot.data.companies;
        this.route.params
            .map(params => params['companyId'])
            .subscribe(companyId => this.data.company_id = companyId * 1);
    }

    onSubmit(mForm: any) {
        this.isRequestError = false;
        this.errorMessage = '';
        if (mForm.valid) {
            console.log(mForm.valid, mForm)
            this.api.save(this.data)
                .subscribe(r => {
                    //this.router.navigate(["/distribution-centers"]).then();
                    this.location.back();
                }, error => {
                    console.log(error)
                    this.isRequestError = true;
                    this.errorMessage = error.error;
                });
        }
    }

}
