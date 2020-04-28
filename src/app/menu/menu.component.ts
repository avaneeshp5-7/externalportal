import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
isLogOut:boolean;
  isLog: boolean;
  constructor(
    private _Router:Router
  ) { 
    
    if(localStorage.getItem('currentUser')!=null){
      this.isLogOut=true;
      this.isLog=false;
    }
    else{
      this.isLogOut=false;
      this.isLog=true;   
    }
  }
  ngOnInit() {
  }
  logOut(){
    localStorage.removeItem('currentUser');
    window.location.href='/';
  }
  login(){
    this._Router.navigateByUrl('/login');
  }
}
