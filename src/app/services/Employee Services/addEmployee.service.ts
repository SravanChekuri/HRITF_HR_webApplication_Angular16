import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { TokenserviceService } from '../Login Services/tokenservice.service';
import { Observable } from 'rxjs';

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

  salaryemployeedetails(data:any){
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    return this.http.post(environment.baseApiKey + '/employeesalary',data,{headers: httpheaders})

}


salaryUpadate(data:any,id:any){
  this.service.authLink();
  const httpheaders = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  return this.http.put(environment.baseApiKey + '/updatesalary/'+id,data,{headers: httpheaders})


}

salarySubmitDate( id: any, salaryDate: any,enddate: any): Observable<any> {
  this.service.authLink();
  const httpheaders = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  return this.http.get(environment.baseApiKey + '/getSalaryDetails/' + id + '/' + salaryDate + '/' + '4712-12-31' , { headers: httpheaders });
} 

SalaryViewHistoryData(assignmentid:any){
  const httpHeaders=new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token'),
});
const empSalaryViewApi = environment.baseApiKey+ '/SViewhistory/' + assignmentid;
console.log("empSalaryViewApi",empSalaryViewApi);
return this.http.get(empSalaryViewApi, { headers: httpHeaders });
}

  
}
