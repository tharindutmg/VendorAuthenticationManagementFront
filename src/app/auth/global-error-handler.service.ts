import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
 
@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
 
    constructor(public router: Router) {
    }
 
 
  handleError(error: Error | HttpErrorResponse) {
    /* console.log('GlobalErrorHandlerService',error.name)

    let handled: boolean = false;
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error("Error Event");
          } else {
            console.log(`error status : ${error.status} ${error.statusText}`);
            switch (error.status) {
              case 401:     
                localStorage.clear();
                console.log(`redirect to login`);
                handled = true;
                break;
              case 403:   
                console.log(`redirect to login`);
                handled = true;
                break;
            }
          }
        }
        else {
          console.error("Other Errors");
        }
 
        if (handled) {
          console.log('return back ');
          return of(error);
        } else {
          console.log('throw error back to to the subscriber');
          return throwError(error);
        } */

  }
 
}