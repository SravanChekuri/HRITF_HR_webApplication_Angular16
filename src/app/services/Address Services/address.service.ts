import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenserviceService } from '../Login Services/tokenservice.service';
import { environment } from 'src/environments/environment.development';
 
 
@Injectable({
  providedIn: 'root'
})
export class AddressService {
 
  constructor(private http:HttpClient, private service:TokenserviceService) { }
 
  addressData(data:any){
    this.service.authLink();
 
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.post(environment.baseApiKey+"/addEmployeeAddress",data,{headers:httpheaders});
 
  }
 
 
  updateButtonPresentAddressData(data:any, id:any){
 
    this.service.authLink();
 
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.put(environment.baseApiKey+"/updateEmployeeAddres/"+id,data,{headers:httpheaders});
 
  }
 
  getPresentAddressData(id:any,type:any,esd:any,eed:any){
    this.service.authLink();
 
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
 
    const presentapi = environment.baseApiKey +'/getAddrDetails/' + id + '/' + type + '/' + esd + '/' + '4712-12-31';
    return this.http.get(presentapi, { headers: httpheaders });
 
  }
 
  presentAddressview(id:any){
    const httpHeaders=new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
  });
  const emppresentViewApi =environment.baseApiKey+ '/AViewhistory/' + id + '/'+"PRESENT ";
  console.log("emppresentViewApi",emppresentViewApi);
  return this.http.get(emppresentViewApi, { headers: httpHeaders });
 
  }
 
  // addressData(updateData: any) {
  //   this.service.authLink();
  //   const httpheaders = new HttpHeaders({
  //     Authorization: 'Bearer ' + localStorage.getItem('token'),
  //   });
  //   return this.http.post( environment.baseApiKey + '/addEmployeeAddress' , updateData,{ headers: httpheaders });
  // }
 
 
  getPermanentAddressData(id:any, type:any,esd:any, end:any){
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const permantapi = environment.baseApiKey + '/getAddrDetails/' + id + '/' + type + '/' + esd + '/' + end;
    // console.log("permantapi", permantapi);
    return this.http.get(permantapi, { headers: httpheaders });
 
  }
   
  sendEmergencyData(emergencyData:any){
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.post(environment.baseApiKey + '/addEmergencyDetails', emergencyData, {headers: httpheaders,});
 
  }
 
 
  updateEmergencyData(id:any, emergencyData:any){
 
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
      const updateEmergencyData = environment.baseApiKey + '/updateEmergencyDetails/' + id;
    return this.http.put<any>(updateEmergencyData, emergencyData, {headers: httpheaders,});
   
 
  }
 
  getemergencyAddressData(id: any, esd: any, end: any){
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const emergencyapi = environment.baseApiKey + '/getEmergencyDetails/' + id + '/' + esd + '/' + '4712-12-31';
    // console.log("permantapi", emergencyapi);
    return this.http.get<any>(emergencyapi, { headers: httpheaders });
  }
 
 
 
 
}
 
 