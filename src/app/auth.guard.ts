import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private router:Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return false;

    let uid:any = localStorage.getItem("seaways");
    if(uid){
      return true;
    }else{
      this.router.navigate(['phone-login']);
      return false;
    }
    
  }
  
}

//https://www.javaguides.net/2020/11/how-to-deploy-angular-application-to-heroku.html = website

//https://www.youtube.com/watch?v=HWBSSC7Vbg0 = video
