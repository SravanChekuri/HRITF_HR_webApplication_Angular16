import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/_modal/modal.servcie';
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

  modalId: any;

  employeeSalaryData:any;

  wait:boolean=false;

  salaryEsd:any;
  salaryEnd:any;
  salarySubmitButton:boolean=false;
  salaryUpdateButton:boolean=false;

  viewHistoryEmployeementData:any;

  Employeesalary:any=new FormGroup({})

  constructor(private modalService:ModalService,private formbuilder:FormBuilder,private employeeService:AddEmployeeService) { }

  ngOnInit() {
    alert("data")
    console.log("data")
    this.salaryEsd=this.employeeStartDate;

    this.employeeSalaryData=this.employeListData.salary_details;
    console.log("this.employeeSalaryData", this.employeeSalaryData);

    if (this.employeeSalaryData.length===0 ){
      alert(1)
      this.salaryform()
      this.salarySubmitButton=true;

    }
    else{

      this.getsalarydata();
      this.salaryUpdateButton=true;

    }
     

  }

  


  openModal(id: any) {
    alert(`open ${id}`);
    if (id==='custom-modal-5'){
      this.closeModal('custom-modal-4')

      this.empSalaryviewhistory()

    }
  
    this.modalService.open(id);

  }

  closeModal(id: any) {
    // alert(`close ${id}`);
    if (id === 'custom-modal-5') {
      // this.openModal('custom-modal-4')
    }
    // if(id === 'custom-modal-5'){
    //   // this.openModal('custom-modal-2')
    // }

    this.modalService.close(id);
  }

  salaryform() {
    const defaultDate = new Date('4712-12-31'); // Create a Date object
    const formattedDate = defaultDate.toISOString().substring(0, 10);
    this.Employeesalary = this.formbuilder.group({
      changedSalaryDate: ['', Validators.required],
      dateToProposal: [formattedDate, Validators.required],
      comments: ['', Validators.required],
      // previousSalary:['',Validators.required],
      proposalReason: ['', Validators.required],
      // reviewDate:['',Validators.required],
      proposalSalary: ['', Validators.required]
    })

    this.wait=true
    // this.salaryEnable = true;
    // this.isHideSlaryEditButton = !this.isHideSlaryEditButton;
  }

  salarydata() {
    // console.log("this.employementData.data.ASSIGNMENT_ID",this.employementData.data.ASSIGNMENT_ID);


    // console.log("assignmentid", this.employeeList.employment_details[0].ASSIGNMENT_ID);
    //  console.log('dataa',this.Employeesalary.values);
    const data = {
       ASSIGNMENT_ID: this.employeListData.employment_details[0].ASSIGNMENT_ID,
      CHANGED_SALARY_DATE: this.Employeesalary.value['changedSalaryDate'],
      DATE_TO: this.Employeesalary.value['dateToProposal'],
      COMMENTS: this.Employeesalary.value['comments'],
      // PROPOSED_SALARY_N: this.Employeesalary.value['previousSalary'], // Ensure this is needed
      PROPOSAL_REASON: this.Employeesalary.value['proposalReason'],
      // REVIEW_DATE: this.Employeesalary.value['reviewDate'],
      PROPOSED_SALARY_N: this.Employeesalary.value['proposalSalary']
    }
    console.log("salaryData",data);
    this.employeeService.salaryemployeedetails(data).subscribe((res) => {
      // console.log("res",res);
      // this.isHideSlaryEditButton = true;
      // this.updateHideSalaryButton = true;
      // this.submitHideSalaryButton = false;
      // this.fetchEmpData(this.employee.EMP_NO, this.employeeESd, this.employee.EFFECTIVE_END_DATE);
      Swal.fire({
        position: 'top',
        icon: 'success',
        text: ' Salary details added Successfully',
        showConfirmButton: false,
        timer: 2000,
        width: 400,
      }).then(() => {
        this.Employeesalary.disable();
        // this.isHideSlaryEditButton = !this.isHideSlaryEditButton;
        // this.fetchEmpData(this.employee.EMP_NO, this.employeeESd, this.employee.EFFECTIVE_END_DATE);
      });
    }, error => {
      // console.log("err",error);
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Oops...',
        text: `${error.error.error}`,
        width: 400,
      });
    })
  }


  getsalarydata() {
    alert(2)

    // alert("hjgfkhblkn")

    // console.log(this.employeeSalaryData[0].PROPOSAL_REASON);
    this.Employeesalary = this.formbuilder.group({
      changedSalaryDate: [this.employeeSalaryData[0].CHANGED_SALARY_DATE],
      dateToProposal: [this.employeeSalaryData[0].DATE_TO],
      comments: [this.employeeSalaryData[0].COMMENTS],
      // PROPOSED_SALARY_N:[this.employeeList.salary_details[0].PROPOSED_SALARY_N],
      proposalReason: [this.employeeSalaryData[0].PROPOSAL_REASON],
      // reviewDate:[this.employeeList.salary_details[0].REVIEW_DATE],
      proposalSalary: [this.employeeSalaryData[0].PROPOSED_SALARY_N],
      previousSalary: [this.employeeSalaryData[0].PROPOSED_SALARY],
    });
    // this.Employeesalary.disable();
    this.wait=true;

  }


  salaryUpdate() {
    const updatedata = {
      ASSIGNMENT_ID: this.employeListData.employment_details[0].ASSIGNMENT_ID,
      CHANGED_SALARY_DATE: this.Employeesalary.value['changedSalaryDate'],
      DATE_TO: this.Employeesalary.value['dateToProposal'],
      COMMENTS: this.Employeesalary.value['comments'],
      // PROPOSED_SALARY_N:this.Employeesalary.value['previousSalary'],
      PROPOSAL_REASON: this.Employeesalary.value['proposalReason'],
      // REVIEW_DATE:this.Employeesalary.value['reviewDate'],
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
        // this.fetchEmpData(this.employee.EMP_NO, this.employeeESd, this.employee.EFFECTIVE_END_DATE);
      });
    }, error => {
      // console.log("err",error);
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Oops...',
        text: `${error.error.error}`,
        width: 400,
      });
    })
  }


  // salarySearchByDate

  salarySubmitDate() {
    // console.log("this.salaryDate",this.salaryDate);
    // console.log("Assignment id",this.employeeList.employment_details[0].ASSIGNMENT_ID,);
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

  empSalaryviewhistory() {
    // alert("dfghjkljhgfdxcfgh")
    // alert(this.employeeList.employment_details[0].ASSIGNMENT_ID)
 
    this.employeeService.SalaryViewHistoryData(this.employeListData.employment_details[0].ASSIGNMENT_ID).subscribe((res: any) => {
      console.log("res===.......>>", res);
      this.viewHistoryEmployeementData = res.data;
    }, error => {
      console.log("err", error);
 
    }
 
    )
  }


  EmpSalarySearchViewHistory(id: any, salarychangeddate: any) {
    console.log("id", id);
    let eed = "4712-12-31"
    this.employeeService.salarySubmitDate(id, salarychangeddate, eed).subscribe((res: any) => {
      console.log("res--", res);
      this.employeeSalaryData=res.data;



      
     if (this.employeeSalaryData){
      this.closeModal('custom-modal-5')
        this.openModal('custom-modal-4')
     }
 
      if (this.employeeSalaryData) {
        this.getsalarydata();
 
       
      }
 
 
 
    }, error => {
      console.log("error", error);
 
    })
 
 
  }
 

}
