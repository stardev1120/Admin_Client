import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { CountriesService } from "../../../../_services/apis/countries.service";
import { Country } from "../../../../models/country";
import { AdminUsersService } from "../../../../_services/apis/admin-users.service";

@Injectable()
export class CountriesResolver implements Resolve<any> {

    constructor(private api: CountriesService, private _adminUserService: AdminUsersService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        if (this._adminUserService.checkModuleActionRight('countries', 'GET')) {
            return this.api.query('{"where":{}, "fields": ["id", "name"]}');
        } else {
            return [];
        }
    }

}
