import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Loan } from "../../../../models/loan";
import { LoansService } from "../../../../_services/apis/loans.service";

@Injectable()
export class LoanResolver implements Resolve<Loan> {

    constructor(private api: LoansService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Loan> | Promise<Loan> | Loan {
        let id = route.paramMap.get('loanId');
        if (id == 'new') {
            return new Loan();
        }
        return this.api.get(route.paramMap.get('loanId'));
    }

}
