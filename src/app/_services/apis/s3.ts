import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BaseApiService } from "../baseAPI";
import { Observable } from "rxjs/Observable";


@Injectable()
export class S3Service extends BaseApiService<any> {

    constructor(http: HttpClient) {
        super(http);
        this.url = '/s3';
    }

    uploadS3(data: any) {
        return this.http.post(this.baseUrl + this.url, data, { headers: this.authorization() })
        //.map((response: Response) => response.json());
    }

    updateS3(url: any, data: any): Observable<any> {
        return this.http.put(url, data)
            .map((response: Response) => response);
    }
}


