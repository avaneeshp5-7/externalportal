import { faArrowAltCircleRight,faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserServiceService} from "../user-service.service";
import { NotifierService } from "angular-notifier";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  faArrowAltCircleRight=faArrowAltCircleRight;
  faBriefcase=faBriefcase
  msg1;msg2
  model:any;
  email:any;
  password:any;
  userinfo:any
  constructor(
    private rout:Router,
    private service:UserServiceService,
    private _NotifierService:ToastrService
    ) {
   }
  ngOnInit() {
  }
  
  funLogin(formdata){
    if (formdata.valid)
    {
      var data={Email:this.email,Password:this.password}
      this.service.loginService(data).subscribe(dt=>{
      if(dt['success']==true){
        this._NotifierService.success('You are logged in !!','Login'); 
        this.userinfo=dt['data'][0];
        console.log(this.userinfo);
        localStorage.setItem('currentUser',JSON.stringify(this.userinfo));
        this.rout.navigateByUrl('/profile');
      }
      else{  
        this._NotifierService.error(dt['message'],'Login'); 
      }
    })
    }
    else{
      this.msg1="Enter User name"
      this.msg2="Enter Password"
    }
}
focus:any;
focusMethod(){
 this.focus="Plz Enter Valid email"
}

gotoReg(){
  this.rout.navigateByUrl('/register');
}
}
