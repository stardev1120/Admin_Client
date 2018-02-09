
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { Company } from "../../../../models/company";
import { CompaniesService } from "../../../../_services/apis/company.service";

@Injectable()
export class CompaniesResolver implements Resolve<Company[]> {

    constructor(private api: CompaniesService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Company[]> | Promise<Company[]> | Company[] {
        return this.api.query('{"where":{}, "fields": ["id", "company_name"]}');
    }

}
