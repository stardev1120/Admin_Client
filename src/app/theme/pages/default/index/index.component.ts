import {Component, OnInit, ViewEncapsulation, AfterViewInit} from '@angular/core';
import {Helpers} from '../../../../helpers';
import {ScriptLoaderService} from '../../../../_services/script-loader.service';
import {Router} from "@angular/router";

declare let google: any;
declare let GoogleChartsDemo: any;

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./index.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class IndexComponent implements OnInit, AfterViewInit {


    constructor(private _script: ScriptLoaderService,
                private router: Router) {

    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            'assets/app/js/dashboard.js');

/*        this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            'assets/grids/users-activity-log.js');*/

        this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            '//www.amcharts.com/lib/3/plugins/tools/polarScatter/polarScatter.min.js');

        this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            '//www.amcharts.com/lib/3/plugins/export/export.min.js');

        this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            'assets/demo/default/custom/components/charts/amcharts/charts.js');

        Helpers.loadStyles('.m-grid__item.m-grid__item--fluid.m-wrapper', [
            '//www.amcharts.com/lib/3/plugins/export/export.css']);

        this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            'assets/demo/default/custom/components/charts/google-charts.js');

        google.load('visualization', '1', {
            packages: ['corechart', 'bar', 'line'],
            callback: GoogleChartsDemo.runDemos()
        });
    }

    onNavigateToRoute(router: string) {
        const routerUrl = router? "/"+router:"/";
        this.router.navigate([routerUrl])
    }
}