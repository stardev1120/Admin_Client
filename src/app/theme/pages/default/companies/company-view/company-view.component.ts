import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';

import { CompaniesService } from "../../../../../_services/apis/company.service";
import { Company } from "../../../../../models/company";
import { ScriptLoaderService } from "../../../../../_services/script-loader.service";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./company-view.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class CompanyViewComponent implements OnInit {
    data: Company;
    countries: any;


    constructor(private _script: ScriptLoaderService,
        private api: CompaniesService,
        private router: Router,
        private route: ActivatedRoute) {

    }

    ngAfterViewInit() {
    }

    ngOnInit() {
        this.data = this.route.snapshot.data.company as Company;
        console.log('this.data ===> ', this.data);
        this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            'assets/grids/distribution-centers.js');
    }

}
