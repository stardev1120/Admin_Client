import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';

import { NonSupportedCountryLead } from "../../../../../models/non-supported-country-lead";
import { NonSupportedCountryLeadsService } from "../../../../../_services/apis/non-supported-coutnry-lead.service";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./non-supported-country-lead-form.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class NonSupportedCountryLeadFormComponent implements OnInit {
    data: NonSupportedCountryLead;

    constructor(private api: NonSupportedCountryLeadsService,
        private router: Router,
        private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.data = this.route.snapshot.data.nonSupportedCountryLead as NonSupportedCountryLead;
    }

    onSubmit(mForm: any) {

        if (mForm.valid) {
            this.api.save(this.data)
                .subscribe(r => {
                    this.router.navigate(["/non-supported-country-leads"])
                });
        }
    }

}
