import { Injectable } from "@angular/core";


import { HttpClient } from "@angular/common/http";
import { User } from "../../models/user";
import { BaseApiService } from "../baseAPI";
import { AdminUser } from "../../models/admin-user";


@Injectable()
export class AdminUsersService extends BaseApiService<AdminUser> {

    constructor(http: HttpClient) {
        super(http);
        this.url = '/admin-user';
    }

}


