import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { DefaultComponent } from "../default.component";
import { LayoutModule } from "../../../layouts/layout.module";
import { CompaniesComponent } from "./list/Companies.component";
import { CompanyFormComponent } from "./Company-form/Company-form.component";
import { CompanyViewComponent } from "./Company-view/Company-view.component";
import { CompanyResolver } from "./Company-resolver";
import { CountriesResolver } from "../countries/countries-resolver";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": CompaniesComponent
            },
            {
                "path": ":id",
                "component": CompanyFormComponent,
                resolve: {
                    company: CompanyResolver,
                    countries: CountriesResolver
                }
            },
            {
                "path": "view/:id",
                "component": CompanyViewComponent,
                resolve: {
                    company: CompanyResolver
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
        CompanyResolver,
        CountriesResolver
    ],

    exports: [
        RouterModule

    ], declarations: [
        CompaniesComponent,
        CompanyFormComponent,
        CompanyViewComponent
    ]
})
export class CompaniesModule {


}