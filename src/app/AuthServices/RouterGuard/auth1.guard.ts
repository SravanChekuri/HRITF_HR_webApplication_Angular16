import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard1 implements CanActivate {

  // userData:any; 

  constructor(private authService: AuthService, private router: Router) {}

    // const userData1 = localStorage.getItem('loginData');
    // if(userData1){
    //  this.userData =  JSON.parse(userData1);
    // console.log("userdata",this.userData);
 
  canActivate(): boolean {

    const userData = this.authService.getUserData();

    if (this.authService.isLoggedIn() && userData?.ROLE === "Admin") {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }


  
}