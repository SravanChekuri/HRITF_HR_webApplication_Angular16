import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { TokenserviceService } from './tokenservice.service';

@Injectable({
  providedIn: 'root',
})
export class AddEmployeeService {
  constructor(private http: HttpClient, private service: TokenserviceService) {}

  //Add employee form api

  addEmployee(data: any) {
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.post(environment.baseApiKey + '/registeremployee', data, {headers: httpheaders,});
  }

  //bulk upload api

  sendBulkData(formData: any) {
    this.service.authLink();
    const httpheaders = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('token'),});
    return this.http.post(environment.baseApiKey + '/bulkRegister', formData, { headers: httpheaders,});
  }

  getEmpNumber(data: any) {
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.post(environment.baseApiKey + '/getLatestempno', data, {headers: httpheaders,});
  }

  
}
