import { Injectable } from "@angular/core";


import { HttpClient } from "@angular/common/http";
import { User } from "../../models/user";
import { BaseApiService } from "../baseAPI";


@Injectable()
export class UsersService extends BaseApiService<User> {

    constructor(http: HttpClient) {
        super(http);
        this.url = '/users';
    }

}


