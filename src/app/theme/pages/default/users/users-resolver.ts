import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { User } from "../../../../models/user";
import { UsersService } from "../../../../_services/apis/users.service";

@Injectable()
export class UsersResolver implements Resolve<User[]> {

    constructor(private api: UsersService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> | Promise<User[]> | User[] {
        return [];//this.api.query({});
    }

}
