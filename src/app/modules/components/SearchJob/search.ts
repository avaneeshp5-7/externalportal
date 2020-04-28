import { NotifierService } from 'angular-notifier';
import { UserServiceService } from './../../../user-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-search',
  templateUrl: 'search.html',
  styleUrls: ['search.css']
})
export class SearchComponent implements OnInit {
  keyData: any;
  cityData: any;
  searchForm: FormGroup;
  faArrowRight = faArrowCircleRight;
  experienceData: any;
  jobDetails: any;
  constructor(
    private fb: FormBuilder,
    private _userServiceService: UserServiceService,
    private _notifireService:ToastrService
  ) {
    this.keyData = [];
    this.cityData = [];
    this.jobDetails=[];
    this.experienceData = [];
    this.searchForm = this.fb.group({
      key: [null, Validators.required],
      city: [null, Validators.required],
      experience: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.year();
  }
  searchKey(items: string) {
    this.searchForm.value.key = { key: items };
    this._userServiceService.searchKey(this.searchForm.value.key).subscribe(data => {
      if (data['success'] === true) {
        this.keyData = data['data'];
      }
    });
  }
  searchCity(items: string) {
    this.searchForm.value.city = { key: items };
    this._userServiceService.searchCity(this.searchForm.value.city).subscribe(data => {
      if (data['success'] === true) {
        this.cityData = data['data'];
      }
    });
  }
  year(){
    for(let i=1;i<=12;i++){
      this.experienceData.push({exp:i + ' Year'})
    }
  }
  searchJobs(){
    if(this.searchForm.valid){
      this._userServiceService.searchJob(this.searchForm.value).subscribe(value=>{
        if (value['success'] === true) {
          this.jobDetails = value['data'];
        }
      });
    }else{
      this._notifireService.error('Select search keywords');
    }
  }
}