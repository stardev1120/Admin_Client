import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
;
import { CountrySetting } from "../../../../../models/country-setting";
import { CountriesSettingsService } from "../../../../../_services/apis/countries-settings.service";
import { CompaniesService } from "../../../../../_services/apis/company.service";
import { Company } from "../../../../../models/company";
import { FeatureACL } from "../../../../../models/featureACL";
import { FeatureACLsService } from "../../../../../_services/apis/feature-acls.service";
import {Location} from "@angular/common";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./feature-acl-form.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class FeatureACLFormComponent implements OnInit {
    data: FeatureACL;
    countries: any;
    roles: any;

    constructor(private api: FeatureACLsService,
        private router: Router,
        private route: ActivatedRoute,
                public location: Location) {

    }

    ngOnInit() {
        this.data = this.route.snapshot.data.featureACL as FeatureACL;
        this.roles = this.route.snapshot.data.roles;
    }

    onSubmit(mForm: any) {

        if (mForm.valid) {
            console.log(mForm.valid, mForm)
            this.api.save(this.data)
                .subscribe(r => {
                    this.router.navigate(["/feature-acls"])
                });
        }
    }

}
