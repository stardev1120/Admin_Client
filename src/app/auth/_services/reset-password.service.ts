import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {BaseApiService} from "../../_services/baseAPI";
import {HttpClient} from "@angular/common/http";

export class ResetPassword {
    constructor(public newPassword?: string,
                public id?: string) {
    }

}

@Injectable()
export class ResetPasswordService extends BaseApiService<ResetPassword> {

    constructor(http: HttpClient) {
        super(http);
        this.url = '/admin-user/reset';
    }

    reset(newPassword: string, token: string) {
        return this.update(new ResetPassword(newPassword, token))
            .map((data: any) => {
                console.log(data)
            });
    }
}
