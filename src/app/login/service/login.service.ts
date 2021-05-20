import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../model/login';
import { login } from 'src/app/Common/common-url';

@Injectable()
export class LoginService {

    constructor(private _http: HttpClient) { }

    loginURL: string = login;

    login(login: Login) {
        console.info(this._http);
        return this._http.post<any>(this.loginURL, login);
    }

    
}