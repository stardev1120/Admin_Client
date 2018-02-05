import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../_services/authentication.service";
import { Helpers } from "../../helpers";
import { AdminUsersService } from "../../_services/apis/admin-users.service";

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    encapsulation: ViewEncapsulation.None,
})

export class LogoutComponent implements OnInit {

    constructor(private _router: Router,
        private _authService: AuthenticationService,
        private _adminUserService: AdminUsersService) {
    }

    ngOnInit(): void {
        Helpers.setLoading(true);
        // reset login status
        this._authService.logout().subscribe((res) => {
            this._adminUserService.currentAdminUser = null;
            this._router.navigate(['/login']);
        }, (error) => {
            console.log(error);
            this._adminUserService.currentAdminUser = null;
            localStorage.removeItem('currentUser');
            localStorage.removeItem('currentCountry');
            this._router.navigate(['/login']);
        })
    }
}