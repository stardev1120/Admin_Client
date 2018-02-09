import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from "@angular/forms";

import {DefaultComponent} from "../default.component";
import {LayoutModule} from "../../../layouts/layout.module";

import {AuthGuard} from "../../../../auth/_guards";

import {IssueCollectMoneyComponent} from "./issue-collect-money.component";
import {IssueMoneyComponent} from "./issue-money/issue-money.component";
import {CollectMoneyComponent} from "./collect-money/collect-money.component";
import {LoanResolver} from "../loans/loan-resolver";
import {CollectionResolver} from "../collections/collection-resolver";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "canActivate": [AuthGuard],
        data: {module: 'issue-collect-money'},
        "children": [
            {
                "path": "",
                "component": IssueCollectMoneyComponent
            },
            {
                "path": "issue/:id/:loanId",
                "component": IssueMoneyComponent,
                "canActivate": [AuthGuard],
                data: {module: 'issue-collect-money', other: 'issueMoney', checkOTP: true},
                resolve: {
                    loan: LoanResolver
                }
            },

            {
                "path": "collect/:id/:collectId",
                "component": CollectMoneyComponent,
                "canActivate": [AuthGuard],
                data: {module: 'issue-collect-money', other: 'issueCollect', checkOTP: true},
                resolve: {
                    collection: CollectionResolver
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        LayoutModule,
        NgbModule.forRoot(),
        FormsModule
    ],
    providers: [
        CollectionResolver,
        LoanResolver
    ],

    exports: [
        RouterModule

    ], declarations: [
        IssueMoneyComponent,
        CollectMoneyComponent,
        IssueCollectMoneyComponent
    ]
})
export class IssueCollectMoneyModule {


}