import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BaseApiService } from "../baseAPI";

import { Dashboard } from "../../models/dashboard";


@Injectable()
export class DashboardService extends BaseApiService<Dashboard> {

    constructor(http: HttpClient) {
        super(http);
        this.url = '/dashboard';
    }

    getDashboard(filter: any) {
        return this.http.post(this.baseUrl + this.url, filter, { headers: this.authorization() })
    }

}


