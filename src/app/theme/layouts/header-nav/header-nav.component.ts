import {Component, OnInit, ViewEncapsulation, AfterViewInit} from '@angular/core';
import {Helpers} from '../../../helpers';
import {CountriesService} from "../../../_services/apis/countries.service";
import {Country} from "../../../models/country";
import {environment} from '../../../../environments/environment'
import {AdminUser} from "../../../models/admin-user";
import {Role} from "../../../models/role";
import {AdminUsersService} from "../../../_services/apis/admin-users.service";

declare let mLayout: any;

@Component({
    selector: "app-header-nav",
    templateUrl: "./header-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit, AfterViewInit {
    currentUser: any;
    userCountries: Country[];
    baseUrl = environment.baseUrl;

    constructor(private countries: CountriesService) {
        this.countries.query('{"where":{}}').subscribe((countries: Country[]) => {
            this.userCountries = countries;
        })
    }

    ngOnInit() {
    }

    ngAfterViewInit() {

        mLayout.initHeader();

    }

}