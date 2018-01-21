import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { CountryInvestment } from "../../../../models/country-investment";
import { CountriesInvestmentService } from "../../../../_services/apis/countries-investment.service";

@Injectable()
export class CountryInvestmentResolver implements Resolve<CountryInvestment> {

    constructor(private api: CountriesInvestmentService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CountryInvestment> | Promise<CountryInvestment> | CountryInvestment {
        let id = route.paramMap.get('id');
        if (id == 'new') {
            return new CountryInvestment();
        }
        return this.api.get(route.paramMap.get('id'));
    }

}
