import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Collection } from "../../../../models/collection";
import { CollectionsService } from "../../../../_services/apis/collections.service";

@Injectable()
export class CollectionsResolver implements Resolve<Collection[]> {

    constructor(private api: CollectionsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Collection[]> | Promise<Collection[]> | Collection[] {
        return [];//this.api.query({});
    }

}
