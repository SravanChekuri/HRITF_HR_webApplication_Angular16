import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../employee';
import { environment } from 'src/environments/environment.development';
import { TokenserviceService } from './tokenservice.service';
 
@Injectable({
  providedIn: 'root',
})
export class GetEmployeesService {
 
  private baseUrl = environment.baseApiKey + '/getAllEmployees';
  private baseUrlInitial = environment.baseApiKey + '/filterEmployees';
  private updateEmployee = environment.baseApiKey + '/editEmployeeById'; //api for emp/candidate update
 
  constructor(private http: HttpClient, private service: TokenserviceService) {}
 
  //present Address Data based on esd and end api
 
  updateButtonPresentAddressData(data:any,id:any){
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    // console.log("api",environment.baseApiKey + '/updateEmployeeAddres/'+id);
   
    return this.http.put(environment.baseApiKey + '/updateEmployeeAddres/'+id, data, { headers: httpheaders });
 
 
  }
 
  getPresentAddressData(id: any, type: any, esd: any, eed: any) {
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const presentapi = environment.baseApiKey +'/getAddrDetails/' + id + '/' + type + '/' + esd + '/' + '4712-12-31';
    // console.log("presentapi", presentapi);
    return this.http.get(presentapi, { headers: httpheaders });
  }
 
  //permanent Address Data based on esd and end api
 
  getPermanentAddressData(id: any, type: any, esd: any, end: any) {
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const permantapi = environment.baseApiKey + '/getAddrDetails/' + id + '/' + type + '/' + esd + '/' + '4712-12-31';
    // console.log("permantapi", permantapi);
    return this.http.get(permantapi, { headers: httpheaders });
  }
 
  updateEmployeementData(data:any,id:any){
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.put(environment.baseApiKey + '/update_EmployementDetails/'+id,data, { headers: httpheaders });
 
  }
 
 
 
  sendAddresstypeDate(id: any, type: any, esd: any, end: any) {
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const addressApi = environment.baseApiKey + '/getAddrDetails/' + id + '/' + type + '/' + esd + '/' + '4712-12-31';
    return this.http.get(addressApi, { headers: httpheaders });
  }
 
 
  getemergencyAddressData(id: any, esd: any, end: any): Observable<any> {
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const emergencyapi = environment.baseApiKey + '/getEmergencyDetails/' + id + '/' + esd + '/' + '4712-12-31';
    // console.log("permantapi", emergencyapi);
    return this.http.get<any>(emergencyapi, { headers: httpheaders });
  }
 
 
 
  getemergencyData(id: any) {
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const getEmergencyapi = environment.baseApiKey + '//' + id;
    // console.log("permantapi", getEmergencyapi);
    return this.http.get(getEmergencyapi, { headers: httpheaders });
  }
 
 
  //appi for sending employeement data
 
  EmployeeDetails(employeeData: any): Observable<any> {
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.post(environment.baseApiKey + '/add_EmployementDetails', employeeData, { headers: httpheaders });
  }
 
 
  //api for fetching all active employees
 
  fetchEmployees(): Observable<any> {
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const try1 = this.baseUrl;
    return this.http.get<any>(try1, { headers: httpheaders });
  }
 
  //api for fetching employeement details
 
  fetchEmployeeDetails(id: any, startDate: any, endDate: any): Observable<any> {
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const api = environment.baseApiKey +'/getDetailsByEmpEsdEed/' + id +'/' + startDate + '/' + '4712-12-31';
    // console.log('editapi', api);
    return this.http.get<any>(api, { headers: httpheaders });
  }
 
  //Search emloyees for view profiles
 
  filterEmployees( filterInput: string, startDateValue: string ): Observable<any> {
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const url = `${ environment.baseApiKey + '/searchEmployeeDetails'}/${filterInput.trim()}/${startDateValue}`;
    return this.http.get<any>(url, { headers: httpheaders });
  }
 
  //api for employee filering
 
  filterEmployeesbyValue(filterInput: string): Observable<Employee[]> {
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const url = `${this.baseUrlInitial}/${filterInput.trim()}`;
    // console.log("url", url)
    return this.http.get<Employee[]>(url, { headers: httpheaders });
  }
 
  //api for emp/candidate update
 
  updateID(selectedId: number, sendData: any) {
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const url1 = `${this.updateEmployee}/${selectedId}`;
    // console.log('url1', url1);
    return this.http.put(url1, sendData, { headers: httpheaders });
  }
 
  //api for present address/permenant address update
 
  addressData(updateData: any) {
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.post( environment.baseApiKey + '/addEmployeeAddress' , updateData,{ headers: httpheaders });
  }
 
  //api for storing(add or update) letter tamplets
 
  loadTemplate(formData: any): Observable<any> {
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.post<any>( environment.baseApiKey + '/addUpdateTemplate', formData, { headers: httpheaders });
  }
 
  // api for candidate or emp resent records serch
 
  sendDate(date: any, id: any, enddate: any): Observable<any> {
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const setApi = environment.baseApiKey + '/getEmployeeDetails/' + id + '/' + date + '/' + enddate;
    // const setApi = `${this.api}getEmployeeDetails/${id}/${date}/${enddate}`;
    // console.log('api', setApi);
    return this.http.get(setApi, { headers: httpheaders });
  }
 
  // api for search employeement resent recs
 
  sendemploymentDate(date: any, id: any, enddate: any): Observable<any> {
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    // console.log("apiii",environment.baseApiKey + "/getEmployementDetails/" + id + '/' + date + '/' + enddate);
 
    return this.http.get( environment.baseApiKey + '/getEmployementDetails/' + id + '/' + date + '/' + enddate,  { headers: httpheaders });
  }
 
  //api for getting all the templates
 
  getTemplate() {
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.get(environment.baseApiKey + '/getAllTemplates', {headers: httpheaders,});
  }
 
  // api for download templates or full view
 
  viewTemplate(templateId: any, name: any) {
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    this.http.get(environment.baseApiKey + '/viewTemplateById/' + templateId, {headers: httpheaders,responseType: 'blob',}).subscribe((response) => {
        this.saveFile(response, name + '.rtf');
      });
  }
 
  //for downloading templates
 
  private saveFile(data: Blob, filename: string) {
    const blob = new Blob([data], { type: 'application/rtf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
 
  //api for sending emergency data
 
  sendEmergencyData(emergencyData: any): Observable<any> {
    // alert(2)
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.post(environment.baseApiKey + '/addEmergencyDetails',emergencyData,{ headers: httpheaders });
  }
 
  updateEmergencyData(id: any, data: any): Observable<any> {
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
      const updateEmergencyData = environment.baseApiKey + '/updateEmergencyDetails/' + id;
    return this.http.put<any>(updateEmergencyData, data, {headers: httpheaders,});
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
}
 
 