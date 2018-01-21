import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { User } from "../../../../models/user";
import { UsersService } from "../../../../_services/apis/users.service";

@Injectable()
export class UserResolver implements Resolve<User> {

    constructor(private api: UsersService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> | User {
        let id = route.paramMap.get('id');
        if (id == 'new' || id == 'user_id') { //todo remove user_id for testing
            return new User();
        }
        return this.api.get(route.paramMap.get('id'));
    }

}
