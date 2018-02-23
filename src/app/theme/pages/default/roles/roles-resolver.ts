
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { CountriesService } from "../../../../_services/apis/countries.service";
import { Country } from "../../../../models/country";
import { Company } from "../../../../models/company";
import { CompaniesService } from "../../../../_services/apis/company.service";
import { Role } from "../../../../models/role";
import { RolesService } from "../../../../_services/apis/role.service";
import { AdminUsersService } from "../../../../_services/apis/admin-users.service";

@Injectable()
export class RolesResolver implements Resolve<Role[]> {

    constructor(private api: RolesService, private _adminUserService: AdminUsersService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Role[]> | Promise<Role[]> | Role[] {
        if (this._adminUserService.checkModuleActionRight('roles', 'GET')) {
            return this.api.query('{"where":{}, "fields": ["id", "role_name"]}');
        } else {
            return [];
        }
    }

}
