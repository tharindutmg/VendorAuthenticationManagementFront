import { Component, OnInit } from '@angular/core';
import { Application } from '../application/model/application';
import { ApplicationService } from '../application/service/application.service';
import { UserAppService } from '../user-app/service/user-app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  applicationList: Application[];

  constructor(private applicationService:ApplicationService,private userAppService:UserAppService,) { }

  ngOnInit(): void {
    this.getAllApplications();
  }

  getAllApplications(){
    /* this.applicationService.getAllApplication().subscribe(responce =>{
      this.applicationList= responce.list;
    }); */
    var userId= localStorage.getItem("userId");
    this.userAppService.getAllAppByUserId(userId).subscribe(res =>{
      if (res.code === "1111"){
        this.applicationList = res.object.appList;
      }else{
        
      }
    });
  }

}
