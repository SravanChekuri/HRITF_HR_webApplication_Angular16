import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent {
  showCalendar = false;
  selectedDate: string | null = null;
  
  @Output() dateSelected = new EventEmitter<string>();

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }

  onDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedDate = input.value;
    this.dateSelected.emit(this.selectedDate);
    this.showCalendar = false; 
  }

  // resetCalendarVisibility() {
  //   this.showCalendar = !this.showCalendar;
  //   alert("state"+this.showCalendar)
  // }

}
