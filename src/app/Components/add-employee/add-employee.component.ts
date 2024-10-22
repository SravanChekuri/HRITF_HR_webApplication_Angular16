import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddEmployeeService } from 'src/app/Services/Employee Services/addEmployee.service';
import { dateValidator } from 'src/app/Custom Validators/customDate-validators';
import { getDateLimits } from 'src/app/Custom Validators/customDateOfBirth-validators';
import Swal from 'sweetalert2';

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
  maximumDate: any;
  Employee: boolean = false;
  Candidate: boolean = true;
  msg: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: AddEmployeeService
  ) {}

  ngOnInit() {
    this.fromInit();
    const today = new Date();
    this.maxDate1 = today.toISOString().split('T')[0];
    this.esd = localStorage.getItem('effeStarDate');
  }

  fromInit() {
    this.employeeForm = this.fb.group({
      employeeNumber: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      Work_location: ['', Validators.required],
      workerType: ['', Validators.required],
      effectiveStartDate: ['',[Validators.required, dateValidator]],
      effectiveEndDate: ['4712-12-31'],
      dateOfJoinging: ['',[ dateValidator ],],
      email: ['', [Validators.required, Validators.email]],
      status:['Active',Validators.required],
      mobileNumber:['',[Validators.required, Validators.pattern(/^[0-9]{10}$/), Validators.maxLength(10), Validators.minLength(10),]]
    });
    
    const { minDate, maxDate, maximumDate } = getDateLimits();
    this.minDate = minDate;
    this.maxDate = maxDate;
    this.maximumDate = maximumDate;
    
  }


  onSubmit() {
    // Mark all controls as touched
    Object.keys(this.employeeForm.controls).forEach((field) => {
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
      STATUS:this.employeeForm.value['status'],
      DATE_OF_JOINING: this.employeeForm.value['dateOfJoinging'],
      EFFECTIVE_START_DATE: this.employeeForm.value['effectiveStartDate'],
      EFFECTIVE_END_DATE: this.employeeForm.value['effectiveEndDate'],
      MOBILE_NUMBER:this.employeeForm.value['mobileNumber']
    };
     console.log('employeeData to backend -->', employeeData);
      this.service.addEmployee(employeeData).subscribe((res: any) => {
        // console.log("res",res);
        Swal.fire({
          position: 'top',
          showConfirmButton: false,
          title: 'Success',
          text: `${res.message}`,
          icon: 'success',
          timer: 2000,
          width: 500,
        }).then(() => {
          setTimeout(() => {
            this.router.navigate(['/viewEmployees']);
          }, 500);
        });
        this.employeeForm.reset();
      },
      (error) => {
        console.log("error at sending data to backend", error);
        this.msg = error.error.error;
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'Oops...',
          text: `${this.msg}`,
          width: 500,
          showConfirmButton: true,
        });
      });
  }

  chageworkerType(event: any) {
    const change = event.target.value;
    // console.log("change",change);
    if (change === 'Employee') {
      this.Employee = true;
      this.Candidate = false;
      this.sendWorkerType();
      this.employeeForm.get('employeeNumber')?.setValue('');
    } else {
      this.Candidate = true;
      this.Employee = false;
      this.sendWorkerType();
    }
  }

  sendWorkerType() {
    const workertype = {
      WORKER_TYPE: this.employeeForm.value['workerType'],
    };
    this.service.getEmpNumber(workertype).subscribe((res: any) => {
        // console.log('res ---->>>>', res);
        const employeeNumberControl = this.employeeForm.get('employeeNumber');
        if (employeeNumberControl) {
          employeeNumberControl.setValue(res.new_emp_no);
        }
      },
      (error) => {
        // console.log('error---->>>>', error);
      }
    );
  }


  
}
