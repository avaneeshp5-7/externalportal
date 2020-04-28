import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../matchpassword';
import { Router } from '@angular/router';
import {faArrowAltCircleRight} from '@fortawesome/free-solid-svg-icons'
import {UserServiceService} from '../user-service.service'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  faArrowAltCircleRight=faArrowAltCircleRight;
  submitted = false;
  user: any;
  cityname:any;
  uid: any;
  errmsg:string;
  registerForm: FormGroup;
  updateForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private user_service:UserServiceService,
    private rout:Router,
    private _NotifierService:ToastrService
    ) { 
    this.cityname=[];
  }
  ngOnInit() {
    this.cityname=[{cityname:'Delhi NCR'},{cityname:'Mumbai'},{cityname:'Hyderabad'},{cityname:'Chennai'}];
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      middle_name: ['', Validators.required],
      last_name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      cityname:[null,Validators.required],
      contact: ['', [Validators.required,Validators.pattern('[0-9]*'), Validators.minLength(10),Validators.maxLength(10)]],
      Password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      confirmPassword: ['', Validators.required]
    }, {validator: MustMatch('Password', 'confirmPassword')})
    // this.get_user();
  }
  get f() { 
    return this.registerForm.controls
  }
  mySubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    var data = (this.registerForm.value);
    this.user_service.user_register(data).subscribe(dt => {
      console.log(dt);
      if(dt['success'] === true) {
        this._NotifierService.success('',dt['message']);
        this.rout.navigateByUrl('/login');
      }
      else {
        this._NotifierService.error('',dt['message']);
        this.rout.navigateByUrl('/register');
      }
    })
  }
}

