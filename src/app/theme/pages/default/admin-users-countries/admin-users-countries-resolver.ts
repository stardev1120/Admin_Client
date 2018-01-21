
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { CountriesService } from "../../../../_services/apis/countries.service";
import { Country } from "../../../../models/country";
import { AdminUserCountryResolver } from "./admin-user-country-resolver";
import { AdminUserCountriesService } from "../../../../_services/apis/admin-user-countries.service";
import { AdminUserCountry } from "../../../../models/admin-user-country";

@Injectable()
export class AdminUserCountriesResolver implements Resolve<AdminUserCountry[]> {

    constructor(private api: AdminUserCountriesService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AdminUserCountry[]> | Promise<AdminUserCountry[]> | any {
        return [];//this.api.query();
    }

}
