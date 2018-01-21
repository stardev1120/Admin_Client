import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { Country } from "../../models/country";
import { BaseApiService } from "../baseAPI";


@Injectable()
export class CountriesService extends BaseApiService<Country> {

    constructor(http: HttpClient) {
        super(http);
        this.url = '/country';
    }

}


