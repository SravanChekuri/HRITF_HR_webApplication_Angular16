import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/_modal/modal.servcie';
 
@Component({
  selector: 'app-AddressDetails',
  templateUrl: './AddressDetails.component.html',
  styleUrls: ['./AddressDetails.component.css'],
})
export class AddressDetailsComponent implements OnInit {
  @Input() loading:boolean = false;
  modalId: any;
  addressType: string | undefined = ''; // Initialize to an empty string
  addreesDate:any;
  @Input() employeListData: any;
  @Input() employeeStartDate: any;
  actiavte: boolean;
  employeeList:any;
  constructor(private modalService: ModalService) {}
 
  ngOnInit() {
    console.log('Employee List Data:', this.employeListData);
    this.employeeList=this.employeListData
    this.addreesDate=this.employeeStartDate
    // alert(this.addreesDate)
  }
 
  openModal(id: any) {
    // alert(`Selected Address Type: ${this.addressType}`);
 
    // if (this.addressType === 'PRESENT') {
    //   alert('Opening Present Address Modal');
    //   // this.openModal(id);
    //   this.modalService.open(id);
    // } else if (this.addressType === 'PERMANENT') {
    //   alert('Opening Permanent Address Modal');
    //   // this.openModal('custom-model-8');
    //   this.modalService.open(id);
    // } else {
    //   alert('Please select an address type.');
    //   return; // Prevent opening a modal if no type is selected
    // }
 
    this.modalService.open(id);
    this.actiavte = true;
  }
 
  closeModal(id: any) {
    // alert(`Opening modal: ${id}`);
    this.modalId = id;
    this.modalService.close(id);
    // this.modalService.open(id)
  }
}
 
 