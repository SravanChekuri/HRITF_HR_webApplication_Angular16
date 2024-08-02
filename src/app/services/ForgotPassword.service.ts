import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

constructor( private http:HttpClient) { }


// api for forgot pw

ForgotDetails(FgpwPage:any){

  const httpheaders = new HttpHeaders({

    Authorization: 'Bearer ' + localStorage.getItem('token'),

  });

  return this.http.post(environment.baseApiKey+"/generateOtp",FgpwPage,{headers:httpheaders});
  
}


}
