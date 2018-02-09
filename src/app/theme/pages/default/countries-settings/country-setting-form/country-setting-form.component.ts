import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import {Location} from '@angular/common';
import {CountrySetting} from "../../../../../models/country-setting";
import {CountriesSettingsService} from "../../../../../_services/apis/countries-settings.service";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./country-setting-form.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class CountrySettingFormComponent implements OnInit {
    data: CountrySetting;


    constructor(private api: CountriesSettingsService,
                private router: Router,
                private route: ActivatedRoute,
                public location: Location) {

    }

    ngOnInit() {
        this.data = this.route.snapshot.data.countrySetting as CountrySetting;
        this.route.params
            .map(params => params['countryId'])
            .subscribe(countryId => this.data.country_id = countryId*1);
    }

    onSubmit(mForm: any) {

        if (mForm.valid) {
            this.api.save(this.data)
                .subscribe(r => {
                    //this.router.navigate(["/countries-settings"])
                    this.location.back();
                });
        }
    }

}
