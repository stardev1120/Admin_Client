
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { DefaultComponent } from "../default.component";
import { LayoutModule } from "../../../layouts/layout.module";
import { CompaniesComponent } from "./list/companies.component";
import { CompanyFormComponent } from "./company-form/company-form.component";
import { CompanyViewComponent } from "./company-view/company-view.component";
import { CompanyResolver } from "./company-resolver";
import { CountriesResolver } from "../countries/countries-resolver";
import {AuthGuard} from "../../../../auth/_guards";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "canActivate": [AuthGuard],
        data:{module: 'companies'},
        "children": [
            {
                "path": "",
                "component": CompaniesComponent
            },
            {
                "path": ":id",
                "component": CompanyFormComponent,
                "canActivate": [AuthGuard],
                data:{module: 'companies', action: 'PUT'},
                resolve: {
                    company: CompanyResolver,
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
export class CompaniesModule {}

