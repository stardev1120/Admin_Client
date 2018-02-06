import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import {environment} from '../../../environments/environment'


@Injectable()
export class AuthenticationService {

    headers: Headers;
    _user: any;

    constructor(private http: Http) {

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    login(email: string, password: string, recapcha: string) {
        return this.http.post(environment.baseUrl + '/admin-user/login', JSON.stringify({
            email: email,
            password: password,
            'g-recaptcha-response': recapcha
        }), {
            headers: this.headers
        })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                this._user = response.json();
                if (this._user && this._user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    console.log('user', this._user);
                    localStorage.setItem('currentUser', JSON.stringify(this._user));
                }
                return this.user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        return this.http.post(environment.baseUrl + '/admin-user/logout', JSON.stringify({}), {
            headers: this.headers
        }).map((res) => {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('currentCountry');
            this._user = {};
            return res
        })
    }

    faVerification(faCode: string, token: any) {
        this.headers.delete('Authorization');
        this.headers.append('Authorization', "JWT " + token.token);
        return this.http.post(environment.baseUrl + '/admin-user/2-fa-verification', JSON.stringify({'faCode': faCode}), {
            headers: this.headers
        }).map((response: any) => {
            if(!response.json().verified){
               localStorage.removeItem('currentUser');
            } else {
                this._user = token;
                if (token && token.token) {
                    localStorage.setItem('currentUser', JSON.stringify(this._user));
                }
            }
            return response.json();
        });
    }

    get user(): any {
        this._user = JSON.parse(localStorage.getItem('currentUser'));
        return this._user;
    }

    set user(user: any) {
        this._user = user;
    }
}
