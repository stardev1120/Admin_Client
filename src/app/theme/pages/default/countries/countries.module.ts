import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { DefaultComponent } from "../default.component";
import { LayoutModule } from "../../../layouts/layout.module";
import { CountrieslistComponent } from "./list/countries-list.component";
import { CountriesFormComponent } from "./countries-form/countries-form.component";
import { CountryResolver } from "./country-resolver";

import { FormsModule } from "@angular/forms";
import {CountryViewComponent} from "./countries-view/country-view.component";
import {AuthGuard} from "../../../../auth/_guards";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "canActivate": [AuthGuard],
        data:{module: 'countries'},
        "children": [
            {
                "path": "",
                "component": CountrieslistComponent
            },
            {
                "path": ":id",
                "component": CountriesFormComponent,
                "canActivate": [AuthGuard],
                data:{module: 'countries', action: 'PUT'},
                resolve: {
                    country: CountryResolver
                }
            },
            {
                "path": "view/:id",
                "component": CountryViewComponent,
                "canActivate": [AuthGuard],
                data:{module: 'countries', action: 'GET'},
                resolve: {
                    country: CountryResolver
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
        CountryResolver
    ],

    exports: [
        RouterModule

    ], declarations: [
        CountrieslistComponent,
        CountriesFormComponent,
        CountryViewComponent
    ]
})
export class CountriesListModule {


}