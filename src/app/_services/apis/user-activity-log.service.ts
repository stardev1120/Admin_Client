import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BaseApiService } from "../baseAPI";
import {UserActivityLog} from "../../models/user-activity-log";


@Injectable()
export class UserActivityLogService extends BaseApiService<UserActivityLog> {

    constructor(http: HttpClient) {
        super(http);
        this.url = '/user-activity-log';
    }

}


