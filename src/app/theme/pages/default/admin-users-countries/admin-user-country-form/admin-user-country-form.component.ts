import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';

import { AdminUserCountry } from "../../../../../models/admin-user-country";
import { AdminUserCountriesService } from "../../../../../_services/apis/admin-user-countries.service";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./admin-user-country-form.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AdminUserCountryFormComponent implements OnInit {
    data: AdminUserCountry;
    countries: any;
    adminUsers: any;

    constructor(private api: AdminUserCountriesService,
        private router: Router,
        private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.data = this.route.snapshot.data.adminUserCountry as AdminUserCountry;
        this.countries = this.route.snapshot.data.countries;
        this.adminUsers = this.route.snapshot.data.adminUsers;
    }

    onSubmit(mForm: any) {

        if (mForm.valid) {
            console.log(mForm.valid, mForm)
            this.api.save(this.data)
                .subscribe(r => {
                    this.router.navigate(["/admin-users-countries"])
                });
        }
    }

}
