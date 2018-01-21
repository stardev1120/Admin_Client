import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { CountrySetting } from "../../../../models/country-setting";
import { CountriesSettingsService } from "../../../../_services/apis/countries-settings.service";

@Injectable()
export class CountrySettingResolver implements Resolve<CountrySetting> {

    constructor(private api: CountriesSettingsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CountrySetting> | Promise<CountrySetting> | CountrySetting {
        let id = route.paramMap.get('id');
        if (id == 'new') {
            return new CountrySetting();
        }
        return this.api.get(route.paramMap.get('id'));
    }

}
