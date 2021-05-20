import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { role } from 'src/app/Common/common-url';
import { Role } from '../model/role';

@Injectable()
export class RoleService {

    constructor(private _http: HttpClient) { }

    roleURL: string = role;

    createRole(role:Role){
        return this._http.post<any>(this.roleURL,role);
    }

    deleteRole(role:Role){
        return this._http.post<any>(this.roleURL+"/delete",role);
    }

    getRoleById(role:Role){
        return this._http.post<any>(this.roleURL+"/rolebyId",role);
    }

    getRolebyRoleCode(role:string){
        return this._http.post<any>(this.roleURL+"/rolebyRoleCode",role);
    }

    getAllRole(){
        return this._http.get<any>(this.roleURL);
    }

    


    
}