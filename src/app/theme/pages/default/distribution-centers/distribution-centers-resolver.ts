
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { CountriesService } from "../../../../_services/apis/countries.service";
import { Country } from "../../../../models/country";
import { Company } from "../../../../models/company";
import { CompaniesService } from "../../../../_services/apis/company.service";
import { DistributionCentersService } from "../../../../_services/apis/distribution-center.service";
import { DistributionCenter } from "../../../../models/distribution-center";

@Injectable()
export class CompaniesResolver implements Resolve<DistributionCenter[]> {

    constructor(private api: DistributionCentersService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DistributionCenter[]> | Promise<DistributionCenter[]> | DistributionCenter[] {
        return [];//this.api.query();
    }

}
