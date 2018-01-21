import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BaseApiService } from "../baseAPI";
import { CountrySetting } from "../../models/country-setting";


@Injectable()
export class CountriesSettingsService extends BaseApiService<CountrySetting> {

    constructor(http: HttpClient) {
        super(http);
        this.url = '/country-setting';
    }

}


