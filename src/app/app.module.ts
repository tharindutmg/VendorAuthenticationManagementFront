import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app.routing';
import { RegistrationComponent } from './registration/registration.component';
import { FormBuilder, FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './login/service/login.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegistrationService } from './registration/service/registration.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BasicAuthInterceptor } from './auth/basic-auth.interceptor';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { NgxCheckboxModule } from 'ngx-checkbox';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe'; //importing the module
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { NavigationComponent } from './navigation/navigation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { GlobalErrorHandlerService } from './auth/global-error-handler.service';
import { RouteGuardService } from './auth/route-guard.service';
import { RoleComponent } from './role/role.component';
import { RoleService } from './role/service/role.service';
import { UserAppComponent } from './user-app/user-app.component';
import { ApplicationComponent } from './application/application.component';
import { ApplicationService } from './application/service/application.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserAppService } from './user-app/service/user-app.service';
import { NotLoginComponent } from './not-login/not-login.component';


@NgModule({
  declarations: [
    
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    UserRolesComponent,
    NavigationComponent,
    PageNotFoundComponent,
    HomeComponent,
    RoleComponent,
    UserAppComponent,
    ApplicationComponent,
    NotLoginComponent,
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    NgxCheckboxModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule, //including into imports
    Ng2OrderModule, //add here
    NgxPaginationModule,//add here
    NgxBootstrapIconsModule.pick(allIcons),
    ModalModule.forRoot(),
  ],
  providers: [LoginService,RegistrationService,FormBuilder,RoleService,
    RouteGuardService,ApplicationService,UserAppService,
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: ErrorHandler, useClass:GlobalErrorHandlerService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
