import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import 'rxjs/add/observable/forkJoin';
import * as _ from 'lodash'
import {UsersService} from "../../../../_services/apis/users.service";
import {LoansService} from "../../../../_services/apis/loans.service";
import {CollectionsService} from "../../../../_services/apis/collections.service";
import {AdminUsersService} from "../../../../_services/apis/admin-users.service";
import {Loan} from "../../../../models/loan";
import {Collection} from "../../../../models/collection";


@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./issue-collect-money.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class IssueCollectMoneyComponent implements OnInit {
    code: string;
    id: string;

    constructor(private api: UsersService,
                private _router: Router,
                private _loanService: LoansService,
                private _collectionService: CollectionsService,
                private _adminUserService: AdminUsersService) {

    }

    ngOnInit() {
    }

    onIssueMoney(loanId: string) {
        this._loanService.get(loanId).subscribe((loan: Loan) => {
            if (loan) {
                this._router.navigate(['/issue-collect-money/issue/' + loan.user_id + '/' + loan.id]).then();
            }
        }, error => {
            console.log(error)
        })
    }

    onCollectMoney(collectionId: string) {
        this._collectionService.get(collectionId).subscribe((collection: Collection) => {
            if (collection) {
                this._router.navigate(['/issue-collect-money/collect/' + collection.Loan.user_id + '/' + collection.id]).then();
            }
        }, error => {
            console.log(error)
        })
    }

    onSubmit() {
        if (!this.code || this.code.length === 1) {
            console.log('please enter ur otp code');
            return;
        } else {
            this.id = this.code.slice(1, this.code.length);
            if (_.startsWith(this.code, 'D')) {
                if (this._adminUserService.checkModuleOtherRight('loans', 'issueMoney')) {
                    this.onIssueMoney(this.id);
                    return;
                }
                console.log('User didn\'t have a permission for issue money, please, contact Admin user')
            }
            if (_.startsWith(this.code, 'C')) {
                if (this._adminUserService.checkModuleOtherRight('collections', 'collectMoney')) {
                    this.onCollectMoney(this.id);
                    return;
                }
                console.log('User didn\'t have a permission for collect money, please, contact Admin user')
            }
        }
    }
}
