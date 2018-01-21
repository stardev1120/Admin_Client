import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { FeatureACL } from "../../../../models/featureACL";
import { FeatureACLsService } from "../../../../_services/apis/feature-acls.service";

@Injectable()
export class FeatureACLResolver implements Resolve<FeatureACL> {

    constructor(private api: FeatureACLsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FeatureACL> | Promise<FeatureACL> | FeatureACL {
        let id = route.paramMap.get('id');
        if (id == 'new') {
            return new FeatureACL();
        }
        return this.api.get(route.paramMap.get('id'));
    }

}
