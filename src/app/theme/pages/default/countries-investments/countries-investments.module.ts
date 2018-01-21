import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { DefaultComponent } from "../default.component";
import { LayoutModule } from "../../../layouts/layout.module";
import { CountriesInvestmentsComponent } from "./list/countries-investments.component";
import { CountryInvestmentFormComponent } from "./country-investment-form/country-investment-form.component";
import { CountryInvestmentResolver } from "./country-investment-resolver";

import { FormsModule } from "@angular/forms";
import { CountriesResolver } from "../countries/countries-resolver";

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
                "path": ":id",
                "component": CountryInvestmentFormComponent,
                resolve: {
                    countryInvestment: CountryInvestmentResolver,
                    countries: CountriesResolver
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
        CountriesResolver,
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