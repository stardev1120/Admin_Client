import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { DefaultComponent } from "../default.component";
import { LayoutModule } from "../../../layouts/layout.module";
import { CountrieslistComponent } from "./list/countries-list.component";
import { CountriesFormComponent } from "./countries-form/countries-form.component";
import { CountryResolver } from "./country-resolver";

import { FormsModule } from "@angular/forms";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": CountrieslistComponent
            },
            {
                "path": ":id",
                "component": CountriesFormComponent,
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
        CountriesFormComponent
    ]
})
export class CountriesListModule {


}