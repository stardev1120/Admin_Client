import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BaseApiService } from "../baseAPI";
import { NonSupportedCountryLead } from "../../models/non-supported-country-lead";
import { Company } from "../../models/company";
import { DistributionCenter } from "../../models/distribution-center";


@Injectable()
export class DistributionCentersService extends BaseApiService<DistributionCenter> {

    constructor(http: HttpClient) {
        super(http);
        this.url = '/distribution-center';
    }

}


