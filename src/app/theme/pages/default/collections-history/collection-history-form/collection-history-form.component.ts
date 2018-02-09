import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Collection } from "../../../../../models/collection";
import 'rxjs/add/observable/forkJoin';
import { CollectionsHistoryService } from "../../../../../_services/apis/collections-history.service";
import { CollectionHistory } from "../../../../../models/collection-history";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./collection-history-form.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class CollectionHistoryFormComponent implements OnInit {
    data: CollectionHistory;

    loans: any = [];
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

    constructor(private api: CollectionsHistoryService,
        private router: Router,
        private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.data = this.route.snapshot.data.collectionHistory as CollectionHistory;
        this.loans = this.route.snapshot.data.loans as any;
    }

    onSubmit(mForm: any) {

        if (mForm.valid) {
            this.api.save(this.data)
                .subscribe(r => {
                    this.router.navigate(["/collection-history"])
                });
        }
    }

}
