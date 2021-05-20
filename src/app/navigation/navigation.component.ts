import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../Common/role';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  //retrievedObject = JSON.parse(localStorage.getItem('employData'));

  userName : string ="";

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userName=localStorage.getItem('userName')
  }

  logOut(){
    this.router.navigate(['']);
    this.clearLocalStroage();
  }

  private clearLocalStroage(){
    localStorage.removeItem("vamToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
  }

  get isAdmin() {
    var roleStr= localStorage.getItem("role");
    var roleLocalArr = roleStr.split(",");

    return roleLocalArr.includes(Role.Admin); ;
  }

  hasRole(role:string){
    var roleStr="";
    var returnVal = false;
    var count = 0;
    var isAdmin = false;
    roleStr= localStorage.getItem("role");

    
    if(roleStr !== ""){
      var roleLocalArr = roleStr.split(",");
      var roleArray = role.split(",");
      if(roleArray.length == 1 && roleLocalArr.length == 1){
        
      }
      for(var i=0 ; i< roleLocalArr.length;i++){

        for(var x=0 ; x< roleArray.length;x++){
          if(roleLocalArr[i] === roleArray[x]){
            count++;
            /* if(){

            } */
          }
        }
      }
      if(roleArray.length == count){
        returnVal=true;
      }


    }
  return returnVal;
  }

}
