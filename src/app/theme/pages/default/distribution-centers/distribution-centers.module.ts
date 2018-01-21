import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";


import { DefaultComponent } from "../default.component";
import { LayoutModule } from "../../../layouts/layout.module";
import { DistributionCentersComponent } from "./list/distribution-centers.component";
import { DistributionCenterFormComponent } from "./distribution-center-form/distribution-center-form.component";
import { CompaniesResolver } from "../companies/companies-resolver";
import { CountriesResolver } from "../countries/countries-resolver";
import { DistributionCenterResolver } from "./distribution-center-resolver";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": DistributionCentersComponent
            },
            {
                "path": ":id",
                "component": DistributionCenterFormComponent,
                resolve: {
                    distributionCenter: DistributionCenterResolver,
                    countries: CountriesResolver,
                    companies: CompaniesResolver
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
        DistributionCenterResolver,
        CountriesResolver,
        CompaniesResolver
    ],

    exports: [
        RouterModule

    ], declarations: [
        DistributionCentersComponent,
        DistributionCenterFormComponent
    ]
})
export class DistributionCentersModule {


}