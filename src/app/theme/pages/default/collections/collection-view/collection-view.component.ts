import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import 'rxjs/add/observable/forkJoin';

import {ScriptLoaderService} from "../../../../../_services/script-loader.service";
import {Collection} from "../../../../../models/collection";
import {environment} from "../../../../../../environments/environment";
import {AdminUsersService} from "../../../../../_services/apis/admin-users.service";
import {CollectionsService} from "../../../../../_services/apis/collections.service";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./collection-view.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class CollectionViewComponent implements OnInit {
    data: Collection;
    users: any = [];
    filter: any = {};
    grid: any;
    statuses: any[] = [
        {
            key: 'Collected',
            value: 'Collected'
        },
        {
            key: 'Processing',
            value: 'Processing'
        },
        {
            key: 'To-be-Collected',
            value: 'To be Collected'
        },
        {
            key: 'Defaulted',
            value: 'Defaulted'
        },
        {
            key: 'Need-to-Retry',
            value: 'Need to Retry'
        }
    ];

    constructor(private api: CollectionsService,
                private router: Router,
                private route: ActivatedRoute,
                private _script: ScriptLoaderService,
                public _adminUserService: AdminUsersService) {

    }

    ngOnInit() {
        this.data = this.route.snapshot.data.collection as Collection;
    }

    ngAfterViewInit() {
        this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            'assets/grids/collections-history.js').then(() => {
            this.grid = (window as any).Datatable_Collections_History_AJAX_DEMO;
            if (this.grid) {
                this.filter = {
                    collection_id: this.data.id
                };
                this.grid.init(this.filter, environment.baseUrl);
            }
        });
    }

    onChangValue() {
        this.api.save(this.data).subscribe(() => {
        })
    }

    goBack() {
        window.history.back();
    }
}
