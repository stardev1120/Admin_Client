import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import {environment} from '../../../environments/environment'

@Injectable()
export class AuthenticationService {

    headers: Headers;

    constructor(private http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    login(email: string, password: string) {
        return this.http.post(environment.baseUrl + '/admin-user/login', JSON.stringify({
            email: email,
            password: password
        }), {
            headers: this.headers
        })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    console.log('user', user);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        return this.http.post(environment.baseUrl + '/admin-user/logout', JSON.stringify({}), {
            headers: this.headers
        }).map((res)=>{
            localStorage.removeItem('currentUser');
            return res
        })
    }
}