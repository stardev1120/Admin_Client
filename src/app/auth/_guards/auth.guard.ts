import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";

import {AdminUsersService} from "../../_services/apis/admin-users.service";
import {AdminUserAccessService} from "../../_services/apis/admin-user-access.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _router: Router, private _adminUserService: AdminUsersService,
                private _adminUserAccessService: AdminUserAccessService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        return this._adminUserService.verify().toPromise().then(
            (data) => {
                if (data !== null) {
                    if (route.data['module']) {

                        if (route.data['other'] && !route.data['checkOTP']) {
                            if (!this._adminUserService.checkModuleOtherRight(route.data['module'], route.data['other'])) {
                                this._router.navigate(['/index']).then();
                                return false;
                            }
                        }

                        if (route.data['checkOTP']) {
                            if (this._adminUserService.checkModuleOtherRight(route.data['module'], 'viewWithoutOTP')) {
                                return true
                            } else if (this._adminUserService.checkModuleOtherRight(route.data['module'], 'viewWithOTP')) {
                                return this._adminUserAccessService.checkAdminUserAccessValidation(route.params['id']).toPromise().then((valid: any) => {
                                    if (valid && valid.valid) {
                                        return true;
                                    } else {
                                        this._router.navigate(['/admin-user-access', state.url, route.params['id']]).then();
                                        return false
                                    }
                                }).catch(error => {
                                    console.log(error);
                                    this._router.navigate(['/admin-user-access', state.url, route.params['id']]).then();
                                    return false

                                });
                            }
                            this._router.navigate(['/index']).then();
                            return false;
                        } else {
                            if (!route.data['action']) {
                                if (!this._adminUserService.checkModuleRight(route.data['module'])) {
                                    this._router.navigate(['/index']).then();
                                    return false;
                                }
                            } else if (route.data['action']) {
                                if (!this._adminUserService.checkModuleActionRight(route.data['module'], route.data['action'])) {
                                    this._router.navigate(['/index']).then();
                                    return false;
                                }
                            }
                            return true;
                        }

                    } else {
                        return true;
                    }

                }
                // error when verify so redirect to login page with the return url
                this._router.navigate(['/login'], {queryParams: {returnUrl: state.url}}).then();
                return false;
            }).catch(error => {
            // error when verify so redirect to login page with the return url
            console.error(error, "error");
            this._router.navigate(['/login'], {queryParams: {returnUrl: state.url}}).then();
            return false;
        });
    }
}
