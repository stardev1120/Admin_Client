import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import 'rxjs/add/observable/forkJoin';

import { LoansService } from "../../../../../_services/apis/loans.service";
import { Loan } from "../../../../../models/loan";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./loan-form.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class LoanFormComponent implements OnInit {
    data: Loan;
    users: any = [];
    statuses: any[] = [
        {
            key: 'Active',
            value: 'Active'
        },
        {
            key: 'To-be-Processed',
            value: 'To be Processed'
        },
        {
            key: 'To-be-Given',
            value: 'To be Given'
        },
        {
            key: 'Closed',
            value: 'Closed'
        },
        {
            key: 'Cancel',
            value: 'Cancel'
        }
    ];
    constructor(private api: LoansService,
        private router: Router,
        private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.data = this.route.snapshot.data.loan as Loan;
        this.users = this.route.snapshot.data.users as any;
    }

    onSubmit(mForm: any) {

        if (mForm.valid) {
            this.api.save(this.data)
                .subscribe(() => {
                    this.router.navigate(["/users"]).then();
                });
        }
    }
}
