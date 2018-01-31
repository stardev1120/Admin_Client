import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
;
import { CountrySetting } from "../../../../../models/country-setting";
import { CountriesSettingsService } from "../../../../../_services/apis/countries-settings.service";
import { CompaniesService } from "../../../../../_services/apis/company.service";
import { Company } from "../../../../../models/company";
import { RolesService } from "../../../../../_services/apis/role.service";
import { Role } from "../../../../../models/role";
import { ScriptLoaderService } from "../../../../../_services/script-loader.service";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./role-form.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class RoleFormComponent implements OnInit {
    data: Role;
    countries: any;


    constructor(private _script: ScriptLoaderService, private api: RolesService,
        private router: Router,
        private route: ActivatedRoute) {

    }
    ngAfterViewInit() {
        this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            'assets/grids/feature-acls.js');

    }
    ngOnInit() {
        this.data = this.route.snapshot.data.role as Role;
    }

    onSubmit(mForm: any) {

        if (mForm.valid) {
            console.log(mForm.valid, mForm)
            this.data.role_id = this.data.role_name.split(' ').join('_')
            this.api.save(this.data)
                .subscribe(r => {
                    this.router.navigate(["/roles"])
                });
        }
    }

}
