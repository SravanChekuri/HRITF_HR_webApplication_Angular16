import { Component, OnInit } from '@angular/core';
import { Employee } from '../../employee';
import { GetEmployeesService } from '../../services/get-employees.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ModalService } from 'src/app/_modal';
import { ArrayType } from '@angular/compiler';


@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css']
})

export class EditDetailsComponent implements OnInit {


  //------------------------------------employee/candidate Form and variables-----------------------------------//
  updateForm: any = new FormGroup({});

  isConvertedToEmployee = false;

  employeeESd:any;

  effectiveEndDate: any = '4712-12-31';

  empDate: any;

  empButtons: any = false;

  msg: any;

  maxDate: any;

  isCandidate: any = false;

  isEmployee: any = false;


//-----------------------------------------------------------------------------------------------------------//



  //---------------------------------------------Employement Form and variables---------------------------------------------------//

  employementForm: any = new FormGroup({});

  sampleData: boolean = false;

  isHideEditEmployementButton=false
  
;

  employeementEsd:any;

  employmentdate: any;

  employmentbutton: any = false;

  isShowEmployementButtons: boolean=false;

   //-----------------------drop down ng-container looping for employeement---------------------------//

   Probation_Period: any[] = ['3 Months', '6 Months', '12 Months'];

   Notice_Period: any[] = ['30 Days', '60 Days', '90 Days'];


//------------------------------------------------------------------------------------------------------------------


//---------------------------Address popup variable------------------------------------------------------

addressButtonsHide: boolean;

todaysDate: any;

addressType: any;

modalId1: any;

//-------------------------------------------------------------------------------------------------------

//---------------------------------------------------PresentAddress Form & Variables----------------------

addressForm: any = new FormGroup({});

empPresentAddEsd:any;

presentEnd: any;

presentGetData: any;

ishideEditPrsentAdd: boolean=true;

loading2: boolean = false;

presentbutton: any = false;

ishidePrsentAdd=false;

AddressData: any;


//---------------------------------------------------------------------------------------------------------



 //-----------------------------------------------permanent Address Form & variables---------------------------

 addressForm1: any = new FormGroup({});

 empPermentAddEsd:any;

 permanentAddEEd: any;

 permanentGetData: any;

 ishideEditButton: boolean=true;

 permanentbuttons: any = false;

 isPresntEnableButtons: boolean=false;

 //------------------------------------------------------------------------------------------------------------

 //------------------------------------------------Emergency Form and variables-------------------------------
 
 emergencyContact: any = new FormGroup({});

 getEmergencydata: any;

 emergencyformButtons: boolean=false;

 updateEmergencyButton=false;

 loading4: boolean;

 emergencyEditHideButton:boolean=true;

 empEmergencyAddEsd:any;

 emrgencyEnd: any;

 getEmergencyBasedOnDate: any;

 isHideEmergencyButtons: boolean=false;

 emergencybutton: any = false; //no


//--------------------------------------------------------------------------------------------------------


//-------------------------------ngOnInt-Variables-------------------------------------------------------

employee: Employee = {} as Employee;

employeeData:any;

filterESD:any;

employeeList: any;

getPresentAddr: any;

getPermanentAddr: any;



//-----------------------------------------------------------------------------------------------

date: any;

empEndDate: any = '4712-12-31';

// employementId: any; not using

length: any;

esd: any;

// addressData: boolean = false;

// workAddress: boolean = false;


loading: boolean = false;

modalId: any;

// presentGetAddressData: any; not using


loading3: any;









  constructor(
    private employeeService: GetEmployeesService,
    private formbuilder: FormBuilder,
    private modalServcie: ModalService
  ) { }





  ngOnInit(): void {
 
    const today = new Date

    this.maxDate = today.toISOString().split('T')[0];

    this.filterESD = localStorage.getItem('empstartDate');

    this.employeeESd=this.filterESD;

    this.employeementEsd=this.filterESD;

    this.empPresentAddEsd=this.filterESD;

    this.empPermentAddEsd=this.filterESD;

    this.empEmergencyAddEsd=this.filterESD;

    const today1 = new Date();
    this.todaysDate = today1.toISOString().split('T')[0];

    const empData = localStorage.getItem('employee');




    if (empData) {

      this.employee = JSON.parse(empData);
      // console.log("this.employee",this.employee);
    
     console.log("empData", this.employee);
      this.fetchEmpData(this.employee.EMP_NO,  this.filterESD, this.employee.EFFECTIVE_END_DATE);
    
      this.check()
      }
  }

  onchange(event: any) {
    const a = event.target.value;
    if (a === 'Employee') {
      this.isCandidate = false;
      this.isEmployee = true;
    }
    else if (a === 'Candidate') {
      this.isCandidate = true;
      this.isEmployee = false;
    }
  }

  

  

  check() {
    if (this.employee.WORKER_TYPE === 'Candidate') {
      this.addressButtonsHide = false;
    }
    else {
      this.addressButtonsHide = true
    }
  }

  fetchEmpData(id: any, startDate: any, endDate: any) {

    try {
      this.employeeService.fetchEmployeeDetails(id, startDate, endDate).subscribe((result) => {
        //  console.log("result1 :", result)
        this.employeeList = result;
        this.employeeData=result.employee_details;
        // this.convertToEmployee()
        console.log("this.employeeData", this.employeeData);
        


        this.getEmergencydata = result.emergency_address_details;
        this.getPermanentAddr = result.home_address_details
        console.log(" this.getPermanentAddr", this.getPermanentAddr );
        
        // alert(this.getPermanentAddr.length);
        
        this.getPresentAddr = result.work_address_details
        // alert(this.getPresentAddr.length)
        console.log("this.employeeList:::::", this.employeeList)
        if (this.employeeList.employee_details[0].EMP_NO.startsWith("C")) {
          // alert(true)
          this.isCandidate = true
          this.updateform1();
          // this.showAddress = false;
        } else {
          this.isEmployee = true
          this.updateform1();
        }

       

        if (this.employeeList.employment_details.length == 0) {
          // alert("ini")

          this.employementInitializationForm();
          this.isHideEditEmployementButton=false;
          this.isShowEmployementButtons=true;

          // this.sampleData = true;

        } else {
          // alert("update")
          this.updateEmploymentDetailsForm();
          this.isHideEditEmployementButton=true;

        }
       
      })
    } catch (error) {
      console.error("Error fetching the Employeee data:", error)
    }

  }



  //...........................Employee/Candidate Form details........................................

  //...............init.............

  // empForm: any


  //-----------------------------------ForButtonHide------------------------------------------------------//
  isEmployeeContent() {
    // this.updateForm.enable()
    this.empButtons = !this.empButtons;

    if (this.empButtons) {
      this.updateForm.enable();
      

    }

    else {
      this.updateForm.disable();

    }



  }

  // convertToEmployee() {
  //   // alert(this.employeeData[0].WORKER_TYPE)
  //   if (this.employeeData[0].WORKER_TYPE==="Employee"){
  //     this.isConvertedToEmployee = true;
      


  //   }
  //   else{
  //     this.updateForm.get('employeeNumber')?.enable();

  //   }
  
  // }


  //--------------------------------------------------------------------------------------------------------//

 
  //................update Employee...................

  updateform1() {
   
    this.updateForm = this.formbuilder.group({

      employeeId: [this.employeeData[0].EMP_ID, Validators.required],
      employeeNumber: [{ value: this.employeeData[0].EMP_NO, disabled: this.isConvertedToEmployee }, Validators.required,],
      firstName: [this.employeeData[0].FIRST_NAME, Validators.required],
      middleName: [this.employeeData[0].MIDDLE_NAME],
      lastName: [this.employeeData[0].LAST_NAME, Validators.required],
      email: [this.employeeData[0].EMAIL_ADDRESS, Validators.required],
      dateOfBirth: [this.employeeData[0].DATE_OF_BIRTH, Validators.required],
      userId: [this.employeeData[0].USER_ID, Validators.required],
      workLocation: [this.employeeData[0].WORK_LOCATION, Validators.required],
      workerType: [this.employeeData[0].WORKER_TYPE, Validators.required],
      effectiveStartDate: [this.employeeData[0].EFFECTIVE_START_DATE, Validators.required],
      effectiveEndDate: [this.employeeData[0].EFFECTIVE_END_DATE]

    });

    this.updateForm.disable();
  }


  

  //.................update Employee Submit to backend....................................

  submitForm() {

    // console.log("this.updateForm", this.updateForm.status);
    this.loading = true;
    if (this.updateForm.status === "VALID") {

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
        EFFECTIVE_END_DATE: this.updateForm.value['4712-12-31']

      }
      // console.log(sendData);
      

      this.employeeService.updateID(this.employee.EMP_ID, sendData).subscribe(
        (response: any) => {
          // console.log("responseupdateEmp::",response);
          this.loading = false;



          this.msg = response.message;

          Swal.fire({
            position: 'top',
            icon: 'success',
            text: `${this.msg}`,
            showConfirmButton: false,
            timer: 2000,
            width: 400
          }).then(() => {
            // this.isToggle1 = !this.isToggle1;
            this.updateForm.disable();
          })
        },
        (error) => {
           console.log("error",error);

          this.loading = false;

          if (error.error.error && error.error.error) {
            Swal.fire(
              {
                position: 'top',
                icon: "error",
                title: "Oops...",
                text: `${error.error.error}`,
              }
            )
          }
        });

    }
    else {
      this.loading = false;
    }



  }


  //....................................for searcch previous records for Employee................

  

  submitDate() {
 //  alert(this.employeeESd)
  //  alert(this.effectiveEndDate)

    this.loading = true;
    this.employeeService.sendDate(this.employeeESd, this.employee.EMP_ID, this.effectiveEndDate).subscribe((res: any) => {

      this.loading = false;

      console.log("employeesearchbasedonemp&end", res);

      this.empDate = res['data']
      if (this.empDate.WORKER_TYPE==="Candidate"){
        this.addressButtonsHide=false;

      }
      else{
        this.addressButtonsHide=true;


      }
      console.log("this.empDate", this.empDate);
      this.updateForm = this.formbuilder.group({

        employeeId: [this.empDate.EMP_ID, Validators.required],
        employeeNumber: [this.empDate.EMP_NO, Validators.required],
        firstName: [this.empDate.FIRST_NAME, Validators.required],
        middleName: [this.empDate.MIDDLE_NAME],
        lastName: [this.empDate.LAST_NAME, Validators.required],
        email: [this.empDate.EMAIL_ADDRESS, Validators.required],
        dateOfBirth: [this.empDate.DATE_OF_BIRTH, Validators.required],
        // dateOfJoining: [this.employee.DATE_OF_JOINING, Validators.required],
        userId: [this.empDate.USER_ID, Validators.required],
        workLocation: [this.empDate.WORK_LOCATION, Validators.required],
        workerType: [this.empDate.WORKER_TYPE, Validators.required],
        effectiveStartDate: [this.empDate.EFFECTIVE_START_DATE, Validators.required],
        effectiveEndDate: [this.empDate.EFFECTIVE_END_DATE]

      });
      this.updateForm.disable();

    }, error => {

      this.loading = false;

      console.log("error", error);
      // alert('Data Not Found')
      // console.log("error:", error.error.message)
      if (error.error && error.error.message) {
        // alert("error" + error.error.message)
        Swal.fire(
          {
            position: 'top',
            icon: "error",
            title: "Oops...",
            text: `${error.error.message}`,
          }
        )
      }
      console.log(error);
      if (error.error && error.error.error) {
        // alert("error" + error.error.message)
        Swal.fire(
          {
            position: 'top',
            icon: "error",
            title: "Oops...",
            text: `${error.error.error}`,
          }
        )
      }

    });
  }


  //==================================================================================================================================


  //...............................Candidate / employeee Employeement details...................................

  //Employee Edit Buttons Enable

  employeementUpdate() {

    this.employmentbutton = !this.employmentbutton;

    if (this.employmentbutton) {
      this.employementForm.enable()
      

    }

    else {
      this.employementForm.disable()
      this.employmentbutton=false;
      this.isShowEmployementButtons=false;

    }
  }

    //........................................init............................................


  employementInitializationForm() {

    this.employementForm = this.formbuilder.group({

      employementId1: [this.employee.EMP_ID, Validators.required],
      Organization_Name: ['', Validators.required],
      Position: ['', Validators.required],
      Department: ['', Validators.required],
      Annual_Salary: ['', Validators.required],
      Previous_AnnualSalary: ['0'],
      dateOfJoining: ['', Validators.required],
      MobileNo: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/), Validators.maxLength(10), Validators.minLength(10)]],
      Status: ['', Validators.required],
      Confirmation_Date: [''],
      Probation_Period: ['', Validators.required],
      Notice_Period: ['', Validators.required],
      Effective_Start_Date: ['', Validators.required],
      Effective_End_Date: ['4712-12-31'],
      workerType: ['', Validators.required],
      PreviousExperiences: ['0'],
      CurrentCompanyExperience: ['']

    });

    // this.employementForm.disable();
    this.sampleData = true

  }


  //..........................................sending data to backend Employeement...............................

  employmentSubmit() {
    this.loading = true;
    if (this.employementForm.status === "VALID") {
      const formattedData = {
        EMP_ID: this.employementForm.value['employementId1'],
        ORGANIZATION_NAME: this.employementForm.value['Organization_Name'],
        POSITION: this.employementForm.value['Position'],
        DEPARTMENT: this.employementForm.value['Department'],
        ANNUAL_SALARY: this.employementForm.value['Annual_Salary'],
        PREVIOUS_ANNUAL_SALARY: this.employementForm.value['Previous_AnnualSalary'],
        DATE_OF_JOINING: this.employementForm.value['dateOfJoining'],
        MOBILE_NO: this.employementForm.value['MobileNo'],
        STATUS: this.employementForm.value['Status'],
        PROBATION_PERIOD: this.employementForm.value['Probation_Period'],
        NOTICE_PERIOD: this.employementForm.value['Notice_Period'],
        EFFECTIVE_START_DATE: this.employementForm.value['Effective_Start_Date'],
        EFFECTIVE_END_DATE: this.employementForm.value['Effective_End_Date'],
        PREVIOUS_EXPERIENCE: this.employementForm.value['PreviousExperiences'],
        CURRENT_COMP_EXPERIENCE: this.employementForm.value['CurrentCompanyExperience'],
        WORKER_TYPE: this.employementForm.value['workerType'],
      }

      console.log("empdetails", formattedData);

      this.employeeService.EmployeeDetails(formattedData).subscribe((res: any) => {
        this.isHideEditEmployementButton=true;
     
        this.loading = false;

        Swal.fire({
          position: "top",
          icon: "success",
          title: "Success",
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          // this.isToggle2 = !this.isToggle2;
         this.employementForm.disable();
        });

      }, error => {
        this.loading = false;
        if (error.error && error.error.error) {
          Swal.fire({
            position: "top",
            icon: "error",
            title: "Error",
            text: `${error.error.error}`,
            showConfirmButton: true,
          });
        }
      });
    } else {
      this.loading = false;
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
    console.log("PROBATION_PERIOD", this.employeeList.employment_details);
    this.employementForm = this.formbuilder.group({
      employementId1: [this.employeeList.employment_details[0].EMP_ID, Validators.required],
      Organization_Name: [this.employeeList.employment_details[0].ORGANIZATION_NAME, Validators.required],
      Position: [this.employeeList.employment_details[0].POSITION, Validators.required],
      Department: [this.employeeList.employment_details[0].DEPARTMENT, Validators.required],
      Annual_Salary: [this.employeeList.employment_details[0].ANNUAL_SALARY, Validators.required],
      Previous_AnnualSalary: [this.employeeList.employment_details[0].PREVIOUS_ANNUAL_SALARY],
      dateOfJoining: [this.employeeList.employment_details[0].DATE_OF_JOINING, Validators.required],
      MobileNo: [this.employeeList.employment_details[0].MOBILE_NO, [Validators.required, Validators.pattern(/^[0-9]{10}$/), Validators.maxLength(10), Validators.minLength(10)]],
      Status: [this.employeeList.employment_details[0].STATUS, Validators.required],
      Notice_Period: [this.employeeList.employment_details[0].NOTICE_PERIOD, Validators.required],
      Effective_Start_Date: [this.employeeList.employment_details[0].EFFECTIVE_START_DATE, Validators.required],
      Effective_End_Date: [this.employeeList.employment_details[0].EFFECTIVE_END_DATE],
      PreviousExperiences: [this.employeeList.employment_details[0].PREVIOUS_EXPERIENCE],
      CurrentCompanyExperience: [this.employeeList.employment_details[0].CURRENT_COMP_EXPERIENCE],
      workerType: [this.employeeList.employment_details[0].WORKER_TYPE, Validators.required],
      Probation_Period: [this.employeeList.employment_details[0].PROBATION_PERIOD, Validators.required],

    });

    this.employementForm.disable();

    this.sampleData = true;
  }

  //.....................................search for previous record for employement.............................................................

  empsubmitdate() {
 // alert(this.employeementEsd)
 //alert(this.empEndDate)

    this.loading = true;

    this.employeeService.sendemploymentDate(this.employeementEsd, this.employee.EMP_ID, this.empEndDate).subscribe((res: any) => {

      this.loading = false;
      console.log("res", res['data']);
      this.employmentdate = res['data']
      // console.log("this.employmentdate", this.employmentdate.EMP_ID);
      // console.log("this.employmentdate.EFFECTIVE_END_DATE", this.employmentdate.EFFECTIVE_END_DATE);

      this.employementForm = this.formbuilder.group({
        // Assignment_ID:[''],
        employementId1: [this.employmentdate.EMP_ID, Validators.required],
        Organization_Name: [this.employmentdate.ORGANIZATION_NAME, Validators.required],
        Position: [this.employmentdate.POSITION, Validators.required],
        Department: [this.employmentdate.DEPARTMENT, Validators.required],
        Annual_Salary: [this.employmentdate.ANNUAL_SALARY, Validators.required],
        Previous_AnnualSalary: [this.employmentdate.PREVIOUS_ANNUAL_SALARY,],
        dateOfJoining: [this.employmentdate.DATE_OF_JOINING, Validators.required],
        //Email: [ '', Validators.required],
        MobileNo: [this.employmentdate.MOBILE_NO, [Validators.required, Validators.pattern(/^[0-9]{10}$/), Validators.maxLength(10), Validators.minLength(10)]],
        Status: [this.employmentdate.STATUS, Validators.required],
        Confirmation_Date: [''],
        Probation_Period: [this.employmentdate.PROBATION_PERIOD, Validators.required],
        Notice_Period: [this.employmentdate.NOTICE_PERIOD, Validators.required],
        Effective_Start_Date: [this.employmentdate.EFFECTIVE_START_DATE, Validators.required],
        workerType: [this.employmentdate.WORKER_TYPE, Validators.required],
        PreviousExperiences: [this.employmentdate.PREVIOUS_EXPERIENCE,],
        CurrentCompanyExperience: [this.employmentdate.CURRENT_COMP_EXPERIENCE,],
        Effective_End_Date: [this.employmentdate.EFFECTIVE_END_DATE],

      });
    }, error => {
      console.log(error);

      this.loading = false;
      if (error.error && error.error.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.error.error}`,
          width: 400,
        });
      }
      else if (error.error && error.error.message) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.error.message}`,
          width: 400,
        });
      }

    });
  }





  //........................................Present Address ................................................


  //........................init............................


  //esd & end PresenAddress search



  Emppresent() {
  
    this.presentbutton = !this.presentbutton;

    if ( this.presentbutton){
      this.addressForm.enable()

    }
    else{
      this.addressForm.disable()
    }
  }

 

  //.....................sending Present Address data to backend................................

  submitAddress() {
    console.log("this.addressForm.status", this.addressForm.status);

    this.loading = true;

    if (this.addressForm.status === "VALID") {
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
        DATE_TO: this.addressForm.value['DateTo']
      }
      console.log("updateData", updateData);

      this.addressForm.value['AddressType'] ? (this.employeeService.addressData(updateData, this.employee.EMP_ID).subscribe((res: any) => {
        this.loading = false;

        Swal.fire({
          position: 'top',
          icon: 'success',
          title: "Successful",
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          this.addressForm.disable();
        });

      }, error => {
        this.loading = false;

        if (error.error && error.error.error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error.error.error}`,
            width: 400,
          });
        } else if (error.error && error.error.message) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error.error.message}`,
            width: 400,
          });
        }

      })) : (null);

    } else {
      this.markFormGroupTouchedPresent(this.addressForm);
      this.loading = false;
    }
  }

  markFormGroupTouchedPresent(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.markFormGroupTouchedPresent(control);
      }
    });
  }


  //....................................update .............................................................


  
  presentesdAddData() {
    // console.log("esd", this.esd);
    // console.log("presentEnd", this.presentEnd);
    let addType="PRESENT"
    this.employeeService.getPresentAddressData(this.employee.EMP_ID, addType, this.empPresentAddEsd, this.presentEnd).subscribe((res: any) => {
      console.log("res", res);
      this.presentGetData = res['data'];

      console.log("this.presentGetData", this.presentGetData.ADDRESS);

      this.addressForm = this.formbuilder.group({

        EmployeeId: [this.presentGetData.EMP_ID, Validators.required],
        AddressType: [this.presentGetData.PERSON_ADDRESS],
        Address: [this.presentGetData.ADDRESS, Validators.required],
        City: [this.presentGetData.CITY, Validators.required],
        State: [this.presentGetData.STATE, Validators.required],
        Country: [this.presentGetData.COUNTRY, Validators.required],
        Pincode: [this.presentGetData.PIN_CODE, Validators.required],
        DateForm: [this.presentGetData.DATE_FROM, Validators.required],
        Phone1: [this.presentGetData.PHONE_1, [Validators.required, Validators.pattern(/^[0-9]{10}$/), Validators.maxLength(10), Validators.minLength(10)]],
        DateTo: [this.presentGetData.DATE_TO],
        // selectOption: [''],

      });





    }, error => {
      console.log("err", error);

    })





  }




  //.................................... permanent addresss .....................................................


  //............................init.......................

  emppermant() {
   
    this.permanentbuttons = !this.permanentbuttons;
    if (this.permanentbuttons){
      this.addressForm1.enable()
    }
    else{
      this.addressForm1.disable()
    }

  }



 


  //.................................sending to back end ......................


  submitPermanenetAdd() {
    console.log("vvbb",this.addressForm1.status);
    
    this.loading = true;

    if (this.addressForm1.invalid) {
      // Mark all controls as touched to trigger validation messages
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
    }

    this.employeeService.addressData(PermanentAddress, this.employee.EMP_ID).subscribe(
      (res: any) => {

        this.loading = false;
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Success",
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1500,
          width: 400,
        }).then(() => {
          this.addressForm1.disable();
        });
      },
      error => {
        this.loading = false;
        if (error.error && error.error.error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error.error.error}`,
            width: 400,
          });
        } else if (error.error && error.error.message) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error.error.message}`,
            width: 400,
          });
        }
      }
    );
  }

  //...............................update.................................................


 

  empPermanentAddEndsubmitdate() {
    // alert(this.empPermentAddEsd)
    // alert(this.permanentAddEEd)
    let permanentAdd="PERMANENT"
    this.employeeService.getPermanentAddressData(this.employee.EMP_ID, permanentAdd, this.empPermentAddEsd, this.permanentAddEEd).subscribe((res: any) => {
      console.log("res", res.data);
      this.permanentGetData = res.data;
      console.log("this.permanentGetData", this.permanentGetData.ADDRESS);
      this.addressForm1 = this.formbuilder.group({

        EmployeeId: [this.employeeList.home_address_details[0].EMP_ID, Validators.required],
        PermanentAdressType: [this.permanentGetData.ADDRESS_TYPE, Validators.required],
        PermanentAddress: [this.permanentGetData.ADDRESS, Validators.required],
        PermanentCity: [this.permanentGetData.CITY, Validators.required],
        PermanentState: [this.permanentGetData.STATE, Validators.required],
        PermanentCountry: [this.permanentGetData.COUNTRY, Validators.required],
        PermanentPincode: [this.permanentGetData.PIN_CODE, Validators.required],
        PermanentDateForm: [this.permanentGetData.DATE_FROM, Validators.required],
        PermanentPhone1: [this.permanentGetData.PHONE_1, [Validators.required, Validators.pattern(/^[0-9]{10}$/), Validators.maxLength(10), Validators.minLength(10)]],
        PermanentDateTo: [this.permanentGetData.DATE_TO]

      })



    }, error => {
      console.log("err", error);

    })


  }



  


  





  //..............resent records search items .....................................


  DateChange(event: any) {

    // console.log("date", event.target.value);
    this.date = event.target.value;

    this.updateform1();
    // console.log("this.date", this.date);
    // console.log("this.employee.EMP_ID", this.employee.EMP_ID);
    // console.log("this.date", this.date);
  }

  

  

  addressTypeDate() {
    // alert(this.todaysDate);
    // alert( this.addressType);
    let enddate = '4712-12-31'
    // console.log("ghhg", this.employeeList.employment_details[0].EMP_ID);

      if (this.getPresentAddr.length === 0 && this.addressType === "PRESENT") {
        this.ishideEditPrsentAdd=false;
        this.ishidePrsentAdd=true;
        this.addressForm = this.formbuilder.group({
          // a: alert("check"),
          EmployeeId: [this.employee.EMP_ID, Validators.required],
          AddressType: ['PRESENT'],
          Address: ['', Validators.required],
          City: ['', Validators.required],
          State: ['', Validators.required],
          Country: ['', Validators.required],
          Pincode: ['', Validators.required],
          DateForm: ['', Validators.required],
          Phone1: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/), Validators.maxLength(10), Validators.minLength(10)]],
          DateTo: ['4712-12-31'],
          // selectOption: [''],
        });
        this.loading2 = true
        // if (this.loading2) {
          this.openModal('custom-modal-5')
        // }
      } else {
        // alert(this.todaysDate)
        this.employeeService.sendAddresstypeDate(this.employee.EMP_ID, this.addressType, this.todaysDate, enddate).subscribe((res: any) => {
          console.log("ressdgh", res);
          // alert(3)
          this.AddressData = res.data

          console.log("this.AddressData", this.AddressData.STATE);

          if (this.AddressData.ADDRESS_TYPE === "PRESENT") {
            //  alert("1pre")
            // alert(1)
            console.log("this.AddressData", this.AddressData.STATE);
            // alert("present")
            this.addressForm = this.formbuilder.group({
              // a: alert("check 1"),


              EmployeeId: [this.AddressData.EMP_ID, Validators.required],
              AddressType: [this.AddressData.ADDRESS_TYPE],
              Address: [this.AddressData.ADDRESS, Validators.required],
              City: [this.AddressData.CITY, Validators.required],
              State: [this.AddressData.STATE, Validators.required],
              Country: [this.AddressData.COUNTRY, Validators.required],
              Pincode: [this.AddressData.PIN_CODE, Validators.required],
              DateForm: [this.AddressData.DATE_FROM, Validators.required],
              Phone1: [this.AddressData.PHONE_1, [Validators.required, Validators.pattern(/^[0-9]{10}$/), Validators.maxLength(10), Validators.minLength(10)]],
              DateTo: [this.AddressData.DATE_TO],
              // selectOption: [''],

            });



            this.loading2 = true;
             this.addressForm.disable()
            // if (this.loading2) {
              this.openModal('custom-modal-5')

            // }
            // setTimeout(() => {
            //   this.openModal('custom-modal-5')
            // }, 1000);
          }


        }, error => {
          // if(error.message === 'data not found'){

          // }
          console.log("err", error);
          throw new Error("Server Error:", error.message)

        })
      }


      if (this.addressType === "PERMANENT" && this.getPermanentAddr.length===0) {
        this.ishideEditButton=false;
        this.isPresntEnableButtons=true;
      
      
        // alert('1par')
        this.addressForm1 = this.formbuilder.group({
          EmployeeId: [this.employee.EMP_ID, Validators.required],
          PermanentAdressType: ['PERMANENT'],
          PermanentAddress: ['', Validators.required],
          PermanentCity: ['', Validators.required],
          PermanentState: ['', Validators.required],
          PermanentCountry: ['', Validators.required],
          PermanentPincode: ['', Validators.required],
          PermanentDateForm: ['', Validators.required],
          PermanentDateTo: ['4712-12-31', ],
          PermanentPhone1: ['',Validators.required],
        });
        this.loading3 = true
        // if (this.loading3) {
          this.openModal('custom-modal-6')
        // }
      } else {
        // alert(222)
        
        this.employeeService.sendAddresstypeDate(this.employee.EMP_ID, this.addressType, this.todaysDate, enddate).subscribe((res: any) => {
          console.log("ressdgh", res);
          this.AddressData = res.data

          console.log("this.AddressData", this.AddressData.STATE);

          if (this.AddressData.ADDRESS_TYPE === "PERMANENT") {
          //  alert(1)
            // alert(1)
            console.log("this.AddressData", this.AddressData.STATE);
            this.addressForm1 = this.formbuilder.group({
              EmployeeId: [this.AddressData.EMP_ID, Validators.required],
              PermanentAdressType: [this.AddressData.ADDRESS_TYPE],
              PermanentAddress: [this.AddressData.ADDRESS, Validators.required],
              PermanentCity: [this.AddressData.CITY, Validators.required],
              PermanentState: [this.AddressData.STATE, Validators.required],
              PermanentCountry: [this.AddressData.COUNTRY, Validators.required],
              PermanentPincode: [this.AddressData.PIN_CODE, Validators.required],
              PermanentDateForm: [this.AddressData.DATE_FROM, Validators.required],
              PermanentDateTo: [this.AddressData.DATE_TO || '4712-12-31', Validators.required],
              PermanentPhone1: [this.AddressData.PHONE_1,],

            });

            this.loading3 = true
             this.addressForm1.disable();
            if (this.loading3) {
              this.openModal('custom-modal-6')

            }
           
          }


        }, error => {
         
          console.log("err", error);
          throw new Error("Server Error:", error.message)

        })
      }

    // } catch (error) {
    //   console.error("Error getting the address details :", error)
    // }
  }


 
  // Address type Based on Effectivestartdate

  selectedValue(e: any) {
    this.addressType = e.target.value;
    // alert(this.addressType)

    // alert(e.target.value)
    if (e.target.value === "PRESENT") {
      this.modalId1 = "custom-modal-5"
      // alert("this.modalId1" + this.modalId1)
    } else if (e.target.value === 'PERMANENT') {
      this.modalId1 = "custom-modal-6"
      // alert("this.modalId1" + this.modalId1)
    }
  }


  openModal(id: any) {
    // alert(id)
    console.log("id", id);

    // if (id === "custom-modal-3") {
    //   alert("ghjk")
    this.modalId = id
    this.modalServcie.open(id)
    // }else{
    //   this.modalId = id;
    //   this.modalServcie.open(id)
    // }



  }
  closeModal(id: any) {
    if (id === "custom-modal-4") {
      this.addressTypeDate()
    }
    this.modalServcie.close(id)
    this.ishidePrsentAdd=false;
    this.presentbutton=false;
    this.isPresntEnableButtons=false;
    this.permanentbuttons=false;

  }

  closeAndOpen(id4: any, id5: any) {
    // alert("id4" + id4)
    // alert("modalId" + this.modalId)
    // alert("id5" + id5)

    if (this.modalId == id4) {
      this.modalServcie.close(id4)
    }
    this.modalServcie.open(id5)
  }


  //..................................................emergency addresss ..................................


  //........................init....................................
 


//------------------------------emergency Form------------------------------------------------------------------

  emergencyData() {
    this.emergencybutton = true;
    this.emergencyContact.enable();

  }

  emergencyEdit(){
 
  
    this.isHideEmergencyButtons=!this.isHideEmergencyButtons;
    if (this.isHideEmergencyButtons){
      this.emergencyContact.enable()
    
    }
    else{
      this.emergencyContact.disable()
    }

  }

  emergency() {
    console.log("Emergency data:", this.getEmergencydata);

//console.log("emergencyData", this.getEmergencydata[0].FIRST_NAME);
    if (this.getEmergencydata.length === 1) {
      this.emergencyformButtons=false;
      this.updateEmergencyButton=true;
      // alert(1)
      this.emergencyContact = this.formbuilder.group({
        FirstName: [this.getEmergencydata[0].FIRST_NAME, Validators.required],
        MiddleName: [this.getEmergencydata[0].MIDDLE_NAME],
        LastName: [this.getEmergencydata[0].LAST_NAME, Validators.required],
        Gender: [this.getEmergencydata[0].GENDER, Validators.required],
        relation: [this.getEmergencydata[0].RELATION_TYPE, Validators.required],
        contactNo: [this.getEmergencydata[0].CONTACT_NO, Validators.required],
        Dateofbirth: [this.getEmergencydata[0].DATE_OF_BIRTH, Validators.required],
        Effectivestartdate: [this.getEmergencydata[0].EFFECTIVE_START_DATE, Validators.required],
        Effectiveenddate: [this.getEmergencydata[0].EFFECTIVE_END_DATE],
        addressType: ['EMERGENCY_CONTACT', Validators.required],
        empId: [this.getEmergencydata[0].EMP_ID]
      });

      this.emergencyContact.disable()



      this.loading4 = true;
      if (this.loading4) {
        this.openModal('custom-modal-7');
      }

    } else {
      this.emergencyformButtons=true;
      this.updateEmergencyButton=false;
      this.emergencyEditHideButton=false;
      // alert(2)
      this.emergencyContact = this.formbuilder.group({
        FirstName: ['', Validators.required],
        MiddleName: ['',],
        LastName: ['', Validators.required],
        Gender: ['', Validators.required],
        relation: ['', Validators.required],
        contactNo: ['', Validators.required],
        Dateofbirth: ['', Validators.required],
        Effectivestartdate: ['', Validators.required],
        Effectiveenddate: ['4712-12-31'],
        addressType: ['EMERGENCY_CONTACT', Validators.required],
        empId: [this.addressForm.value['EmployeeId']]
      });



      this.loading4 = true;
      if (this.loading4) {
        this.openModal('custom-modal-7');
      }

    }


    // Uncomment this if you need to disable the form after creation
    // this.emergencyContact.disable();
  }

  //............................sending to backend .........................................

  emergencyDetails() {
    this.loading = true;
    console.log(this.emergencyContact.status);

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
      ADDRESS_TYPE: this.emergencyContact.value['addressType']
    };
    console.log("Emergency data:", emergencyData)
    this.employeeService.sendEmergencyData(emergencyData).subscribe(
      (res: any) => {
        console.log("emergency", res);

        this.loading = false;
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Success",
          // text: `${res.message}`,
          showConfirmButton: false,
          timer: 1500,
          width: 400
        }).then(() => {
          // this.emergencyContact.disable();
        });
      },
      error => {
        console.log("error", error);

        this.loading = false;
        if (error.error && error.error.error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error.error.error}`,
            width: 400,
          });
        } else if (error.error && error.error.message) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error.error.message}`,
            width: 400,
          });
        }
      }
    );
  }


  updateEmergency() {
    // alert(this.emergencyDataGet.FIRST_NAME)
    console.log("this.emergency contact:", this.emergencyContact.value['FirstName'])

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
      ADDRESS_TYPE: this.emergencyContact.value['addressType']
    };

    console.log("emergencyData", emergencyData);


    this.employeeService.updateEmergencyData(this.employee.EMP_ID, emergencyData).subscribe((res) => {
      console.log("res", res);

      Swal.fire({
        position: 'top',
        icon: 'success',
        // text: `${this.msg}`,
        text:"update Successfully",
        showConfirmButton: false,
        timer: 2000,
        width: 400
      }).then(() => {
        // this.isToggle1 = !this.isToggle1;
        this.emergencyContact.disable();
      })

    }, error => {
      console.log("err", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.error.message}`,
        width: 400,
      });

    })




  }

 
// emergency record search  for previous dates


  emergencysubmitdate() {
    // alert(this.esd)
    // alert(this.emrgencyEnd)
   
    this.employeeService.getemergencyAddressData(this.employee.EMP_ID, this.empEmergencyAddEsd, this.emrgencyEnd).subscribe((res: any) => {
      console.log("res", res);
      this.getEmergencyBasedOnDate = res.data;
      console.log("this.getEmergencyBasedOnDate", this.getEmergencyBasedOnDate.FIRST_NAME);

      this.emergencyContact = this.formbuilder.group({
        FirstName: [this.getEmergencyBasedOnDate.FIRST_NAME, Validators.required],
        MiddleName: [this.getEmergencyBasedOnDate.MIDDLE_NAME],
        LastName: [this.getEmergencyBasedOnDate.LAST_NAME, Validators.required],
        Gender: [this.getEmergencyBasedOnDate.GENDER, Validators.required],
        relation: [this.getEmergencyBasedOnDate.RELATION_TYPE, Validators.required],
        contactNo: [this.getEmergencyBasedOnDate.CONTACT_NO, Validators.required],
        Dateofbirth: [this.getEmergencyBasedOnDate.DATE_OF_BIRTH, Validators.required],
        Effectivestartdate: [this.getEmergencyBasedOnDate.EFFECTIVE_START_DATE, Validators.required],
        Effectiveenddate: [this.getEmergencyBasedOnDate.EFFECTIVE_END_DATE],
        addressType: ['EMERGENCY_CONTACT', Validators.required],
        empId: [this.getEmergencydata[0].EMP_ID]
      });

      this.emergencyContact.disable()

     




    }, error => {
      console.log("err", error);

    })


  }

}

