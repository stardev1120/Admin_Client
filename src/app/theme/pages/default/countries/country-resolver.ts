
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { CountriesService } from "../../../../_services/apis/countries.service";
import { Country } from "../../../../models/country";

@Injectable()
export class CountryResolver implements Resolve<Country> {

    constructor(private api: CountriesService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Country> | Promise<Country> | Country {
        let id = route.paramMap.get('id');
        if (id == 'new') {
            return new Country();
        }
        return this.api.get(route.paramMap.get('id'));
    }

}
