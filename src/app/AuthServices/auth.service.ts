import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
 
@Injectable({
  providedIn: 'root'
})
 
export class AuthService {
   
  constructor(private router: Router) {

   }
 
  login(loginData: any) {
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('loginData', JSON.stringify(loginData));
    this.router.navigate(['/landing']);
  }
 
  logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('loginData');
    this.router.navigate(['/login']);
  }
 
  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }

  getUserData(): any {
    const userData = localStorage.getItem('loginData');
    return userData ? JSON.parse(userData) : null;
  }
  
}
 