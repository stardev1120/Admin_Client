import {Component, OnInit, ViewEncapsulation, AfterViewInit} from '@angular/core';
import {Helpers} from '../../../helpers';
import {CountriesService} from "../../../_services/apis/countries.service";
import {Country} from "../../../models/country";
import {environment} from '../../../../environments/environment'

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
        this.currentUser = (JSON.parse(localStorage.getItem('currentUser'))).adminUser;
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