import { Component, OnInit } from '@angular/core';
import { LettertemplateService } from '../services/Lettertemplate.service';
import Swal from 'sweetalert2';
import { GetEmployeesService } from '../services/get-employees.service';

@Component({
    selector: 'app-search-generate-letter',
    templateUrl: './search-generate-letter.component.html',
    styleUrls: ['./search-generate-letter.component.css']
})

export class SearchGenerateLetterComponent implements OnInit {

    lettersData: any[] = [];
    employeeData:any[] = [];
    employee:any;
    employeeESd: any;
    loading: boolean = false;
    todaysDate: any;


    constructor(
                private template: LettertemplateService,
                private employeeService: GetEmployeesService
            ) { }

    ngOnInit(): void {
        const today1 = new Date();
        this.todaysDate = today1.toISOString().split('T')[0];
        this.employeeESd = this.todaysDate;
        const empData = localStorage.getItem('employee');
        if (empData) {
            this.employee = JSON.parse(empData);
        }
        // console.log("employee--->",this.employee);
        // console.log("employeeESd--->>",this.employeeESd); 
        this.fetchEmpData(this.employee.EMP_NO,this.employeeESd,this.employee.EFFECTIVE_END_DATE);
    }

    fetchEmpData(id: any, startDate: any, endDate: any) {
        // alert("iddddddd" + startDate)
        try {
          this.employeeService.fetchEmployeeDetails(id, startDate, endDate).subscribe((result) => {
            //   console.log("results of Fetch Employee details :", result)
              this.employeeData = result.employee_details;
              // console.log("employeeData", this.employeeData);
            //   console.log("emp id",this.employeeData[0].EMP_ID);
            //   console.log("worker type",this.employeeData[0].WORKER_TYPE);
            this.submitWorkerType();
            });
        } catch (error) {
          // alert("Error fetching the Employeee data");
          // console.error("Error fetching the Employeee data:", error);
        }
      }
        

    submitWorkerType(){
        this.template.getEmpLetters(this.employeeData[0].EMP_ID,this.employeeData[0].WORKER_TYPE).subscribe((res:any)=>{
          // console.log("res for worker type--->",res);
          this.lettersData = res.letters_details;
          // console.log("lettersData --->>", this.lettersData);
        },(error) =>{
          // console.log("error at workertype method",error);
        });
      }
      
    view() {
      const data1:any[] =[{ EMP_NO:this.lettersData[0].EMP_NO, TEMPLATE_NAME:this.lettersData[0].LETTER_TYPE}];
      // console.log("Data1---->",data1);
      this.template.sendTemplateDetails(data1).subscribe((res:any)=>{
        this.saveFile1(res, 'HRIT Factory '+ this.lettersData[0].EMP_NO +' '+ this.lettersData[0].LETTER_TYPE +'.rtf');
        Swal.fire({
          position:'top',
          icon:'success',
          title:'Success',
          text:'Letter Downloaded Successfully',
          timer:1500,
          showConfirmButton: false,
          width:400
        });
      },(error)=>{
        // console.log("error to download -->",error);
        Swal.fire({
          position:'top',
          icon:'error',
          title:'Error',
          text:' Unable to download Letter',
          width:400
        });
      });
    }

    private saveFile1(data: Blob, filename: string) {
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
  
    
    deleteLetter(EMP_NO: any, templateId: any) {
      // console.log(this.employeeData[0].EMP_ID,templateId);
      this.template.deleteLetter(this.employeeData[0].EMP_ID, templateId).subscribe((res) => {
          Swal.fire({
              position:'top',
              icon:'success',
              text:'Letter Deleted Successfully',
              showConfirmButton: false,
              timer: 1500
          }).then(() => {
            // this.fetchEmpData( this.employee.EMP_NO, this.employeeESd, this.employee.EFFECTIVE_END_DATE);
            this.submitWorkerType();
          });
      });
    }
    


    




      

}
