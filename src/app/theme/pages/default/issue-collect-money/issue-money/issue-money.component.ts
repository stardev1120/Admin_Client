import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from "../../../../../_services/apis/users.service";
import { User } from "../../../../../models/user";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin';

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./issue-money.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class IssueMoneyComponent implements OnInit {
    data: User;
    countries: any = [];
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
            console.log(mForm.valid, mForm)
            this.api.save(this.data)
                .subscribe(r => {
                    this.router.navigate(["/users"])
                });
        }
    }
}
