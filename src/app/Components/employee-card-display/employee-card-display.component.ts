import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../../employee';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-employee-card-display',
  templateUrl: './employee-card-display.component.html',
  styleUrls: ['./employee-card-display.component.css'],
})
export class EmployeeCardDisplayComponent implements OnInit {

  @Input() employees: any ;
  @Input() employeeCount: number = 0;
  empList :any[]=[];
  constructor(private router: Router) { }
 
  ngOnInit(): void {
    //alert(1)
    this.empList.push(this.employees.EMPLOYEE_DETAILS);
    // console.log("Emapdata by card:", this.empList)
  }
 
 
  handleEditClick(employee: Employee) {
    localStorage.setItem('employee',JSON.stringify(employee));
    this.router.navigate(['./edit']);
  }


  
}