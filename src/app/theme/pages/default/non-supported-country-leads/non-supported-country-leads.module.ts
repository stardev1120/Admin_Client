import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { DefaultComponent } from "../default.component";
import { LayoutModule } from "../../../layouts/layout.module";
import { NonSupportedCountryLeadsComponent } from "./list/non-supported-country-leads.component";
import { NonSupportedCountryLeadFormComponent } from "./non-supported-country-lead-form/non-supported-country-lead-form.component";
import { NonSupportedCountryLeadResolver } from "./non-supported-country-lead-resolver";

import { FormsModule } from "@angular/forms";
import { AuthGuard } from "../../../../auth/_guards";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "canActivate": [AuthGuard],
        data: { module: 'non-supported-country-leads' },
        "children": [
            {
                "path": "",
                "component": NonSupportedCountryLeadsComponent
            },
            {
                "path": ":id",
                "component": NonSupportedCountryLeadFormComponent,
                "canActivate": [AuthGuard],
                data: { module: 'non-supported-country-leads', action: 'PUT' },
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