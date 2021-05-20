import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { application, applicationGetAll } from 'src/app/Common/common-url';
import { Application } from '../model/application';

@Injectable()
export class ApplicationService {

    constructor(private _http: HttpClient) { }

    applicationURL: string = application;

    createApplication(application:Application){
        return this._http.post<any>(this.applicationURL,application);
    }

    deleteApplication(application:Application){
        return this._http.post<any>(this.applicationURL+"/delete",application);
    }

    getApplicationById(application:Application){
        return this._http.post<any>(this.applicationURL+"/byId",application);
    }

    getApplicationbyCode(application:string){
        return this._http.post<any>(this.applicationURL+"/byCode",application);
    }

    getAllApplication(){
        return this._http.get<any>(applicationGetAll);
    }
    
}