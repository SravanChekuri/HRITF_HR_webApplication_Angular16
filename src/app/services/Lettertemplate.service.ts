import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { TokenserviceService } from './tokenservice.service';

@Injectable({
  providedIn: 'root'
})
export class LettertemplateService {

  constructor(private http: HttpClient, private service:TokenserviceService) { }


  //api for generating letter

  sendTemplateDetails(LetterData: any) {
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.post(environment.baseApiKey+"/generateEmployeeLetters", LetterData, { responseType: 'blob',headers:httpheaders });
  }


//api for getting tempalte name in select letter template  

  getLetterId(LetterData: any): Observable<any> {
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.get<any>(environment.baseApiKey+"/letter-templatesname/" + LetterData,{headers:httpheaders});
  }




//Api for getting all the generated letters

  viewTemplateDetails(){
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.get<any>(environment.baseApiKey+"/getEmployeeLetters",{headers:httpheaders});
  }


//api for download letters in search generate letters
  
  // viewLetter(emp_no:string,tempId:string,name:string){
  //   this.service.authLink();
  //   const httpheaders = new HttpHeaders({
  //     Authorization: 'Bearer ' + localStorage.getItem('token')
  //   });
  //   this.http.get(`${environment.baseApiKey}/employeeLetterDownload/${emp_no}/${tempId}`, {
  //     headers: httpheaders,
  //     responseType: 'blob'  
  //   }).subscribe(response => {
  //     this.saveFile(response,"HRITF "+ name+" "+emp_no+'.rtf');
  //   });
  // }

  viewLetter(emp_no: string, tempname: string): Observable<any> {
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
    });
    const encodedEmpNo = encodeURIComponent(emp_no);
    const encodedName = encodeURIComponent(tempname);
    // console.log("encodedName",encodedName);
    const decodedName = decodeURIComponent(encodedName);
    // console.log("Decoded Name:", decodedName);
    // console.log("api",`${environment.baseApiKey}/employeeLetterDownload/${encodedEmpNo}/${decodedName}`);
     return this.http.get(`${environment.baseApiKey}/employeeLetterDownload/${encodedEmpNo}/${decodedName}`,{
      headers: httpheaders,
      responseType: 'blob'
    });
  }

  //for download letters in search generate letters

  // private saveFile(data: Blob, filename: string) {
  //   const blob = new Blob([data], { type: 'application/rtf' });
  //   const url = window.URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = filename;
  //   document.body.appendChild(a);
  //   a.click();
  //   window.URL.revokeObjectURL(url);
  //   document.body.removeChild(a);
  // }

//sample file download api

  UploadExcel(){
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    this.http.get(`${environment.baseApiKey}/sampleExcelForBulkRegister`, {
      headers: httpheaders,
      responseType: 'blob'  
    }).subscribe(response => {
      this.saveFile1(response, 'sample.xlsx');  
    });
  }

  //for sample file download

  private saveFile1(data: Blob, filename: string) {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  // api for delete generated letter
  
  deleteLetter(EMP_ID:any,TEMPLATE_ID:any){
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.delete(environment.baseApiKey+"/delEmployeeLetterById/"+TEMPLATE_ID+'/'+EMP_ID,{headers:httpheaders});
  }


  //api for delete letter template

  deleteTemplate(TEMPLATE_ID:any){
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.delete(environment.baseApiKey+"/deltempById/"+TEMPLATE_ID,{headers:httpheaders});
  }


  // api for employee letters names with employee numbers

  empNumsLetternames(emp_no:any){
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });  
    return this.http.get<any>(environment.baseApiKey+"/getEmployeeLetterNamesWithEmpno/"+emp_no,{headers:httpheaders});
  }


  // api for worker type for letters

  getEmpLetters(emp_id:any,workerType:any){
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.get<any>(environment.baseApiKey+ '/getEmployeeLetters/'+emp_id+ '/'+workerType,{headers:httpheaders});
  }

    // api for worker type for letters

    getRevisionLetters(emp_id:any){
      this.service.authLink();
      const httpheaders = new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      });
      return this.http.get<any>(environment.baseApiKey+ '/getRevisionLetters/'+emp_id ,{headers:httpheaders});
    }


  // api for revision letter previous data

  getRevisionPreviousLetters(emp_id:any,date:any){
    this.service.authLink();
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.get<any>(environment.baseApiKey+ '/RevisionLetter_ByDate/'+ emp_id + '/' +date ,{headers:httpheaders});
  }


}

