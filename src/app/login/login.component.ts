import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from './model/login';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mainModel = new Login()

  constructor(private loginService:LoginService,public _router: Router) { }

  ngOnInit(): void {
  }
  invalidLogin:boolean;
  submit(){
    this.invalidLogin=false;
    this.loginService.login(this.mainModel).subscribe(data =>{
      console.log(data);
      if(data.code === "1111"){
        localStorage.clear();
        localStorage.setItem('userId', data.object.userId);
        localStorage.setItem('userName', data.object.userName);
        localStorage.setItem('vamToken', data.object.token);
        //debugger
        var role=new String( );
        //console.info(data.roles.length);
        for(let x=0;data.object.roles.length > x ; x++){
          role=role.concat(data.object.roles[x].authority +",");
        }
        //console.info(role);
        localStorage.setItem('role', role.toString());
  
        this._router.navigate(['/home']);
      }else{
        this.invalidLogin=true;
      }
      

    })
  }

}
