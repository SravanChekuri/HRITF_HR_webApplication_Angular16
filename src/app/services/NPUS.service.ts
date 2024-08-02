import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NPUSService {

constructor(private http:HttpClient) { }



// api for pw change

 resetDetails(NpusData:any){
  
  const httpheaders = new HttpHeaders({

    'Content-Type': 'application/json',

    Authorization: 'Bearer ' + localStorage.getItem('token'),

  });

  return this.http.put(environment.baseApiKey+"/changePassword",NpusData,{headers:httpheaders});

}





}
