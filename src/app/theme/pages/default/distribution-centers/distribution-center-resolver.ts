import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { DistributionCentersService } from "../../../../_services/apis/distribution-center.service";
import { DistributionCenter } from "../../../../models/distribution-center";

@Injectable()
export class DistributionCenterResolver implements Resolve<DistributionCenter> {

    constructor(private api: DistributionCentersService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DistributionCenter> | Promise<DistributionCenter> | DistributionCenter {
        let id = route.paramMap.get('id');
        if (id == 'new') {
            return new DistributionCenter();
        }
        return this.api.get(route.paramMap.get('id'));
    }

}
