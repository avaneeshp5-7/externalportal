import { ProfileDetailsComponent } from './../modules/components/profile/profiledetails/profile-details';
import { faPowerOff,faUser,faTimes} from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from "../user-service.service";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userid: any;
  userinfo: any;
  currentuser: any
  dt: any;
  faUser=faUser;
  faPowerOff=faPowerOff;
  userdetails: any;
  pro_flag:boolean=true;
  pro_edit:boolean=false;
  first_name:any;
  middle_name:any;
  last_name:any;
  Email:any;
  contact:any; 
  constructor(
    private service: UserServiceService,
    private _NgbModal:NgbModal
    ) { }
  ngOnInit() {
    if(localStorage.getItem('currentUser')!=null){
      this.userdetails=localStorage.getItem('currentUser'); 
      this.userdetails=JSON.parse(this.userdetails);
    } 
  }
  openProfile() {
    this._NgbModal.open(ProfileDetailsComponent, 
      {
        ariaLabelledBy: 'modal-basic-title',
        size: 'xl',
        backdrop:'static'
      });
  }
}
