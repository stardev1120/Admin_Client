import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import 'rxjs/add/observable/forkJoin';

import { AdminUsersService } from "../../../../../_services/apis/admin-users.service";
import { AdminUser } from "../../../../../models/admin-user";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./admin-user-form.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AdminUserFormComponent implements OnInit {
    data: AdminUser;
    companies: any = [];
    roles: any = [];

    constructor(private api: AdminUsersService,
        private router: Router,
        private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.data = this.route.snapshot.data.adminUser as AdminUser;
        this.companies = this.route.snapshot.data.companies as any;
        this.roles = this.route.snapshot.data.roles as any;
    }

    onSubmit(mForm: any) {
        if (mForm.valid) {
            console.log(mForm.valid, mForm)
            this.api.save(this.data)
                .subscribe(r => {
                    this.router.navigate(["/admin-users"])
                });
        }
    }
}
