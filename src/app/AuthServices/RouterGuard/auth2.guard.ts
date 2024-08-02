import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard2 implements CanActivate {

  userData:any; 
 
  constructor(private authService: AuthService, private router: Router) {
    const userData1 = localStorage.getItem('loginData');
      if(userData1){
      this.userData =  JSON.parse(userData1);
      }
    // console.log("userdata",this.userData);
  }
 
  canActivate(): boolean {
    if (this.authService.isLoggedIn() && this.userData?.ROLE === "HR") {
      return false;
    } else {
      this.router.navigate(['/login']);
      return true;
    }
  }

  
}