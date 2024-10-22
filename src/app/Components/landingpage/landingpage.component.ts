import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/employee';
import { GetEmployeesService } from 'src/app/Services/Employee Services/get-employees.service';
import { LoginService } from 'src/app/Services/Login Services/login.service';
 
@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css'],
})
export class LandingpageComponent implements OnInit {
 
  filterInput: string = '';
  esd: any;
  empNo: any;
  employeeExists: boolean = false;
  employees: Employee[] = [];
  displayedEmployees: any;
  totalEmployeesCount: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 8;
  loading: boolean = false;
  employeement: any;
  isHidemessage:boolean=true;
  serchresult:boolean=false;
  intialSearchRecords:string
  filterSearchmsg:String
  employee: any;

 
  constructor(
    private employeeService: GetEmployeesService,
    private router: Router,
    private service: LoginService
  ) {}
 
  ngOnInit() {

    const employeeData = localStorage.getItem('employee');
    if (employeeData) {
      this.employee = JSON.parse(employeeData);
    } else {
      // console.error('No employee data found in localStorage');
      alert('No employee data found in localStorage');
      this.employee = {};
    }

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    this.esd = `${yyyy}-${mm}-${dd}`;
    this.getNotifications();
  }
 
  filterEmployees() {
    // console.log("input value",this.filterInput);
    if (!this.filterInput.trim()) {
      this.getNotifications();
      return;
    }    
    this.loading = true;
    this.employeeService.filterEmployeesbyValue(this.filterInput.trim()).subscribe((data: Employee[]) => {
      // console.log("data",data.length);
      this.intialSearchRecords="";
      if (data.length === 0){
        this.filterSearchmsg=`${this.filterInput} related data not found`;
      }
        this.serchresult=true;
        this.isHidemessage=false
        this.loading = false;
        this.employees = data;
        // console.log("employees list1",this.employees);
        this.employeeExists = this.employees.length > 0;
        this.currentPage = 1;
        this.updateDisplayedEmployees();
      },(error) => {
        this.loading = false;
        this.employeeExists = false;
      });
  }
 
  getNotifications() {
    this.service.recentEmployees().subscribe((res) => {
      // console.log("recent emp:",res);
      this.filterSearchmsg="";
      this.employees = [];
      if (res.length===0){
        // console.log("no data found");
        this.intialSearchRecords = "There is no record of recently add Candidates/Employees";
      }
      // console.log("employees list2",this.employees);
      res.forEach((element: any) => {
        this.employees.push({ ...element});
        //  console.log("recent employees", this.employees);
      });
      this.totalEmployeesCount = this.employees.length;
      this.employeeExists = this.employees.length > 0;
      this.currentPage = 1; // Reset to the first page on data fetch
      this.updateDisplayedEmployees();
      this.isHidemessage = this.employeeExists;
      this.serchresult=false;
      // console.log("emp data",this.displayedEmployees);
    }, error => {
      // console.error(error);
    });
  }
 
  updateDisplayedEmployees() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedEmployees = this.employees.slice(startIndex, endIndex);
  }
 
  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.totalEmployeesCount) {
      this.currentPage++;
      this.updateDisplayedEmployees();
    }
  }
 
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedEmployees();
    }
  }
 
  addEmpLanding() {
    this.router.navigate(['/addNewEmployeePage']);
  }
 
  selectedEmpNo(emp: any) {
    this.empNo = emp;
    // console.log("Selected employee details -->", this.empNo);
    if (this.empNo && this.empNo.EMP_NO) {
      localStorage.setItem('employee', JSON.stringify(this.empNo));
      this.router.navigate(['./editdetails']).then(() => {
      });
    } else {
      alert("Employee data is not valid");
    }
  }
  
  // Handling form submission
  onSubmit() {
    this.filterEmployees();
  }
 
  // Handling keyup event
  filterInputData(event: any) {
    this.filterEmployees();
  }


  
}