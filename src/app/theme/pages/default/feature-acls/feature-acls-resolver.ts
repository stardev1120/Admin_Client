
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { CountriesService } from "../../../../_services/apis/countries.service";
import { Country } from "../../../../models/country";
import { Company } from "../../../../models/company";
import { CompaniesService } from "../../../../_services/apis/company.service";
import { FeatureACL } from "../../../../models/featureACL";
import { FeatureACLsService } from "../../../../_services/apis/feature-acls.service";

@Injectable()
export class FeatureACLsResolver implements Resolve<FeatureACL[]> {

    constructor(private api: FeatureACLsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FeatureACL[]> | Promise<FeatureACL[]> | FeatureACL[] {
        return [];//this.api.query();
    }

}
