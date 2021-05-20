import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApplicationService } from '../application/service/application.service';
import { Registration } from '../registration/model/registration';
import { RegistrationService } from '../registration/service/registration.service';
import { App } from './model/app';
import { UserApp } from './model/user-app';
import { UserAppService } from './service/user-app.service';

@Component({
  selector: 'app-user-app',
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.css']
})
export class UserAppComponent implements OnInit {

  mainModel = new UserApp();
  mainModelList: UserApp[];

  /* data table varible start*/
  filter: any = '';
  searchsearvice : any ='';
  p: number = 1;
  cp: number = 1;
  /* data table varible end*/

  statusArr = [{ title: "Active", value: true },
                { title: "Deactive", value: false }];

  appArray: Array<App> = [];

  constructor(private registrationService:RegistrationService,
    private applicationService:ApplicationService,
    private userAppService:UserAppService,
    private toastr: ToastrService) { }

  ngOnInit(): void { this.getAllApplication();
  }

  clearModel(){

  }

  submit(){
    const selectedAppList = this.appArray.filter( (app) => app.checked );
    var selectedAppStr="";
    for(var i = 0 ; i< selectedAppList.length ; i++){
      selectedAppStr += selectedAppList[i].appId+",".toString();
    }
    this.mainModel.applicationIdList=selectedAppStr;
      console.info(selectedAppStr);
      console.info(this.mainModel.userAppId);

      if(selectedAppStr === "" && this.mainModel.registrationId== undefined){
        alert("Please select User & Applications");
        return
      }
      /* if(selectedAppStr === ""){
        alert("Please select Application");return;
      } */
      if(this.mainModel.registrationId== undefined){
        alert("Please select User");return;
      }
      this.userAppService.create(this.mainModel).subscribe(res =>{
        if(res.code === "1111"){
          this.toastr.success('Create Success',res.message);
        }else{
          this.toastr.error('Somthing Wrong', res.message);
        }
      })

  }

  getApplicationbyCode(){

  }

  registrationList :Registration[];
  getAllUsers(){
    this.registrationService.getAllUsers().subscribe(data =>{
      console.info(data);
      this.registrationList=data.list;
      
      for(var i=0; i < this.registrationList.length;i++){
        this.registrationList[i].user.roles=this.registrationList[i].user.roles.replaceAll("ROLE_", "");
        this.registrationList[i].user.roles=this.registrationList[i].user.roles.replaceAll("_", " ");
        
        if(this.registrationList[i].user.active.toString() === "true"){
          this.registrationList[i].user.active = "Active";
        }else{
          this.registrationList[i].user.active = "Deactive";
        }
      }

    });
  }

  getRegistrationById(id:any){
      this.registrationService.getRegistrationById(id).subscribe(data => {
      this.mainModel.userName = data.object.user.userName; 
      this.mainModel.registrationId = data.object.registrationId;

      this.userAppService.getAllAppByUserId(this.mainModel.registrationId).subscribe(res =>{

        //console.log(res);
        var appMainArray =this.appArray;
        
        if (res.code === "1111"){
          var appCheckedArr = res.object.appList;
          this.mainModel.userAppId= res.object.userAppId;
          console.info("user app id",this.mainModel.userAppId)
          this.resetAllAppCheckBox();
          for(var j=0 ; j< appMainArray.length ; j++){
            for(var x=0;x < appCheckedArr.length ; x++){
              if(appMainArray[j].appId == appCheckedArr[x].applicationId){
                appMainArray[j].checked = true;
              }/* else{
                appMainArray[j].checked = false;
              } */
            }
          }
          
        }else{
          this.resetAllAppCheckBox();
        }this.appArray = appMainArray;
        
      });
     // console.info(data.object);
      });
  }

  resetAllAppCheckBox(){
    for(var x=0; x< this.appArray.length ; x++){
      this.appArray[x].checked = false;
    }
  }

  getAllApplication(){
    this.appArray =[];
    //appArray= Array<App> = [];
    this.applicationService.getAllApplication().subscribe(res =>{
      console.log(res.list);


      for(var i=0 ; i < res.list.length;i++){
        

        var app = new App();
        app.appId = res.list[i].applicationId;
        app.appName = res.list[i].applicationName;
        app.checked = false;

        this.appArray[i]=app;

        console.log(this.appArray);

        console.log("this.appArray");
      }



      

      

      
    });
  }

}
