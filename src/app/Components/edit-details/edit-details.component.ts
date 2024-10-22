import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/_modal/modal.servcie';
import { Employee } from 'src/app/employee';
import { GetEmployeesService } from 'src/app/Services/Employee Services/get-employees.service';
import { dateValidator } from 'src/app/Custom Validators/customDate-validators';
import { getDateLimits } from 'src/app/Custom Validators/customDateOfBirth-validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css'],
})
export class EditDetailsComponent implements OnInit, OnDestroy {

  //------------- epm/Candi form variables -------------//

  updateForm: FormGroup;
  empButtons: boolean = false;
  isCandidate: boolean = false;
  isEmployee: boolean = false;
  // effectiveStartDate:any;
  employeeESd: any;
  effectiveEndDate: any = '4712-12-31';
  isConvertedToEmployee: boolean = false;
  empDate: any;
  msg: any;
  maxDate: any;
  employeeNumber: any;
  workerTypeValue: boolean = true;
  loading: boolean = false;
  loadHistoryData: boolean = false;
  loadDisplayData: boolean = false;
  maximumDate: any;
  minDate: any;
  selectedValue:any;


 //--------------- stoping data --------------//
  
  isEmploymentDetailsOpen:boolean = false;
  isAddressDetailsOpen:boolean = false;
  isEmergencyDetailsOpen:boolean = false;

  //------------- ngOnInt-Variables ---------//

  employee: Employee = {} as Employee;
  employeeData: any;
  filterESD: any;
  employeeList: any;
  currentPath: any;
  todaysDate: any;
  dateOfJoining: any;

  //----------- Model boxs variables ---------//

  modalId: any;

  //---------- view history variables -------//

  getEmpDataResult: any;

  //---------- update model box ------------//

  showUpdateModal: boolean = false;
  updateForm2: FormGroup;

  subscription: Subscription | undefined;

  constructor(
                private employeeService: GetEmployeesService,
                private formbuilder: FormBuilder,
                private router: Router,
                private modalService: ModalService,
              ) { }


  ngOnInit() {
    
   this.updateFormintilization();
    this.filterESD = localStorage.getItem('empstartDate');
    // console.log("empstartDate : ",this.filterESD);

    this.currentPath = this.router.url;

    this.employeeESd = this.filterESD;

    const today1 = new Date();
    this.todaysDate = today1.toISOString().split('T')[0];

    const empData = localStorage.getItem('employee');

    if (empData) {
      this.employee = JSON.parse(empData);

      if (this.currentPath === '/editdetails') {
        localStorage.removeItem('empstartDate');
        this.employeeESd = this.todaysDate;
      }
      if (this.employee) {
        this.fetchEmpData(this.employee.EMP_NO, this.employeeESd, this.employee.EFFECTIVE_END_DATE);
        console.log("subscription :",this.subscription);
      }
    }
  }

  updateFormintilization(){
    this.updateForm2 = this.formbuilder.group({
      effectiveStartDate: ['', Validators.required] // Form control for effective start date
    });
  }

  onLoadingChange(loading: boolean) {
    this.loading = loading;
    // console.log("loading status :",this.loading);
  }

  check(type: any) {
    if (type === 'Candidate') {
      this.workerTypeValue = false;
    } else {
      this.workerTypeValue = true;
    }
    return this.workerTypeValue
  }


  fetchEmpData(id: any, startDate: any, endDate: any) {
    try {
      this.loading = true;
      this.subscription = this.employeeService.fetchEmployeeDetails(id, startDate, endDate).subscribe((result: any) => {
        // console.log('results of Fetch Employee details :', result);

        this.employeeList = result;
        console.log("employeeList data:", this.employeeList);

        this.employeeData = result.employee_details;
        console.log("employeeData", this.employeeData);

        setTimeout(() => {
          this.loading = false;
        }, 100);

        this.check(this.employeeData[0].WORKER_TYPE);

        this.dateOfJoining = this.employeeData[0].DATE_OF_JOINING;

        if (!this.check(this.employeeData[0].WORKER_TYPE)) {
          this.isCandidate = true;
          this.isEmployee = false;
          this.updateform1();
        } else {
          this.isEmployee = true;
          this.isCandidate = false;
          this.updateform1();
        }
      }, error => {
        throw new Error(error)
      });
    } catch (error) {
      setTimeout(() => {
        this.loading = false;
      }, 100);
      alert("Error fetching the Employeee data");
      // console.error("")
      console.error("Error fetching the Employeee data:", error);
    }
  }

  //---------------------- For Buttons Hide in employee/candidate form ---------------------------------//

  isEmployeeContent() {
    this.empButtons = !this.empButtons;
    if (this.empButtons) {
      // this.updateForm.enable();
    } else {
      // this.updateForm.disable();
      this.updateform1();
    }
  }

  onOptionChange(event: any) {
    this.selectedValue = event.target.value;

    if (this.selectedValue === 'Update') {
      this.showUpdateModal = !this.showUpdateModal;
    } else if (this.selectedValue === 'Correct') {
      this.isEmployeeContent();
    } else if (this.selectedValue === 'DeleteRecord') {

    }
  }

 //------ custom model ------//

  closeUpdateModel() {
    this.showUpdateModal = false;
  }

//--------------------- worker type change -------------------------//

  onchange(event: any) {
    const a = event.target.value;
    if (a === 'Employee') {
      this.isCandidate = false;
      this.isEmployee = true;
    } else if (a === 'Candidate') {
      this.isCandidate = true;
      this.isEmployee = false;
    }
  }

  //.............................. update Employee/candidate form  ................................................

  updateform1() {
    this.employeeNumber = this.employeeData[0].EMP_NO;
    // console.log(this.employeeData[0].EFFECTIVE_START_DATE);
    this.updateForm = this.formbuilder.group({
      employeeId: [this.employeeData[0].EMP_ID, Validators.required],
      employeeNumber: [{ value: this.employeeData[0].EMP_NO, disabled: this.isConvertedToEmployee }, Validators.required,],
      firstName: [this.employeeData[0].FIRST_NAME, Validators.required],
      middleName: [this.employeeData[0].MIDDLE_NAME],
      lastName: [this.employeeData[0].LAST_NAME, Validators.required],
      email: [this.employeeData[0].EMAIL_ADDRESS],
      dateOfBirth: [this.employeeData[0].DATE_OF_BIRTH, Validators.required],
      userId: [this.employeeData[0].USER_ID, Validators.required],
      workLocation: [this.employeeData[0].WORK_LOCATION, Validators.required],
      workerType: [this.employeeData[0].WORKER_TYPE, Validators.required],
      dateOfJoinging: [this.employeeData[0].DATE_OF_JOINING, [ dateValidator ]],
      effectiveStartDate: [this.employeeData[0].EFFECTIVE_START_DATE, [Validators.required, dateValidator]],
      effectiveEndDate: [this.employeeData[0].EFFECTIVE_END_DATE],
      status: [this.employeeData[0].STATUS, Validators.required],
      mobileNumber: [this.employeeData[0].MOBILE_NUMBER]
    });

    const { minDate, maxDate, maximumDate } = getDateLimits();
    this.minDate = minDate;
    this.maxDate = maxDate;
    this.maximumDate = maximumDate;

    // this.updateForm.disable();
    this.loadDisplayData = true;
  }

  //.............................. update Employee Submit to backend .............................................//

  submitForm() {
    console.log("updateForm status", this.updateForm.status);
    this.loading = true;
    if (this.updateForm.valid) {
      const sendData = {
        EMP_ID: this.updateForm.value['employeeId'],
        EMP_NO: this.updateForm.value['employeeNumber'],
        FIRST_NAME: this.updateForm.value['firstName'],
        MIDDLE_NAME: this.updateForm.value['middleName'],
        LAST_NAME: this.updateForm.value['lastName'],
        EMAIL_ADDRESS: this.updateForm.value['email'],
        WORKER_TYPE: this.updateForm.value['workerType'],
        DATE_OF_BIRTH: this.updateForm.value['dateOfBirth'],
        WORK_LOCATION: this.updateForm.value['workLocation'],
        USER_ID: this.updateForm.value['userId'],
        EFFECTIVE_START_DATE: this.updateForm.value['effectiveStartDate'],
        DATE_OF_JOINING: this.updateForm.value['dateOfJoinging'],
        EFFECTIVE_END_DATE: this.updateForm.value['effectiveEndDate'],
        STATUS: this.updateForm.value['status'],
        MOBILE_NUMBER: this.updateForm.value['mobileNumber']
      };

      console.log("update employee data to backend: ", sendData);
      console.log("selectedValue",this.selectedValue);

      if (this.updateForm.value['workerType']==="Candidate"){
        this.selectedValue="Correct"
        console.log("this.selectedValue",this.selectedValue);
        


      }

      else{
        this.selectedValue=this.selectedValue;
        console.log("this.selectedValue",this.selectedValue);
        
      }
      
      this.employeeService.updateID(this.employee.EMP_ID, sendData,this.selectedValue).subscribe((response: any) => {
        console.log("response after update employee data to backend: ", response);
        this.msg = response.message;
        this.employeeData = response.data;
        console.log("employeeData from update response :", this.employeeData);
        // this.fetchEmpData(response.data.EMP_NO, response.data.EFFECTIVE_START_DATE, response.data.EFFECTIVE_END_DATE);
        this.loading = false;
        Swal.fire({
          position: 'top',
          icon: 'success',
          text: `${this.msg}`,
          showConfirmButton: false,
          timer: 2000,
          width: 400,
        }).then(() => {
          // this.updateForm.disable();
          this.empButtons = !this.empButtons;
        });
      },
        (error) => {
          console.log("error from emp update to backend: ", error);
          this.loading = false;
          if (error.error.error && error.error.error) {
            Swal.fire({
              position: 'top',
              icon: 'error',
              title: 'Oops...',
              text: `${error.error.error}`,
              width: 400,
            });
          }
        });
    }
  }

  //.......................... for searching previous records for Candidate/Employee .........................................//

  submitDate() {
    this.employeeESd=this.employeeESd;
    this.loading = true;
    this.employeeService.searchAllData(this.employeeESd, this.employee.EMP_NO, this.effectiveEndDate).subscribe((res: any) => {
      console.log("employee search based on emp&end", res);
      this.employeeList=res;
      console.log("this.employeeList",this.employeeList);
      
      this.employeeData = res.employee_details;
      console.log("this.employeeData", this.employeeData);
      this.updateform1();
      if (this.employeeData) {
        this.loading = false;
      }
    },
      (error) => {
        console.log("error", error);
        this.loading = false;
        if (error.error && error.error.message || error.error.error) {
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Oops...',
            text: `${error.error.message || error.error.error}`,
            width: 400,
          });
        }
      });
  }


//--------------------- view history ---------------------//

  empSearchViewHistory(date: any) {
    this.loading = true;
    this.employeeESd = date;
    this.employeeService.empSearchViewHistory(date, this.employee.EMP_ID, this.effectiveEndDate).subscribe((res: any) => {
      console.log("res from emp/candi view history --> ", res);
      this.employeeData = res.data;
      console.log("employeeData", this.employeeData);
      this.loadHistoryData = true;
      this.loading = false;
      if (this.employeeData) {
        this.closeModal('custom-modal-1');
      }
      this.updateform1();
    }, error => {
      this.loadHistoryData = false;
      this.loading = false;
      console.log("error from selected view history: ", error);
    });
  }

  empViewHistory() {
    this.loading = true;
    this.employeeService.empViewHistoryData(this.employee.EMP_ID).subscribe((res: any) => {
      console.log("res -->", res);
      this.getEmpDataResult = res.data;
      console.log("getEmpDataResult", this.getEmpDataResult);
      this.loadHistoryData = true;
      this.loading = false;
    }, error => {
      this.loadHistoryData = false;
      this.loading = false;
      console.log("error from view history :", error);
    });
  }

  
//------------------- model windows ----------------------//

updateEffectiveStartDate() {
  const effectiveStartDate = this.updateForm2.get('effectiveStartDate')?.value;
  alert(effectiveStartDate); // This should now show the selected date

  if (effectiveStartDate) {
    this.updateForm.patchValue({
      effectiveStartDate: effectiveStartDate // Update the main form's effective start date
    });
    this.showUpdateModal = false; // Close the modal
    this.updateForm2.reset(); // Reset the modal form
  }
}


  closeModal(id: any) {
    // alert(`close ${id}`);
    this.isEmploymentDetailsOpen = false;
    this.isAddressDetailsOpen = false;
    this.isEmergencyDetailsOpen = false;
    this.modalService?.close(id);
  }
  
  openModal(id: any) {
    // alert(`open ${id}`);
    if(id === 'custom-modal-1'){
      this.empViewHistory();
    }
    this.modalId = id;
    this.modalService?.open(id);
  }
  
  openEmploymentDetails() {
    this.openModal('custom-modal-2');
    this.isEmploymentDetailsOpen = true;
  }

  openAddressDetails(){
    this.openModal('custom-modal-6');
    this.isAddressDetailsOpen = true;
  }

  openEmergency(){
    this.openModal('custom-modal-11');
    this.isEmergencyDetailsOpen = true;
  }
  

  ngOnDestroy(): void {
    alert("destroied");
    try {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    } catch (error) {
      console.error("Error unsubscribe the Data:", error);
    }
    console.log("subscription :",this.subscription);

  }



}
