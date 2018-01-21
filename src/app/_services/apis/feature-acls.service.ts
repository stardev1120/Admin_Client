import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BaseApiService } from "../baseAPI";
import { NonSupportedCountryLead } from "../../models/non-supported-country-lead";
import { Company } from "../../models/company";
import { Role } from "../../models/role";
import { FeatureACL } from "../../models/featureACL";


@Injectable()
export class FeatureACLsService extends BaseApiService<FeatureACL> {

    constructor(http: HttpClient) {
        super(http);
        this.url = '/feature-acl';
    }

}


