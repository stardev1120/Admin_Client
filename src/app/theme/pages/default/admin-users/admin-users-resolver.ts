import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { AdminUser } from "../../../../models/admin-user";
import { AdminUsersService } from "../../../../_services/apis/admin-users.service";

@Injectable()
export class AdminUsersResolver implements Resolve<AdminUser[]> {

    constructor(private api: AdminUsersService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AdminUser[]> | Promise<AdminUser[]> | AdminUser[] {
        return [];//this.api.query({});
    }

}
