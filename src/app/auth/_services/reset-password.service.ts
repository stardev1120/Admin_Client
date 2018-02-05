import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { BaseApiService } from "../../_services/baseAPI";
import { HttpClient } from "@angular/common/http";

export class ResetPassowrd {
    constructor(public newPassword?: String,
        public id?: String
    ) {
    }

}

@Injectable()
export class ResetPasswordService extends BaseApiService<ResetPassowrd> {

    constructor(http: HttpClient) {
        super(http);
        this.url = '/admin-user/reset';
    }

    reset(newPassword: string, token: string) {
        return this.update(new ResetPassowrd(newPassword, token))
            .map((data: any) => {
                console.log(data)
            });
    }
}
