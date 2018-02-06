import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index.component';
import {LayoutModule} from '../../../layouts/layout.module';
import {DefaultComponent} from '../default.component';
import {BarChartDirective, DateRangeDirective, SerialAmChartDirective, LineChartDirective} from "../../../../_directives";

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": IndexComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule
    ], exports: [
        RouterModule
    ], declarations: [
        IndexComponent,
        BarChartDirective,
        DateRangeDirective,
        SerialAmChartDirective,
        LineChartDirective
    ]
})
export class IndexModule {


}