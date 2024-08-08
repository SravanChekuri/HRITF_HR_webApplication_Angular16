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
 
  constructor(
    private employeeService: GetEmployeesService,
    private router: Router,
    private service: LoginService
  ) {}
 
  ngOnInit() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    this.esd = `${yyyy}-${mm}-${dd}`;
    this.getNotifications();
  }
 
  filterEmployees() {
    if (!this.filterInput.trim()) {
      this.getNotifications();
      return;
    }
 
    this.loading = true;
    this.employeeService.filterEmployeesbyValue(this.filterInput.trim()).subscribe(
      (data: Employee[]) => {
        this.loading = false;
        this.employees = data;
        this.employeeExists = this.employees.length > 0;
        this.currentPage = 1;
        this.updateDisplayedEmployees();
      },
      (error) => {
        this.loading = false;
        this.employeeExists = false;
      }
    );
  }
 
  getNotifications() {
    this.service.notifications().subscribe((res) => {
      this.employees = [];
      res.newEmployees.forEach((element: any) => {
        this.employees.push({ ...element.EMPLOYEE, ...element.EMPLOYMENT_DETAILS });
      });
      this.totalEmployeesCount = this.employees.length;
      this.employeeExists = this.employees.length > 0;
      this.currentPage = 1; // Reset to the first page on data fetch
      this.updateDisplayedEmployees();
    }, error => {
      console.error(error);
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
    localStorage.setItem('employee', JSON.stringify(this.empNo));
    this.router.navigate(['./edit']).then(() => {
      // window.location.reload();
    });
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