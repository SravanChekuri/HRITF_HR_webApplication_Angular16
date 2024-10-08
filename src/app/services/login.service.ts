import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private notificationCountSource = new BehaviorSubject<number>(0);
  currentNotificationCount = this.notificationCountSource.asObservable();

constructor(private http:HttpClient) { }

//api for login

sendLoginDetails(loginData:any){
  let token =localStorage.getItem('token');
  const httpheaders = new HttpHeaders({
  Authorization: 'Bearer ' + localStorage.getItem('token'),
  });
  return this.http.post(environment.baseApiKey+"/login",loginData,{headers:httpheaders});
}


//api for MFA 

mfaAuth(mfaDataSend:any){
  let token=localStorage.getItem('token');
  const httpheaders = new HttpHeaders({
  Authorization: 'Bearer ' + localStorage.getItem('token'),
  });
  return this.http.post(environment.baseApiKey+"/verify2fa",mfaDataSend,{headers:httpheaders});
}


//api for notifications

notifications(): Observable<any> {
  const httpheaders = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });
  return this.http.get(environment.baseApiKey+"/notifications",{headers:httpheaders});
}

updateNotificationCount(count: number) {
  this.notificationCountSource.next(count);
}

clearNotificationCount() {
  this.notificationCountSource.next(0);
}

markNotificationsAsViewed() {
  sessionStorage.setItem('notificationsViewed', 'true');
}

haveNotificationsBeenViewed(): boolean {
  return sessionStorage.getItem('notificationsViewed') === 'true';
}

recentEmployees(): Observable<any> {
  const httpheaders = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });
  return this.http.get(environment.baseApiKey+"/recent_Employees",{headers:httpheaders});
}

getCountires(): Observable<any> {
  const httpheaders = new HttpHeaders({
    'X-CSCAPI-KEY': 'MGZMRlZLbkZ0SmNiOGkxQzBlREFLYjBKdlZZU1BnRmlRbGI3N2lvVg=='
  })
  return this.http.get<any>("https://api.countrystatecity.in/v1/countries", { headers: httpheaders })
}
getAllstates(countryId: any): Observable<any> {
  const httpheaders = new HttpHeaders({
    'X-CSCAPI-KEY': 'MGZMRlZLbkZ0SmNiOGkxQzBlREFLYjBKdlZZU1BnRmlRbGI3N2lvVg=='
  });
  return this.http.get<any>(`https://api.countrystatecity.in/v1/countries/${countryId}/states`,{headers:httpheaders})
}

getAllcities(countryId:any, stateId:any):Observable<any>{
  const httpheaders=new HttpHeaders({
    'X-CSCAPI-KEY': 'MGZMRlZLbkZ0SmNiOGkxQzBlREFLYjBKdlZZU1BnRmlRbGI3N2lvVg=='
  });
  return this.http.get<any>(`https://api.countrystatecity.in/v1/countries/${countryId}/states/${stateId}/cities`,{headers:httpheaders});
}

}
