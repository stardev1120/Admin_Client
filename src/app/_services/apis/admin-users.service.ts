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

    verify() {
        if (!this._currentAdminUser) {
            return this.get('me').map((adminUser: AdminUser) => {
                this._currentAdminUser = adminUser;
                return true;
            });
        }
        return Observable.of(true);
    }

    public checkModuleRight(module: string) {
        if (this._currentAdminUser) {
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
        if (this._currentAdminUser) {
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
        if (this._currentAdminUser) {
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
        if (this._currentAdminUser) {
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
        if (this._currentAdminUser) {
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
        if (this._currentAdminUser) {
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
    public async changePassword(passwordModel: any) {
        this.url = this.url + '/change-passoword';
        let res = await this.updateWithoutId(passwordModel).toPromise()
        this.url = '/admin-user';
        return res
    }
}


