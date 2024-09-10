import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TokenserviceService {

  constructor(private router:Router) { }

  authLink() {
      // const navigation = useNavigation();
      let token =  localStorage.getItem('token');
      const expired =  this.isTokenExpired();
      // console.log('expired', expired);
      if (expired) {
          // alert('Token expire. Please Login Again!');
          Swal.fire({
            position:'top',
            title: "Your Session has Experied! 😞",
            text: 'Please Login Again!',
            icon: "error",
            showCancelButton:false,
            width:400
          });
          // navigation.navigate('login');
          this.router.navigate(['/']);
          // console.log('token expire');
          localStorage.removeItem('token');
          localStorage.removeItem('expiryTime');
          // set LocalStorage here based on response;
      }
      return {
          // you can set your headers directly here based on the new token/old token
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${token}`
          }
      }
  }


  isTokenExpired() {
    const expiryTime =  localStorage.getItem('expiryTime');
    // console.log('expiryTime', expiryTime);
    if (!expiryTime) {
        return true;
    }
    const now = new Date().getTime();
    // console.log("now----expiryTime", now, parseInt(expiryTime, 10));
    return now >= parseInt(expiryTime, 10);
  }




}
