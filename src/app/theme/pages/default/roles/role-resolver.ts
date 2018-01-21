import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { Role } from "../../../../models/role";
import { RolesService } from "../../../../_services/apis/role.service";

@Injectable()
export class RoleResolver implements Resolve<Role> {

    constructor(private api: RolesService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Role> | Promise<Role> | Role {
        let id = route.paramMap.get('id');
        if (id == 'new') {
            return new Role();
        }
        return this.api.get(route.paramMap.get('id'));
    }

}
