import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from "@angular/forms";

import { DefaultComponent } from "../default.component";
import { LayoutModule } from "../../../layouts/layout.module";
import { CountriesResolver } from "../countries/countries-resolver";
import { UserResolver } from "../users/user-resolver";

import { AuthGuard } from "../../../../auth/_guards";

import { IssueCollectMoneyComponent } from "./issue-collect-money.component";
import { IssueMoneyComponent } from "./issue-money/issue-money.component";
import { CollectMoneyComponent } from "./collect-money/collect-money.component";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": IssueCollectMoneyComponent,
                "canActivate": [AuthGuard]
            },
            {
                "path": "issue/:id",
                "component": IssueMoneyComponent,
                "canActivate": [AuthGuard],
                resolve: {
                    user: UserResolver,
                    countries: CountriesResolver,
                }
            },

            {
                "path": "collect/:id",
                "component": CollectMoneyComponent,
                "canActivate": [AuthGuard],
                resolve: {
                    user: UserResolver,
                    countries: CountriesResolver,
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
        CountriesResolver,
        UserResolver
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