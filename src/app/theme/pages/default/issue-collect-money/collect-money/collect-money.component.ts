import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/pairwise';

import {Collection} from "../../../../../models/collection";
import {CollectionsService} from "../../../../../_services/apis/collections.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

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
/*        this.router.events.pairwise().subscribe((e) => {
            console.log('e---->', e);
        });*/
    }

    ngOnInit() {
        this.data = this.route.snapshot.data.collection as Collection;
    }

    onSubmit(content: any) {
        this.api.collectLoanMoney(this.data.id)
            .subscribe(() => {
                this.modalService.open(content).result.then(() => {
                   this.goBack();
                }, () => {
                    this.goBack();
                });
            }, error => {
                console.log(error);
            });
    }

    goBack(){
        window.history.back();
    }
}
