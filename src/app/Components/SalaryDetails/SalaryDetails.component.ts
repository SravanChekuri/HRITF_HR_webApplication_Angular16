import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/_modal/modal.servcie';
import { dateValidator } from 'src/app/Custom Validators/customDate-validators';
import { AddEmployeeService } from 'src/app/Services/Employee Services/addEmployee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-SalaryDetails',
  templateUrl: './SalaryDetails.component.html',
  styleUrls: [
              './SalaryDetails.component.css',
              '../edit-details/edit-details.component.css'
            ],
})
export class SalaryDetailsComponent implements OnInit {

  @Input() employeListData: any;
  @Input() employeeStartDate: any;
  @Input() loading:boolean = false;
  @Output() loadingChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  subscription: Subscription | undefined; // subscription prop


  Employeesalary:FormGroup;
  updateForm:FormGroup;

  waitForViewHistoryData:boolean = false; // for stoping UI untill the View history data is getting
  waitForSalaryData: boolean = false; // for stoping UI untill the salary data is getting

  employeeSalaryData:any;
  scalaryButtons:boolean = false;

  isHideEditSalaryBtn:boolean = false;

  salaryEsd:any;
  salaryEnd:any;
  salaryEed:string = '4712-12-31'
  salarySubmitButton:boolean=false;
  salaryUpdateButton:boolean=false;

  viewHistoryScalaryData:any;

  selectedValue:string = ''; //edit options reset
  showUpdateModal: boolean = false; // for showing popup
  isReadOnly: boolean = false; // esd eed disabling



  constructor(
              private modalService:ModalService,
              private formbuilder:FormBuilder,
              private employeeService:AddEmployeeService
            ) { }

  ngOnInit() {

    this.updateFormintilization();

    this.salaryEsd=this.employeeStartDate;

    this.employeeSalaryData=this.employeListData.salary_details;
    console.log("this.employeeSalaryData", this.employeeSalaryData);

    if (this.employeeSalaryData.length===0 ){
      this.salaryform()
      this.salarySubmitButton = true;
    }
    else{
      this.getsalarydata();
      this.salaryUpdateButton = true;
    }
  }

  //--------------- update loading to parent comp --------//

  updateLoading(value: boolean) {
    this.loading = value;
    // console.log("loading status :",this.loading);
    this.loadingChange.emit(this.loading);
  }



  //------------------- model windows ----------------------//

  updateFormintilization(){
    this.updateForm = this.formbuilder.group({
      changedSalaryDateUpdate: ['', [Validators.required,dateValidator]]
    });
  }
  
  updateEffectiveStartDate() {
    const changedSalaryDateControl = this.updateForm.get('changedSalaryDateUpdate');
      if (changedSalaryDateControl?.invalid) {
        changedSalaryDateControl.markAsTouched();
      // console.log('Effective Start Date is required');
      return; 
  }

  const effectiveStartDateUpdate = changedSalaryDateControl?.value;
  
  if (effectiveStartDateUpdate) {
    this.Employeesalary.patchValue({changedSalaryDate: effectiveStartDateUpdate });
    this.showUpdateModal = false; 
    this.Employeesalary.enable();
    this.updateForm.reset();
  }
}

closeUpdateModel() {
  this.showUpdateModal = false;
  this.resetSelect();
}


//------------------------------ edit option dropdown ---------------------------//

  onOptionChange(event: any) {
    this.selectedValue = event.target.value;
    if (this.selectedValue === 'Update') {
      this.showUpdateModal = !this.showUpdateModal;
    } else if (this.selectedValue === 'Correct') {
      this.isScalaryButtons();
    }

    if (this.selectedValue === 'Correct') {
      this.isReadOnly = true;
    } else {
      this.isReadOnly = false;
    }
  }

  resetSelect() {
    this.selectedValue = ''; 
  }


//--------------------------------- JW modals ---------------------------------//


  openModal(id: any) {
    // alert(`open ${id}`);
    if (id==='custom-modal-5'){
      this.closeModal('custom-modal-4');
      this.closeModal('custom-modal-2');
      this.empSalaryviewhistory()
    }
    this.modalService.open(id);

  }

  closeModal(id: any) {
    // alert(`close ${id}`);
    if (id === 'custom-modal-5') {
      this.openModal('custom-modal-4');
    }
    this.modalService.close(id);
  }

//------------------------------- buttons enabling ----------------------------------//

  isScalaryButtons(){
    this.scalaryButtons = !this.scalaryButtons;
    if(this.scalaryButtons){
      this.Employeesalary.enable();
    }else{
      this.Employeesalary.disable();
      this.getsalarydata();
    }
  }

//--------------------- fetch salary data -----------------------------------//

getsalarydata() {
  this.Employeesalary = this.formbuilder.group({
    changedSalaryDate: [this.employeeSalaryData[0].CHANGED_SALARY_DATE],
    dateToProposal: [this.employeeSalaryData[0].DATE_TO],
    comments: [this.employeeSalaryData[0].COMMENTS],
    proposalReason: [this.employeeSalaryData[0].PROPOSAL_REASON],
    proposalSalary: [this.employeeSalaryData[0].PROPOSED_SALARY_N],
    previousSalary: [this.employeeSalaryData[0].PROPOSED_SALARY],
  });
  this.Employeesalary.disable();
  this.waitForSalaryData = true;
  this.isHideEditSalaryBtn = !this.isHideEditSalaryBtn;
}

//---------------------- salary form init -------------------------------------------//

salaryform() {
    this.Employeesalary = this.formbuilder.group({
      changedSalaryDate: ['', [Validators.required,dateValidator]],
      dateToProposal: [this.salaryEed, ],
      comments: [''],
      proposalReason: [''],
      proposalSalary: ['', Validators.required]
    });
    this.waitForSalaryData = true;
  }

//--------------------------------- sending data to backend ---------------------------------//

  salarydata() {
    const data = {
      ASSIGNMENT_ID: this.employeListData.employment_details[0].ASSIGNMENT_ID,
      CHANGED_SALARY_DATE: this.Employeesalary.value['changedSalaryDate'],
      DATE_TO: this.Employeesalary.value['dateToProposal'],
      COMMENTS: this.Employeesalary.value['comments'],
      PROPOSAL_REASON: this.Employeesalary.value['proposalReason'],
      PROPOSED_SALARY_N: this.Employeesalary.value['proposalSalary']
    }
    console.log("salaryData",data);
    this.employeeService.salaryemployeedetails(data).subscribe((res:any) => {
      console.log("res",res);
      Swal.fire({
        position: 'top',
        icon: 'success',
        title:'Success',
        text: `${res.message}`,
        showConfirmButton: false,
        timer: 1500,
        width: 400,
      }).then(() => {
        this.isHideEditSalaryBtn = !this.isHideEditSalaryBtn;
        this.Employeesalary.disable();
        this.resetSelect();
      });
    }, error => {
      console.log("err",error);
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Oops...',
        text: `${error.error.error || error.error.message}`,
        width: 400,
      });
    })
  }

//---------------------- update salary -------------------------------//

  salaryUpdate() {
    const updatedata = {
      ASSIGNMENT_ID: this.employeListData.employment_details[0].ASSIGNMENT_ID,
      CHANGED_SALARY_DATE: this.Employeesalary.value['changedSalaryDate'],
      DATE_TO: this.Employeesalary.value['dateToProposal'],
      COMMENTS: this.Employeesalary.value['comments'],
      PROPOSAL_REASON: this.Employeesalary.value['proposalReason'],
      PROPOSED_SALARY_N: this.Employeesalary.value['proposalSalary']
    }
      console.log("updatedata",updatedata);
      this.employeeService.salaryUpadate(updatedata, this.employeListData.employment_details[0].ASSIGNMENT_ID).subscribe((res) => {
       console.log("res",res);
       Swal.fire({
          position: 'top',
          icon: 'success',
          text: ' Salary details updated Successfully',
          showConfirmButton: false,
          timer: 2000,
          width: 400,
       }).then(() => {
         this.Employeesalary.disable();
         this.resetSelect();
        });
     }, error => {
      console.log("err",error);
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Oops...',
        text: `${error.error.error || error.error.message}`,
        width: 400,
      });
    })
  }

  //--------------------------------- salary previous records search --------------------------------------//

  salarySubmitDate() {
    this.employeeService.salarySubmitDate(this.employeListData.employment_details[0].ASSIGNMENT_ID, this.salaryEsd, this.salaryEnd).subscribe((res: any) => {
      console.log("res",res);
      this.employeeSalaryData=res.data;
      this.getsalarydata();
    }, error => {
       console.log("err",error);
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Oops...',
        text: `${error.error.message}`,
        width: 400,
      });
    });
  }

  //------------------------------------- Salary view  history -----------------------------------------//

  empSalaryviewhistory() {
    this.employeeService.SalaryViewHistoryData(this.employeListData.employment_details[0].ASSIGNMENT_ID).subscribe((res: any) => {
      console.log("res===.......>>", res);
      this.viewHistoryScalaryData = res.data;
      this.waitForViewHistoryData = true;
    }, error => {
      console.log("err", error);
      this.waitForViewHistoryData = false;
    });
  }

  EmpSalarySearchViewHistory(id: any, salarychangeddate: any) {
    console.log("id", id);
    let eed = "4712-12-31"
    this.employeeService.salarySubmitDate(id, salarychangeddate, eed).subscribe((res: any) => {
      console.log("res--", res);
      this.employeeSalaryData=res.data;
      this.waitForViewHistoryData = true;
     if (this.employeeSalaryData){
        this.closeModal('custom-modal-5')
        this.openModal('custom-modal-4')
     }
      if (this.employeeSalaryData) {
        this.getsalarydata();
      }
    }, error => {
      this.waitForViewHistoryData = false;
      console.log("error", error);
    });
  }
 
  ngOnDestroy(): void {
    // alert("destroied");
    try {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    } catch (error) {
      console.error("Error unsubscribe the Data:", error);
    }
    // console.log("subscription :",this.subscription);
  }


}
