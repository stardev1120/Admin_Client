import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {Router} from "@angular/router";
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
    error = '';
    hasError = false;
    submitted = false;

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
                if(loan.status === 'To-be-Given'){
                    if (loan.user_id) {
                        if(loan.User){
                            this._router.navigate(['/issue-collect-money/issue/' + loan.user_id + '/' + loan.id]).then();
                        } else {
                            this.error = 'Loan\'s user didn\'t belong to a current counrty';
                            this.hasError = true;
                        }
                    }
                    else {
                        this.error = 'Loan didn\'t belong to a certain user';
                        this.hasError = true;
                    }
                } else {
                    this.error = 'Loan is already issued.';
                    this.hasError = true;
                }
            } else {
                this.error = 'Invalid loan id';
                this.hasError = true;
            }
        }, error => {
            console.log(error)
            this.error = error.error.text;
            this.hasError = true;
        })
    }

    onCollectMoney(collectionId: string) {
        this._collectionService.get(collectionId).subscribe((collection: Collection) => {
            if (collection) {
                if(collection.status !== 'Collected'){
                    if (collection.Loan && collection.Loan.user_id) {
                        this._router.navigate(['/issue-collect-money/collect/' + collection.Loan.user_id + '/' + collection.id]).then();
                    }
                    else {
                        this.error = 'Collection didn\'t belong to a certain user';
                        this.hasError = true;
                    }
                } else {
                    this.error = 'Collection is already collected';
                    this.hasError = true;
                }
            } else {
                this.error = 'Invalid collection id';
                this.hasError = true;
            }
        }, error => {
            console.log(error)
            this.error = error.error.text;
            this.hasError = true;
        })
    }

    onSubmit() {
        this.submitted = true;
        this.error = '';
        this.hasError = false;
        if (!this.code || this.code.length === 1) {
            this.error = 'Enter ur otp code';
            this.hasError = true;
            return;
        } else {
            this.id = this.code.slice(1, this.code.length);
            if (_.startsWith(this.code.toLowerCase(), 'd')) {
                if (this._adminUserService.checkModuleOtherRight('loans', 'issueMoney')) {
                    this.onIssueMoney(this.id);
                    return;
                }
                //console.log('User didn\'t have a permission for issue money, please, contact Admin user')
            } else if (_.startsWith(this.code.toLowerCase(), 'c')) {
                if (this._adminUserService.checkModuleOtherRight('collections', 'collectMoney')) {
                    this.onCollectMoney(this.id);
                    return;
                }
                //console.log('User didn\'t have a permission for collect money, please, contact Admin user')
            } else {
                this.error = 'Invalid id';
                this.hasError = true;
            }
        }
    }

    onChangeOtp() {
        this.submitted = false;
        this.error = '';
        this.hasError = false;
    }
}
