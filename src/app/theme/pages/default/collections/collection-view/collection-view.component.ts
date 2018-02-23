import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import 'rxjs/add/observable/forkJoin';

import {LoansService} from "../../../../../_services/apis/loans.service";
import {ScriptLoaderService} from "../../../../../_services/script-loader.service";
import {Collection} from "../../../../../models/collection";
import {environment} from "../../../../../../environments/environment";

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

    constructor(private api: LoansService,
                private router: Router,
                private route: ActivatedRoute,
                private _script: ScriptLoaderService) {

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
                }
                this.grid.init(this.filter, environment.baseUrl);
            }
        });
    }

    goBack() {
        window.history.back();
    }
}
