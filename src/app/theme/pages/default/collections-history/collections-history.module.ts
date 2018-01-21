import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { DefaultComponent } from "../default.component";
import { LayoutModule } from "../../../layouts/layout.module";
import { CollectionsHistoryComponent } from "./list/collections-history.component";
import { CollectionHistoryFormComponent } from "./collection-history-form/collection-history-form.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from "@angular/forms";
import { CollectionHistoryResolver } from "./collection-history-resolver";
import { LoansResolver } from "../loans/loans-resolver";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": CollectionsHistoryComponent
            },
            {
                "path": ":id",
                "component": CollectionHistoryFormComponent,
                resolve: {
                    collectionHistory: CollectionHistoryResolver,
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
        CollectionHistoryResolver,
        LoansResolver
    ],

    exports: [
        RouterModule

    ], declarations: [
        CollectionsHistoryComponent,
        CollectionHistoryFormComponent
    ]
})
export class CollectionsHistoryModule {


}