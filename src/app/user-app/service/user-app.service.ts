import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { allAppByUseId, userAppURL } from 'src/app/Common/common-url';
import { UserApp } from '../model/user-app';

@Injectable()
export class UserAppService {

    constructor(private _http: HttpClient) { }

    //registerURL: string = register;

    create(userApp: UserApp) {
        return this._http.post<any>(userAppURL, userApp);
    }

    getAll(){
        return this._http.get<any>(userAppURL);
    }

    getById(id:any){
        return this._http.post<any>(userAppURL+"/byuserId",id);
    }

    getAllAppByUserId(id:any){
        return this._http.post<any>(allAppByUseId,id);
    }

    
}