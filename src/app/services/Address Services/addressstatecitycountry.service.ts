

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressstatecitycountryService {

  constructor(private http:HttpClient) { }

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
