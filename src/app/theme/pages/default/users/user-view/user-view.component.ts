import {AfterViewInit, Component, OnInit, ViewEncapsulation} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import 'rxjs/add/observable/forkJoin';

import {UsersService} from "../../../../../_services/apis/users.service";
import {User} from "../../../../../models/user";
import {ScriptLoaderService} from "../../../../../_services/script-loader.service";
import {AdminUsersService} from "../../../../../_services/apis/admin-users.service";
import {LoansService} from "../../../../../_services/apis/loans.service";
import {environment} from "../../../../../../environments/environment";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./user-view.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class UserViewComponent implements OnInit, AfterViewInit {
    data: User;
    userLocationUrl: string;
    countries: any = [];
    loading = false;
    countOfLoans: number;
    grid: any;

    constructor(private api: UsersService,
                private apiLoan: LoansService,
                private router: Router,
                private route: ActivatedRoute,
                private _script: ScriptLoaderService,
                public _adminUserService: AdminUsersService) {

    }

    ngOnInit() {
        this.data = this.route.snapshot.data.user as User;
        this.countries = this.route.snapshot.data.countries as any;
        this.apiLoan.getLoansCountOfUser(this.data.id).subscribe((res: any) => {
            this.countOfLoans = res.count;
        }, error => {
            this.countOfLoans = 0;
            console.log(error)
        });
        if (this.data.user_location) {
            try {
                let user_location = JSON.parse(this.data.user_location);
                this.userLocationUrl = 'https://www.google.com/maps/?q=' + user_location['lat'] + ',' + user_location['lng'];
            } catch (error) {
                try {
                    let jsonString = this.onConvertUserLocationToJson(this.data.user_location);
                    let user_location = JSON.parse(jsonString);
                    this.userLocationUrl = 'https://www.google.com/maps/?q=' + user_location['lat'] + ',' + user_location['lng'];
                } catch (error2) {
                    console.log(error2);
                    this.userLocationUrl = '';
                }
            }
        }
    }

    ngAfterViewInit() {
        this._script.load('.m-grid__item.m-grid__item--fluid.m-wrapper',
            'assets/grids/loans-collections.js').then(() => {
            this.grid = (window as any).Datatable_Loans_Collections_AJAX_DEMO;
            if(this.grid){
                let filter = {user_id: this.data.id};
                this.grid.init(filter, environment.baseUrl);
            }
        });

    }

    onChangeAccountStatus() {
        this.data.status && this.data.status == 'Active' ? this.data.status = 'Blocked' : this.data.status = 'Active';
        this.api.save(this.data).subscribe((res) => {
        })
    }

    onChangePhoneStatus() {
        this.data.verified ? this.data.verified = false : this.data.verified = true;
        this.api.save(this.data).subscribe((res) => {
        })
    }

    onChangUScoreStatus() {
        this.data.uScore_status && this.data.uScore_status == 'DONE' ? this.data.uScore_status = 'NOT_PROCESSED' : this.data.uScore_status = 'DONE';
        this.api.save(this.data).subscribe((res) => {
        })
    }

    onChangeAddressStatus() {
        (!this.data.address_verification_status || this.data.address_verification_status == 'NotVerified') ? this.data.address_verification_status = 'Verified' : this.data.address_verification_status = 'NotVerified';
        this.api.save(this.data).subscribe((res) => {
        })
    }

    onChangeIdStatus() {
        this.data.id_verification_status && this.data.id_verification_status == 'Verified' ? this.data.id_verification_status = 'NotVerified' : this.data.id_verification_status = 'Verified';
        this.api.save(this.data).subscribe((res) => {
        })
    }

    onChangeAvailableAmount() {
        this.api.save(this.data).subscribe(() => {
        })
    }

    onChangeMinimumAvailableAmount() {
        this.api.save(this.data).subscribe(() => {
        })
    }

    /*onTriggerCediteScore() {
        this.api.updateTrigerCreditScore(this.data)
    }*/

    onRefreshUserData() {
        this.loading = true;
        this.api.get(this.data.id).subscribe(user => {
            this.data = user;
            this.loading = false;
        }, error => {
            this.loading = false;
            console.log(error);
            location.reload();
        })
    }

    private onConvertUserLocationToJson(user_location) {
        let params = user_location;

        let jsonString = '{';
        let items = params.split(',');
        let lat = items[0].substring(1, items[0].length);
        jsonString += '"lat":"' + lat + '",';
        let lng = items[1].substring(0, items[1].length - 1);
        jsonString += '"lng":"' + lng + '",';

        jsonString = jsonString.substr(0, jsonString.length - 1);
        jsonString += '}';
        //console.log(jsonString);
        return jsonString;
    }
}
