import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { AdminUserCountriesService } from "../../../../_services/apis/admin-user-countries.service";
import { AdminUserCountry } from "../../../../models/admin-user-country";

@Injectable()
export class AdminUserCountryResolver implements Resolve<AdminUserCountry> {

    constructor(private api: AdminUserCountriesService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AdminUserCountry> | Promise<AdminUserCountry> | AdminUserCountry {
        let id = route.paramMap.get('id');
        if (id == 'new') {
            return new AdminUserCountry();
        }
        return this.api.get(route.paramMap.get('id'));
    }

}
