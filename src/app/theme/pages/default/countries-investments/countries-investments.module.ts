import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { DefaultComponent } from "../default.component";
import { LayoutModule } from "../../../layouts/layout.module";
import { CountriesInvestmentsComponent } from "./list/countries-investments.component";
import { CountryInvestmentFormComponent } from "./country-investment-form/country-investment-form.component";
import { CountryInvestmentResolver } from "./country-investment-resolver";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": CountriesInvestmentsComponent
            },
            {
                "path": ":id/:countryId",
                "component": CountryInvestmentFormComponent,
                resolve: {
                    countryInvestment: CountryInvestmentResolver,
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
        CountryInvestmentResolver
    ],

    exports: [
        RouterModule

    ], declarations: [
        CountriesInvestmentsComponent,
        CountryInvestmentFormComponent
    ]
})
export class CountriesInvestmentsModule {


}