import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { NgxCheckboxComponent } from 'ngx-checkbox';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn
} from '@angular/forms';
import { RegistrationService } from '../registration/service/registration.service';
import { ToastrService } from 'ngx-toastr';
import { Registration } from '../registration/model/registration';
import { Role } from '../role/model/role';
import { RoleService } from '../role/service/role.service';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css']
})
export class UserRolesComponent implements OnInit {

  /* data table varible start*/
  filter: any = '';
  searchsearvice : any ='';
  p: number = 1;
  cp: number = 1;
  /* data table varible end*/

  registrationModel :Registration[];

  mainModel = new Registration();

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  mobNumberPattern = "^(?:7|0|(\\+94?))[0-9]{9,10}$";
  nicPattern = "^([0-9]{9}[x|X|v|V]|[0-9]{12})$";

  statusArr = [{ title: "Active", value: true },
                { title: "Deactive", value: false }]

  countries = [
    {id: 1, name: 'Italia', checked: false},
    {id: 2, name: 'Brasile', checked: false},
    {id: 3, name: 'Florida', checked: false},
    {id: 4, name: 'Spagna', checked: false},
    {id: 5, name: 'Santo Domingo', checked: false},
  ]

  //rolsArray :{};

  rolsArray: Array<Role> = [];
  allRole :Array<Role> = [];

  ngOnInit(): void {
    this.getAllUsers();
  }

  constructor(private registrationService:RegistrationService,
              private toastr: ToastrService,
              private roleService : RoleService) { }

  submit(){
    const selectedRoles = this.allRole.filter( (role) => role.check );
    // you could use an EventEmitter and emit the selected values here, or send them to another API with some service
    
    var roleStr="";
    for(var i=0; i < selectedRoles.length;i++){
        roleStr += selectedRoles[i].roleCode+",";
    }
    // [replace] use for remove last comma
    this.mainModel.user.roles= roleStr.replace(/,\s*$/, "");

    this.mainModel.user.active = this.mainModel.active;

    this.registrationService.registration(this.mainModel).subscribe(data =>{
        console.info(data);
        if(data.code === "1111"){
          this.toastr.success('Create Success',data.message);
        }else{
          this.toastr.error('Somthing Wrong', data.message);
        }
        this.getAllUsers()
    });

  }

  getAllUsers(){
    this.registrationService.getAllUsers().subscribe(data =>{
      console.info(data);
      this.registrationModel=data.list;

      for(var i=0; i < this.registrationModel.length;i++){
        this.registrationModel[i].user.roles=this.registrationModel[i].user.roles.replaceAll("ROLE_", "");
        this.registrationModel[i].user.roles=this.registrationModel[i].user.roles.replaceAll("_", " ");
        
        if(this.registrationModel[i].user.active.toString() === "true"){
          this.registrationModel[i].user.active = "Active";
        }else{
          this.registrationModel[i].user.active = "Deactive";
        }
      }

      
    });
  }

  getRegistrationById(id:any){
    this.roleService.getAllRole().subscribe(data => {
      this.allRole = data.list;
      //console.info(this.allRole[0].roleName);

      //this.rolsArray= [];
      this.registrationService.getRegistrationById(id).subscribe(data => {
        //console.info(data);
        this.mainModel=data.object;
        this.mainModel.active=data.object.user.active;
        this.mainModel.userName=data.object.user.userName;
        var roleArray = data.object.user.roles.split(",");

        console.info(roleArray);
      //debugger

        for(var i=0; i < roleArray.length;i++){

          for(var j=0;j < this.allRole.length;j++){
            //console.info(roleArray[i]);
            //console.info(this.allRole[j].roleCode);
            if(roleArray[i] === this.allRole[j].roleCode){
              //console.info(this.allRole[j].roleName);
              this.allRole[j].check=true;
            }else{
              this.allRole[j].check=false;
            }
          }

          console.info(this.allRole);

          //let roleObj = new Role();
          //roleObj.id = i
        // roleObj.roleName = roleArray[i];
          //roleObj.check = true; 

          //this.rolsArray.push(roleObj);

        }

      });

    });
  }

  /* userNameExistError : boolean =true;
  checkUsername(){

    this.userNameExistError = true;

    this.registrationService.checkUserName(this.mainModel.userName).subscribe(data =>{
      console.info(data);
      if(data.code === "0000"){
        this.userNameExistError = false;
      }
      console.info(this.userNameExistError);
    }
      )
  } */


// this function does the job of sending the selected countried out the component
public sendCheckedCountries(): void {
  const selectedCountries = this.countries.filter( (country) => country.checked );
  // you could use an EventEmitter and emit the selected values here, or send them to another API with some service

  console.log (selectedCountries);
}
  

}
