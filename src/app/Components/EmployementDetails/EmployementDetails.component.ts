import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/_modal/modal.servcie';
import { GetEmployeesService } from 'src/app/Services/Employee Services/get-employees.service';
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
  //------------ Employement Form and variables ----------//

  @Input() employeListData: any;
  @Input() employeeStartDate: any;
  @Input() loading: boolean = false;
  @Output() loadingChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  viewHistoryEmployeementData: any;
  employementForm: any = new FormGroup({});
  employmentdate: any;
  employeementEsd: any;
  effectiveEndDate: any = '4712-12-31';
  employmentbuttons: any = false;
  isHideEditEmployementButton: boolean = false;
  // isShowEmployementButtons: boolean = false;
  updateEmployeementButton: boolean = false;
  submitEmployeementButton: boolean = false;
  storeEmployeeNumber: any;
  Probation_Period: any[] = ['3 Months', '6 Months', '6 Months'];
  Notice_Period: any[] = ['30 Days', '60 Days', '90 Days'];
  loadDisplayData: boolean = false;
  workerTypeValue: boolean = false;
  wait: boolean;

  showUpdateModal: boolean = false;

  //------------------------------dropDown--------------------------------------//

  actionEsd: any;

  selectedValue: any;

  selectedAction: string = '';

  selectedReason: string = '';

  showUpdateModalForCorrect: boolean = false;

  selectedReasonForCorrection: string = '';

  reasons: { value: string; label: string }[] = [];

  private reasonsMap: { [key: string]: { value: string; label: string }[] } = {
    AddAssignment: [
      {
        value: 'createdContractAppointment',
        label: 'Created Contract Appointment',
      },
      { value: 'internalRecruitment', label: 'Internal Recruitment' },
      { value: 'reOrganisation', label: 'Re-organisation' },
    ],
    AssignmentChange: [
      { value: 'AwardTenure', label: 'AwardTenure' },
      {
        value: 'Awardunitofservice-Tenure',
        label: 'Awardunitofservice-Tenure',
      },
      { value: 'CareerProgression', label: 'CareerProgression' },
      { value: 'ContractRenewal', label: 'ContractRenewal' },
      { value: 'LeaveofAbsence', label: 'LeaveofAbsence' },
      {
        value: 'LeaveofAbsence-Sabbatical',
        label: 'LeaveofAbsence-Sabbatical',
      },
      { value: 'LeaveofAbsence-unpaid', label: 'LeaveofAbsence-unpaid' },
      { value: 'ProjectAssignment', label: 'ProjectAssignment' },
      { value: 'Reorganization', label: 'Reorganization' },
      { value: 'ReturnfromLOA', label: 'ReturnfromLOA' },
      { value: 'ReturnfromLOASabbatical', label: 'ReturnfromLOASabbatical' },
    ],
    Demotion: [
      { value: 'Performance', label: 'Performance' },
      { value: 'Reorganization', label: 'Reorganization' },
      { value: 'WorkerRequest', label: 'WorkerRequest' },
    ],
    EndAssignment: [
      { value: 'EndProbation', label: 'EndProbation' },
      { value: 'ManagerRequest', label: 'ManagerRequest' },
      { value: 'PlannedEnd', label: 'PlannedEnd' },
      { value: 'WorkerRequest', label: 'WorkerRequest' },
    ],
    EndProbationPeriod: [
      { value: 'EndProbation', label: 'EndProbation' },
      { value: 'Performance', label: 'Performance' },
    ],
    ExtendTemporaryAssignment: [
      { value: 'ManagerRequest', label: 'Manager Request' },
      { value: 'PeriodicReview', label: 'Periodic Review' },
      { value: 'Reorganization', label: 'Re-organization' },
    ],

    GlobalTemporaryAssignment: [
      { value: 'CareerProgression', label: 'Career Progression' },
      { value: 'ManagerRequest', label: 'Manager Request' },
      { value: 'Probation', label: 'Probation' },
      { value: 'Reorganization', label: 'Re-organization' },
      { value: 'StaffingShortage', label: 'Staffing Shortage' },
      { value: 'WorkerRequest', label: 'Worker Request' },
    ],
    GlobalTransfer: [
      { value: 'CareerProgression', label: 'Career Progression' },
      { value: 'InternalRecruitment', label: 'Internal Recruitment' },
      { value: 'LocationChange', label: 'Location Change' },
      { value: 'Reorganization', label: 'Re-organization' },
      { value: 'WorkerRequest', label: 'Worker Request' },
    ],
    JobLocationchange: [
      { value: 'AgreementChange', label: 'Agreement Change' },
    ],
    JobChange: [
      { value: 'Performance', label: 'Performance' },
      { value: 'Reorganization', label: 'Re-organization' },
      { value: 'WorkerRequest', label: 'Worker Request' },
    ],
    LocationChange: [
      { value: 'Relocation', label: 'Re-location' },
      { value: 'Reorganization', label: 'Re-organization' },
      { value: 'WorkerRequest', label: 'Worker Request' },
    ],
    ManagerChange: [
      {
        value: 'AdditionofAssignmentforManager',
        label: 'Addition of Assignment for Manager',
      },
      {
        value: 'AdditionofContingentWorkRelationshipforManger',
        label: 'Addition of Contingent Work Relationship for Manger',
      },
      {
        value: 'AdditionofEmploymentTermsforManger',
        label: 'Addition of Employment Terms for Manger',
      },
      {
        value: 'AdditionofNonworkerWorkRelationshipforManager',
        label: 'Addition of Non-worker Work Relationship for Manager',
      },
      {
        value: 'AdditionofNonWorkerforManager',
        label: 'Addition of Non-Worker for Manager',
      },
      {
        value: 'AdditionofPendingWorkerforManager',
        label: 'Addition of Pending Worker for Manager',
      },
      {
        value: 'ChangeofLocationofManager',
        label: 'Change of Location of Manager',
      },
      {
        value: 'ChangeofManagerofManager',
        label: 'Change of Manager of Manager',
      },
      {
        value: 'EndofAssignmentforManager',
        label: 'End of Assignment for Manager',
      },
      {
        value: 'EndofEmploymentTermsforManager',
        label: 'End of Employment Terms for Manager',
      },
      {
        value: 'EndofGlobalTemporaryAssignmentforManager',
        label: 'End of Global Temporary Assignment for Manager',
      },
      {
        value: 'EndofTemporaryAssignmentforManager',
        label: 'End of Temporary Assignment for Manager',
      },
      {
        value: 'GlobalTemporaryassignmentforManager',
        label: 'Global Temporary assignment for Manager',
      },
      { value: 'GlobalTransferofManager', label: 'Global Transfer of Manager' },
      { value: 'NewHireofManager', label: 'New Hire of Manager' },
      { value: 'PromotionofManger', label: 'Promotion of Manger' },
      {
        value: 'ReassignmentofManagerReports',
        label: 'Re-assignment of Manager Reports',
      },
      { value: 'Reorganization', label: 'Re-organization' },
      { value: 'Resignationofmanager', label: 'Resignation of manager' },
      {
        value: 'TemporaryAssignmentofManager',
        label: 'Temporary Assignment of Manager',
      },
      { value: 'TerminationofManager', label: 'Termination of Manager' },
      { value: 'TransferofManager', label: 'Transfer of Manager' },
    ],
    PositionChange: [
      { value: 'BudgetAdjustment', label: 'Budget Adjustment' },
      { value: 'Performance', label: 'Performance' },
      {
        value: 'PositionDistributionAllocation',
        label: 'Position Distribution Allocation',
      },
      {
        value: 'PositionReclassification',
        label: 'Position Re-classification',
      },
      { value: 'Reorganization', label: 'Re-organization' },
      {
        value: 'SalaryScheduleAdjustment',
        label: 'Salary Schedule Adjustment',
      },
      { value: 'WorkerRequest', label: 'Worker Request' },
    ],
    Promotion: [
      { value: 'InternalRecruitment', label: 'Internal Recruitment' },
      { value: 'Performance', label: 'Performance' },
      { value: 'Reorganization', label: 'Re-organization' },
    ],
    StartProbationPeriod: [
      { value: 'Disciplinary', label: 'Disciplinary' },
      { value: 'Performance', label: 'Performance' },
      { value: 'Probation', label: 'Probation' },
      { value: 'Reorganization', label: 'Re-organization' },
    ],
    SuspendAssignment: [
      { value: 'Performance', label: 'Performance' },
      { value: 'Reorganization', label: 'Re-organization' },
    ],
    TemporaryAssignment: [
      { value: 'CarrerProgression', label: 'Carrer Progression' },
      { value: 'ManagerRequest', label: 'Manager Request' },
      { value: 'Probation', label: 'Probation' },
      { value: 'Reorganization', label: 'Re-organization' },
      { value: 'StaffingShortage', label: 'Staffing Shortage' },
      { value: 'WorkerRequest', label: 'Worker Request' },
    ],
    Transfer: [
      { value: 'AdditionalWorkLoad', label: 'Additional Work Load' },
      { value: 'CarrerProgression', label: 'Carrer Progression' },
      { value: 'InternalRecruitment', label: 'InternalRecruitment' },
      { value: 'LocationChange', label: 'Location Change' },
      { value: 'ManagerRequest', label: 'Manager Request ' },
      { value: 'Reorganization', label: 'Re-organization' },
      { value: 'TransfertoNewLocation', label: 'Transfer to New Location' },
      { value: 'WorkerRequest', label: 'Worker Request' },
      { value: 'EmployeeWish', label: 'Employee Wish' },
    ],
    WorkingHoursChange: [
      { value: 'Reorganization', label: 'Re-organization' },
      { value: 'WorkerRequest', label: 'Worker Request' },
    ],

    // Add more mappings for other actions if needed
  };

  actions: { value: string; label: string }[] = [
    { value: '', label: 'Select an action' },
    { value: 'AddAssignment', label: 'Add Assignment' },
    { value: 'AssignmentChange', label: 'Assignment Change' },
    { value: 'Demotion', label: 'Demotion' },
    { value: 'EndAssignment', label: 'End Assignment' },
    { value: 'EndProbationPeriod', label: 'End Probation Period' },
    {
      value: 'ExtendTemporaryAssignment',
      label: 'Extend Temporary Assignment',
    },
    { value: 'GlobalTransfer', label: 'Global Transfer' },
    {
      value: 'GlobalTemporaryAssignment',
      label: 'Global Temporary Assignment',
    },
    { value: 'JobLocationchange', label: 'Job Location Change' },
    { value: 'JobChange', label: 'Job Change' },
    { value: 'LocationChange', label: 'Location Change' },
    { value: 'ManagerChange', label: 'Manager Change' },
    { value: 'PositionChange', label: 'Position Change' },
    { value: 'Promotion', label: 'Promotion' },
    { value: 'StartProbationPeriod', label: 'Start Probation Period' },
    { value: 'SuspendAssignment', label: 'Suspend Assignment' },
    { value: 'TemporaryAssignment', label: 'Temporary Assignment' },
    { value: 'Transfer', label: 'Transfer' },
    { value: 'WorkingHoursChange', label: 'Working Hours Change' },
  ];

  private reasonsMapForCorrection: {
    [key: string]: { value: string; label: string }[];
  } = {
    AssignmentChange: [
      { value: 'AwardTenure', label: 'AwardTenure' },
      {
        value: 'Awardunitofservice-Tenure',
        label: 'Awardunitofservice-Tenure',
      },
      { value: 'CareerProgression', label: 'CareerProgression' },
      { value: 'ContractRenewal', label: 'ContractRenewal' },
      { value: 'LeaveofAbsence', label: 'LeaveofAbsence' },
      {
        value: 'LeaveofAbsence-Sabbatical',
        label: 'LeaveofAbsence-Sabbatical',
      },
      { value: 'LeaveofAbsence-unpaid', label: 'LeaveofAbsence-unpaid' },
      { value: 'ProjectAssignment', label: 'ProjectAssignment' },
      { value: 'Reorganization', label: 'Reorganization' },
      { value: 'ReturnfromLOA', label: 'ReturnfromLOA' },
      { value: 'ReturnfromLOASabbatical', label: 'ReturnfromLOASabbatical' },
    ],
    Demotion: [
      { value: 'Performance', label: 'Performance' },
      { value: 'Reorganization', label: 'Reorganization' },
      { value: 'WorkerRequest', label: 'WorkerRequest' },
    ],
    EndProbationPeriod: [
      { value: 'EndProbation', label: 'EndProbation' },
      { value: 'Performance', label: 'Performance' },
    ],
    GlobalTransfer: [{ value: 'EmployeeTransfer', label: 'Employee Transfer' }],
    JobLocationchange: [
      { value: 'AgreementChange', label: 'Agreement Change' },
    ],
    JobChange: [
      { value: 'Performance', label: 'Performance' },
      { value: 'Reorganization', label: 'Re-organization' },
      { value: 'WorkerRequest', label: 'Worker Request' },
    ],
    LocationChange: [
      { value: 'Relocation', label: 'Re-location' },
      { value: 'Reorganization', label: 'Re-organization' },
      { value: 'WorkerRequest', label: 'Worker Request' },
    ],
    ManagerChange: [
      {
        value: 'AdditionofAssignmentforManager',
        label: 'Addition of Assignment for Manager',
      },
      {
        value: 'AdditionofContingentWorkRelationshipforManger',
        label: 'Addition of Contingent Work Relationship for Manger',
      },
      {
        value: 'AdditionofEmploymentTermsforManger',
        label: 'Addition of Employment Terms for Manger',
      },
      {
        value: 'AdditionofNonworkerWorkRelationshipforManager',
        label: 'Addition of Non-worker Work Relationship for Manager',
      },
      {
        value: 'AdditionofNonWorkerforManager',
        label: 'Addition of Non-Worker for Manager',
      },
      {
        value: 'AdditionofPendingWorkerforManager',
        label: 'Addition of Pending Worker for Manager',
      },
      {
        value: 'ChangeofLocationofManager',
        label: 'Change of Location of Manager',
      },
      {
        value: 'ChangeofManagerofManager',
        label: 'Change of Manager of Manager',
      },
      {
        value: 'EndofAssignmentforManager',
        label: 'End of Assignment for Manager',
      },
      {
        value: 'EndofEmploymentTermsforManager',
        label: 'End of Employment Terms for Manager',
      },
      {
        value: 'EndofGlobalTemporaryAssignmentforManager',
        label: 'End of Global Temporary Assignment for Manager',
      },
      {
        value: 'EndofTemporaryAssignmentforManager',
        label: 'End of Temporary Assignment for Manager',
      },
      {
        value: 'GlobalTemporaryassignmentforManager',
        label: 'Global Temporary assignment for Manager',
      },
      { value: 'GlobalTransferofManager', label: 'Global Transfer of Manager' },
      { value: 'NewHireofManager', label: 'New Hire of Manager' },
      { value: 'PromotionofManger', label: 'Promotion of Manger' },
      {
        value: 'ReassignmentofManagerReports',
        label: 'Re-assignment of Manager Reports',
      },
      { value: 'Reorganization', label: 'Re-organization' },
      { value: 'Resignationofmanager', label: 'Resignation of manager' },
      {
        value: 'TemporaryAssignmentofManager',
        label: 'Temporary Assignment of Manager',
      },
      { value: 'TerminationofManager', label: 'Termination of Manager' },
      { value: 'TransferofManager', label: 'Transfer of Manager' },
    ],
    PositionChange: [
      { value: 'BudgetAdjustment', label: 'Budget Adjustment' },
      { value: 'Performance', label: 'Performance' },
      {
        value: 'PositionDistributionAllocation',
        label: 'Position Distribution Allocation',
      },
      {
        value: 'PositionReclassification',
        label: 'Position Re-classification',
      },
      { value: 'Reorganization', label: 'Re-organization' },
      {
        value: 'SalaryScheduleAdjustment',
        label: 'Salary Schedule Adjustment',
      },
      { value: 'WorkerRequest', label: 'Worker Request' },
    ],
    Promotion: [
      { value: 'InternalRecruitment', label: 'Internal Recruitment' },
      { value: 'Performance', label: 'Performance' },
      { value: 'Reorganization', label: 'Re-organization' },
    ],
    StartProbationPeriod: [
      { value: 'Disciplinary', label: 'Disciplinary' },
      { value: 'Performance', label: 'Performance' },
      { value: 'Probation', label: 'Probation' },
      { value: 'Reorganization', label: 'Re-organization' },
    ],
    Transfer: [
      { value: 'AdditionalWorkLoad', label: 'Additional Work Load' },
      { value: 'CarrerProgression', label: 'Carrer Progression' },
      { value: 'InternalRecruitment', label: 'InternalRecruitment' },
      { value: 'LocationChange', label: 'Location Change' },
      { value: 'ManagerRequest', label: 'Manager Request ' },
      { value: 'Reorganization', label: 'Re-organization' },
      { value: 'TransfertoNewLocation', label: 'Transfer to New Location' },
      { value: 'WorkerRequest', label: 'Worker Request' },
      { value: 'EmployeeWish', label: 'Employee Wish' },
    ],
    WorkingHoursChange: [
      { value: 'Reorganization', label: 'Re-organization' },
      { value: 'WorkerRequest', label: 'Worker Request' },
    ],
  };

  actionsforCorrection: { value: string; label: string }[] = [
    { value: '', label: 'Select an action' },
    { value: 'AssignmentChange', label: 'Assignment Change' },
    { value: 'Demotion', label: 'Demotion' },
    { value: 'EndProbationPeriod', label: 'End Probation Period' },
    { value: 'GlobalTransfer', label: 'Global Transfer' },
    { value: 'JobLocationchange', label: 'Job Location Change' },
    { value: 'JobChange', label: 'Job Change' },
    { value: 'LocationChange', label: 'Location Change' },
    { value: 'ManagerChange', label: 'Manager Change' },
    { value: 'PositionChange', label: 'Position Change' },
    { value: 'Promotion', label: 'Promotion' },
    { value: 'StartProbationPeriod', label: 'Start Probation Period' },
    { value: 'Transfer', label: 'Transfer' },
    { value: 'WorkingHoursChange', label: 'Working Hours Change' },
  ];

  //----------- onInit variables ------------//

  employeeData: any;
  employeeList: any;
  dateOfJoining: any;

  //----------- Model boxs variables ---------//

  modalId: any;

  constructor(
    private modalService: ModalService,
    private employeeService: GetEmployeesService,
    private formbuilder: FormBuilder
  ) {}

  ngOnInit() {
    // this.updateLoading(true);
    this.employeeList=this.employeListData;



    this.employeeData = this.employeListData.employment_details;
    console.log(this.employeListData.employee_details[0].EMP_ID);

    this.employeementEsd=this.employeeStartDate;

    console.log('this.employeeData', this.employeeData);

    if (this.employeeData.length === 0) {
      this.employementInitializationForm();
      this.submitEmployeementButton=true;
    } else {
      this.employeementData();
      this.updateEmployeementButton=true;
    }
  }

  updateLoading(value: boolean) {
    this.loading = value;
    // console.log("loading status :",this.loading);
    this.loadingChange.emit(this.loading);
  }

  //-----------------------for Update Dropdown---------------------------//
  onActionChange() {
    this.selectedReason = ''; // Reset selected reason
    this.reasons = this.reasonsMap[this.selectedAction] || [];
  }

  actionChange() {
    this.showUpdateModal = false;
    this.employementForm.get('effectiveStartDate')?.setValue(this.actionEsd);
    // alert(this.actionEsd);
    // alert(this.selectedAction);
    // alert(this.selectedReason);

    this.closeModal('custom-modal-12');
    this.openModal('custom-modal-1');
    // this.employeementUpdate();
  }

  onActionEsdChange() {
    this.employementForm.get('Effective_Start_Date')?.setValue(this.actionEsd);
  }

  //-------------------------correctdrodown----------------------------------------//
  onActionChangeCorrection() {
    // alert(1);
    this.selectedReasonForCorrection = ''; // Reset selected reason
    this.reasons = this.reasonsMapForCorrection[this.selectedAction] || [];
    console.log('reasons:', this.reasons);
  }

  actionChangeForCorrection() {
    alert(this.selectedReason);
    alert(this.selectedAction);
    alert(this.selectedValue);
    this.showUpdateModalForCorrect = false;
    this.closeModal('custom-modal-13');
    this.openModal('custom-modal-1');
    // this.employeementUpdate();
  }

  cancelActionForCorretion() {
    this.showUpdateModalForCorrect = false;
  }

  //...............................Candidate / employeee Employeement details...................................//

  //------------ Employee Edit Buttons Enable ------------//

  //------------------------ fetch data -----------------------//

  employeementData() {
    // alert(this.employeeData[0].EMP_ID)

    // alert(2);
    // alert(this.employeeData[0].EMP_ID);
    // console.log("employement data --> ", this.employeeList.employment_details[0]);
    this.employementForm = this.formbuilder.group({
      employementId1: [this.employeeData[0].EMP_ID, Validators.required],
      Organization_Name: [
        this.employeeData[0].ORGANIZATION_NAME,
        Validators.required,
      ],
      Position: [this.employeeData[0].POSITION],
      Department: [this.employeeData[0].DEPARTMENT],
      dateOfJoining: [this.employeeData[0].DATE_OF_JOINING],
      Status: [this.employeeData[0].STATUS],
      Notice_Period: [this.employeeData[0].NOTICE_PERIOD],
      effectiveStartDate: [
        this.employeeData[0].EFFECTIVE_START_DATE,
        Validators.required,
      ],
      Effective_End_Date: [this.employeeData[0].EFFECTIVE_END_DATE],
      PreviousExperiences: [this.employeeData[0].PREVIOUS_EXPERIENCE],
      CurrentCompanyExperience: [this.employeeData[0].CURRENT_COMP_EXPERIENCE],
      workerType: [this.employeeData[0].WORKER_TYPE, Validators.required],
      Probation_Period: [this.employeeData[0].PROBATION_PERIOD],
      proposedSalary: [this.employeeData[0].PROPOSED_SALARY_N],
      // manager: [this.employeeData[0].MANAGER]
    });
    this.wait = true;

    // this.employementForm.disable();
  }

  //........................................init..................................................

  employementInitializationForm() {
    // alert(1);
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
      effectiveStartDate: ['', Validators.required],
      Effective_End_Date: ['4712-12-31'],
      workerType: ['', Validators.required],
      PreviousExperiences: ['0'],
      CurrentCompanyExperience: [''],
      proposedSalary: [''],
      manager: [''],
    });

    this.wait = true;
    // this.EmployementData = true;
    // this.employmentbutton = !this.employmentbutton;
    this.loadDisplayData = true;
  }

  //..........................................sending data to backend Employeement...............................

  employmentSubmit() {
    // alert(this.employeeData.employee_details[0].EMP_ID)
    // alert("vbn")
    // console.log(this.employementForm.controls);
    console.log(this.employementForm.valid);
    this.loading = true;
    console.log(this.employementForm.status);
    // alert("dfgh")
    if (this.employementForm.status === 'INVALID' || 'VALID') {
      // alert("dfghj")
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
        CURRENT_COMP_EXPERIENCE:
          this.employementForm.value['CurrentCompanyExperience'],
        WORKER_TYPE: this.employementForm.value['workerType'],
        PROPOSED_SALARY_N: this.employementForm.value['proposedSalary'],
        MANAGER: this.employementForm.value['manager'],
      };
      console.log('empdetails', formattedData);
      this.employeeService.EmployeeDetails(formattedData).subscribe(
        (res: any) => {
          console.log('res', res);
          if (formattedData.WORKER_TYPE === 'Candidate') {
            this.storeEmployeeNumber = res.EMP_NO[0];
          } else if (formattedData.WORKER_TYPE === 'Employee') {
            this.storeEmployeeNumber = res.EMP_NO[1];
          }
          // this.isHideEditEmployementButton = true;
          this.loading = false;
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Success',
            text: `${res.message}`,
            showConfirmButton: false,
            timer: 1500,
            width: 400,
          }).then(() => {
            this.employementForm.disable();
            // this.employmentbutton = !this.employmentbutton;
            // this.submitEmployeementButton = false;
            // this.updateEmployeementButton = true;
          });
        },
        (error) => {
          console.log('error', error);
          this.loading = false;
          if (error.error && error.error.error) {
            Swal.fire({
              position: 'top',
              icon: 'error',
              title: 'Error',
              text: `${error.error.error}`,
              showConfirmButton: true,
            });
          }
        }
      );
    } else {
      this.loading = false;
      this.markFormGroupTouched(this.employementForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (Object as any)
      .values(formGroup.controls)
      .forEach((control: FormGroup<any>) => {
        control.markAsTouched();
        if (control.controls) {
          this.markFormGroupTouched(control);
        }
      });
  }

  //...........................................update Employement...........................................................

  updateEmploymentDetailsForm() {
    // alert('update');
    // alert(this.selectedValue);
    // alert(this.employeListData.employment_details[0].ASSIGNMENT_ID);
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
      CURRENT_COMP_EXPERIENCE:
        this.employementForm.value['CurrentCompanyExperience'],
      WORKER_TYPE: this.employementForm.value['workerType'],
      PROPOSED_SALARY_N: this.employementForm.value['proposedSalary'],
      MANAGER: this.employementForm.value['manager'],
      ACTION: this.selectedAction,
      ACTION_REASON: this.selectedReason,
    };
    console.log(updatedData);
    if (this.employementForm.value['workerType'] === 'Candidate') {
      this.selectedValue = 'Correct';
    } else {
      this.selectedValue = this.selectedValue;
    }
    this.employeeService
      .updateEmployeementData(
        updatedData,
        this.employeListData.employee_details[0].EMP_ID,
        this.selectedValue
      )
      .subscribe(
        (res: any) => {
          console.log('res', res);
          if (updatedData.WORKER_TYPE === 'Candidate') {
            this.storeEmployeeNumber = res.EMP_NO[0];
          } else if (updatedData.WORKER_TYPE === 'Employee') {
            this.storeEmployeeNumber = res.EMP_NO[1];
          }
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Success',
            showConfirmButton: false,
            timer: 1500,
            width: 400,
          }).then(() => {
            this.employementForm.disable();
          });
        },
        (error) => {
          console.log('err', error);
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Error',
            text: `${error.error.error}`,
            showConfirmButton: true,
          });
        }
      );
    // this.EmployementData = true;
  }

  //.....................................search for previous record for employement.............................................................

  empsubmitdate() {
    alert(this.employeementEsd)
    alert(this.effectiveEndDate)
    this.updateLoading(true);
    this.employeeService
      .sendemploymentDate(
        this.employeementEsd,
        this.employeeData[0].EMP_ID,
        this.effectiveEndDate
      )
      .subscribe(
        (res: any) => {
          this.employeeData = res['data'];
          console.log('this.employeeData', this.employeeData);

          this.updateLoading(false);
          this.employeementData();
          // this.employementForm = this.formbuilder.group({
          //   employementId1: [this.employmentdate[0].EMP_ID, Validators.required],
          //   Organization_Name: [this.employmentdate[0].ORGANIZATION_NAME, Validators.required,],
          //   Position: [this.employmentdate[0].POSITION],
          //   Department: [this.employmentdate[0].DEPARTMENT],
          //   dateOfJoining: [this.employmentdate[0].DATE_OF_JOINING,],
          //   Status: [this.employmentdate[0].STATUS],
          //   Confirmation_Date: [''],
          //   Probation_Period: [this.employmentdate[0].PROBATION_PERIOD],
          //   Notice_Period: [this.employmentdate[0].NOTICE_PERIOD],
          //   effectiveStartDate: [this.employmentdate[0].EFFECTIVE_START_DATE, Validators.required,],
          //   workerType: [this.employmentdate[0].WORKER_TYPE, Validators.required],
          //   PreviousExperiences: [this.employmentdate[0].PREVIOUS_EXPERIENCE],
          //   CurrentCompanyExperience: [this.employmentdate[0].CURRENT_COMP_EXPERIENCE,],
          //   Effective_End_Date: [this.employmentdate[0].EFFECTIVE_END_DATE],
          //   MANAGER: [this.employmentdate[0].MANAGER]
          // });
          // this.employementForm.disable();
        },
        (error) => {
          this.updateLoading(false);
          console.log(error);
          if ((error.error && error.error.error) || error.error.message) {
            Swal.fire({
              position: 'top',
              icon: 'error',
              title: 'Oops...',
              text: `${error.error.error}`,
              width: 400,
            });
          }
        }
      );
  }

  //------------------- model windows ----------------------//

  onOptionChange(event: any) {
    this.selectedValue = event.target.value;

    if (this.selectedValue === 'Update') {
      this.showUpdateModal = !this.showUpdateModal;
    } else if (this.selectedValue === 'Correct') {
      this.showUpdateModalForCorrect = !this.showUpdateModalForCorrect;
    } else if (this.selectedValue === 'DeleteRecord') {
      // Handle "Delete Record" option
    }
  }

  openModal(id: any) {
    // alert(`open ${id}`);
    this.modalId = id;
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
      this.openModal('custom-modal-2')
      this.employementViewHistory();
    }
    // if(id === 'custom-modal-4'){
    //   this.openModal('custom-modal-2')
    // }

    this.modalService.close(id);
  }

  employementViewHistory() {
    // alert("fgh")

    // alert(this.employeListData.employee_details[0].EMP_ID);
    this.employeeService.EmployementViewHistoryData(this.employeListData.employee_details[0].EMP_ID).subscribe((res: any) => {
      console.log('res===>>', res.data);
      this.viewHistoryEmployeementData = res.data;
      console.log('viewHistoryEmployeementData',this.viewHistoryEmployeementData);
          // this.getEmploymentDataResult = res.data;

          // this.modalServcie.open('id')
          // this.modalService.close('custom-modal-2');
        },
        (error: any) => {
          alert(1);
          console.log('err', error);
        }
      );
  }

  employmentSearchViewHistory(date: any) {
    // this.closeModal('custom-modal-3')
    this.employeementEsd=date;


    //  alert(date);
    // this.employeementEsd = date;
    this.employeeService
      .sendemploymentDate(
        date,
        this.employeListData.employee_details[0].EMP_ID,
        this.effectiveEndDate
      )
      .subscribe(
        (res: any) => {
          console.log('res//', res);
          this.employeeData=res.data;
          console.log("this.employeeData",this.employeeData);
          
          if (this.employeeData) {
            this.closeModal('custom-modal-3')
            this.employeementData();
          }
        },
        (error) => {
          console.log('error', error);
        }
      );
  }
}
