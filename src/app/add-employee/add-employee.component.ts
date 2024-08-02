import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AddEmployeeService } from '../services/addEmployee.service';
 
 
 
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
 
 
export class AddEmployeeComponent implements OnInit {
 
  employeeForm!: FormGroup;
 
  maxDate1: any;
 
  esd: any;
 
  maxDate: string | undefined;
 
  minDate: string | undefined;
 
  maximumDate:any;
 
  Employee: boolean=false;
 
  Candidate:boolean=true;
 
  msg: any;
 
 
  constructor(
              private fb: FormBuilder,
              private http: HttpClient,
              private router: Router,
              private service:AddEmployeeService
            ) { }
 
  ngOnInit() {
 
    this.fromInit();
 
    const today = new Date
    this.maxDate1 = today.toISOString().split('T')[0]
    this.esd = localStorage.getItem('effeStarDate');
 
  }
 
  fromInit(){
 
    this.employeeForm = this.fb.group({
 
      employeeNumber: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: ['',],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      Work_location: ['', Validators.required],
      workerType: ['', Validators.required],
      effectiveStartDate: ['',[Validators.required, this.dateValidator.bind(this)]],
      effectiveEndDate: ['4712-12-13',],
      email: ['', [Validators.required, Validators.email]]
 
    });
 
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const minDate = new Date(today.getFullYear() - 60, today.getMonth(), today.getDate());
    this.maxDate = maxDate.toISOString().split('T')[0];
    this.minDate = minDate.toISOString().split('T')[0];
    this.maximumDate = today.toISOString().split('T')[0];
 
}
 
getHolidaysForYear(year: number): string[] {
  return [
 
    `${year}-01-01`, // New Year's Day
    `${year}-01-26`, // Republic Day
    `${year}-08-15`, // Independence Day
    `${year}-10-02`, // Gandhi Jayanti
    `${year}-12-25`, // Christmas Day
    `${year}-05-01`, // may Day
 
  ];
 
}
 
 
dateValidator(control: any) {
 
  if (!control.value) {
    return null;
  }
 
  const date = new Date(control.value);
  const day = date.getDay();
  const year = date.getFullYear();
  const formattedDate = date.toISOString().split('T')[0];
  const holidays = this.getHolidaysForYear(year);
 
  if (day === 6 || day === 0 || holidays.includes(formattedDate) || date > new Date()) {
    return { invalidDate: true };
  }
  return null;
}
 
 
onSubmit() {
  // Mark all controls as touched
  Object.keys(this.employeeForm.controls).forEach(field => {
      const control = this.employeeForm.get(field);
      if (control) {
          control.markAsTouched({ onlySelf: true });
      }
  });
 
  // Check if the form is invalid and return early
  if (this.employeeForm.invalid) {
      return;
  }
 
  // Prepare the employee data
  const employeeData = {
      EMP_NO: this.employeeForm.value['employeeNumber'],
      FIRST_NAME: this.employeeForm.value['firstName'],
      MIDDLE_NAME: this.employeeForm.value['middleName'],
      LAST_NAME: this.employeeForm.value['lastName'],
      WORK_LOCATION: this.employeeForm.value['Work_location'],
      EMAIL_ADDRESS: this.employeeForm.value['email'],
      DATE_OF_BIRTH: this.employeeForm.value['dateOfBirth'],
      WORKER_TYPE: this.employeeForm.value['workerType'],
      EFFECTIVE_START_DATE: this.employeeForm.value['effectiveStartDate'],
      EFFECTIVE_END_DATE: this.employeeForm.value['effectiveEndDate']
  };
 
  // Submit the form
  this.service.addEmployee(employeeData).subscribe((res: any) => {
      Swal.fire({
          position: 'top',
          showConfirmButton: false,
          title: "Success",
          text: `Candidate submitted successfully ${res.details.EMP_NO}`,
          icon: "success",
          timer: 1500,
          width: 500
      }).then(() => {
          setTimeout(() => {
              this.router.navigate(['/viewEmployees']);
          }, 500);
      });
      this.employeeForm.reset();
  }, error => {
      this.msg = error.error?.message || error.error?.error || 'An error occurred';
      Swal.fire({
          position: "top",
          icon: "error",
          title: "Oops...",
          text: `${this.msg}`,
          width: 500,
          showConfirmButton: true,
      });
  });
}
 
 
  chageworkerType(event:any){
   
    const change=event.target.value;
    // console.log("change",change);
    if (change==='Employee'){
      this.Employee=true;
      this.Candidate=false;
    }
    else{
      this.Candidate=true;
      this.Employee=false;
    }
 
  }
 
 
 
 
 
 
}
 
 
 
 