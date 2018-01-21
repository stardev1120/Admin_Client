import { Injectable } from "@angular/core";


import { HttpClient } from "@angular/common/http";
import { Loan } from "../../models/loan";
import { BaseApiService } from "../baseAPI";


@Injectable()
export class LoansService extends BaseApiService<Loan> {

    constructor(http: HttpClient) {
        super(http);
        this.url = '/loan';
    }

}


