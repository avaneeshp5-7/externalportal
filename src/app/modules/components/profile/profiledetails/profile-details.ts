import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserServiceService } from './../../../../user-service.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPowerOff, faMapMarkerAlt, faPhoneAlt, faBriefcase, faWallet, faEnvelope, faUserClock, faPencilAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { OnInit, Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-details',
  templateUrl: 'profile-details.html',
  styleUrls: ['profile-details.css']
})
export class ProfileDetailsComponent implements OnInit {
  faPowerOff = faPowerOff
  faMapMarker = faMapMarkerAlt;
  faPhoneAlt = faPhoneAlt;
  faBriefcase = faBriefcase;
  faWallet = faWallet;
  faEnvelope = faEnvelope;
  userInfo: any;
  eduEditMode: boolean;
  faTimesCircle = faUserClock;
  faPlusCircle = faPlusCircle
  faPencilAlt = faPencilAlt;
  userDetails: any;
  skillsFrom: FormGroup;
  userDetailsForm: FormGroup;
  editMode: boolean;
  skilsEditMode: boolean;
  editResHead: boolean;
  editProfileSummary: boolean;
  editEmpDetail: boolean;
  tillPresent: boolean;
  killSting: any;
  skillsList: any;
  formData: {};
  resumeForm: FormGroup;
  addbool: boolean;
  profileSummaryForm: FormGroup;
  EmployeeDetailsFrom: FormGroup;
  educationForm: FormGroup;
  addEdit: any;
  EduDetails: any;
  uploadedFiles: any;
  constructor(
    private fb: FormBuilder,
    private _NgbModal: NgbModal,
    private _Router: Router,
    private _UserServiceService: UserServiceService,
    private _Notifire: ToastrService

  ) {
    this.editMode = false;
    this.editEmpDetail = false;
    this.tillPresent = false;
    this.editProfileSummary = false;
    this.editResHead = false;
    this.addbool = true;
    this.skilsEditMode = false;
    this.eduEditMode = false
    this.skillsList = [];
    this.educationForm = this.fb.group({
      education: [null, Validators.required],
      course: [null, Validators.required],
      specialization: [null, Validators.required],
      university: [null, Validators.required],
      coursetype: [null, Validators.required],
      passingoutyear: [null, Validators.required],
      gradingsystem: [null, Validators.required],
      marks: [null, Validators.required]
    })
    this.EmployeeDetailsFrom = this.fb.group({
      designation: [null],
      orgenozations: [null],
      currentstatus: [null],
      year: [null, Validators.required],
      months: [null, Validators.required],
      emparea: [null],
      tillworked: [null],
      jobdescriptions: [null],
      leaveyear: [null],
      leavemonth: [null]
    });
    this.resumeForm = this.fb.group({
      resumeheadline: [null, Validators.required]
    });
    this.profileSummaryForm = this.fb.group({
      profilesummary: [null, Validators.required]
    });
    this.skillsFrom = this.fb.group({
      skills: [null, Validators.required]
    });
    this.userDetailsForm = this.fb.group({
      first_name: [null, Validators.required],
      middle_name: [null, Validators.required],
      last_name: [null, Validators.required],
      cityname: [null, Validators.required],
      notice: [null, Validators.required],
      dob: [null, Validators.required],
      totalexp: [null, Validators.required],
      currency: [null, Validators.required],
      country: [null, Validators.required],
      totalmonth: [null, Validators.required],
      ctcthousand: [null, Validators.required],
      ctclac: [null, Validators.required],
      contact: [null, Validators.required],
      Email: [null, Validators.required]
    });
  }
  ngOnInit() {
    if (localStorage.getItem('currentUser') != null) {
      this.userInfo = (JSON.parse(localStorage.getItem('currentUser')));
      this.userInfo = { id: this.userInfo.id, Email: this.userInfo.Email }
      this.getUserInfo(this.userInfo);
      this.getEducationData(this.userInfo);
      this.getSkills();
    } else {
      this._Router.navigateByUrl('/login');
    }
    this.EmployeeDetailsFrom.controls.currentstatus.valueChanges.subscribe(value => {
      if (value === 'yes') {
        this.tillPresent = false;
        this.EmployeeDetailsFrom.controls.leaveyear.reset();
        this.EmployeeDetailsFrom.controls.leavemonth.reset();
      } else {
        this.tillPresent = true;
        this.EmployeeDetailsFrom.controls.tillworked.reset();
      }
    });
  }
  getUserInfo(data: any) {
    this._UserServiceService.getUserDetails(data).subscribe(value => {
      if (value['success'] === true) {
        this.userDetails = value['data'] as any;
      }
    });
  }
  getEducationData(data: any) {
    this._UserServiceService.getEducation(data).subscribe(value => {
      if (value['success'] === true) {
        this.EduDetails = value['data'] as any;
      }
    });
  }
  closeModal() {
    this._NgbModal.dismissAll();
    this.editMode = false;
  }
  openContent(content) {
    this.editMode = !this.editMode;
    this.userDetailsForm.patchValue(this.userDetails[0]);
  }
  openSkills(content) {
    this.skillsFrom.patchValue({
      skills: this.skillsList.map(va => {
        return va.skills
      })
    });
    this.skilsEditMode = !this.skilsEditMode;
  }
  submitSkills() {
    this.skillsFrom.value.skills = this.skillsFrom.value.skills.map(val => {
      if (val) {
        return val.label ? val.label : val;
      }
    }).toString();
    this._UserServiceService.updateSkills({ skills: this.skillsFrom.value.skills, userid: this.userInfo.id }).subscribe(data => {
      if (data['success'] === true) {
        this._Notifire.success('', data['message']);
        this.skillsFrom.reset();
        this.skillsList = [];
        this.getSkills();
        this.skilsEditMode = false;
      } else {
        this._Notifire.error(data['message']);
      }
    });
  }
  educationAddEdit(value: string, eduid: any) {
    this.addEdit = eduid
    this.eduEditMode = !this.eduEditMode;
    this.addbool = false
    if (this.addEdit) {
      this.educationForm.patchValue(this.addEdit);
    }
  }
  cancelEdu() {
    this.eduEditMode = false;
    this.addbool = true;
  }
  educationSubmit() {
    this.formData = {
      university: this.educationForm.value.university,
      coursetype: this.educationForm.value.coursetype,
      education: this.educationForm.controls.education.value.label ? this.educationForm.controls.education.value.label : this.educationForm.controls.education.value,
      specialization: this.educationForm.controls.specialization.value.label ? this.educationForm.controls.specialization.value.label : this.educationForm.controls.specialization.value,
      course: this.educationForm.controls.course.value.label ? this.educationForm.controls.course.value.label : this.educationForm.controls.course.value,
      passingoutyear: this.educationForm.controls.passingoutyear.value.label ? this.educationForm.controls.passingoutyear.value.label : this.educationForm.controls.passingoutyear.value,
      gradingsystem: this.educationForm.controls.gradingsystem.value.label ? this.educationForm.controls.gradingsystem.value.label : this.educationForm.controls.gradingsystem.value,
      marks: this.educationForm.controls.marks.value.label ? this.educationForm.controls.marks.value.label : this.educationForm.controls.marks.value,
      userid: this.userInfo.id,
      eduid: this.addEdit ? this.addEdit.eduid : null
    }
    if (this.educationForm.valid) {
      if (this.addEdit && this.addEdit.eduid != undefined) {
        this._UserServiceService.UpdateEducation(this.formData).subscribe(data => {
          if (data['success'] === true) {
            this._Notifire.success('', data['message']);
            this.getEducationData(this.userInfo);
            this.eduEditMode = false;
            this.addbool = true
          } else {
            this._Notifire.error(data['message']);
          }
        });
      } else {
        this._UserServiceService.addducation(this.formData).subscribe(data => {
          if (data['success'] === true) {
            this._Notifire.success('', data['message']);
            this.getEducationData(this.userInfo);
            this.eduEditMode = false;
            this.addbool = true
          } else {
            this._Notifire.error(data['message']);
          }
        });
      }
    } else {
      this._Notifire.error('Invalid form');
    }
  }
  updateProfile() {
    if (this.userDetailsForm.valid) {
      this.formData = {
        first_name: this.userDetailsForm.controls.first_name.value,
        cityname: this.userDetailsForm.controls.cityname.value.label ? this.userDetailsForm.controls.cityname.value.label : this.userDetailsForm.controls.cityname.value,
        notice: this.userDetailsForm.value.notice,
        contact: this.userDetailsForm.value.contact,
        middle_name: this.userDetailsForm.value.middle_name,
        last_name: this.userDetailsForm.value.last_name,
        Email: this.userDetailsForm.value.Email,
        dob: this.userDetailsForm.value.dob,
        currency: this.userDetailsForm.controls.currency.value.label ? this.userDetailsForm.controls.currency.value.label : this.userDetailsForm.controls.currency.value,
        country: this.userDetailsForm.value.country.label ? this.userDetailsForm.value.country.label : this.userDetailsForm.value.country,
        totalmonth: this.userDetailsForm.controls.totalmonth.value.label ? this.userDetailsForm.controls.totalmonth.value.label : this.userDetailsForm.controls.totalmonth.value,
        ctcthousand: this.userDetailsForm.controls.ctcthousand.value.label ? this.userDetailsForm.controls.ctcthousand.value.label : this.userDetailsForm.controls.ctcthousand.value,
        ctclac: this.userDetailsForm.controls.ctclac.value.label ? this.userDetailsForm.controls.ctclac.value.label : this.userDetailsForm.controls.ctclac.value,
        totalexp: this.userDetailsForm.controls.totalexp.value.label ? this.userDetailsForm.controls.totalexp.value.label : this.userDetailsForm.controls.totalexp.value,
        userid: this.userInfo.id
      }
      this._UserServiceService.updatePrfile(this.formData).subscribe(value => {
        if (value['success'] === true) {
          this._Notifire.success('', value['message']);
          localStorage.removeItem('currentUser');
          localStorage.setItem('currentUser', JSON.stringify(value['data']));
          this.editMode = false;
          this.getUserInfo(this.userInfo);
        } else {
          this._Notifire.error('', value['message']);
        }
      });
    } else {
      this._Notifire.error('', 'Invalid form details !')
    }
  }
  editEmpDetails() {
    this.editEmpDetail = !this.editEmpDetail;
    this.EmployeeDetailsFrom.patchValue(this.userDetails[0]);
  }
  submitEmpDetails() {
    if (this.EmployeeDetailsFrom.valid) {
      if (this.EmployeeDetailsFrom.value.currentstatus === 'no') {
        this.EmployeeDetailsFrom.value.leaveyear = this.EmployeeDetailsFrom.controls.leaveyear.value.label ? this.EmployeeDetailsFrom.controls.leaveyear.value.label : this.EmployeeDetailsFrom.controls.leaveyear.value,
          this.EmployeeDetailsFrom.value.leavemonth = this.EmployeeDetailsFrom.controls.leavemonth.value.label ? this.EmployeeDetailsFrom.controls.leavemonth.value.label : this.EmployeeDetailsFrom.controls.leavemonth.value
      }
      this.EmployeeDetailsFrom.value.year = this.EmployeeDetailsFrom.controls.year.value.label ? this.EmployeeDetailsFrom.controls.year.value.label : this.EmployeeDetailsFrom.controls.year.value,
        this.EmployeeDetailsFrom.value.months = this.EmployeeDetailsFrom.controls.months.value.label ? this.EmployeeDetailsFrom.controls.months.value.label : this.EmployeeDetailsFrom.controls.months.value
      this.EmployeeDetailsFrom.value.userid = this.userInfo.id;
      this._UserServiceService.updateEmployement(this.EmployeeDetailsFrom.value).subscribe(val => {
        if (val['success'] === true) {
          this._Notifire.success('', val['message']);
          this.userInfo = { id: this.userInfo.id }
          this.getUserInfo(this.userInfo);
          this.editEmpDetail = false;
        } else {
          this._Notifire.error('', val['message']);
        }
      });
    }
  }
  editResumeHead() {
    this.editResHead = !this.editResHead
    this.resumeForm.patchValue(this.userDetails[0]);
  }
  editResumeHeadSubmit() {
    this.resumeForm.value.userid = this.userInfo.id;
    this._UserServiceService.updateResumeHeading(this.resumeForm.value).subscribe(value => {
      if (value['success'] === true) {
        this._Notifire.success('', value['message']);
        this.getUserInfo(this.userInfo);
        this.editResHead = false
      }
      else {
        this._Notifire.error('', value['message']);
      }
    });
  }
  editProfSummary() {
    this.editProfileSummary = !this.editProfileSummary;
    this.profileSummaryForm.patchValue(this.userDetails[0]);
  }
  editProfSummarySubmit() {
    this.profileSummaryForm.value.userid = this.userInfo.id;
    this._UserServiceService.updateProfileSummary(this.profileSummaryForm.value).subscribe(value => {
      if (value['success'] === true) {
        this._Notifire.success('', value['message']);
        this.getUserInfo(this.userInfo);
        this.editProfileSummary = false
      }
      else {
        this._Notifire.error('', value['message']);
      }
    });
  }
  getSkills() {
    this._UserServiceService.getSkills({ userid: this.userInfo.id }).subscribe(value => {
      this.killSting = value['data'];
      this.killSting = this.killSting[0].skillname.split(',')
      this.killSting.forEach(element => {
        if (element) {
          this.skillsList.push({
            skills: element
          })
        }
      });
    });
  }
  fileSelect(event: any) {
    this.uploadedFiles = event.target.files;
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }
    if (this.uploadedFiles) {
      this._UserServiceService.resumeUpload(formData).subscribe(value => {
        if (value['success'] === true) {
          this._UserServiceService.updateEmployement({userid:this.userInfo.id}).subscribe(val=>{
            if (value['success'] === true) {
            this._Notifire.success('', val['message']);
            this.getUserInfo(this.userInfo);
            }
          });
        }
        else {
          this._Notifire.error('', value['message']);
        }
      });
    }
  }
}