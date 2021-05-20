import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Application } from './model/application';
import { ApplicationService } from './service/application.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  mainModel = new Application();

  mainModelList: Application[];

  /* data table varible start*/
  filter: any = '';
  searchsearvice : any ='';
  p: number = 1;
  cp: number = 1;
  /* data table varible end*/

  statusArr = [{ title: "Active", value: true },
                { title: "Deactive", value: false }]

  constructor(private applicationService:ApplicationService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllApplications();
  }

  clearModel(){
    this.mainModel = new Application();
    this.recordError=true;
  }

  submit(){
    this.applicationService.createApplication(this.mainModel).subscribe(res =>{
      if(res.code === "1111"){
        this.toastr.success('Process Success',res.message);
        this.getAllApplications();
      }else{
        this.toastr.error('Somthing Wrong', res.message);
      }
      
      console.info(res);
    });
  }

  getApplicationById(application:Application){
    this.recordError=true;
    this.applicationService.getApplicationById(application).subscribe(res =>{
      this.mainModel = res.object;
      console.log(this.mainModel);
    });
  }

  deleteApplication(application:Application){
    if (confirm('Are you sure?')) {
      this.applicationService.deleteApplication(application).subscribe(res =>{
        if(res.code === "1111"){
          this.toastr.success('Delete Success',res.message);
          this.getAllApplications();
        }else{
          this.toastr.error('Somthing Wrong', res.message);
        }
        
        console.info(res);
      });
    }
  }

  recordError:boolean=true;
  getApplicationbyCode(){
    this.recordError=true;
   // if(this.mainModel.applicationId == null){
      this.applicationService.getApplicationbyCode(this.mainModel.applicationCode).subscribe(req =>{
        //console.info(req.object)
        if(req.object != null){
          if(this.mainModel.applicationId != null){//this is use when update
            if(req.object.applicationId === this.mainModel.applicationId){
              this.recordError=true;
            }else{
              this.recordError=false;
            }
          } else{
            this.recordError=false;
          }
        }
      });
   // }
  }

  getAllApplications(){
    this.applicationService.getAllApplication().subscribe(responce =>{
      this.mainModelList= responce.list;
    });
  }

}
