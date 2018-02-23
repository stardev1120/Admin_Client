import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { BaseApiService } from "../../_services/baseAPI";
import { HttpClient } from "@angular/common/http";

export class RequestResetPassowrd {
    constructor(public email?: String,
        public id?: String
    ) {
    }

}

@Injectable()
export class RequestResetPasswordService extends BaseApiService<RequestResetPassowrd> {

    constructor(http: HttpClient) {
        super(http);
        this.url = '/admin-user/forget-password';
    }

    requestReset(email: string) {
        return this.add(new RequestResetPassowrd(email))

            //this.http.post('/api/authenticate', JSON.stringify({email: email, password: password}))
            .map((data: any) => {
                console.log(data)
            });
    }

}
