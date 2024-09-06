import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { GetEmployeesService } from '../services/get-employees.service';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.css'],
})
export class ViewEmployeesComponent implements OnInit {

  employeeCount: number = 0;
  employees: Employee[] = [];
  filterInput: string = '';
  employeeExistsChange: boolean = false;
  msg: any;

  constructor(private employeeService: GetEmployeesService) { }
 
  ngOnInit() {
    // this.fetchEmployees();
  }
 
  fetchEmployees() {
    this.employeeService.fetchEmployees().subscribe(
      (data) => {
        this.employees = data.data;
        this.employeeCount = this.employees.length;
        this.employeeExistsChange = this.employeeCount > 0;
      },
      (error) => {
        // console.error('Error fetching employee details:', error);
      }
    );
  }
 
  applyFilter(event: { param1: string, param2: string }) {
    // console.log("Event values :", event.param1, event.param2)
    // alert("bvbnb")
    var searchValue = event.param1
    const startDateValue = event.param2
    // console.log("searchValue", searchValue)
    // console.log("startDateValue", startDateValue)
    // alert("searchValue:" + searchValue)
    if (searchValue) {
      this.employeeService.filterEmployees(searchValue, startDateValue).subscribe(
        (data: Employee[]) => {
          this.employees = data;
          // console.log("this.employees:", this.employees)
          this.employeeCount = this.employees.length;
          this.employeeExistsChange = true;
        },
        (error) => {
          //alert('no')
          // console.log("error", error);
          if (error.error && error.error.error) {
            // alert(error.error.error)
            this.msg = error.error.error;
          }
          this.employeeExistsChange = false;
          // console.error('Error filtering employees:', error);
          Swal.fire({
            position: "top",
            icon: "error",
            title: "Oops...",
            text: `${this.msg}`
          });
        });
    } else {
      this.employeeExistsChange = false;
    }
  }
 
 
  removeFilter() {
    this.filterInput = '';
    this.fetchEmployees();
  }
 
 
}