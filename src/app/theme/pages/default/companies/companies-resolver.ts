import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { Company } from "../../../../models/company";
import { CompaniesService } from "../../../../_services/apis/company.service";
import { AdminUsersService } from "../../../../_services/apis/admin-users.service";

@Injectable()
export class CompaniesResolver implements Resolve<Company[]> {

    constructor(private api: CompaniesService, private _adminUserService: AdminUsersService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Company[]> | Promise<Company[]> | Company[] {
        if (this._adminUserService.checkModuleActionRight('companies', 'GET')) {
            return this.api.query('{"where":{}, "fields": ["id", "company_name"]}');
        } else {
            return [];
        }
    }

}
