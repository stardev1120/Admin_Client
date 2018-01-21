import { Injectable } from "@angular/core";


import { HttpClient } from "@angular/common/http";
import { User } from "../../models/user";
import { BaseApiService } from "../baseAPI";
import { AdminUser } from "../../models/admin-user";
import { AdminUserCountry } from "../../models/admin-user-country";


@Injectable()
export class AdminUserCountriesService extends BaseApiService<AdminUserCountry> {

    constructor(http: HttpClient) {
        super(http);
        this.url = '/admin-user-country';
    }

}


