import { Injectable } from "@angular/core";
import { Headers, RequestOptions } from "@angular/http";

import { User } from "../_models/index";
import { BaseApiService } from "../../_services/baseAPI";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UserService extends BaseApiService<User> {
    constructor(http: HttpClient) {
        super(http)
        this.url = '/users'
    }

    verify() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));

        return this.get(currentUser['userId']);

    }

    forgotPassword(email: string) {
        // return this.get('/api/forgot-password', JSON.stringify({email}), this.jwt())
        return this.get('1')
    }

    getAll() {
        //return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
        return this.get('1')
    }

    getById(id: number) {
        //return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
        return this.get('1')
    }

    create(user: User) {
        //return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
        return this.get('1')
    }

    update(user: User) {
        //return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
        return this.get('1')
    }

    delete(id: number) {
        //return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
        return this.get('1')
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}