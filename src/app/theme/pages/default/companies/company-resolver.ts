import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { CompaniesService } from "../../../../_services/apis/company.service";
import { Company } from "../../../../models/company";

@Injectable()
export class CompanyResolver implements Resolve<Company> {

    constructor(private api: CompaniesService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Company> | Promise<Company> | Company {
        let id = route.paramMap.get('id');
        if (id == 'new') {
            return new Company();
        }
        return this.api.get(route.paramMap.get('id'));
    }

}
