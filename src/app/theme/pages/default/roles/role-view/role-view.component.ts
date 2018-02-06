import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import * as _ from 'lodash';

import {RolesService} from "../../../../../_services/apis/role.service";
import {Role} from "../../../../../models/role";
import {FeatureACL} from "../../../../../models/featureACL";
import {FeatureACLsService} from "../../../../../_services/apis/feature-acls.service";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./role-view.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class RoleViewComponent implements OnInit {
    data: Role;
    countries: any;


    constructor(private api: RolesService,
                private router: Router,
                private route: ActivatedRoute,
                private _featureAcls: FeatureACLsService) {

    }

    ngAfterViewInit() {
    }

    ngOnInit() {
        this.data = this.route.snapshot.data.role as Role;
    }

    getJSONKeys(object: any) {
        return _.keys(object);
    }

    onFeatureACL(featureACL: FeatureACL) {
        this._featureAcls.save(featureACL).subscribe(data => {
                console.log(data);
            },
            error => {
                console.log(error);
            })
    }
    
    saveRights(){
        location.reload()
    }

}
