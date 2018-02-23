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
import { DashboardService } from "../../../../_services/apis/dashboard.service";

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
    chartData: any;
    serialAmChart1Options = {
        axis_1: 'usersAxis',
        axis_title_1: 'Users',
        axis_legendValueText_1: 'users',
        axis_valueField_1: 'users',
        axis_2: 'collectionsAxis',
        axis_title_2: 'Collections',
        axis_legendValueText_2: 'collections',
        axis_valueField_2: 'collections',
        axis_3: 'loansAxis',
        axis_title_3: 'Loans',
        axis_legendValueText_3: 'loans',
        axis_valueField_3: 'loans'
    };
    serialAmChart2Options = {
        axis_1: 'usersAxis',
        axis_title_1: 'Users',
        axis_legendValueText_1: 'users',
        axis_valueField_1: 'users',
        axis_2: 'collectionsAxis',
        axis_title_2: 'Collected Collections',
        axis_legendValueText_2: '$ collected',
        axis_valueField_2: 'collections',
        axis_3: 'loansAxis',
        axis_title_3: 'Issued Loans',
        axis_legendValueText_3: '$ issued loans',
        axis_valueField_3: 'loans'
    };
    filter: any = {};

    constructor(private _script: ScriptLoaderService,
        private _router: Router,
        public adminUserService: AdminUsersService,
        private _userAcitvityLog: UserActivityLogService,
        private _apiDashboard: DashboardService) {
        this.adminUserCountries = this.adminUserService.currentAdminUser.AdminuserCountries;
    }

    loadingDashboard() {
        this.filter = {
            country_id: this.currentCountry ? this.currentCountry.id : undefined,
            start_date: this.selectedDateRange ? this.selectedDateRange.start : undefined,
            end_date: this.selectedDateRange ? this.selectedDateRange.end : undefined
        };

        this._apiDashboard.getDashboard(this.filter).subscribe((data: any) => {
            this.chartData = data;
        })
    }

    ngOnInit() {

    }

    ngAfterViewInit() {

        this.onLoadUserActivityLog(undefined);

    }

    onNavigateToRoute(router: string, key1?: string, value1?: string, key2?: string, value2?: string) {
        const routerUrl = router ? "/" + router : "/";
        if (key1) {
            this.filter[key1] = value1;
        }
        if (key2) {
            this.filter[key2] = value2;
        }
        this._router.navigate([routerUrl], { queryParams: { filter: JSON.stringify(this.filter) } })
    }

    onChangeCountry(country: Country) {
        if (country) {
            this.currentCountry = country;
        } else {
            this.currentCountry = null
        }
        this.loadingDashboard();
    }

    onChangeDateRange(range: any) {
        this.selectedDateRange = range;
        this.loadingDashboard();
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
            if (!this.adminUserService.isSuperAdmin && !this.adminUserService.isAdmin) {
                where['user_email'] = this.adminUserService.currentAdminUser.email;
            }
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