import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BaseApiService } from "../baseAPI";
import { CountryInvestment } from "../../models/country-investment";


@Injectable()
export class CountriesInvestmentService extends BaseApiService<CountryInvestment> {

    constructor(http: HttpClient) {
        super(http);
        this.url = '/country-investment';
    }

}


