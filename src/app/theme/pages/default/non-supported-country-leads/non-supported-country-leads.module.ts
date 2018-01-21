import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { DefaultComponent } from "../default.component";
import { LayoutModule } from "../../../layouts/layout.module";
import { NonSupportedCountryLeadsComponent } from "./list/non-supported-country-leads.component";
import { NonSupportedCountryLeadFormComponent } from "./non-supported-country-lead-form/non-supported-country-lead-form.component";
import { NonSupportedCountryLeadResolver } from "./non-supported-country-lead-resolver";

import { FormsModule } from "@angular/forms";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": NonSupportedCountryLeadsComponent
            },
            {
                "path": ":id",
                "component": NonSupportedCountryLeadFormComponent,
                resolve: {
                    nonSupportedCountryLead: NonSupportedCountryLeadResolver,
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
        NonSupportedCountryLeadResolver
    ],

    exports: [
        RouterModule

    ], declarations: [
        NonSupportedCountryLeadsComponent,
        NonSupportedCountryLeadFormComponent
    ]
})
export class NonSupportedCountryLeadsModule {


}