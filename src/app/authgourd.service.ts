import { Injectable } from '@angular/core';
import { Router,CanActivate } from '@angular/router';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthgourdService implements CanActivate {
constructor(private router: Router) {}
canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  if(localStorage.getItem('currentUser')) {
    return true;
  }else{
    this.router.navigate(['/']);
    return false;
  }
}
}
