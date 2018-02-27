import {
    Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef,
    ViewEncapsulation
} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import 'rxjs/add/observable/forkJoin';
import * as _ from 'lodash';

import {AdminUsersService} from "../../../../../_services/apis/admin-users.service";
import {AdminUser} from "../../../../../models/admin-user";
import {AlertService} from "../../../../../auth/_services";
import {AlertComponent} from "../../../../../auth/_directives";

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./admin-user-form.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AdminUserFormComponent implements OnInit {
    data: AdminUser;
    companies: any = [];
    countries: any = [];
    roles: any = [];
    selectedCountries: any = [];
    currentAdminUser: any;
    matched: boolean;
    renewPassword: string;
    @ViewChild('alertUpdate', {read: ViewContainerRef}) alertUpdate: ViewContainerRef;

    constructor(private api: AdminUsersService,
                private router: Router,
                private route: ActivatedRoute,
                private cfr: ComponentFactoryResolver,
                private _alertService: AlertService,) {

    }

    ngOnInit() {
        this.data = this.route.snapshot.data.adminUser as AdminUser;
        if (this.api.currentAdminUser.id === this.data.id) {
            this.router.navigate(["/admin-users"]).then();
            return;
        }
        if (this.data && this.data.AdminuserCountries) {
            let that = this;
            _.each(that.data.AdminuserCountries, function (country) {
                that.selectedCountries.push(country.country_id)
            })
        } else {
            this.selectedCountries = []
        }
        this.companies = this.route.snapshot.data.companies as any;
        this.roles = this.route.snapshot.data.roles as any;

        this.currentAdminUser = this.api.currentAdminUser;
        if (this.currentAdminUser.Role.role_id != 'super_admin') {
            this.roles = this.roles.filter(function (role) {
                return role.role_id !== 'super_admin';
            });
        }

        this.countries = this.route.snapshot.data.countries as any;
    }

    onSubmit(mForm: any) {
        if (mForm.valid && (this.matched || this.data.id)) {
            this.data.AdminuserCountries = this.selectedCountries;
            this.api.save(this.data)
                .subscribe(() => {
                    this.router.navigate(["/admin-users"]).then();
                }, error => {
                    console.log(error);
                    this.showAlert('alertUpdate');
                    this._alertService.error(error.error, true);
                });
        }
    }

    onCheckboxChange(country, event) {
        if (event.target.checked) {
            this.selectedCountries.push(country.id);
        } else {
            for (let i = 0; i < this.countries.length; i++) {
                if (this.selectedCountries[i] == country.id) {
                    this.selectedCountries.splice(i, 1);
                }
            }
        }
    }

    goBack() {
        window.history.back();
    }


    passwordMatching() {
        this.matched = this.renewPassword === this.data.password;
    }

    onChangeStatus() {
        this.data.status && this.data.status === 'Active' ? this.data.status = 'Inactive' : this.data.status = 'Active';
    }

    showAlert(target) {
        if (this[target]) {
            this[target].clear();
            let factory = this.cfr.resolveComponentFactory(AlertComponent);
            let ref = this[target].createComponent(factory);
            ref.changeDetectorRef.detectChanges();
        }
    }
}
