import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/_modal/modal.servcie';
import { dateValidator } from 'src/app/Custom Validators/customDate-validators';
import { GetEmployeesService } from 'src/app/Services/Employee Services/get-employees.service';
import { DropdownValuesService } from 'src/app/Services/Employement Services/dropdownValues.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-EmployementDetails',
  templateUrl: './EmployementDetails.component.html',
  styleUrls: [
    './EmployementDetails.component.css',
    '../edit-details/edit-details.component.css',
  ],
})
export class EmployementDetailsComponent implements OnInit {

  @Input() employeListData: any;
  @Input() employeeStartDate: any;
  @Input() loading: boolean = false;
  @Output() loadingChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  subscription: Subscription | undefined; // subscription prop

  //------------ Employement Form and variables ----------//

  employementForm: FormGroup; //employement form 
  isReadOnly: boolean = false; // esd eed disabling for correction
  Probation_Period: any[] = ['3 Months', '6 Months', '6 Months']; //select items for options
  Notice_Period: any[] = ['30 Days', '60 Days', '90 Days']; // select items for options
  employeeData: any; // storing employement data


  //------------ search feilds -------------//

  employementEsd: any; //search ESD
  effectiveEndDate: any = '4712-12-31'; // search EED

  //-------------- stoping UI ----------------------------//

  waitForEmployementData: boolean = false; // for stoping UI untill the employement data is getting
  waitForViewHistoryData:boolean = false; // for stoping UI untill the View history data is getting
  isSalaryDetailsOpen:boolean = false; // stoping scalary data

  //--------------- buttons -----------------------------//

  employmentbuttons: any = false; //checking
  isHideEditEmployementButton: boolean = false; // hiding edit view history buttons
  submitEmployeementButton: boolean = false; // hiding submit button
  updateEmployeementButton: boolean = false; // hiding update button

  //----------------edit option dropdown variables ---------------//

  selectedValue: string ='';

  //-------------- view history variables --------//

  viewHistoryEmployeementData: any;

  //----------- onInit variables ------------//

  employeeList: any;

  //----------- Model boxs variables ---------//
  
  showUpdateModal: boolean = false; //update model popup 
  showUpdateModalForCorrect: boolean = false; // correct model popup
  selectedAction: string = ''; //storing selected action
  actionEsd: string; //esd of the action
  actionEed: string = '4712-12-31'; //eed of the action

  //----------- dropdown variables --------------//

  selectedReason: string = '';
  selectedReasonForCorrection: string = '';
  actionsOptionsForUpdate: { value: string; label: string }[] = []; 
  actionReasonsUpdate: { value: string; label: string }[] = [];
  actionOptionsForCorrection: { value: string; label: string }[] = [];
  actionReasonsCorrection: { value: string; label: string }[] = [];

  storeEmployeeNumber: any;// storing emp number
  workerTypeValue: boolean = false;//cheking worker type 
  dateOfJoining: any; // stoing DOJ

  constructor(
    private modalService: ModalService,
    private employeeService: GetEmployeesService,
    private formbuilder: FormBuilder,
    private dropdownValuesService: DropdownValuesService,
  ) {}


  ngOnInit() {
    
    this.employeeList=this.employeListData;

    this.employeeData = this.employeListData.employment_details;
    
    if(this.employeListData.employee_details[0].WORKER_TYPE === 'Employee'){
      this.workerTypeValue = true;
    }

    this.dateOfJoining = this.employeListData.employee_details[0].DATE_OF_JOINING;

    this.employementEsd=this.employeeStartDate;

    console.log('employee Data', this.employeeData);

    if (this.employeeData.length === 0) {
      this.employementInitializationForm();
      this.submitEmployeementButton=true;
    } else {
      this.employeementData();
      this.isHideEditEmployementButton = true;
      this.updateEmployeementButton = true;
    }

    this.loadActionChangeForCorrection();
  }

//--------------- update loading to parent comp --------//

  updateLoading(value: boolean) {
    this.loading = value;
    // console.log("loading status :",this.loading);
    this.loadingChange.emit(this.loading);
  }

  openSalaryDetails() {
    this.openModal('custom-modal-4');
    this.isSalaryDetailsOpen = true;
  }

  //---------------------------- JW models code ---------------------------//

  openModal(id: any) {
    // alert(`open ${id}`);
    if (id === 'custom-modal-3') {
      this.closeModal('custom-modal-2')
      this.employementViewHistory();
    }
    if(id === 'custom-modal-4'){
      this.closeModal('custom-modal-2')
    }
    this.modalService.open(id);
  
  }
  
  closeModal(id: any) {
    // alert(`close ${id}`);
    this.showUpdateModal = false;
    if (id === 'custom-modal-3') {
      this.openModal('custom-modal-2');
      this.employementViewHistory();
    }
    if(id === 'custom-modal-4'){
      this.openModal('custom-modal-2');
      this.isSalaryDetailsOpen = false;
    }
    this.modalService.close(id);
  }  

  //----------------------- Dropdown loading data ---------------------------//

  loadActionChangeForCorrection() {
    this.actionOptionsForCorrection = this.dropdownValuesService.actionsforCorrection || [];
    // console.log('Loaded actions for correction:', this.actionOptionsForCorrection); 
    this.actionsOptionsForUpdate = this.dropdownValuesService.actionsforUpdate || [];
    // console.log('Loaded actions for update:', this.actionsOptionsForUpdate); 
  }

  //------------------- Edit buttons logic  ----------------------//

  onOptionChange(event: any) {
    this.selectedValue = event.target.value;
    if (this.selectedValue === 'Update') {
      this.showUpdateModal = !this.showUpdateModal;
    } else if (this.selectedValue === 'Correct') {
      this.showUpdateModalForCorrect = !this.showUpdateModalForCorrect;
    } 
    if (this.selectedValue === 'Correct') {
      // console.log('Correct option selected');
      this.isReadOnly = true;
    } else {
      this.isReadOnly = false;
    }
  }

  resetSelect() {
    this.selectedValue = ''; 
  }


  //----------------------------- dropdown code for update record  ----------------------------------------//

  actionChange(form: NgForm) {
    if(form.valid){
      this.showUpdateModal  = false;
      this.employementForm.get('effectiveStartDate')?.setValue(this.actionEsd);
      this.isEmployementContent();
    }
  }

  onActionChange() {
    // alert("onActionChange");
    this.selectedReason = ''; 
    console.log("selectedReason",this.selectedReason);
    this.actionReasonsUpdate = this.dropdownValuesService.getReasons(this.selectedAction) || []; 
    console.log("reasons for update",this.actionReasonsUpdate);
  }

  onActionEsdChange() {
    this.employementForm.get('Effective_Start_Date')?.setValue(this.actionEsd);
    this.employementForm.get('Effective_End_Date')?.setValue(this.actionEed);
  }

  closeUpdateModel() {
    this.showUpdateModal = false;
    this.resetSelect();
    this.actionEsd = '';
    this.selectedAction = '';
    this.selectedReason = '';
  }
  
  //------------------------- dropdown code for correcting record  ----------------------------------------//

  onActionChangeCorrection() {
    this.selectedReasonForCorrection = ''; 
    this.actionReasonsCorrection = this.dropdownValuesService.getReasonsForCorrection(this.selectedAction) || [];
    console.log('Selected Action for Correction:', this.selectedAction);
    console.log('reasons for correction:', this.actionReasonsCorrection);
  }

  handleActionChange() {
    this.showUpdateModalForCorrect = false;
    this.isEmployementContent();
  }

  cancelActionForCorretion() {
    this.showUpdateModalForCorrect = false;
    this.selectedAction = '';
    this.selectedReasonForCorrection = '';
    this.resetSelect();
  }

  //...............................Candidate / employeee Employeement details section ...................................//

  //------------ Employee Edit Buttons Enable ------------//

  isEmployementContent(){
    this.employmentbuttons = !this.employmentbuttons;
    if(this.employmentbuttons){
      this.employementForm.enable();
    }else{
      this.employementForm.disable();
      this.resetSelect();
      this.employeementData();
    }
  }

  //------------------------ fetch data employement data -----------------------//

  employeementData() {
    this.employementForm = this.formbuilder.group({
      employementId1: [this.employeeData[0].EMP_ID, Validators.required],
      Organization_Name: [this.employeeData[0].ORGANIZATION_NAME,Validators.required,],
      Position: [this.employeeData[0].POSITION],
      Department: [this.employeeData[0].DEPARTMENT],
      dateOfJoining: [this.employeeData[0].DATE_OF_JOINING],
      Status: [this.employeeData[0].STATUS],
      Notice_Period: [this.employeeData[0].NOTICE_PERIOD],
      effectiveStartDate: [this.employeeData[0].EFFECTIVE_START_DATE,[Validators.required,dateValidator]],
      Effective_End_Date: [this.employeeData[0].EFFECTIVE_END_DATE],
      PreviousExperiences: [this.employeeData[0].PREVIOUS_EXPERIENCE],
      CurrentCompanyExperience: [this.employeeData[0].CURRENT_COMP_EXPERIENCE],
      workerType: [this.employeeData[0].WORKER_TYPE, Validators.required],
      Probation_Period: [this.employeeData[0].PROBATION_PERIOD],
      proposedSalary: [this.employeeData[0].PROPOSED_SALARY_N],
      // manager: [this.employeeData[0].MANAGER]
    });
    this.waitForEmployementData = true;
    this.employementForm.disable();
  }

  //........................................ employement initization form  ...........................................//

  employementInitializationForm() {
    this.employementForm = this.formbuilder.group({
      employementId1: [this.employeeData.EMP_ID, Validators.required],
      Organization_Name: ['', Validators.required],
      Position: [''],
      Department: [''],
      dateOfJoining: [this.dateOfJoining],
      Status: ['', Validators.required],
      Confirmation_Date: [''],
      Probation_Period: [''],
      Notice_Period: [''],
      effectiveStartDate: ['', [Validators.required,dateValidator]],
      Effective_End_Date: ['4712-12-31'],
      workerType: ['', Validators.required],
      PreviousExperiences: ['0'],
      CurrentCompanyExperience: [''],
      proposedSalary: [''],
      // manager: [''],
    });
    this.waitForEmployementData = true;
  }

  //..........................................sending data to backend Employeement...............................

  employmentSubmit() {
    console.log(this.employementForm.valid);
    console.log(this.employementForm.status);
    this.updateLoading(true);
    if (this.employementForm.status === 'VALID' || 'INVALID') {
      const formattedData = {
        EMP_ID: this.employeListData.employee_details[0].EMP_ID,
        ORGANIZATION_NAME: this.employementForm.value['Organization_Name'],
        POSITION: this.employementForm.value['Position'],
        DEPARTMENT: this.employementForm.value['Department'],
        DATE_OF_JOINING: this.employementForm.value['dateOfJoining'],
        STATUS: this.employementForm.value['Status'],
        PROBATION_PERIOD: this.employementForm.value['Probation_Period'],
        NOTICE_PERIOD: this.employementForm.value['Notice_Period'],
        EFFECTIVE_START_DATE: this.employementForm.value['effectiveStartDate'],
        EFFECTIVE_END_DATE: this.employementForm.value['Effective_End_Date'],
        PREVIOUS_EXPERIENCE: this.employementForm.value['PreviousExperiences'],
        CURRENT_COMP_EXPERIENCE:this.employementForm.value['CurrentCompanyExperience'],
        WORKER_TYPE: this.employementForm.value['workerType'],
        PROPOSED_SALARY_N: this.employementForm.value['proposedSalary'],
        // MANAGER: this.employementForm.value['manager'],
      };
      console.log('empdetails', formattedData);
      this.employeeService.EmployeeDetails(formattedData).subscribe((res: any) => {
          console.log('res', res);
          if (formattedData.WORKER_TYPE === 'Candidate') {
            this.storeEmployeeNumber = res.EMP_NO[0];
          } else if (formattedData.WORKER_TYPE === 'Employee') {
            this.storeEmployeeNumber = res.EMP_NO[1];
          }
          this.updateLoading(false);
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Success',
            text: `${res.message}`,
            showConfirmButton: false,
            timer: 1500,
            width: 400,
          }).then(() => {
            this.isHideEditEmployementButton = !this.isHideEditEmployementButton;
            this.employementForm.disable();
            this.submitEmployeementButton = false;
            this.updateEmployeementButton = true;
          });
        },(error) => {
          console.log('error', error);
          this.updateLoading(false);
          if (error.error && error.error.error || error.error.message) {
            Swal.fire({
              position: 'top',
              icon: 'error',
              title: 'Error',
              text: `${ error.error.error || error.error.message }`,
              showConfirmButton: true,
            });
          }
        });
    } else {
      this.updateLoading(false);
      this.markFormGroupTouched(this.employementForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (Object as any).values(formGroup.controls).forEach((control: FormGroup<any>) => {
        control.markAsTouched();
        if (control.controls) {
          this.markFormGroupTouched(control);
        }
      });
  }

  //...........................................update Employement...........................................................

  updateEmploymentDetailsForm() {
    this.updateLoading(true);
    const updatedData = {
      ASSIGNMENT_ID: this.employeListData.employment_details[0].ASSIGNMENT_ID,
      EMP_ID: this.employementForm.value['employementId1'],
      ORGANIZATION_NAME: this.employementForm.value['Organization_Name'],
      POSITION: this.employementForm.value['Position'],
      DEPARTMENT: this.employementForm.value['Department'],
      DATE_OF_JOINING: this.employementForm.value['dateOfJoining'],
      STATUS: this.employementForm.value['Status'],
      PROBATION_PERIOD: this.employementForm.value['Probation_Period'],
      NOTICE_PERIOD: this.employementForm.value['Notice_Period'],
      EFFECTIVE_START_DATE: this.employementForm.value['effectiveStartDate'],
      EFFECTIVE_END_DATE: this.employementForm.value['Effective_End_Date'],
      PREVIOUS_EXPERIENCE: this.employementForm.value['PreviousExperiences'],
      CURRENT_COMP_EXPERIENCE:this.employementForm.value['CurrentCompanyExperience'],
      WORKER_TYPE: this.employementForm.value['workerType'],
      PROPOSED_SALARY_N: this.employementForm.value['proposedSalary'],
      // MANAGER: this.employementForm.value['manager'],
      ACTION: this.selectedAction,
      ACTION_REASON: this.selectedReason,
    };
    // console.log(updatedData);
    if (this.employementForm.value['workerType'] === 'Candidate') {
      this.selectedValue = 'Correct';
    } else {
      this.selectedValue = this.selectedValue;
    }
    this.employeeService.updateEmployeementData(updatedData,this.employeListData.employee_details[0].EMP_ID,this.selectedValue).subscribe((res: any) => {
      // console.log('res', res);
      if (updatedData.WORKER_TYPE === 'Candidate') {
           this.storeEmployeeNumber = res.EMP_NO[0];
          } else if (updatedData.WORKER_TYPE === 'Employee') {
            this.storeEmployeeNumber = res.EMP_NO[1];
          }
      this.updateLoading(false);
      Swal.fire({
            position: 'top',
            icon: 'success',
            title:'Success',
            text:`${res.message}` ,
            showConfirmButton: false,
            timer: 1500,
            width: 400,
          }).then(() => {
            this.resetSelect();
            this.employementForm.disable();
            this.actionEsd = '';
            this.selectedAction = '';
            this.selectedReason = '';
            this.selectedReasonForCorrection = '';          
          });
        },(error) => {
          console.log('err', error);
          this.updateLoading(false);
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Error',
            text: `${ error.error.error || error.error.message }`,
            showConfirmButton: true,
          });
        }
      );
  }

  //......................... search for previous record for employement ...................................//

  empsubmitdate() {
    this.updateLoading(true);
    this.employeeService.sendemploymentDate(this.employementEsd,this.employeeData[0].EMP_ID,this.effectiveEndDate).subscribe((res: any) => {
      this.employeeData = res['data'];
      console.log('employee Data from search records :', this.employeeData);
      this.updateLoading(false);
      this.employeementData();
    },(error) => {
        this.updateLoading(false);
        console.log(error);
        if ((error.error && error.error.error) || error.error.message) {
            Swal.fire({
              position: 'top',
              icon: 'error',
              title: 'Oops...',
              text: `${error.error.error || error.error.message}`,
              width: 400,
            });
          }
        });
  }

//------------------------ Employement details view history ---------------------------//

  employementViewHistory() {
    this.updateLoading(true);
    this.employeeService.EmployementViewHistoryData(this.employeListData.employee_details[0].EMP_ID).subscribe((res: any) => {
      console.log('res from view history table ===>>', res.data);
      this.viewHistoryEmployeementData = res.data;
      console.log('view History Employeement Data',this.viewHistoryEmployeementData);
      if(this.viewHistoryEmployeementData){
        this.waitForViewHistoryData = true;
      }
      this.updateLoading(false);
    },(error: any) => {
          console.log('err', error);
          this.updateLoading(false);
        });
  }

//------------------- onclick sepecified view history date --------------------------//

  employmentSearchViewHistory(date: any) {
    this.employementEsd=date;
    this.updateLoading(true);
    this.employeeService.sendemploymentDate(date,this.employeListData.employee_details[0].EMP_ID,this.effectiveEndDate).subscribe((res: any) => {
      console.log('res//', res);
      this.employeeData=res.data;
      console.log("employee Data from view history",this.employeeData);
      this.updateLoading(false);
          if (this.employeeData) {
            this.closeModal('custom-modal-3')
            this.employeementData();
          }
        },(error) => {
          console.log('error', error);
          this.updateLoading(false);
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
