import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Role } from './model/role';
import { RoleService } from './service/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  mainModel = new Role();

  mainModelList: Role[];

  /* data table varible start*/
  filter: any = '';
  searchsearvice : any ='';
  p: number = 1;
  cp: number = 1;
  /* data table varible end*/

  statusArr = [{ title: "Active", value: true },
                { title: "Deactive", value: false }]

  constructor(private roleService:RoleService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllRoles();
  }

  clearModel(){
    this.mainModel = new Role();
    this.recordError=true;
  }

  submit(){
    this.roleService.createRole(this.mainModel).subscribe(res =>{
      if(res.code === "1111"){
        this.toastr.success('Create Success',res.message);
        this.getAllRoles();
      }else{
        this.toastr.error('Somthing Wrong', res.message);
      }
      
      console.info(res);
    });
  }

  getRoleById(role:Role){
    this.recordError=true;
    this.roleService.getRoleById(role).subscribe(res =>{
      this.mainModel = res.object;
    });
  }

  deleteRole(role:Role){
    if (confirm('Are you sure?')) {
      this.roleService.deleteRole(role).subscribe(res =>{
        if(res.code === "1111"){
          this.toastr.success('Delete Success',res.message);
          this.getAllRoles();
        }else{
          this.toastr.error('Somthing Wrong', res.message);
        }
        
        console.info(res);
      });
    }
  }

  recordError:boolean=true;
  getRolebyRoleCode(){
    this.recordError=true;
    this.roleService.getRolebyRoleCode(this.mainModel.roleCode).subscribe(req =>{
      //this.mainModel = req.object;
      if(req.object != null){
        if(this.mainModel.roleId != null){//this is use when update
          if(req.object.roleId === this.mainModel.roleId){
            this.recordError=true;
          }else{
            this.recordError=false;
          }
        } else{
          this.recordError=false;
        }
      }
    });
  }

  getAllRoles(){
    this.roleService.getAllRole().subscribe(responce =>{
      this.mainModelList= responce.list;
    });
  }

}
