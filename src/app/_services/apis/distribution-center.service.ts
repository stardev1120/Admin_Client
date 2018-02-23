import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BaseApiService } from "../baseAPI";
import { DistributionCenter } from "../../models/distribution-center";


@Injectable()
export class DistributionCentersService extends BaseApiService<DistributionCenter> {

    constructor(http: HttpClient) {
        super(http);
        this.url = '/distribution-center';
    }

    getCentersByCompanyId(companyId: string) {
        return this.http
            .get<DistributionCenter>(this.baseUrl + this.url + `/company/${companyId}`, { headers: this.authorization() })
    }

}


