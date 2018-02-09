import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from "../../../../../_services/apis/users.service";
import { User } from "../../../../../models/user";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin';

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./user-form.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class UserFormComponent implements OnInit {
    data: User;
    countries: any = [];
    statuses: any = [{
        id: '1',
        title: 'Active'
    }, {
        id: '2',
        title: 'Blocked'
    }
    ];
    constructor(private api: UsersService,
        private router: Router,
        private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.data = this.route.snapshot.data.user as User;
        this.countries = this.route.snapshot.data.countries as any;
    }

    onSubmit(mForm: any) {
        if (mForm.valid) {
            this.api.save(this.data)
                .subscribe(r => {
                    this.router.navigate(["/users"])
                });
        }
    }
}
