import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BaseApiService } from "../baseAPI";
import { NonSupportedCountryLead } from "../../models/non-supported-country-lead";


@Injectable()
export class NonSupportedCountryLeadsService extends BaseApiService<NonSupportedCountryLead> {

    constructor(http: HttpClient) {
        super(http);
        this.url = '/non-supported-country-lead';
    }

}


