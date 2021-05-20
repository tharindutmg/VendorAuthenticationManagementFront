import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private router: Router) { }

  public canActivate(next: ActivatedRouteSnapshot) {
    const allowedRoles = next.data.allowedRoles;
    var isAuthorized = false;
    debugger
    const token = localStorage.getItem('vamToken');
    if (token) {
      //this check is token valid
      if (this.tokenExpired(token)) {// token expired 
        this.clearLocalStroage();
        
        if(this.router.url !== "register"){
          this.router.navigate(['']);
        }
        
      } else { // token valid
        const roleStr = localStorage.getItem("role");
        var roleLocalArr = roleStr.split(",");

        isAuthorized = roleLocalArr.includes(allowedRoles[0]);

        if (!isAuthorized) {
          this.router.navigate(['accessdenied']);
        }
      }
    }else{
      this.router.navigate(['']);
    }

    return isAuthorized;
  }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  private clearLocalStroage() {
    localStorage.removeItem("vamToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
  }
} 