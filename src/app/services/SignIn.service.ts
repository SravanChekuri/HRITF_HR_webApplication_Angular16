import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { TokenserviceService } from './tokenservice.service';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

constructor(private http:HttpClient, private service:TokenserviceService) { }


//New user registration api

Signdetails(signIndata:any){
  this.service.authLink();
  const httpheaders = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });
  return this.http.post(environment.baseApiKey+"/userRegister",signIndata,{headers:httpheaders});
}



//api for updating user data

updateUser(signIndata:any,id:any){
  this.service.authLink();
  const httpheaders = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });
  return this.http.put(environment.baseApiKey+"/updateUserById/"+id,signIndata,{headers:httpheaders});
}




// api for getting all the user data

getadmin(){
  this.service.authLink();
  const httpheaders = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });
  return this.http.get(environment.baseApiKey+"/getAllUserDetails",{headers:httpheaders});
}



}
