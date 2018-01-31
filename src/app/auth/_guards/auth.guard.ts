import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {UserService} from "../_services/user.service";
import {Observable} from "rxjs/Rx";
import * as _ from 'lodash'
import {AdminUsersService} from "../../_services/apis/admin-users.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _router: Router, private _adminUserService: AdminUsersService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        return this._adminUserService.verify().toPromise().then(
            (data) => {
                if (data !== null) {
                    if (route.data['module']) {

                        if(route.data['other']){
                            if(!this._adminUserService.checkModuleOtherRight(route.data['module'], route.data['other'])){
                                this._router.navigate(['/index'], {queryParams: {returnUrl: state.url}});
                                return false;
                            }
                        }

                        if (route.data['checkOTP']) {
                            if (this._adminUserService.checkModuleOtherRight('users', 'viewWithoutOTP')) {
                                return true
                            } else if (this._adminUserService.checkModuleOtherRight('users', 'viewWithOTP')) {
                                this._router.navigate(['/admin-user-access', state.url]);
                                return false
                            }
                            this._router.navigate(['/index'], {queryParams: {returnUrl: state.url}});
                            return false;
                        }
                        if (!route.data['action']) {
                            if (!this._adminUserService.checkModuleRight(route.data['module'])) {
                                this._router.navigate(['/index'], {queryParams: {returnUrl: state.url}});
                                return false;
                            }
                        } else if (route.data['action']) {
                            if (!this._adminUserService.checkModuleActionRight(route.data['module'], route.data['action'])) {
                                this._router.navigate(['/index'], {queryParams: {returnUrl: state.url}});
                                return false;
                            }
                        }
                    }
                    return true;
                }
                // error when verify so redirect to login page with the return url
                this._router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
                return false;
            }).catch(error => {
            // error when verify so redirect to login page with the return url
            console.error(error, "erroooor")
            this._router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
            return false;
        });
    }
}
