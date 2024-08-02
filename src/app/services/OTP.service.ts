import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OTPService {

constructor(private http:HttpClient){ }



// api for verify otp

OtpDetails(otppage:any):Observable<any>{

  const httpheaders = new HttpHeaders({

    Authorization: 'Bearer ' + localStorage.getItem('token'),

  });

  return this.http.post<any>(environment.baseApiKey+"/verifyotp",otppage,{headers:httpheaders});

}





}
