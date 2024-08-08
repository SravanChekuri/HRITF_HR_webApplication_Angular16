import { Component, EventEmitter, Output } from '@angular/core';
import { GetEmployeesService } from '../../services/get-employees.service';
import { Employee } from '../../employee';

@Component({
  selector: 'app-employee-filter',
  templateUrl: './employee-filter.component.html',
  styleUrls: ['./employee-filter.component.css']
})
export class EmployeeFilterComponent {

  @Output() employeeExistsChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() filterApplied: EventEmitter<{param1: string, param2: string}> = new EventEmitter<{param1: string, param2: string}>();
  @Output() filterRemoved: EventEmitter<void> = new EventEmitter<void>();

  filterInput: string = '';
  employeeExists: boolean = false;
  empstartDate: any;
  error: any;

  constructor(private employeeService: GetEmployeesService) {}

  ngOnInit() {
    // localStorage.setItem("empstartDate",this.empstartDate)
    // console.log( localStorage.setItem("empstartDate",this.empstartDate));
    this.setTodayDate() 
    //  alert(this.empstartDate)
    console.log("esd",this.empstartDate);
  
 
    
    // if (this.empstartDate) {
    //   localStorage.setItem('empstartDate', this.empstartDate);
    //   console.log('Date stored in local storage:', this.empstartDate);
    // }
    // this.setTodayDate();
    this.fetchEmployees();
   
  }

  fetchEmployees() {
    this.employeeService.fetchEmployees().subscribe(
      (data: Employee[]) => {
        this.employeeExists = data.length > 0;
        this.employeeExistsChange.emit(this.employeeExists);
      },
      (error) => {
        this.employeeExistsChange.emit(this.employeeExists);
      }
    );
  }

  setTodayDate() {
    const today = new Date().toISOString().split('T')[0];
    this.empstartDate = today;
    
    localStorage.setItem('empstartDate', this.empstartDate);
  }

  esdDate(event:any){
     //alert(event.target.value)
   
    this.empstartDate=event.target.value;
    // alert( this.empstartDate)
    localStorage.setItem('empstartDate', this.empstartDate);
    

  }

  onSubmit() {
    if (!this.filterInput.trim()) {
      return;
    }
    
    const param1 = this.filterInput.trim();
    const param2 = this.empstartDate;
    this.filterApplied.emit({ param1, param2 });
  }

  removeFilter() {
    this.filterInput = '';
    this.filterRemoved.emit();
  }

  remove() {
    this.filterInput = '';
    this.empstartDate = '';
    const param1 = "";
    const param2 = "";
    this.filterApplied.emit({ param1, param2 });
  }

  // Date(event: any) {
  //   this.empstartDate = event.target.value;
  //   localStorage.setItem("effeStarDate", this.empstartDate);
  // }

onClick(){
  alert("working");
}
  
}
