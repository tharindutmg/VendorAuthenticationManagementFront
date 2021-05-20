import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import { Router } from '@angular/router';


const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        let authReq = request;
        const token = localStorage.getItem('vamToken');

        console.log('vamToken ', token);

        if (token) {
          if (this.tokenExpired(token)) {// token expired 
            this.clearLocalStroage()
            this.router.navigate(['']);
          } else { // token valid
            authReq = request.clone({ headers: request.headers
              .set(TOKEN_HEADER_KEY, 'Bearer ' + token) 
            });
          }
           
        }else{
          if(this.router.url !== "/register"){
            this.router.navigate(['']);
          }
        }

        return next.handle(authReq);
    }

    private tokenExpired(token: string) {
      const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
      return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }

    private clearLocalStroage(){
      localStorage.removeItem("vamToken");
      localStorage.removeItem("userName");
      localStorage.removeItem("role");
    }

    
}