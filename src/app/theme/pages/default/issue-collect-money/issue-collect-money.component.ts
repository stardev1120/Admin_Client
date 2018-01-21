import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from "../../../../_services/apis/users.service";
import 'rxjs/add/observable/forkJoin';

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./issue-collect-money.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class IssueCollectMoneyComponent implements OnInit {
    constructor(private api: UsersService,
        private _router: Router) {

    }

    ngOnInit() {
    }
    onIssueMoney() {
        this._router.navigate(['/issue-collect-money/issue', 'user_id']).then();
    }
    onCollectMoney() {
        this._router.navigate(['/issue-collect-money/collect', 'user_id']).then();
    }
}
