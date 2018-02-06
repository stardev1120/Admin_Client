import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Helpers } from '../../../../../helpers';
import { ActivatedRoute, Router } from "@angular/router";

import { UsersService } from '../../../../../_services/apis/users.service'
import { AdminUsersService } from '../../../../../_services/apis/admin-users.service'

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./header-profile.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class HeaderProfileComponent implements OnInit {
    currentAdminUser: any;
    companies: any = [];
    passwordModel: any = {};
    changePasswordFormError: string;
    profileFormError: string;

    constructor(private route: ActivatedRoute,
        private adminUserService: AdminUsersService,
        private router: Router) {

    }
    ngOnInit() {
        this.currentAdminUser = this.adminUserService.currentAdminUser;
        this.companies = this.route.snapshot.data.companies as any;
    }

    async onChangePassword() {
        try {
            let res = await this.adminUserService.changePassword(this.passwordModel)
            this.router.navigate(["/profile"])

        } catch (error) {
            this.changePasswordFormError = "The password is wrong"
        }


    }
    onSubmit() {
        this.adminUserService.save(this.currentAdminUser)
            .subscribe((res) => {
                this.router.navigate(["/profile"])
            }, (err) => {
                this.profileFormError = "Could not update your profile, Please review your information"
            });
    }

}
