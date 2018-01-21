import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { NonSupportedCountryLead } from "../../../../models/non-supported-country-lead";
import { NonSupportedCountryLeadsService } from "../../../../_services/apis/non-supported-coutnry-lead.service";

@Injectable()
export class NonSupportedCountryLeadResolver implements Resolve<NonSupportedCountryLead> {

    constructor(private api: NonSupportedCountryLeadsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<NonSupportedCountryLead> | Promise<NonSupportedCountryLead> | NonSupportedCountryLead {
        let id = route.paramMap.get('id');
        if (id == 'new') {
            return new NonSupportedCountryLead();
        }
        return this.api.get(route.paramMap.get('id'));
    }

}
