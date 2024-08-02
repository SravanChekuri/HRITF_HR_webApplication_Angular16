import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { LettertemplateService } from '../services/Lettertemplate.service';
import { Router } from '@angular/router';
import { AddEmployeeService } from '../services/addEmployee.service';

@Component({
  selector: 'app-bulk-add-employee',
  templateUrl: './bulk-add-employee.component.html',
  styleUrls: ['./bulk-add-employee.component.css'],
})
export class BulkAddEmployeeComponent implements OnInit {

  // bulkAddUrl = "http://127.0.0.1:5000/uploadexcel";
  file: any;
  msg: any;
  loading1:boolean=false;
  fileError:any;

  constructor(private _http: HttpClient,private service:LettertemplateService,private route:Router,private blukService:AddEmployeeService) {}

  ngOnInit(): void {}

  selectFile(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      const fileName = this.file.name;
     
    }
    // console.log(this.file);
  }

  uploadFile() {
    if (!this.file) {
      // alert("Please select a file.");
      Swal.fire({
        position:'top',
        icon: "error",
        title: "Oops...",
        text: "Please select a file!",
        width:400
      });
      return;
    }
    const allowedTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    if (!allowedTypes.includes(this.file.type)) {
     // Swal.fire("Only Excel files are allowed.");
      //alert("Only Excel files are allowed.");

      Swal.fire({
        position:'top',
        icon: 'error',
        // padding: 50,
        // showConfirmButton: false,
        // timer: 2500,
        text: 'Only Excel files are allowed.',
        width:400
      });
      return;
    }
    // console.log(localStorage.getItem('token'));
  
    let formData = new FormData();
    formData.append("Excel", this.file);
    const httpheaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    this.loading1=true;

    this.blukService.sendBulkData(formData).subscribe((res:any)=>{
      // console.log("bulkRes",res);
      // alert(res.message)
      this.loading1=false;
      if(res.message){
          this.msg=res.message;
          console.log(res.message);   
      }
      Swal.fire({
              position:'top',
              showConfirmButton: false,
              title: "Success",
              text: `Submitted successfully👍 ${this.msg}`,
              icon: "success",
              timer: 2000,
              width:400
            }).then(() => {
              setTimeout(() => {
                this.route.navigate(['/viewEmployees']);
              }, 500); 
            })
     
     // alert("Bulk success")
      
    },error=>{
      this.loading1=false;
      console.log("bulkError",error);
      //alert("bulkError")
      if (error.error && error.error.error) {
              // alert(error.error.error);
              this.msg = error.error.error;
            }
            if (error.erroe && error.error.message){
              this.msg = error.error.message;
            }
            Swal.fire({
              position:"top",
              icon: "error",
              title: "Oops...",
              text: `${ this.msg }`
            });
      
    }
  )
    
  }
  Excelview(){
    this.service.UploadExcel()
  }
}
