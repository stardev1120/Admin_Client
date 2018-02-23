import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import 'rxjs/add/observable/forkJoin';

import { Loan } from "../../../../../models/loan";
import { LoansService } from "../../../../../_services/apis/loans.service";
import { ScriptLoaderService } from "../../../../../_services/script-loader.service";
import { environment } from "../../../../../../environments/environment";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./loan-view.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class LoanViewComponent implements OnInit {
    data: Loan;
    filter: any = {};
    grid: any;

    constructor(private api: LoansService,
        private router: Router,
        private route: ActivatedRoute,
        private _script: ScriptLoaderService) {

    }

    ngOnInit() {
        this.data = this.route.snapshot.data.loan as Loan;
    }

    ngAfterViewInit() {
        this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            'assets/grids/loans-history.js').then(() => {
                this.grid = (window as any).Datatable_Loan_History_AJAX_DEMO;
                if (this.grid) {
                    if (this.data.id) {
                        this.filter = {
                            loan_id: this.data.id
                        }
                    } else {
                        this.filter = { loan_id: -1 };
                    }
                    this.grid.init(this.filter, environment.baseUrl);
                }
            });
    }

    goBack() {
        window.history.back();
    }
}
