import {AfterViewInit, Component, OnInit, ViewEncapsulation} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../../../../_services/apis/users.service";
import {User} from "../../../../../models/user";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin';
import {ScriptLoaderService} from "../../../../../_services/script-loader.service";
import {AdminUsersService} from "../../../../../_services/apis/admin-users.service";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./user-view.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class UserViewComponent implements OnInit, AfterViewInit {
    data: User;
    countries: any = [];
    statuses: any = [{
        id: 'status1',
        title: 'Status 1'
    }, {
        id: 'status2',
        title: 'Status 2'
    }, {
        id: 'status3',
        title: 'Status 3'
    }, {
        id: 'status4',
        title: 'Status 4'
    }];

    constructor(private api: UsersService,
                private router: Router,
                private route: ActivatedRoute,
                private _script: ScriptLoaderService,
                public _adminUserService: AdminUsersService) {

    }

    ngOnInit() {
        this.data = this.route.snapshot.data.user as User;
        this.countries = this.route.snapshot.data.countries as any;
    }

    ngAfterViewInit() {
        this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            'assets/grids/loans.js').then(res => {
            console.log('==> ', res)
        });

        this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            'assets/grids/collections.js');

    }
}
