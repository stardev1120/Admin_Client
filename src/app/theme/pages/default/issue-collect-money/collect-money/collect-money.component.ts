import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import 'rxjs/add/observable/forkJoin';
import { Collection } from "../../../../../models/collection";
import { CollectionsService } from "../../../../../_services/apis/collections.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./collect-money.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class CollectMoneyComponent implements OnInit {
    data: Collection;

    constructor(private api: CollectionsService,
        private router: Router,
        private route: ActivatedRoute,
        private modalService: NgbModal) {

    }

    ngOnInit() {
        this.data = this.route.snapshot.data.collection as Collection;
    }

    onSubmit(content: any) {
        this.data.status = 'Collected';
        this.api.save(this.data)
            .subscribe(() => {
                this.modalService.open(content).result.then((result) => {
                    this.router.navigate(["/issue-collect-money"])
                }, () => {
                    this.router.navigate(["/issue-collect-money"])
                });
            }, error => {
                console.log(error);
            });
    }
}
