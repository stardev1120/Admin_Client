import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from "@angular/forms";

import { DefaultComponent } from "../default.component";
import { LayoutModule } from "../../../layouts/layout.module";
import { AdminUserAccessComponent } from "./admin-user-access.component";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": ":stateUrl/:userId",
                "component": AdminUserAccessComponent
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
    ],

    exports: [
        RouterModule

    ], declarations: [
        AdminUserAccessComponent
    ]
})
export class AdminUserAccessModule {

}