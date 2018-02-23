import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from "@angular/forms";

import { DefaultComponent } from "../default.component";
import { LayoutModule } from "../../../layouts/layout.module";
import { AuthGuard } from "../../../../auth/_guards";
import { AdminCollectDistributeComponent } from "./list/admin-collect-distribute.component";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": AdminCollectDistributeComponent,
                "canActivate": [AuthGuard],
                data: { module: 'admin-collect-distribute', action: 'GET' },
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
    providers: [],

    exports: [
        RouterModule

    ], declarations: [
        AdminCollectDistributeComponent
    ]
})
export class AdminCollectDistributeModule {

}