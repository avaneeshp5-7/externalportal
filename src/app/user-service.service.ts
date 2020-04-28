import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from './url';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  constructor(private http:HttpClient) { }
  loginService(data) {
    return this.http.post(URL.postuser,data);
  }
  getProfile(){
    return this.http.get(URL.get_profile).toPromise();
  }
  update_Profile(id){
    return this.http.post(URL.update_profile,id);
  }
  user_register(data){
    return this.http.post(URL.user_register,data);
  }
  user_Remove(data){
    return this.http.post(URL.user_remove,data);
  }
  searchKey(data){
    return this.http.post(URL.search_key,data);
  }
  searchCity(data){
    return this.http.post(URL.search_city,data);
  }
  searchJob(data){
    return this.http.post(URL.search_jobs,data);
  } 
  getUserDetails(data){
    return this.http.post(URL.get_user_details,data);
  }
  updateSkills(data:any){
    return this.http.post(URL.update_skills_details,data);
  } 
  getSkills(data){
    return this.http.post(URL.get_skills_details,data);
  }
  updatePrfile(data){
    return this.http.post(URL.update_profile_details,data);
  }
  updateEmployement(data){
    return this.http.post(URL.update_emplyement_details,data);
  }
updateResumeHeading(data){
return this.http.post(URL.update_resume_heading,data)
}
updateProfileSummary(data){
  return this.http.post(URL.update_profile_summary,data)
  }
getJobsData(data1,data2){
  return this.http.get(`https://jobs.github.com/positions.json?description=${data1}&location=${data2}`);
}
UpdateEducation(data){
  return this.http.post(URL.update_education_details,data);
}
addducation(data){
  return this.http.post(URL.add_education_details,data);
}
getEducation(dt){
  return this.http.post(URL.get_education_details,dt);
}
resumeUpload(data){
  return this.http.post(URL.resume_upload,data);
}
}
 