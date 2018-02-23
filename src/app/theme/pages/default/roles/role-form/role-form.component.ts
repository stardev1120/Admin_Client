import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import {keys} from 'lodash';

import { RolesService } from "../../../../../_services/apis/role.service";
import { Role } from "../../../../../models/role";
import { ScriptLoaderService } from "../../../../../_services/script-loader.service";
import {FeatureACL} from "../../../../../models/featureACL";
import {FeatureACLsService} from "../../../../../_services/apis/feature-acls.service";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./role-form.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class RoleFormComponent implements OnInit {
    data: Role;
    countries: any;


    constructor(private _script: ScriptLoaderService, private api: RolesService,
        private router: Router,
        private route: ActivatedRoute,
                private _featureAcls: FeatureACLsService) {

    }
    ngAfterViewInit() {
        /*this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            'assets/grids/feature-acls.js');*/

    }
    ngOnInit() {
        this.data = this.route.snapshot.data.role as Role;
    }

    onSubmit(mForm: any) {

        if (mForm.valid) {
            this.data.role_id = this.data.role_name.split(' ').join('_')
            this.api.save(this.data)
                .subscribe(r => {
                    this.router.navigate(["/roles"])
                });
        }
    }
    getJSONKeys(object: any) {
        return keys(object);
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
