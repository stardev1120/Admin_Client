import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { DefaultComponent } from "../default.component";
import { LayoutModule } from "../../../layouts/layout.module";
import { UsersComponent } from "./list/users.component";
import { UserFormComponent } from "./user-form/user-form.component";
import { CountriesResolver } from "../countries/countries-resolver";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from "@angular/forms";

import { UserResolver } from "./user-resolver";

import { UsersResolver } from "./users-resolver";
import { AuthGuard } from "../../../../auth/_guards";
import { UserViewComponent } from "./user-view/user-view.component";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        canActivate: [AuthGuard],
        data: { module: 'users' },
        "children": [
            {
                "path": "",
                "component": UsersComponent
            },
            {
                "path": ":id",
                "component": UserFormComponent,
                canActivate: [AuthGuard],
                data: { module: 'users', action: 'PUT' },
                resolve: {
                    user: UserResolver,
                    countries: CountriesResolver,
                }
            },
            {
                "path": "view/:id",
                "component": UserViewComponent,
                resolve: {
                    user: UserResolver,
                    countries: CountriesResolver
                },
                canActivate: [AuthGuard],
                data: { module: 'users', checkOTP: true }
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
        UserResolver,
        UsersResolver
    ],

    exports: [
        RouterModule

    ], declarations: [
        UsersComponent,
        UserFormComponent,
        UserViewComponent
    ]
})
export class UsersListModule {


}