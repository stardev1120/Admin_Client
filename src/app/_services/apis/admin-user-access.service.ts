import { Injectable } from "@angular/core";


import { HttpClient } from "@angular/common/http";
import { User } from "../../models/user";
import { BaseApiService } from "../baseAPI";
import { AdminUser } from "../../models/admin-user";
import { AdminUserCountry } from "../../models/admin-user-country";
import { AdminUserAccess } from "../../models/admin-user-access";


@Injectable()
export class AdminUserAccessService extends BaseApiService<AdminUserAccess> {

    constructor(http: HttpClient) {
        super(http);
        this.url = '/admin-user-access';
    }

    public verifyOTP(otp: string, user_id: string) {
        return this.http.put(this.baseUrl + this.url, {
            otp: otp,
            user_id: user_id
        }, { headers: this.authorization() });
    }

    public checkAdminUserAccessValidation(user_id) {
        return this.http.post(this.baseUrl + this.url + '/checkUser', {
            user_id: user_id
        }, { headers: this.authorization() });
    }
}


