import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard1 implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
 
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