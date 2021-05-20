import { Application } from "src/app/application/model/application";
import { Registration } from "src/app/registration/model/registration";

export class UserApp {
    public userAppId : number;
    public applicationId : number;
    public registrationId : number;

    public applicationIdList : string;

    public userName : string;

    public registration : Registration;
    public applicationList : Application[];

    public checked : boolean;
}