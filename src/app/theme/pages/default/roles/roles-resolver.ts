
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { CountriesService } from "../../../../_services/apis/countries.service";
import { Country } from "../../../../models/country";
import { Company } from "../../../../models/company";
import { CompaniesService } from "../../../../_services/apis/company.service";
import { Role } from "../../../../models/role";
import { RolesService } from "../../../../_services/apis/role.service";

@Injectable()
export class RolesResolver implements Resolve<Role[]> {

    constructor(private api: RolesService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Role[]> | Promise<Role[]> | Role[] {
        return this.api.query('{"where":{}, "fields": ["id", "role_name"]}');
    }

}
