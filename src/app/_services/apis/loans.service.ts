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

    getLoansCountOfUser(userId: string) {
        let filter = { "where": { "user_id": userId } };
        return this.http.get(this.baseUrl + this.url + '/count?filter=' + JSON.stringify(filter), { headers: this.authorization() });
    }

    issueLoanMoney(loanId: string) {
        return this.http.put(this.baseUrl + this.url + '/issue-money/' + loanId, {}, { headers: this.authorization() });
    }
}


