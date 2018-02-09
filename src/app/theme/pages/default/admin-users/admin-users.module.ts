import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from "@angular/forms";

import { DefaultComponent } from "../default.component";
import { LayoutModule } from "../../../layouts/layout.module";
import { AdminUsersComponent } from "./list/admin-users.component";
import { AdminUserFormComponent } from "./admin-user-form/admin-user-form.component";
import { CompaniesResolver } from "../companies/companies-resolver";
import { RolesResolver } from "../roles/roles-resolver";
import { AdminUserResolver } from "./admin-user-resolver";
import { CountriesResolver } from "../countries/countries-resolver";
import {AuthGuard} from "../../../../auth/_guards";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "canActivate": [AuthGuard],
        data:{module: 'admin-users'},
        "children": [
            {
                "path": "",
                "component": AdminUsersComponent
            },
            {
                "path": ":id",
                "component": AdminUserFormComponent,
                "canActivate": [AuthGuard],
                data:{module: 'admin-users', action: 'PUT'},
                resolve: {
                    adminUser: AdminUserResolver,
                    companies: CompaniesResolver,
                    roles: RolesResolver,
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
        CompaniesResolver,
        RolesResolver,
        AdminUserResolver,
        CountriesResolver
    ],

    exports: [
        RouterModule

    ], declarations: [
        AdminUsersComponent,
        AdminUserFormComponent
    ]
})
export class AdminUsersModule {


}
