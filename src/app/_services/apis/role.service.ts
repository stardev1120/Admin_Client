import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BaseApiService } from "../baseAPI";
import { NonSupportedCountryLead } from "../../models/non-supported-country-lead";
import { Company } from "../../models/company";
import { Role } from "../../models/role";


@Injectable()
export class RolesService extends BaseApiService<Role> {

    constructor(http: HttpClient) {
        super(http);
        this.url = '/role';
    }

}


