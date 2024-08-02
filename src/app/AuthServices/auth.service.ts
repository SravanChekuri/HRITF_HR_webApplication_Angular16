import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
 
@Injectable({
  providedIn: 'root'
})
 
export class AuthService {
  
  private loggedIn = false;
 
  constructor(private router: Router) {
    this.loggedIn = localStorage.getItem('loggedIn') === 'true';
   }
 
  login(loginData: any) {
    this.loggedIn = true;
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('loginData', JSON.stringify(loginData));
    this.router.navigate(['/landing']);
  }
 
  logout() {
    this.loggedIn = false;
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('loginData');
    this.router.navigate(['/login']);
  }
 
  isLoggedIn(): boolean {
    return this.loggedIn || localStorage.getItem('loggedIn') === 'true';
    // return this.loggedIn;
  }
}
 