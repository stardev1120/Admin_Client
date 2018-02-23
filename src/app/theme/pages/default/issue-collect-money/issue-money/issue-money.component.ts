import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/bufferCount';

import { Loan } from "../../../../../models/loan";
import { LoansService } from "../../../../../_services/apis/loans.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./issue-money.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class IssueMoneyComponent implements OnInit {
    data: Loan;
    //previousNavUrl: string ='';
    constructor(private api: LoansService,
        private router: Router,
        private route: ActivatedRoute,
        private modalService: NgbModal) {
        /* this.router.events.pairwise().subscribe((e) => {
             console.log('e---->', e);
         });*/
        /*        this.router.events.filter(e => e instanceof NavigationEnd).pairwise().subscribe((e:any) => {
                    this.previousNavUrl = e[0].url;
                    console.log('NAVIGATION PREVIOUS => ', e,e[0].url, this.previousNavUrl);
                });*/
    }

    ngOnInit() {
        this.data = this.route.snapshot.data.loan as Loan;
    }

    onSubmit(content) {
        this.api.issueLoanMoney(this.data.id)
            .subscribe(() => {
                this.modalService.open(content).result.then(() => {
                    this.goBack();
                }, () => {
                    this.goBack();
                });
            }, error => {
                console.log(error);
            });
    }

    goBack() {
        /*console.log('this.previousNavUrl', this.previousNavUrl)
        if(this.previousNavUrl.indexOf('user') !== -1){*/
        window.history.back();
        /* } else {
             this.router.navigate(["/issue-collect-money"]);
         }*/
    }
}
