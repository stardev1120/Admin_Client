import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";


import { DefaultComponent } from "../default.component";
import { LayoutModule } from "../../../layouts/layout.module";
import { FeatureACLsComponent } from "./list/feature-acls.component";
import { FeatureACLFormComponent } from "./feature-acl-form/feature-acl-form.component";
import { FeatureACLResolver } from "./feature-acl-resolver";
import { RolesResolver } from "../roles/roles-resolver";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": FeatureACLsComponent
            },
            {
                "path": ":id",
                "component": FeatureACLFormComponent,
                resolve: {
                    featureACL: FeatureACLResolver,
                    roles: RolesResolver
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
        FormsModule
    ],
    providers: [
        FeatureACLResolver,
        RolesResolver
    ],

    exports: [
        RouterModule

    ], declarations: [
        FeatureACLsComponent,
        FeatureACLFormComponent
    ]
})
export class FeatureACLsModule {


}