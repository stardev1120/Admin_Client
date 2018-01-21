import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { DefaultComponent } from "../default.component";
import { LayoutModule } from "../../../layouts/layout.module";
import { CountriesSettingsComponent } from "./list/countries-settings.component";
import { CountrySettingFormComponent } from "./country-setting-form/country-setting-form.component";
import { CountrySettingResolver } from "./country-settings-resolver";

import { FormsModule } from "@angular/forms";
import { CountriesResolver } from "../countries/countries-resolver";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": CountriesSettingsComponent
            },
            {
                "path": ":id",
                "component": CountrySettingFormComponent,
                resolve: {
                    countrySetting: CountrySettingResolver,
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
        CountrySettingResolver,
        CountriesResolver
    ],

    exports: [
        RouterModule

    ], declarations: [
        CountriesSettingsComponent,
        CountrySettingFormComponent
    ]
})
export class CountriesSettingsModule {


}