import { Component, OnInit } from '@angular/core';
import { GetEmployeesService } from '../services/get-employees.service';
import { Employee } from '../employee';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
 
 
@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css'],
})
export class LandingpageComponent implements OnInit {
 
  filterInput: string = '';
  esd:any;
  empNo:any
  employeeExists: boolean = false;
  employees: Employee[] = [];
  displayedEmployees: any;
  totalEmployeesCount: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 8;
  loading:boolean=false;
  employeement: any;
 
  constructor(
              private employeeService: GetEmployeesService,
              private router: Router,
              private service:LoginService
            ) {}
 
  ngOnInit() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    this.esd = `${yyyy}-${mm}-${dd}`;
    this.getNotifications();
  }
 
  changeEsd(event:any){
    this.esd=event.target.value;
    // alert(this.esd)
  }
 
filterInputData(event:any){
// console.log('event',event.target.value);
if(event.target.value){
  this.employeeService.filterEmployeesbyValue(event.target.value).subscribe(
    (data: Employee[]) => {
      this.loading=false;
      this.employees=[];
      this.employees = data;
      // console.log(data);
      // this.totalEmployeesCount = this.employees.length;
      this.employeeExists = this.employees.length > 0;
      this.currentPage = 1;
      this.updateDisplayedEmployees();
    },
    (error) => {
      this.loading=false;
      //  console.error('Error fetching employee details:', error);
      this.employeeExists = false;
    });
}
else if (event.target.value===''){
  this.getNotifications();
}
else{
  this.getNotifications();
}
}
  
getNotifications(){
  this.service.notifications().subscribe((res)=>{
    // console.log("response",res);
    this.employees=[];
    this.employeement=[];
    res.newEmployees.forEach((element: any) => {
      // this.employees.push(element.EMPLOYEE);
      // this.employees.push(element.EMPLOYMENT_DETAILS);
      this.employees.push({ ...element.EMPLOYEE, ...element.EMPLOYMENT_DETAILS });
    });
    // console.log("employees",this.employees);
    // console.log("employeement",this.employeement[0].DATE_OF_JOINING);
    // console.log("sdfghj", this.employeement);
    // this.employees = res.newEmployees || [];
    this.totalEmployeesCount = this.employees.length;
    this.employeeExists = this.employees.length > 0;
    this.currentPage = 1; // Reset to the first page on data fetch
    this.updateDisplayedEmployees();
  },error =>{
    // console.log(error); 
  });
  }
 
  fetchEmployees() {
    this.loading=true;
    this.employeeService.fetchEmployees().subscribe((data) => {
        this.loading=false;
        // console.log("data",data);
        this.employees = data;
        this.totalEmployeesCount = this.employees.length;
        this.employeeExists = this.employees.length > 0;
        this.currentPage = 1; // Reset to the first page on data fetch
        this.updateDisplayedEmployees();
      },
      (error) => {
        this.loading=false;
        // console.error('Error fetching employee details:', error);
        this.employeeExists = false;
      }
    );
  }
 
  removeFilter() {
    this.filterInput = '';
    this.fetchEmployees();
  }
 
  addEmpLanding() {
    this.router.navigate(['/addNewEmployeePage']);
  }
 
  selectedEmpNo(emp:any){
  this.empNo=emp;
  localStorage.setItem('employee',JSON.stringify(this.empNo));
  // this.router.navigate(['./edit']);
  this.router.navigate(['./edit'])
  .then(() => {
    window.location.reload();
  });
  }
 
  onSubmit() {
    if (!this.filterInput.trim()) {
      return;
    }
      this.loading=true;
      this.employeeService.filterEmployeesbyValue(this.filterInput.trim()).subscribe(
      (data: Employee[]) => {
        this.loading=false;
        this.employees = data;
        // this.totalEmployeesCount = this.employees.length;
        this.employeeExists = this.employees.length > 0;
        this.currentPage = 1;
        this.updateDisplayedEmployees();
      },
      (error) => {
        this.loading=false;
        // console.error('Error fetching employee details:', error);
        this.employeeExists = false;
      });
  }
 
 
  updateDisplayedEmployees() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedEmployees = this.employees.slice(startIndex, endIndex);
  }
 
  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.totalEmployeesCount) {
      this.currentPage=this.currentPage+1;
        // console.log('this.currentPag',this.currentPage);
      this.updateDisplayedEmployees();
    }
  }
 
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedEmployees();
    }
  }
 
 



}
 
 