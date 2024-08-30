import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../../employee';
import { GetEmployeesService } from '../../services/get-employees.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { ModalService } from 'src/app/_modal';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css'],
})
export class EditDetailsComponent implements OnInit {
  //------------------------------------employee/candidate Form and variables-----------------------------------//

  updateForm: any = new FormGroup({});
  isConvertedToEmployee = false;
  employeeESd: any;
  effectiveEndDate: any = '4712-12-31';
  empDate: any;
  empButtons: any = false;
  msg: any;
  maxDate: any;
  isCandidate: any = false;
  isEmployee: any = false;

  //---------------------------------------------Employement Form and variables---------------------------------------------------//

  employementForm: any = new FormGroup({});
  EmployementData: boolean = false;
  isHideEditEmployementButton: boolean = false;
  employeementEsd: any;
  employmentdate: any;
  employmentbutton: any = false;
  isShowEmployementButtons: boolean = false;

  //-----------------------drop down ng-container looping for employeement---------------------------//

  Probation_Period: any[] = ['3 Months', '6 Months', '12 Months'];
  Notice_Period: any[] = ['30 Days', '60 Days', '90 Days'];

  //------------------------------------------------------------------------------------------------------------------

  //---------------------------Address popup variable------------------------------------------------------

  addressButtonsHide: boolean = false;
  todaysDate: any;
  addressType: string = ' ';
  dateOfJoining: any;
  modalId1: any;

  //-------------------------------------------------------------------------------------------------------

  //---------------------------------------------------PresentAddress Form & Variables----------------------

  addressForm: any = new FormGroup({});
  empPresentAddEsd: any;
  presentEnd: any;
  presentGetData: any;
  ishideEditPrsentAdd: boolean = false;
  loading2: boolean = false;
  presentbutton: boolean = false;
  ishidePresentAdd: boolean = false;
  AddressData: any;

  //---------------------------------------------------------------------------------------------------------

  //-----------------------------------------------permanent Address Form & variables---------------------------

  addressForm1: any = new FormGroup({});
  empPermentAddEsd: any;
  permanentAddEEd: any;
  permanentGetData: any;
  ishidePermanentAdd: boolean = false;
  ishideEditPermBtn: boolean = false;
  permanentbuttons: boolean = false;

  //------------------------------------------------------------------------------------------------------------

  //------------------------------------------------Emergency Form and variables-------------------------------

  emergencyContact: any = new FormGroup({});
  getEmergencydata: any;
  emergencyformButtons: boolean = false;
  updateEmergencyButton = false;
  loading4: boolean;
  emergencyEditHideButton: boolean = true;
  empEmergencyAddEsd: any;
  emrgencyEnd: any;
  getEmergencyBasedOnDate: any;
  isHideEmergencyButtons: boolean = false;
  emergencybutton: any = false; //no

  //--------------------------------------------------------------------------------------------------------

  //-------------------------------ngOnInt-Variables-------------------------------------------------------

  employee: Employee = {} as Employee;
  employeeData: any;
  filterESD: any;
  employeeList: any;
  getPresentAddr: any;
  getPermanentAddr: any;

  //-----------------------------------------------------------------------------------------------

  date: any;
  empEndDate: any = '4712-12-31';
  length: any;
  esd: any;
  loading: boolean = false;
  modalId: any;
  loading3: any;

  searchDOJ: any;

  addressDateFrom: any;

  dateOfJoining2: any;

  @ViewChild('workerTypeSelect', { static: false })
  workerTypeSelect!: ElementRef;
  currentPath: any;
  missedAddressType: boolean = false;
  minDate: any;

  constructor(
    private employeeService: GetEmployeesService,
    private formbuilder: FormBuilder,
    private modalServcie: ModalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];

    this.filterESD = localStorage.getItem('empstartDate');
    // this.route.params.subscribe(params => {
    //   // Access the parameter value by its name
    //   const paramValue = params['paramName'];  // Replace 'paramName' with the actual parameter name
    //   console.log("Parameter value:", paramValue);
    // });

    this.currentPath = this.router.url;
    // console.log("currentPath:", this.currentPath)

    // console.log("this.filterESD", this.filterESD)
    this.employeeESd = this.filterESD;
    this.employeementEsd = this.filterESD;
    this.empPresentAddEsd = this.filterESD;
    this.empPermentAddEsd = this.filterESD;
    this.empEmergencyAddEsd = this.filterESD;

    const today1 = new Date();
    this.todaysDate = today1.toISOString().split('T')[0];
    // console.log("this.todaysDate", this.todaysDate)
    const empData = localStorage.getItem('employee');

    if (empData) {
      this.employee = JSON.parse(empData);
      // console.log("emp id", this.employee);
      // console.log("this.employee",this.employee);
      // console.log("empData:", this.employee);
      // if(!this.filterESD){
      //   this.filterESD = this.employee.EFFECTIVE_START_DATE
      // }else[

      // ]
      // if (this.fil) {
      //   alert(2)

      //   this.employeeESd = this.filterESD
      // } else {
      //   alert(3)
      //   localStorage.removeItem('empstartDate');
      //   this.employeeESd = this.todaysDate
      // }
      if (this.currentPath === '/edit123') {
        // alert("if")
        localStorage.removeItem('empstartDate');
        this.employeeESd = this.todaysDate;
        this.employeementEsd = this.todaysDate;
      } else {
        // alert("else")
        this.employeementEsd = this.filterESD;
        this.employeementEsd = this.filterESD;
      }
      this.dateOfJoining = this.employee.DATE_OF_JOINING;

      // setTimeout(() => {
      this.fetchEmpData(
        this.employee.EMP_NO,
        this.employeeESd,
        this.employee.EFFECTIVE_END_DATE
      );
      this.check();
      // }, 3000);
    }
  }

  onchange(event: any) {
    const a = event.target.value;
    if (a === 'Employee') {
      // alert(1)
      this.isCandidate = false;
      this.isEmployee = true;
      // this.addressButtonsHide = true
    } else if (a === 'Candidate') {
      // alert(2)
      this.isCandidate = true;
      this.isEmployee = false;
    }
  }

  check() {
    if (this.employee.WORKER_TYPE === 'Candidate') {
      this.addressButtonsHide = false;
    } else {
      this.addressButtonsHide = true;
    }
  }

  fetchEmpData(id: any, startDate: any, endDate: any) {
    // alert("iddddddd" + startDate)
    try {
      this.employeeService
        .fetchEmployeeDetails(id, startDate, endDate)
        .subscribe((result) => {
          // console.log("results of Fetch Employee details :", result)
          this.employeeList = result;
          // console.log("employeeList data:", this.employeeList);
          this.employeeData = result.employee_details;
          // console.log("employeeData", this.employeeData);
          this.dateOfJoining = this.employeeData[0].DATE_OF_JOINING;
          this.searchDOJ = this.employeeData[0].DATE_OF_JOINING;
          this.dateOfJoining2 = this.dateOfJoining;
          this.getEmergencydata = result.emergency_address_details;
          // console.log("getEmergencydata",this.getEmergencydata);
          this.getPermanentAddr = result.home_address_details;
          // console.log("getPermanentAddr", this.getPermanentAddr );
          this.getPresentAddr = result.work_address_details;
          // console.log("getPresentAddr",this.getPresentAddr);

          if (this.employeeList.employee_details[0].EMP_NO.startsWith('C')) {
            this.isCandidate = true;
            this.isEmployee = false;
            this.updateform1();
          } else {
            // alert("Employee start with E")
            this.isEmployee = true;
            this.isCandidate = false;
            this.updateform1();
          }

          if (this.employeeList.employment_details.length == 0) {
            // alert("initial employee employement form")
            this.employementInitializationForm();
            this.isHideEditEmployementButton = false;
            this.isShowEmployementButtons = true;
          } else {
            // alert("update employee employement form")
            this.updateEmploymentDetailsForm();
            this.isHideEditEmployementButton = true;
          }
        });
    } catch (error) {
      // alert("Error fetching the Employeee data");
      // console.error("Error fetching the Employeee data:", error);
    }
  }

  //-----------------------------------ForButtonHide------------------------------------------------------//

  isEmployeeContent() {
    this.empButtons = !this.empButtons;
    if (this.empButtons) {
      this.updateForm.enable();
    } else {
      this.updateForm.disable();
      this.updateform1();
    }
  }

  closeModal(id: any) {
    if (id === 'custom-modal-4') {
      if (this.addressType === 'PRESENT' || this.addressType === 'PERMANENT') {
        this.addressTypeDate();
        this.modalServcie.close(id);
        this.presentbutton = false;
        this.permanentbuttons = false;
        this.missedAddressType = false;
        this.addressDateFrom = this.dateOfJoining2;
        // alert(this.addressDateFrom);
      } else {
        this.missedAddressType = true;
      }
      //
    } else {
      this.modalServcie.close(id);
      this.presentbutton = false;
      this.permanentbuttons = false;
      this.missedAddressType = false;
    }
  }
  closeModal1(id: any) {
    this.missedAddressType = false;
    this.modalServcie.close(id);
  }

  cls(id: any) {
    this.resetAddressType();
    this.dateOfJoining2 = this.employeeData[0].DATE_OF_JOINING;
    this.AddressData = '';
    this.modalServcie.close(id);
  }

  resetAddressType() {
    this.addressType = '';
    if (this.workerTypeSelect) {
      (this.workerTypeSelect.nativeElement as HTMLSelectElement).value = '';
    }
  }

  //----------------------------------------------------For model boxes----------------------------------------------------//

  openModal(id: any) {
    this.minDate = this.dateOfJoining;
    this.modalId = id;
    this.modalServcie.open(id);
  }

  // closeAndOpen(id4: any, id5: any) {
  //   if (this.modalId == id4) {
  //     this.modalServcie.close(id4)
  //   }
  //   this.modalServcie.open(id5)
  // }

  //...........................Employee/Candidate Form details........................................

  //................update Employee...................

  updateform1() {
    this.updateForm = this.formbuilder.group({
      employeeId: [this.employeeData[0].EMP_ID, Validators.required],
      employeeNumber: [
        {
          value: this.employeeData[0].EMP_NO,
          disabled: this.isConvertedToEmployee,
        },
        Validators.required,
      ],
      firstName: [this.employeeData[0].FIRST_NAME, Validators.required],
      middleName: [this.employeeData[0].MIDDLE_NAME],
      lastName: [this.employeeData[0].LAST_NAME, Validators.required],
      email: [this.employeeData[0].EMAIL_ADDRESS],
      dateOfBirth: [this.employeeData[0].DATE_OF_BIRTH, Validators.required],
      userId: [this.employeeData[0].USER_ID, Validators.required],
      workLocation: [this.employeeData[0].WORK_LOCATION, Validators.required],
      workerType: [this.employeeData[0].WORKER_TYPE, Validators.required],
      dateOfJoinging: [
        this.employeeData[0].DATE_OF_JOINING,
        Validators.required,
      ],
      effectiveStartDate: [
        this.employeeData[0].EFFECTIVE_START_DATE,
        Validators.required,
      ],
      effectiveEndDate: [this.employeeData[0].EFFECTIVE_END_DATE],
    });
    this.updateForm.disable();
  }

  //.................update Employee Submit to backend....................................

  submitForm() {
    this.loading = true;
    if (this.updateForm.status === 'VALID') {
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
        EFFECTIVE_END_DATE: this.updateForm.value['4712-12-31'],
      };

      // console.log("sendData:", sendData)
      this.employeeService.updateID(this.employee.EMP_ID, sendData).subscribe(
        (response: any) => {
          this.loading = false;
          this.msg = response.message;
          // console.log("response:", response)
          // this.employeeESd = response
          this.fetchEmpData(
            response.data.EMP_NO,
            response.data.EFFECTIVE_START_DATE,
            response.data.EFFECTIVE_END_DATE
          );
          Swal.fire({
            position: 'top',
            icon: 'success',
            text: `${this.msg}`,
            showConfirmButton: false,
            timer: 2000,
            width: 400,
          }).then(() => {
            this.updateForm.disable();
            this.empButtons = !this.empButtons;
          });
        },
        (error) => {
          // console.log("error", error);
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
        }
      );
    }
    // else {
    //     this.loading = false;
    //   }
  }

  //....................................for searcch previous records for Employee................

  submitDate() {
    this.loading = true;
    this.employeeService
      .sendDate(this.employeeESd, this.employee.EMP_NO, this.effectiveEndDate)
      .subscribe(
        (res: any) => {
          this.loading = false;
          // console.log("employeesearchbasedonemp&end", res);
          this.empDate = res['data'];
          if (this.empDate.WORKER_TYPE === 'Candidate') {
            this.addressButtonsHide = false;
          } else {
            this.addressButtonsHide = true;
          }
          // console.log("this.empDate", this.empDate);
          this.updateForm = this.formbuilder.group({
            employeeId: [this.empDate.EMP_ID, Validators.required],
            employeeNumber: [this.empDate.EMP_NO, Validators.required],
            firstName: [this.empDate.FIRST_NAME, Validators.required],
            middleName: [this.empDate.MIDDLE_NAME],
            lastName: [this.empDate.LAST_NAME, Validators.required],
            email: [this.empDate.EMAIL_ADDRESS, Validators.required],
            dateOfBirth: [this.empDate.DATE_OF_BIRTH, Validators.required],
            userId: [this.empDate.USER_ID, Validators.required],
            workLocation: [this.empDate.WORK_LOCATION, Validators.required],
            workerType: [this.empDate.WORKER_TYPE, Validators.required],
            effectiveStartDate: [
              this.empDate.EFFECTIVE_START_DATE,
              Validators.required,
            ],
            dateOfJoinging: [this.empDate.DATE_OF_JOINING, Validators.required],
            effectiveEndDate: [this.empDate.EFFECTIVE_END_DATE],
          });
          this.updateForm.disable();
        },
        (error) => {
          this.loading = false;
          // console.log("error", error);
          // console.log("error:", error.error.message)
          if (error.error && error.error.message) {
            Swal.fire({
              position: 'top',
              icon: 'error',
              title: 'Oops...',
              text: `${error.error.message}`,
              width: 400,
            });
          }
          // console.log("error", error);
          if (error.error && error.error.error) {
            // alert("error" + error.error.message)
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

  //==================================================================================================================================

  //...............................Candidate / employeee Employeement details...................................

  //Employee Edit Buttons Enable

  employeementUpdate() {
    this.employmentbutton = !this.employmentbutton;
    if (this.employmentbutton) {
      this.employementForm.enable();
    } else {
      this.employementForm.disable();
      this.employmentbutton = false;
      this.isShowEmployementButtons = false;
    }
  }

  //........................................init............................................

  employementInitializationForm() {
    this.employementForm = this.formbuilder.group({
      employementId1: [this.employee.EMP_ID, Validators.required],
      Organization_Name: ['', Validators.required],
      Position: [''],
      Department: [''],
      Annual_Salary: ['', Validators.required],
      Previous_AnnualSalary: ['0'],
      dateOfJoining: [this.dateOfJoining, Validators.required],
      MobileNo: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{10}$/),
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
      Status: ['', Validators.required],
      Confirmation_Date: [''],
      Probation_Period: [''],
      Notice_Period: [''],
      Effective_Start_Date: ['', Validators.required],
      Effective_End_Date: ['4712-12-31'],
      workerType: ['', Validators.required],
      PreviousExperiences: ['0'],
      CurrentCompanyExperience: [''],
    });
    this.EmployementData = true;
    this.employmentbutton = !this.employmentbutton;
  }

  //..........................................sending data to backend Employeement...............................

  employmentSubmit() {
    this.loading = true;
    if (this.employementForm.status === 'VALID') {
      const formattedData = {
        EMP_ID: this.employementForm.value['employementId1'],
        ORGANIZATION_NAME: this.employementForm.value['Organization_Name'],
        POSITION: this.employementForm.value['Position'],
        DEPARTMENT: this.employementForm.value['Department'],
        ANNUAL_SALARY: this.employementForm.value['Annual_Salary'],
        PREVIOUS_ANNUAL_SALARY:
          this.employementForm.value['Previous_AnnualSalary'],
        DATE_OF_JOINING: this.employementForm.value['dateOfJoining'],
        MOBILE_NO: this.employementForm.value['MobileNo'],
        STATUS: this.employementForm.value['Status'],
        PROBATION_PERIOD: this.employementForm.value['Probation_Period'],
        NOTICE_PERIOD: this.employementForm.value['Notice_Period'],
        EFFECTIVE_START_DATE:
          this.employementForm.value['Effective_Start_Date'],
        EFFECTIVE_END_DATE: this.employementForm.value['Effective_End_Date'],
        PREVIOUS_EXPERIENCE: this.employementForm.value['PreviousExperiences'],
        CURRENT_COMP_EXPERIENCE:
          this.employementForm.value['CurrentCompanyExperience'],
        WORKER_TYPE: this.employementForm.value['workerType'],
      };
      // console.log("empdetails", formattedData);
      this.employeeService.EmployeeDetails(formattedData).subscribe(
        (res: any) => {
          this.isHideEditEmployementButton = true;
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
            this.employmentbutton = !this.employmentbutton;
          });
        },
        (error) => {
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
    // console.log("PROBATION_PERIOD", this.employeeList.employment_details);
    this.employementForm = this.formbuilder.group({
      employementId1: [
        this.employeeList.employment_details[0].EMP_ID,
        Validators.required,
      ],
      Organization_Name: [
        this.employeeList.employment_details[0].ORGANIZATION_NAME,
        Validators.required,
      ],
      Position: [this.employeeList.employment_details[0].POSITION],
      Department: [this.employeeList.employment_details[0].DEPARTMENT],
      Annual_Salary: [
        this.employeeList.employment_details[0].ANNUAL_SALARY,
        Validators.required,
      ],
      Previous_AnnualSalary: [
        this.employeeList.employment_details[0].PREVIOUS_ANNUAL_SALARY,
      ],
      dateOfJoining: [
        this.employeeList.employment_details[0].DATE_OF_JOINING,
        Validators.required,
      ],
      MobileNo: [
        this.employeeList.employment_details[0].MOBILE_NO,
        [
          Validators.required,
          Validators.pattern(/^[0-9]{10}$/),
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
      Status: [this.employeeList.employment_details[0].STATUS],
      Notice_Period: [this.employeeList.employment_details[0].NOTICE_PERIOD],
      Effective_Start_Date: [
        this.employeeList.employment_details[0].EFFECTIVE_START_DATE,
        Validators.required,
      ],
      Effective_End_Date: [
        this.employeeList.employment_details[0].EFFECTIVE_END_DATE,
      ],
      PreviousExperiences: [
        this.employeeList.employment_details[0].PREVIOUS_EXPERIENCE,
      ],
      CurrentCompanyExperience: [
        this.employeeList.employment_details[0].CURRENT_COMP_EXPERIENCE,
      ],
      workerType: [
        this.employeeList.employment_details[0].WORKER_TYPE,
        Validators.required,
      ],
      Probation_Period: [
        this.employeeList.employment_details[0].PROBATION_PERIOD,
      ],
    });
    this.employementForm.disable();
    this.EmployementData = true;
  }

  //.....................................search for previous record for employement.............................................................

  empsubmitdate() {
    this.loading = true;
    this.employeeService
      .sendemploymentDate(
        this.employeementEsd,
        this.employee.EMP_ID,
        this.empEndDate
      )
      .subscribe(
        (res: any) => {
          this.loading = false;
          // console.log("res", res['data']);
          this.employmentdate = res['data'];
          // console.log("this.employmentdate", this.employmentdate.EMP_ID);
          // console.log("this.employmentdate.EFFECTIVE_END_DATE", this.employmentdate.EFFECTIVE_END_DATE);
          this.employementForm = this.formbuilder.group({
            employementId1: [this.employmentdate.EMP_ID, Validators.required],
            Organization_Name: [
              this.employmentdate.ORGANIZATION_NAME,
              Validators.required,
            ],
            Position: [this.employmentdate.POSITION],
            Department: [this.employmentdate.DEPARTMENT],
            Annual_Salary: [
              this.employmentdate.ANNUAL_SALARY,
              Validators.required,
            ],
            Previous_AnnualSalary: [this.employmentdate.PREVIOUS_ANNUAL_SALARY],
            dateOfJoining: [
              this.employmentdate.DATE_OF_JOINING,
              Validators.required,
            ],
            MobileNo: [
              this.employmentdate.MOBILE_NO,
              [
                Validators.required,
                Validators.pattern(/^[0-9]{10}$/),
                Validators.maxLength(10),
                Validators.minLength(10),
              ],
            ],
            Status: [this.employmentdate.STATUS],
            Confirmation_Date: [''],
            Probation_Period: [this.employmentdate.PROBATION_PERIOD],
            Notice_Period: [this.employmentdate.NOTICE_PERIOD],
            Effective_Start_Date: [
              this.employmentdate.EFFECTIVE_START_DATE,
              Validators.required,
            ],
            workerType: [this.employmentdate.WORKER_TYPE, Validators.required],
            PreviousExperiences: [this.employmentdate.PREVIOUS_EXPERIENCE],
            CurrentCompanyExperience: [
              this.employmentdate.CURRENT_COMP_EXPERIENCE,
            ],
            Effective_End_Date: [this.employmentdate.EFFECTIVE_END_DATE],
          });
          this.employementForm.disable();
        },
        (error) => {
          // console.log(error);
          this.loading = false;
          if (error.error && error.error.error) {
            Swal.fire({
              position: 'top',
              icon: 'error',
              title: 'Oops...',
              text: `${error.error.error}`,
              width: 400,
            });
          } else if (error.error && error.error.message) {
            Swal.fire({
              position: 'top',
              icon: 'error',
              title: 'Oops...',
              text: `${error.error.message}`,
              width: 400,
            });
          }
        }
      );
  }

  //...........................................Address Section..................................................

  selectedValue(e: any) {
    this.addressType = e.target.value;
    if (e.target.value === 'PRESENT') {
      this.modalId1 = 'custom-modal-5';
    } else if (e.target.value === 'PERMANENT') {
      this.modalId1 = 'custom-modal-6';
      this.permanentbuttons = true;
    }
  }

  //........................................Present Address & permanent addresss................................................

  Emppresent() {
    this.presentbutton = !this.presentbutton;
    if (this.presentbutton) {
      this.addressForm.enable();
    } else {
      this.addressForm.disable();
      this.presentbutton = false;
      this.ishidePresentAdd = false;
      this.presentesdAddData();
    }
  }

  emppermant() {
    this.permanentbuttons = !this.permanentbuttons;
    if (this.permanentbuttons) {
      this.addressForm1.enable();
    } else {
      this.addressForm1.disable();
      this.permanentbuttons = false;
      this.ishidePermanentAdd = false;
      this.empPermanentAddEndsubmitdate();
    }
  }

  //.....................sending Present and permenant Address data to backend................................

  submitAddress() {
    // console.log("Present addressForm status", this.addressForm.status);
    this.loading = true;
    if (this.addressForm.status === 'VALID') {
      const updateData = {
        EMP_ID: this.addressForm.value['EmployeeId'],
        ADDRESS_TYPE: this.addressForm.value['AddressType'],
        ADDRESS: this.addressForm.value['Address'],
        CITY: this.addressForm.value['City'],
        STATE: this.addressForm.value['State'],
        COUNTRY: this.addressForm.value['Country'],
        PIN_CODE: this.addressForm.value['Pincode'],
        DATE_FROM: this.addressForm.value['DateForm'],
        PHONE_1: this.addressForm.value['Phone1'],
        DATE_TO: this.addressForm.value['DateTo'],
      };
      // console.log("updateData", updateData);
      this.addressForm.value['AddressType']
        ? this.employeeService
            .addressData(updateData, this.employee.EMP_ID)
            .subscribe(
              (res: any) => {
                this.loading = false;
                Swal.fire({
                  position: 'top',
                  icon: 'success',
                  title: 'Successful',
                  text: `${res.message}`,
                  showConfirmButton: false,
                  timer: 2000,
                }).then(() => {
                  this.presentbutton = !this.presentbutton;
                  this.addressForm.disable();
                  this.fetchEmpData(
                    this.employee.EMP_NO,
                    res.data.DATE_FROM,
                    this.employee.EFFECTIVE_END_DATE
                  );
                });
              },
              (error) => {
                this.loading = false;
                if (error.error && error.error.error) {
                  Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.error.error}`,
                    width: 400,
                  });
                } else if (error.error && error.error.message) {
                  Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.error.message}`,
                    width: 400,
                  });
                }
              }
            )
        : null;
    } else {
      this.markFormGroupTouchedPresent(this.addressForm);
      this.loading = false;
    }
  }

  markFormGroupTouchedPresent(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.markFormGroupTouchedPresent(control);
      }
    });
  }

  submitPermanenetAdd() {
    this.loading = true;
    if (this.addressForm1.invalid) {
      this.addressForm1.markAllAsTouched();
      this.loading = false;
      return;
    }
    const PermanentAddress = {
      EMP_ID: this.addressForm1.value['EmployeeId'],
      ADDRESS_TYPE: this.addressForm1.value['PermanentAdressType'],
      ADDRESS: this.addressForm1.value['PermanentAddress'],
      CITY: this.addressForm1.value['PermanentCity'],
      STATE: this.addressForm1.value['PermanentState'],
      COUNTRY: this.addressForm1.value['PermanentCountry'],
      PIN_CODE: this.addressForm1.value['PermanentPincode'],
      DATE_FROM: this.addressForm1.value['PermanentDateForm'],
      DATE_TO: this.addressForm1.value['PermanentDateTo'],
      PHONE_1: this.addressForm1.value['PermanentPhone1'],
    };
    this.employeeService
      .addressData(PermanentAddress, this.employee.EMP_ID)
      .subscribe(
        (res: any) => {
          this.loading = false;
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Success',
            text: `${res.message}`,
            showConfirmButton: false,
            timer: 2000,
            width: 400,
          }).then(() => {
            this.permanentbuttons = !this.permanentbuttons;
            this.addressForm1.disable();
            this.fetchEmpData(
              this.employee.EMP_NO,
              res.data.DATE_FROM,
              this.employee.EFFECTIVE_END_DATE
            );
          });
        },
        (error) => {
          this.loading = false;
          if (error.error && error.error.error) {
            Swal.fire({
              position: 'top',
              icon: 'error',
              title: 'Oops...',
              text: `${error.error.error}`,
              width: 400,
            });
          } else if (error.error && error.error.message) {
            Swal.fire({
              position: 'top',
              icon: 'error',
              title: 'Oops...',
              text: `${error.error.message}`,
              width: 400,
            });
          }
        }
      );
  }

  //....................................Search present and permenant address previous data .............................................................

  presentesdAddData() {
    let addType = 'PRESENT';
    this.employeeService
      .getPresentAddressData(
        this.employee.EMP_ID,
        addType,
        this.addressDateFrom,
        this.presentEnd
      )
      .subscribe(
        (res: any) => {
          // console.log("res", res);
          this.presentGetData = res['data'];
          // console.log("this.presentGetData", this.presentGetData.ADDRESS);
          this.addressForm = this.formbuilder.group({
            EmployeeId: [this.presentGetData.EMP_ID],
            AddressType: [this.presentGetData.PERSON_ADDRESS],
            Address: [this.presentGetData.ADDRESS],
            City: [this.presentGetData.CITY],
            State: [this.presentGetData.STATE],
            Country: [this.presentGetData.COUNTRY],
            Pincode: [this.presentGetData.PIN_CODE],
            DateForm: [this.presentGetData.DATE_FROM, Validators.required],
            Phone1: [
              this.presentGetData.PHONE_1,
              [
                Validators.pattern(/^[0-9]{10}$/),
                Validators.maxLength(10),
                Validators.minLength(10),
              ],
            ],
            DateTo: [this.presentGetData.DATE_TO],
          });
          this.addressForm.disable();
        },
        (error) => {
          // console.log("err", error);
          this.loading = false;
          if (error.error && error.error.error) {
            Swal.fire({
              position: 'top',
              icon: 'error',
              title: 'Oops...',
              text: `${error.error.error}`,
              width: 400,
            });
          } else if (error.error && error.error.message) {
            Swal.fire({
              position: 'top',
              icon: 'error',
              title: 'Oops...',
              text: `${error.error.message}`,
              width: 400,
            });
          }
        }
      );
  }

  empPermanentAddEndsubmitdate() {
    let permanentAdd = 'PERMANENT';
    this.employeeService
      .getPermanentAddressData(
        this.employee.EMP_ID,
        permanentAdd,
        this.addressDateFrom,
        this.permanentAddEEd
      )
      .subscribe(
        (res: any) => {
          // console.log("res", res.data);
          this.permanentGetData = res.data;
          // console.log("this.permanentGetData", this.permanentGetData.ADDRESS);
          this.addressForm1 = this.formbuilder.group({
            EmployeeId: [this.employeeList.home_address_details[0].EMP_ID],
            PermanentAdressType: [this.permanentGetData.ADDRESS_TYPE],
            PermanentAddress: [this.permanentGetData.ADDRESS],
            PermanentCity: [this.permanentGetData.CITY],
            PermanentState: [this.permanentGetData.STATE],
            PermanentCountry: [this.permanentGetData.COUNTRY],
            PermanentPincode: [this.permanentGetData.PIN_CODE],
            PermanentDateForm: [
              this.permanentGetData.DATE_FROM,
              Validators.required,
            ],
            PermanentPhone1: [
              this.permanentGetData.PHONE_1,
              [
                Validators.pattern(/^[0-9]{10}$/),
                Validators.maxLength(10),
                Validators.minLength(10),
              ],
            ],
            PermanentDateTo: [this.permanentGetData.DATE_TO],
          });
          this.addressForm1.disable();
        },
        (error) => {
          // console.log("err", error);
          this.loading = false;
          if (error.error && error.error.error) {
            Swal.fire({
              position: 'top',
              icon: 'error',
              title: 'Oops...',
              text: `${error.error.error}`,
              width: 400,
            });
          } else if (error.error && error.error.message) {
            Swal.fire({
              position: 'top',
              icon: 'error',
              title: 'Oops...',
              text: `${error.error.message}`,
              width: 400,
            });
          }
        }
      );
  }

  addressTypeDate() {
    // alert("Address type date method called.");
    this.addressDateFrom = this.dateOfJoining;
    let enddate = '4712-12-31';
    if (this.getPresentAddr.length === 0 && this.addressType === 'PRESENT') {
      // alert(" Present Adress Init");
      // this.ishidePresentAdd=true;
      this.ishideEditPrsentAdd = true;
      this.addressForm = this.formbuilder.group({
        EmployeeId: [this.employee.EMP_ID, Validators.required],
        AddressType: ['PRESENT'],
        Address: [''],
        City: [''],
        State: [''],
        Country: [''],
        Pincode: [''],
        DateForm: ['', Validators.required],
        Phone1: [
          '',
          [
            Validators.pattern(/^[0-9]{10}$/),
            Validators.maxLength(10),
            Validators.minLength(10),
          ],
        ],
        DateTo: ['4712-12-31'],
      });
      this.loading2 = true;
      this.openModal('custom-modal-5');
    } else {
      this.employeeService
        .sendAddresstypeDate(
          this.employee.EMP_ID,
          this.addressType,
          this.dateOfJoining2,
          enddate
        )
        .subscribe(
          (res: any) => {
            // console.log("ressdgh", res);
            this.AddressData = res.data;
            // console.log("this.AddressData", this.AddressData.STATE);
            if (this.AddressData.ADDRESS_TYPE === 'PRESENT') {
              // console.log("this.AddressData", this.AddressData.STATE);
              // alert("present")
              // alert("Present Address Update");
              this.ishideEditPrsentAdd = false;
              this.addressForm = this.formbuilder.group({
                EmployeeId: [this.AddressData.EMP_ID],
                AddressType: [this.AddressData.ADDRESS_TYPE],
                Address: [this.AddressData.ADDRESS],
                City: [this.AddressData.CITY],
                State: [this.AddressData.STATE],
                Country: [this.AddressData.COUNTRY],
                Pincode: [this.AddressData.PIN_CODE],
                DateForm: [this.AddressData.DATE_FROM, Validators.required],
                Phone1: [
                  this.AddressData.PHONE_1,
                  [
                    Validators.pattern(/^[0-9]{10}$/),
                    Validators.maxLength(10),
                    Validators.minLength(10),
                  ],
                ],
                DateTo: [this.AddressData.DATE_TO],
              });
              this.loading2 = true;
              this.addressForm.disable();
              this.openModal('custom-modal-5');
            }
          },
          (error) => {
            // console.log("err", error);
            throw new Error('Server Error:', error.message);
          }
        );
    }
    if (
      this.addressType === 'PERMANENT' &&
      this.getPermanentAddr.length === 0
    ) {
      this.addressDateFrom = this.dateOfJoining;
      // alert("Permenant Address Init");
      this.ishideEditPermBtn = true;
      this.addressForm1 = this.formbuilder.group({
        EmployeeId: [this.employee.EMP_ID],
        PermanentAdressType: ['PERMANENT'],
        PermanentAddress: [''],
        PermanentCity: [''],
        PermanentState: [''],
        PermanentCountry: [''],
        PermanentPincode: [''],
        PermanentDateForm: ['', Validators.required],
        PermanentDateTo: ['4712-12-31'],
        PermanentPhone1: [
          '',
          [
            Validators.pattern(/^[0-9]{10}$/),
            Validators.maxLength(10),
            Validators.minLength(10),
          ],
        ],
      });
      this.loading3 = true;
      this.openModal('custom-modal-6');
    } else {
      this.employeeService
        .sendAddresstypeDate(
          this.employee.EMP_ID,
          this.addressType,
          this.dateOfJoining2,
          enddate
        )
        .subscribe(
          (res: any) => {
            // console.log("ressdgh", res);
            this.AddressData = res.data;
            // console.log("this.AddressData", this.AddressData.STATE);
            if (this.AddressData.ADDRESS_TYPE === 'PERMANENT') {
              // alert("Prmanent Address Update");
              this.ishideEditPermBtn = false;
              // console.log("this.AddressData", this.AddressData.STATE);
              this.addressForm1 = this.formbuilder.group({
                EmployeeId: [this.AddressData.EMP_ID],
                PermanentAdressType: [this.AddressData.ADDRESS_TYPE],
                PermanentAddress: [this.AddressData.ADDRESS],
                PermanentCity: [this.AddressData.CITY],
                PermanentState: [this.AddressData.STATE],
                PermanentCountry: [this.AddressData.COUNTRY],
                PermanentPincode: [this.AddressData.PIN_CODE],
                PermanentDateForm: [
                  this.AddressData.DATE_FROM,
                  Validators.required,
                ],
                PermanentDateTo: [this.AddressData.DATE_TO || '4712-12-31'],
                PermanentPhone1: [
                  this.AddressData.PHONE_1,
                  [
                    Validators.pattern(/^[0-9]{10}$/),
                    Validators.maxLength(10),
                    Validators.minLength(10),
                  ],
                ],
              });
              this.loading3 = true;
              this.addressForm1.disable();
              if (this.loading3) {
                this.openModal('custom-modal-6');
              }
            }
          },
          (error) => {
            // console.log("err", error);
            throw new Error('Server Error:', error.message);
          }
        );
    }
  }

  //..................................................emergency addresss ..................................

  emergencyData() {
    this.emergencybutton = true;
    this.emergencyContact.enable();
  }

  emergencyEdit() {
    this.isHideEmergencyButtons = !this.isHideEmergencyButtons;
    if (this.isHideEmergencyButtons) {
      this.emergencyContact.enable();
    } else {
      this.emergencyContact.disable();
      this.emergency();
    }
  }

  emergency() {
    // console.log("Emergency data:", this.getEmergencydata);
    //console.log("emergencyData", this.getEmergencydata[0].FIRST_NAME);
    if (this.getEmergencydata.length === 1) {
      this.emergencyformButtons = false;
      this.updateEmergencyButton = true;
      // alert(1)
      this.emergencyContact = this.formbuilder.group({
        FirstName: [this.getEmergencydata[0].FIRST_NAME, Validators.required],
        MiddleName: [this.getEmergencydata[0].MIDDLE_NAME],
        LastName: [this.getEmergencydata[0].LAST_NAME, Validators.required],
        Gender: [this.getEmergencydata[0].GENDER],
        relation: [this.getEmergencydata[0].RELATION_TYPE, Validators.required],
        contactNo: [this.getEmergencydata[0].CONTACT_NO, Validators.required],
        Dateofbirth: [this.getEmergencydata[0].DATE_OF_BIRTH],
        Effectivestartdate: [
          this.getEmergencydata[0].EFFECTIVE_START_DATE,
          Validators.required,
        ],
        Effectiveenddate: [this.getEmergencydata[0].EFFECTIVE_END_DATE],
        addressType: ['EMERGENCY_CONTACT', Validators.required],
        empId: [this.getEmergencydata[0].EMP_ID],
      });
      this.emergencyContact.disable();
      this.loading4 = true;
      if (this.loading4) {
        this.openModal('custom-modal-7');
      }
    } else {
      this.emergencyformButtons = true;
      this.updateEmergencyButton = false;
      this.emergencyEditHideButton = false;
      // alert(2)
      this.emergencyContact = this.formbuilder.group({
        FirstName: ['', Validators.required],
        MiddleName: [''],
        LastName: ['', Validators.required],
        Gender: [''],
        relation: ['', Validators.required],
        contactNo: ['', Validators.required],
        Dateofbirth: [''],
        Effectivestartdate: ['', Validators.required],
        Effectiveenddate: ['4712-12-31'],
        addressType: ['EMERGENCY_CONTACT', Validators.required],
        empId: [this.addressForm.value['EmployeeId']],
      });
      this.loading4 = true;
      if (this.loading4) {
        this.openModal('custom-modal-7');
      }
    }
  }

  //............................sending to backend .........................................

  emergencyDetails() {
    this.loading = true;
    // console.log(this.emergencyContact.status);
    // alert("empId" + this.employee.EMP_ID)
    if (this.emergencyContact.invalid) {
      // Mark all controls as touched to trigger validation messages
      this.emergencyContact.markAllAsTouched();
      this.loading = false;
      return;
    }
    // alert("ghjkljhg")
    const contactNoString = this.emergencyContact.get('contactNo')?.value;
    const contactNoInteger = parseInt(contactNoString, 10);
    const emergencyData = {
      FIRST_NAME: this.emergencyContact.value['FirstName'],
      MIDDLE_NAME: this.emergencyContact.value['MiddleName'],
      LAST_NAME: this.emergencyContact.value['LastName'],
      GENDER: this.emergencyContact.value['Gender'],
      RELATION_TYPE: this.emergencyContact.value['relation'],
      CONTACT_NO: contactNoInteger,
      DATE_OF_BIRTH: this.emergencyContact.value['Dateofbirth'],
      EMP_ID: this.employee.EMP_ID,
      EFFECTIVE_START_DATE: this.emergencyContact.value['Effectivestartdate'],
      EFFECTIVE_END_DATE: this.emergencyContact.value['Effectiveenddate'],
      ADDRESS_TYPE: this.emergencyContact.value['addressType'],
    };
    // console.log("Emergency data:", emergencyData)
    this.employeeService.sendEmergencyData(emergencyData).subscribe(
      (res: any) => {
        // console.log("emergency", res);

        this.loading = false;
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Success',
          // text: `${res.message}`,
          showConfirmButton: false,
          timer: 1500,
          width: 400,
        }).then(() => {
          this.isHideEmergencyButtons = !this.isHideEmergencyButtons;
          this.emergencyContact.disable();
          this.fetchEmpData(
            this.employee.EMP_NO,
            this.filterESD,
            this.employee.EFFECTIVE_END_DATE
          );
        });

        this.closeModal('custom-modal-7');
      },
      (error) => {
        // console.log("error", error);
        this.loading = false;
        if (error.error && error.error.error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.error.error}`,
            width: 400,
          });
        } else if (error.error && error.error.message) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.error.message}`,
            width: 400,
          });
        }
      }
    );
  }

  updateEmergency() {
    // alert(this.emergencyDataGet.FIRST_NAME)
    // console.log("this.emergency contact:", this.emergencyContact.value['FirstName'])
    const emergencyData = {
      FIRST_NAME: this.emergencyContact.value['FirstName'],
      MIDDLE_NAME: this.emergencyContact.value['MiddleName'],
      LAST_NAME: this.emergencyContact.value['LastName'],
      GENDER: this.emergencyContact.value['Gender'],
      RELATION_TYPE: this.emergencyContact.value['relation'],
      CONTACT_NO: this.emergencyContact.value['contactNo'],
      DATE_OF_BIRTH: this.emergencyContact.value['Dateofbirth'],
      EMP_ID: this.employee.EMP_ID,
      EFFECTIVE_START_DATE: this.emergencyContact.value['Effectivestartdate'],
      EFFECTIVE_END_DATE: this.emergencyContact.value['Effectiveenddate'],
      ADDRESS_TYPE: this.emergencyContact.value['addressType'],
    };
    // console.log("emergencyData", emergencyData);
    this.employeeService
      .updateEmergencyData(this.employee.EMP_ID, emergencyData)
      .subscribe(
        (res) => {
          // console.log("res", res);
          // let newEffectiveStartDate = res.EFFECTIVE_START_DATE
          Swal.fire({
            position: 'top',
            icon: 'success',
            // text: `${this.msg}`,
            text: ' Emergency details updated Successfully',
            showConfirmButton: false,
            timer: 2000,
            width: 400,
          }).then(() => {
            this.isHideEmergencyButtons = !this.isHideEmergencyButtons;
            this.emergencyContact.disable();
            this.fetchEmpData(
              res.data.EMP_NO,
              res.data.EFFECTIVE_START_DATE,
              res.data.EFFECTIVE_END_DATE
            );
          });
          this.openModal('custom-modal-3');
        },
        (error) => {
          // console.log("err", error);
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Oops...',
            text: `${error.error.message}`,
            width: 400,
          });
        }
      );
  }

  // emergency record search  for previous dates

  emergencysubmitdate() {
    this.employeeService
      .getemergencyAddressData(
        this.employee.EMP_ID,
        this.searchDOJ,
        this.emrgencyEnd
      )
      .subscribe(
        (res: any) => {
          // console.log("res", res);
          this.getEmergencyBasedOnDate = res.data;
          // console.log("this.getEmergencyBasedOnDate", this.getEmergencyBasedOnDate.FIRST_NAME);
          this.emergencyContact = this.formbuilder.group({
            FirstName: [
              this.getEmergencyBasedOnDate.FIRST_NAME,
              Validators.required,
            ],
            MiddleName: [this.getEmergencyBasedOnDate.MIDDLE_NAME],
            LastName: [
              this.getEmergencyBasedOnDate.LAST_NAME,
              Validators.required,
            ],
            Gender: [this.getEmergencyBasedOnDate.GENDER],
            relation: [
              this.getEmergencyBasedOnDate.RELATION_TYPE,
              Validators.required,
            ],
            contactNo: [
              this.getEmergencyBasedOnDate.CONTACT_NO,
              Validators.required,
            ],
            Dateofbirth: [this.getEmergencyBasedOnDate.DATE_OF_BIRTH],
            Effectivestartdate: [
              this.getEmergencyBasedOnDate.EFFECTIVE_START_DATE,
              Validators.required,
            ],
            Effectiveenddate: [this.getEmergencyBasedOnDate.EFFECTIVE_END_DATE],
            addressType: ['EMERGENCY_CONTACT', Validators.required],
            empId: [this.getEmergencydata[0].EMP_ID],
          });
          this.emergencyContact.disable();
        },
        (error) => {
          // console.log("err", error);
        }
      );
  }
}
