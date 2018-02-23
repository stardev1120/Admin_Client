import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { DefaultComponent } from "../default.component";
import { LayoutModule } from "../../../layouts/layout.module";
import { CountriesSettingsComponent } from "./list/countries-settings.component";
import { CountrySettingFormComponent } from "./country-setting-form/country-setting-form.component";
import { CountrySettingResolver } from "./country-settings-resolver";

import { FormsModule } from "@angular/forms";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            /*            {
                            "path": "",
                            "component": CountriesSettingsComponent
                        },*/
            {
                "path": ":id/:countryId",
                "component": CountrySettingFormComponent,
                resolve: {
                    countrySetting: CountrySettingResolver
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
        CountrySettingResolver
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