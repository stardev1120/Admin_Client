import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {DefaultComponent} from "../default.component";
import {LayoutModule} from "../../../layouts/layout.module";
import {CollectionsComponent} from "./list/collections.component";
import {CollectionFormComponent} from "./collection-form/collection-form.component";
import {FormsModule} from "@angular/forms";
import {LoansResolver} from "../loans/loans-resolver";
import {CollectionResolver} from "./collection-resolver";
import {AuthGuard} from "../../../../auth/_guards";
import {CollectionViewComponent} from "./collection-view/collection-view.component";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "canActivate": [AuthGuard],
        data: {module: 'collections'},
        "children": [
            {
                "path": "",
                "component": CollectionsComponent
            },
            {
                "path": ":collectId",
                "component": CollectionFormComponent,
                "canActivate": [AuthGuard],
                data: {module: 'collections', action: 'PUT'},
                resolve: {
                    collection: CollectionResolver,
                    loans: LoansResolver
                }
            },
            {
                "path": "view/:collectId",
                "component": CollectionViewComponent,
                "canActivate": [AuthGuard],
                data: {module: 'collections', action: 'GET'},
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
        CollectionResolver
    ],

    exports: [
        RouterModule

    ], declarations: [
        CollectionsComponent,
        CollectionFormComponent,
        CollectionViewComponent
    ]
})
export class CollectionsModule {


}