import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseApiService } from "../baseAPI";
import { CollectionHistory } from "../../models/collection-history";


@Injectable()
export class CollectionsHistoryService extends BaseApiService<CollectionHistory> {

    constructor(http: HttpClient) {
        super(http);
        this.url = '/collection-history';
    }

}


