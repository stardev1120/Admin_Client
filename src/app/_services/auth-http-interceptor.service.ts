import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private _router: Router) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .map((event: HttpEvent<any>) => {
                /*if (event instanceof HttpResponse && ~(event.status / 100) > 3) {
                    console.info('HttpResponse::event =', event, ';');
                } else console.info('event =', event, ';');*/
                return event;
            })
            .catch((err: any, caught) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 403) {
                        console.info('err.error =', err.error, ';');
                    }
                    //(err.status === 401 && (err.error !== 'You didn\'t a super admin or didn\'t have valid OTP') || err.error !== 'you are not a admin') ||
                    if (err.error === 'jwt expired') {
                        console.log(err);
                        location.reload()
                    }
                    return Observable.throw(err);
                }
            });
    }
}