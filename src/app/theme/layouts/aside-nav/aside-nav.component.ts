import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';
import { AdminUsersService } from "../../../_services/apis/admin-users.service";

declare let mLayout: any;
@Component({
    selector: "app-aside-nav",
    templateUrl: "./aside-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AsideNavComponent implements OnInit, AfterViewInit {


    constructor(public adminUsersService: AdminUsersService) {

    }
    ngOnInit() {
    }
    ngAfterViewInit() {

        mLayout.initAside();
        let menu = mLayout.getAsideMenu(); let item = $(menu).find('a[href="' + window.location.pathname + '"]').parent('.m-menu__item'); (<any>$(menu).data('menu')).setActiveItem(item);
    }

}