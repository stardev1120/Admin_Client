import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HeaderProfileComponent } from './header-profile.component';
import { LayoutModule } from '../../../../layouts/layout.module';
import { DefaultComponent } from '../../default.component';
import { FormsModule } from '@angular/forms';
import { CompaniesResolver } from "../../companies/companies-resolver";
const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": HeaderProfileComponent,
                resolve: {
                    companies: CompaniesResolver,
                }
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes), LayoutModule,
        FormsModule
    ], exports: [
        RouterModule
    ], declarations: [
        HeaderProfileComponent
    ], providers: [
        CompaniesResolver
    ]
})
export class HeaderProfileModule {

}