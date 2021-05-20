import { Login } from "src/app/login/model/login";

export class Registration {
    public registrationId : string;

    public firstName : string;
    public lastName : string;
    public nic : number;
    public mobile : string;
    public email : string;

    public addressLine1 : string;
    public addressLine2 : string;
    public addressLine3 : string;

    public userName : string;
    public password : string;
    public confirm : string;

    public active : string;
    public roles : any;
    
    public user = new Login;
    
}