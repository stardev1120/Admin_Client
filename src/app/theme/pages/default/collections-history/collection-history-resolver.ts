import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { CollectionHistory } from "../../../../models/collection-history";
import { CollectionsHistoryService } from "../../../../_services/apis/collections-history.service";

@Injectable()
export class CollectionHistoryResolver implements Resolve<CollectionHistory> {

    constructor(private api: CollectionsHistoryService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CollectionHistory> | Promise<CollectionHistory> | CollectionHistory {
        let id = route.paramMap.get('id');
        if (id == 'new') {
            return new CollectionHistory();
        }
        return this.api.get(route.paramMap.get('id'));
    }

}
