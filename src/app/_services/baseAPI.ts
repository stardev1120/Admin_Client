/**
 * Created by iAboShosha on 7/13/17.
 */
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BaseModel} from "./base-model";
import {environment} from "../../environments/environment";

//import {AuthenticationService} from "./authentication/authentication.service";
// import {Logger} from "../../core/logger.service";
// import {environment} from "../../../environments/environment";
// const log = new Logger('BaseApiService');


export class BaseApiService<T extends BaseModel> {
    public baseUrl = environment.baseUrl;
    public url = "/";


    constructor(protected http: HttpClient) {

    }

    protected authorization(): HttpHeaders {
        let token = (JSON.parse(localStorage.getItem('currentUser'))) ?
            (JSON.parse(localStorage.getItem('currentUser'))).token : null;

        let currentCountry = (JSON.parse(localStorage.getItem('currentCountry'))) ?
            (JSON.parse(localStorage.getItem('currentCountry'))).id : null;

        if (token) {
            if (currentCountry)
                return new HttpHeaders()
                    .set("Content-Type", "application/json")
                    .set("Accept", "application/json")
                    .set("country_id", currentCountry.toString())
                    .set('Authorization', "JWT " + token);
            else
                return new HttpHeaders()
                    .set("Content-Type", "application/json")
                    .set("Accept", "application/json")
                    .set('Authorization', "JWT " + token);
        } else {
            if (currentCountry)
                return new HttpHeaders()
                    .set("Content-Type", "application/json")
                    .set("Accept", "application/json")
                    .set("country_id", currentCountry.toString());
            else
                return new HttpHeaders()
                    .set("Content-Type", "application/json")
                    .set("Accept", "application/json");
        }

    }

    get(id: string) {
        return this.http
            .get<T>(this.baseUrl + this.url + `/${id}`, {headers: this.authorization()})
    }

    query(query: any) {
        return this.http
            .get<T[]>(this.baseUrl + this.url + '?filter=' + `${encodeURI(query)}`, {headers: this.authorization()})
    }

    save(item: T) {
        return item.id ? this.update(item) : this.add(item);
    }

    add(item: T) {
        return this.http.post<T>(this.baseUrl + this.url, item, {headers: this.authorization()})
    }

    update(item: T) {
        return this.http.put<T>(this.baseUrl + this.url + `/${item.id}`, item, {headers: this.authorization()})
    }

    destroy(id: String): Observable<any> {
        return this.http
            .delete<T>(this.baseUrl + this.url + `/${id}`, {headers: this.authorization()})

    }
    updateWithoutId(item: any): Observable<any> {
        return this.http.put<T>(this.baseUrl + this.url, item, {headers: this.authorization()})
    }

    upload(file: File): Observable<any> {

        let formData: FormData = new FormData();
        formData.append('file', file, file.name);
        let headers = new HttpHeaders();
        headers.append('path', file.name);
        //let options = new RequestOptions({headers: headers});
        console.log(this)
        let apiUrl = "/Containers/a4rImages/upload";

        return this.http.post(this.baseUrl + apiUrl, formData)
            .map(m => {
                console.log('Success!!!', m['result'].files.file[0].providerResponse.location)
                return {
                    path: m['result'].files.file[0].providerResponse.location,
                    originalFilename: m['result'].files.file[0].originalFilename,
                    name: m['result'].files.file[0].providerResponse.name

                }
                /*
                * {"result":{"files":{"file":[
                * {
                *   "container":"Mokhayamat-App","name":"fdd23bd3-e885-4140-92b6-c738b8a07658.png",
                * "type":"image/png","field":"file","originalFilename":"thinkloud_128.png",
                * "size":9003,
                *
                * "providerResponse":{
                *   "name":"fdd23bd3-e885-4140-92b6-c738b8a07658.png",
                *   "etag":"824e7bd1d15f6278e6cbab462d6b76b6-1",
                *   "lastModified":null,"size":0,"container":"Mokhayamat-App",
                *   "location":"https://s3.amazonaws.com/Mokhayamat-App/fdd23bd3-e885-4140-92b6-c738b8a07658.png"}}]},"fields":{}}}*/
            })
    }

}
