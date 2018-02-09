import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import 'rxjs/add/observable/forkJoin';

import {Loan} from "../../../../../models/loan";
import {LoansService} from "../../../../../_services/apis/loans.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./issue-money.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class IssueMoneyComponent implements OnInit {
    data: Loan;

    constructor(private api: LoansService,
                private router: Router,
                private route: ActivatedRoute,
                private modalService: NgbModal) {
    }

    ngOnInit() {
        this.data = this.route.snapshot.data.loan as Loan;
    }

    onSubmit(content) {
        this.data.status = 'Active';
        this.api.save(this.data)
            .subscribe(() => {
                this.modalService.open(content).result.then((result) => {
                    this.router.navigate(["/issue-collect-money"])
                }, () => {
                    this.router.navigate(["/issue-collect-money"])
                });
            }, error => {
                console.log(error);
            });
    }
}
