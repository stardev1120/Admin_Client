import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { DefaultComponent } from "../default.component";
import { LayoutModule } from "../../../layouts/layout.module";
import { AdminUsersCountriesComponent } from "./list/admin-users-countries.component";
import { AdminUserCountryFormComponent } from "./admin-user-country-form/admin-user-country-form.component";
import { AdminUserCountryResolver } from "./admin-user-country-resolver";
import { CountriesResolver } from "../countries/countries-resolver";
import { AdminUsersResolver } from "../admin-users/admin-users-resolver";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": AdminUsersCountriesComponent
            },
            {
                "path": ":id",
                "component": AdminUserCountryFormComponent,
                resolve: {
                    adminUserCountry: AdminUserCountryResolver,
                    countries: CountriesResolver,
                    adminUsers: AdminUsersResolver
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
        AdminUserCountryResolver,
        CountriesResolver,
        AdminUsersResolver
    ],

    exports: [
        RouterModule

    ], declarations: [
        AdminUsersCountriesComponent,
        AdminUserCountryFormComponent
    ]
})
export class AdminUsersCountriesModule {


}