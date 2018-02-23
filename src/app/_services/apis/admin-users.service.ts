import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import * as _ from 'lodash';
import { BaseApiService } from "../baseAPI";
import { AdminUser } from "../../models/admin-user";
import { FeatureACL } from "../../models/featureACL";


@Injectable()
export class AdminUsersService extends BaseApiService<AdminUser> {
    private _currentAdminUser: AdminUser;

    constructor(http: HttpClient) {
        super(http);
        this.url = '/admin-user';
    }

    get currentAdminUser() {
        return this._currentAdminUser;
    }

    set currentAdminUser(value: any) {
        this._currentAdminUser = value;
    }

    changePasswordByAdmin(passwordModel: any) {
        let url = this.url + '/admin/change-password';
        return this.http.put(this.baseUrl + url, passwordModel, { headers: this.authorization() });
    }

    verify() {
        if (!this._currentAdminUser) {
            return this.get('me').map((adminUser: AdminUser) => {
                this._currentAdminUser = adminUser;
                return true;
            });
        }
        return Observable.of(true);
    }

    get isSuperAdmin() {
        return (this._currentAdminUser) && (this._currentAdminUser.role_id === 1)
    }

    get isAdmin() {
        return (this._currentAdminUser) && (this._currentAdminUser.role_id === 2)
    }

    get isCallCenter() {
        return (this._currentAdminUser) && (this._currentAdminUser.role_id === 3)
    }
    get isDistributorAdmin() {
        return (this._currentAdminUser) && (this._currentAdminUser.role_id === 4)
    }
    get isDistributor() {
        return (this._currentAdminUser) && (this._currentAdminUser.role_id === 5)
    }
    get isUserhasMainRole() {
        return (this._currentAdminUser) &&
            (this._currentAdminUser.role_id >= 1) && (this._currentAdminUser.role_id <= 5)
    }
    public checkModuleRight(module: string) {
        if (this._currentAdminUser && this._currentAdminUser.Role) {
            let featureAcl = _.filter(this._currentAdminUser.Role.FeatureACLs,
                (feature: FeatureACL) => {
                    return feature.module === module;
                })[0];
            if (featureAcl && featureAcl.actions) {
                return !!featureAcl.actions['GET'];
            }
            return false;
        }
        return false;
    }

    public checkModuleActionRight(module: string, action: string) {
        if (this._currentAdminUser && this._currentAdminUser.Role) {
            let featureAcl = _.filter(this._currentAdminUser.Role.FeatureACLs,
                (feature: FeatureACL) => {
                    return feature.module === module;
                })[0];
            if (featureAcl && featureAcl.actions) {
                return !!featureAcl.actions[action];
            }
        }
        return false;
    }

    public checkModuleFieldRight(module: string, field: string) {
        if (this._currentAdminUser && this._currentAdminUser.Role) {
            let featureAcl = _.filter(this._currentAdminUser.Role.FeatureACLs,
                (feature: FeatureACL) => {
                    return feature.module === module;
                })[0];
            if (featureAcl && featureAcl.fields) {
                return !!featureAcl.fields[field];
            }
        }
        return false;
    }


    public checkModuleOtherRight(module: string, other: string) {
        if (this._currentAdminUser && this._currentAdminUser.Role) {
            let featureAcl = _.filter(this._currentAdminUser.Role.FeatureACLs,
                (feature: FeatureACL) => {
                    return feature.module === module;
                })[0];
            if (featureAcl && featureAcl.other) {
                return !!featureAcl.other[other];
            }
        }
        return false;
    }

    public getModuleAction(module: string) {
        if (this._currentAdminUser && this._currentAdminUser.Role) {
            let featureAcl = _.filter(this._currentAdminUser.Role.FeatureACLs,
                (feature: FeatureACL) => {
                    return feature.module === module;
                })[0];
            if (featureAcl && featureAcl.actions) {
                return JSON.stringify(featureAcl.actions);
            }
        }
        return JSON.stringify({});
    }

    public getModuleOther(module: string) {
        if (this._currentAdminUser && this._currentAdminUser.Role) {
            let featureAcl = _.filter(this._currentAdminUser.Role.FeatureACLs,
                (feature: FeatureACL) => {
                    return feature.module === module;
                })[0];
            if (featureAcl && featureAcl.other) {
                return JSON.stringify(featureAcl.other);
            }
        }
        return JSON.stringify({});
    }

    public changePassword(passwordModel: any) {
        let url = this.url + '/change-password';
        return this.http.put(this.baseUrl + url, passwordModel, { headers: this.authorization() }).toPromise();
    }

    public reset2FA() {
        let url = this.url + '/reset-2-fa';
        return this.http.put(this.baseUrl + url, {}, { headers: this.authorization() }).toPromise();
    }
}


