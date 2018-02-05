import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Router } from "@angular/router";
import { isEmpty } from 'lodash'

import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { AdminUserCountry } from "../../../../models/admin-user-country";
import { AdminUsersService } from "../../../../_services/apis/admin-users.service";
import { Country } from "../../../../models/country";
import { UserActivityLogService } from "../../../../_services/apis/user-activity-log.service";
import { UserActivityLog } from "../../../../models/user-activity-log";

declare let google: any;
declare let GoogleChartsDemo: any;

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./index.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class IndexComponent implements OnInit, AfterViewInit {

    adminUserCountries: AdminUserCountry[];
    currentCountry: Country;
    selectedDateRange: any;
    selectedDateRangeActivity: any;
    adminUserActivityLogs: UserActivityLog[];

    constructor(private _script: ScriptLoaderService,
        private _router: Router,
        public adminUserService: AdminUsersService,
        private _userAcitvityLog: UserActivityLogService) {
        this.adminUserCountries = this.adminUserService.currentAdminUser.AdminuserCountries;
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        /*this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            'assets/app/js/dashboard.js');*/

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
        this.onLoadUserActivityLog(undefined);

    }

    onNavigateToRoute(router: string) {
        const routerUrl = router ? "/" + router : "/";
        this._router.navigate([routerUrl])
    }

    onChangeCountry(country: Country) {
        if (country) {
            this.currentCountry = country;
        } else {
            this.currentCountry = null
        }

    }

    onChangeDateRange(range: any) {
        this.selectedDateRange = range;
    }

    onChangeDateRangeActivity(range: any) {
        this.selectedDateRangeActivity = range;
        this.onLoadUserActivityLog(range);
    }

    isNotEmpty(object: any) {
        return !isEmpty(object);
    }

    onLoadUserActivityLog(daterange: any) {
        if (this.adminUserService && this.adminUserService.checkModuleActionRight('user-activities', 'GET')) {
            let where = {};
            if (daterange) {
                where['created_at'] = {
                    $between: [daterange.start, daterange.end]
                }

            }
            this._userAcitvityLog.query('{"where":' + JSON.stringify(where) + ', "order":[["created_at","desc"]]}').subscribe((logs: UserActivityLog[]) => {
                this.adminUserActivityLogs = logs;
            }, error => {
                console.log(error);
            });
        }
    }
}