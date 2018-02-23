import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";


import { DefaultComponent } from "../default.component";
import { LayoutModule } from "../../../layouts/layout.module";
import { RolesComponent } from "./list/roles.component";
import { RoleFormComponent } from "./role-form/role-form.component";
import { RoleResolver } from "./role-resolver";
import { AuthGuard } from "../../../../auth/_guards";
import { RoleViewComponent } from "./role-view/role-view.component";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "canActivate": [AuthGuard],
        data: { module: 'roles' },
        "children": [
            {
                "path": "",
                "component": RolesComponent
            },
            {
                "path": ":id",
                "component": RoleFormComponent,
                "canActivate": [AuthGuard],
                data: { module: 'roles', action: 'PUT' },
                resolve: {
                    role: RoleResolver
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
        RoleResolver
    ],

    exports: [
        RouterModule

    ], declarations: [
        RolesComponent,
        RoleFormComponent,
        RoleViewComponent
    ]
})
export class RolesModule {


}