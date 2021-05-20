import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { checkUserName, getAllRegisterdUsers, getRegistrationById, login, registerUser } from 'src/app/Common/common-url';
import { Registration } from '../model/registration';

@Injectable()
export class RegistrationService {

    constructor(private _http: HttpClient) { }

    //registerURL: string = register;

    registration(registration: Registration) {
        return this._http.post<any>(registerUser, registration);
    }

    checkUserName(userName: string){
        return this._http.post<any>(checkUserName, userName);
    }

    getAllUsers(){
        /* const opes ={
            headers: new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
        } */

        return this._http.get<any>(getAllRegisterdUsers);
    }

    getRegistrationById(id:any){
        return this._http.post<any>(getRegistrationById,id);
    }

    
}