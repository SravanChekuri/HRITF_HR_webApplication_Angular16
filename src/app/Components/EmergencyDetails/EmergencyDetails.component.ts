import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/_modal/modal.servcie';
import { AddressService } from 'src/app/Services/Address Services/address.service';
import { AddEmployeeService } from 'src/app/Services/Employee Services/addEmployee.service';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-EmergencyDetails',
  templateUrl: './EmergencyDetails.component.html',
  styleUrls: ['./EmergencyDetails.component.css']
})
export class EmergencyDetailsComponent implements OnInit {
 
  @Input() employeListData:any;
  @Input() employeeStartDate:any;
 
  emergencyContact: any = new FormGroup({});
  emergencyData:any;
  emergencyEsdDate:any;
  emergencyEndDate:any;
  modalId:any;
  wait:boolean;
  emergencySubmitButton:boolean=false;
  emergencyUpdateButton:boolean=false;
 
  constructor( private modalService: ModalService,private formbuilder:FormBuilder,private emergencyService:AddressService) { }
 
  ngOnInit() {
    // alert(1)
    console.log("employeeStartDate",this.employeeStartDate);
    this.emergencyEsdDate=this.employeeStartDate;
   
    // console.log("employeListData",this.employeListData.emergency_address_details);
    //   console.log("employeListData",this.employeListData.emergency_address_details[0].CONTACT_NO);
    //   this.emergencyData=this.employeListData.emergency_address_details;
    //   console.log("this.emergencyData", this.emergencyData);
    this.emergencyData=this.employeListData.emergency_address_details;
    console.log("this.emergencyData",this.emergencyData);
    
 
      if(this.employeListData.emergency_address_details.length===0){
        // alert(1)
        this.emergencyFormInitialization();
        // this.emergencySubmitButton=true;
 
 
      }
 
      else{
        // alert(2)
        this.getEmergencyData()
        // this.emergencyUpdateButton=true;

       
 
      }
     
 
   
 
 
  }
 
 
  esdChange(event:any){
    this.emergencyEsdDate=event.target.value;
  //  alert(1)
    // alert(event.target.value)
   
 
   
  }
 
  openModal(id: any) {
    // this.closeModal('custom-modal-10')
    // alert(`open ${id}`);
    // this.empViewHistory()
   
    this.modalService?.open(id);
 
    if (id === 'custom-modal-12') {
      // alert('sssssssss')
      this.closeModal('custom-modal-11')
      // this.closeModal('custom-modal-6')
    }
    // alert(`modelId : ${this.modalId}`);
    // this.viewHistoryPresentAddressData()
    this.modalId = id;
    this.modalService.open(id);
 
   
  }
 
  closeModal(id:any){
    this.modalService?.close(id);
 
    if (id==='custom-modal-12'){
      this.openModal('custom-modal-11')
    }
 
 
 
  }
 
  emergencyFormInitialization(){
    this.emergencyContact = this.formbuilder.group({
      FirstName: ['', Validators.required],
      MiddleName: [''],
      LastName: ['', Validators.required],
      Gender: [''],
      relation: ['', Validators.required],
      contactNo: ['', Validators.required],
      Dateofbirth: [''],
      Effectivestartdate: ['', Validators.required],
      Effectiveenddate: ['4712-12-31'],
      addressType: ['EMERGENCY_CONTACT', Validators.required],
      empId: [],
    });
    this.wait=true
  }
 
 
  getEmergencyData(){
    // alert(this.emergencyData[0].FIRST_NAME)
    this.emergencyContact = this.formbuilder.group({
      FirstName: [this.emergencyData[0].FIRST_NAME, Validators.required],
      MiddleName: [this.emergencyData[0].MIDDLE_NAME],
      LastName: [this.emergencyData[0].LAST_NAME, Validators.required],
      Gender: [this.emergencyData[0].GENDER],
      relation: [this.emergencyData[0].RELATION_TYPE, Validators.required],
      contactNo: [this.emergencyData[0].CONTACT_NO, [Validators.required, Validators.pattern(/^[0-9]{10}$/), Validators.maxLength(10), Validators.minLength(10),]],
      Dateofbirth: [this.emergencyData[0].DATE_OF_BIRTH],
      Effectivestartdate: [this.emergencyData[0].EFFECTIVE_START_DATE, Validators.required,],
      Effectiveenddate: [this.emergencyData[0].EFFECTIVE_END_DATE],
      addressType: ['EMERGENCY_CONTACT', Validators.required],
      empId: [this.emergencyData[0].EMP_ID],
    });
    this.wait=true
 
  }
 
  emergencyDetails() {
    // console.log("id",this.employeListData.employment_details[0].EMP_ID);
   
 
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
      EMP_ID: this.employeListData.employment_details[0].EMP_ID,
      EFFECTIVE_START_DATE: this.emergencyContact.value['Effectivestartdate'],
      EFFECTIVE_END_DATE: this.emergencyContact.value['Effectiveenddate'],
      ADDRESS_TYPE: this.emergencyContact.value['addressType'],
    };
    console.log("Emergency data:", emergencyData)
    this.emergencyService.sendEmergencyData(emergencyData).subscribe((res: any) => {
        console.log("emergency", res);
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Success',
        showConfirmButton: false,
        timer: 1500,
        width: 400,
      }).then(() => {
        // this.isHideEmergencyButtons = !this.isHideEmergencyButtons;
        // this.emergencyContact.disable();
      });
      // this.closeModal('custom-modal-5');
    },
      (error) => {
        // console.log("error", error);
        if (error.error && error.error.error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.error.error}`,
            width: 400,
          });
        } else if (error.error && error.error.message) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.error.message}`,
            width: 400,
          });
        }
      }
    );
  }
 
 
  updateEmergency() {
    // alert(this.emergencyDataGet.FIRST_NAME)
    // console.log("this.emergency contact:", this.emergencyContact.value)
    const updateEmergencyData = {
      FIRST_NAME: this.emergencyContact.value['FirstName'],
      MIDDLE_NAME: this.emergencyContact.value['MiddleName'],
      LAST_NAME: this.emergencyContact.value['LastName'],
      GENDER: this.emergencyContact.value['Gender'],
      RELATION_TYPE: this.emergencyContact.value['relation'],
      CONTACT_NO: this.emergencyContact.value['contactNo'],
      DATE_OF_BIRTH: this.emergencyContact.value['Dateofbirth'],
      EMP_ID:  this.employeListData.employment_details[0].EMP_ID,
      EFFECTIVE_START_DATE: this.emergencyContact.value['Effectivestartdate'],
      EFFECTIVE_END_DATE: this.emergencyContact.value['Effectiveenddate'],
      ADDRESS_TYPE: this.emergencyContact.value['addressType'],
    };
     console.log("emergencyData", updateEmergencyData);
    this.emergencyService.updateEmergencyData(this.employeListData.employee_details[0].EMP_ID, updateEmergencyData).subscribe((res) => {
       console.log("res", res);
      // let newEffectiveStartDate = res.EFFECTIVE_START_DATE
      Swal.fire({
        position: 'top',
        icon: 'success',
        text: ' Emergency details updated Successfully',
        showConfirmButton: false,
        timer: 2000,
        width: 400,
      }).then(() => {
        // this.isHideEmergencyButtons = !this.isHideEmergencyButtons;
        this.emergencyContact.disable();
        // this.fetchEmpData(res.data.EMP_NO, res.data.EFFECTIVE_START_DATE, res.data.EFFECTIVE_END_DATE);
      });
      // this.openModal('custom-modal-2');
    },
      (error) => {
        // console.log("error", error);
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'Oops...',
          text: `${error.error.message}`,
          width: 400,
        });
      });
  }
 
 
  emergencysubmitdate() {
    // alert(this.emergencyEsdDate)
   
    // console.log("search doj",this.searchDOJ);
    this.emergencyService.getemergencyAddressData(this.employeListData.employee_details[0].EMP_ID, this.emergencyEsdDate, this.emergencyEndDate).subscribe((res: any) => {
       console.log("res", res);
      this.emergencyData = res.data;
      console.log("this.emergencyData",this.emergencyData);
 
      const arrayOfEmergencyData=[]
      arrayOfEmergencyData.push(res.data);
 
      this.emergencyData=arrayOfEmergencyData;
      console.log("this.permanentData", this.emergencyData);
 
      if (this.emergencyData){
        this.getEmergencyData();
      }
     
     
      // console.log("this.getEmergencyBasedOnDate", this.getEmergencyBasedOnDate.FIRST_NAME);
   
   
  },(error)=>{
    console.log("err",error);
   
  })
}
 
emergencyViewHistory(){
//   this.addressServic.presentAddressview(this.employeListData.employee_details[0].EMP_ID).subscribe((res: any) => {
//     console.log("res.............", res);
//      this.permanentAddressDataView=res.data;
//      console.log("this.presentAddressDataView", this.permanentAddressDataView);
 
// })
}
 
 
}
 
 