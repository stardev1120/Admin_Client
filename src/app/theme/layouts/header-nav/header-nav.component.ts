import {Component, OnInit, ViewEncapsulation, AfterViewInit} from '@angular/core';

import {Country} from "../../../models/country";
import {environment} from '../../../../environments/environment'
import {AdminUsersService} from "../../../_services/apis/admin-users.service";
import {AdminUserCountry} from "../../../models/admin-user-country";

declare let mLayout: any;

@Component({
    selector: "app-header-nav",
    templateUrl: "./header-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit, AfterViewInit {
    currentUser: any;
    adminUserCountries: AdminUserCountry[];
    currentCountry: Country;
    baseUrl = environment.baseUrl;

    constructor(private _adminUserService: AdminUsersService) {
    }

    ngOnInit() {
        this.currentUser = this._adminUserService.currentAdminUser
        if(!this._adminUserService.checkModuleOtherRight('countries', 'seeAllCountries')) {
            this.adminUserCountries = this._adminUserService.currentAdminUser.AdminuserCountries;
            if(!!localStorage.getItem('currentCountry')){
                this.currentCountry = JSON.parse(localStorage.getItem('currentCountry')) as Country;
            } else {
                this.currentCountry = this.adminUserCountries[0].Country;
                localStorage.setItem('currentCountry', JSON.stringify(this.adminUserCountries[0].Country));
            }
        } else {
            this.adminUserCountries = null;
            localStorage.removeItem('currentCountry');
        }
    }

    ngAfterViewInit() {

        mLayout.initHeader();
    }

    onChangeCountry(country: Country) {
        this.currentCountry = country;
        localStorage.setItem('currentCountry', JSON.stringify(this.currentCountry));
        location.reload();
    }

}
