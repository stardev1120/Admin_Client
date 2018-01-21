import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../_services/user.service";
import { Observable } from "rxjs/Rx";
import _ from 'lodash'

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _router: Router, private _userService: UserService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (!currentUser) {
            this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }

        if (_.startsWith(state.url, '/issue-collect-money/issue/user_id')) {
            // todo we need to check back end otp table with the current admin user and user id
            this._router.navigate(['/admin-user-access', state.url]);
            return false;
        }

        if (_.startsWith(state.url, '/issue-collect-money/collect/user_id')) {
            // todo we need to check back end otp table with the current admin user and user id
            this._router.navigate(['/admin-user-access', state.url]);
            return false;
        }

        if (_.startsWith(state.url, '/users/view/user_id')) {
            // todo we need to check back end otp table with the current admin user and user id
            this._router.navigate(['/admin-user-access', state.url]);
            return false;
        }
        return true;/* this._userService.verify().map(
            data => {
                if (data !== null) {
                    // logged in so return true
                    return true;
                }
                // error when verify so redirect to login page with the return url
                this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                return false;
            },
            error => {
                // error when verify so redirect to login page with the return url
                console.error(error, "erroooor")
                this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                return false;
            });*/
    }
}