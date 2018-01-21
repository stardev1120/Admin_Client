import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { AdminUser } from "../../../../models/admin-user";
import { AdminUsersService } from "../../../../_services/apis/admin-users.service";

@Injectable()
export class AdminUserResolver implements Resolve<AdminUser> {

    constructor(private api: AdminUsersService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AdminUser> | Promise<AdminUser> | AdminUser {
        let id = route.paramMap.get('id');
        if (id == 'new') {
            return new AdminUser();
        }
        return this.api.get(route.paramMap.get('id'));
    }

}
