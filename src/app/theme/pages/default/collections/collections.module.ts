import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { DefaultComponent } from "../default.component";
import { LayoutModule } from "../../../layouts/layout.module";
import { CollectionsComponent } from "./list/collections.component";
import { CollectionFormComponent } from "./collection-form/collection-form.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from "@angular/forms";
import { LoansResolver } from "../loans/loans-resolver";
import { CollectionResolver } from "./collection-resolver";
import { AuthGuard } from "../../../../auth/_guards";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "canActivate": [AuthGuard],
        data: { module: 'collections' },
        "children": [
            {
                "path": "",
                "component": CollectionsComponent
            },
            {
                "path": ":id",
                "component": CollectionFormComponent,
                "canActivate": [AuthGuard],
                data: { module: 'collections', action: 'PUT' },
                resolve: {
                    collection: CollectionResolver,
                    loans: LoansResolver
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
        LoansResolver
    ],

    exports: [
        RouterModule

    ], declarations: [
        CollectionsComponent,
        CollectionFormComponent
    ]
})
export class CollectionsModule {


}