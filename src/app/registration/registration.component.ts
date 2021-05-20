import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Registration } from './model/registration';
import { RegistrationService } from './service/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  mainModel = new Registration();

  mainModelList: Registration[];

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  mobNumberPattern = "^(?:7|0|(\\+94?))[0-9]{9,10}$";
  nicPattern = "^([0-9]{9}[x|X|v|V]|[0-9]{12})$";
  

  constructor(private registrationService:RegistrationService,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  submit(form:any){
    this.mainModel.user.password = this.mainModel.password;
    this.mainModel.user.userName = this.mainModel.userName;
    localStorage.clear();

    this.registrationService.registration(this.mainModel).subscribe(data =>{
      if(data.code === "1111"){
        this.registrationService
        form.reset();
        this.toastr.success('Create Success',data.message);
      }else{
        this.toastr.error('Somthing Wrong', data.message);
      }
      
      console.info(data);
    })


  }
  userNameExistError : boolean =true;
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
  }

  checkPasswordError : boolean = true;
  checkPasswords(form:any){
    
    this.checkPasswordError=true;
    let pass = form.password;
    let conf = form.confirm;

    console.info(pass);
    console.info(conf);

    if(pass === conf){
      this.checkPasswordError = true; //"Those passwords didn't match. Try again."
    }else{
      if(conf != undefined && conf !== ""){
        this.checkPasswordError = false;
      }
    }
    console.info(this.checkPasswordError);
  }

}

