import { UserServiceService } from './../user-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faHome, faBriefcase, faMapMarker, faPencilAlt, faFileInvoice, faHandPointRight } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent implements OnInit {
  faBriefcase = faBriefcase;
  faMapMarker = faMapMarker;
  faHandPointRight = faHandPointRight;
  faHome = faHome;
  faPencilRuler = faPencilAlt;
  faFileAlt = faFileInvoice
  jobData: Object;
  constructor(
    private _Router: Router,
    private _UserServiceService: UserServiceService
  ) {

  }

  ngOnInit() {
    this.getJob('java','new+york');
  }
  applyJob() {
    if (localStorage.getItem('currentUser') == null) {
      this._Router.navigateByUrl('/login');
    }
    // else{
    //  alert('h')
    // }
  }
  getJob(data1,data2) {
    this._UserServiceService.getJobsData(data1,data2).subscribe(data => {
      this.jobData = data
      console.log(this.jobData);
    });
  }
}
