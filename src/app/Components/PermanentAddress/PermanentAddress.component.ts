import { Component, Input, OnInit } from '@angular/core';
import { ModalComponent } from 'src/app/_modal/modal.component';
import { ModalService } from 'src/app/_modal/modal.servcie';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AddressService } from 'src/app/Services/Address Services/address.service';
import { AddressstatecitycountryService } from 'src/app/Services/addressstatecitycountry.service';

interface Country {
  iso2: any;
  name: any;
}
interface States {
  iso2: any;
  name: any;
}
interface cities {
  name: any;
}
 
 
@Component({
  selector: 'app-PermanentAddress',
  templateUrl: './PermanentAddress.component.html',
  styleUrls: ['./PermanentAddress.component.css']
})
export class PermanentAddressComponent implements OnInit {
 
  @Input() employeListData:any
 
  @Input() employeeStartDate:any
 
  modalId:any;
 
  permanentAddressForm:any=new FormGroup({ })
  permanentData:any;
  wait:boolean;
  permanentEsdDate:any;
  permanentEedDate:string = '4712-12-31';
  permanentAddressDataView:any;

  permanentSubmitButton:boolean=false;
  permanentUpdateButton:boolean=false;


  countries: any[] = [];
  selectedCountry: any;
  states: any[] = [];
  selectedstate: any;
  cities: any[] = [];
 
 
  constructor(private modalService:ModalService,private addressService:AddressService,private formbuilder:FormBuilder,private addressStateService:AddressstatecitycountryService) { }
 
  ngOnInit() {

    this.getCountriesData();
 
    console.log("employeListData",this.employeListData);
    this.permanentEsdDate=this.employeeStartDate
 
    console.log("employeeStartDate",this.employeeStartDate);
    this.permanentData=this.employeListData.home_address_details;
 
    console.log(" this.permanentData", this.permanentData);
 
    if (this.permanentData.length === 0) {
      // alert(1);
      this.permanentFormIntilization();
      this.permanentSubmitButton=true;
    } else {
      // alert(2);
      this.permanentGetData();
      this.permanentUpdateButton=true;
    }
   
 
   
   
  }
 
 
  permanentFormIntilization(){
    this.permanentAddressForm = this.formbuilder.group({
      EmployeeId: [this.employeListData.employee_details[0].EMP_ID],
      PermanentAdressType: ['PERMANENT'],
      PermanentAddress: [''],
      PermanentCity: [''],
      PermanentState: [''],
      PermanentCountry: [''],
      PermanentPincode: [''],
      PermanentDateForm: ['', Validators.required],
      PermanentDateTo: ['4712-12-31'],
      PermanentPhone1: ['', [Validators.pattern(/^[0-9]{10}$/), Validators.maxLength(10), Validators.minLength(10)]],
    });
    this.wait = true;
 
 
  }
 
  permanentGetData(){
    this.permanentAddressForm = this.formbuilder.group({
      EmployeeId: [this.permanentData[0].EMP_ID],
      PermanentAdressType: [this.permanentData[0].ADDRESS_TYPE],
      PermanentAddress: [this.permanentData[0].ADDRESS],
      PermanentCity: [this.permanentData[0].CITY],
      PermanentState: [this.permanentData[0].STATE],
      PermanentCountry: [this.permanentData[0].COUNTRY],
      PermanentPincode: [this.permanentData[0].PIN_CODE],
      PermanentDateForm: [this.permanentData[0].DATE_FROM, Validators.required,],
      PermanentDateTo: [this.permanentData[0].DATE_TO || '4712-12-31'],
      PermanentPhone1: [this.permanentData[0].PHONE_1, [Validators.pattern(/^[0-9]{10}$/), Validators.maxLength(10), Validators.minLength(10)]],
    });
    this.wait = true;
 
 
  }
 
 
 
  permanentFormDataSubmit(){
 
    const PermanentAddressData = {
      EMP_ID: this.permanentAddressForm.value['EmployeeId'],
      ADDRESS_TYPE: this.permanentAddressForm.value['PermanentAdressType'],
      ADDRESS: this.permanentAddressForm.value['PermanentAddress'],
      CITY: this.permanentAddressForm.value['PermanentCity'],
      STATE: this.permanentAddressForm.value['PermanentState'],
      COUNTRY: this.permanentAddressForm.value['PermanentCountry'],
      PIN_CODE: this.permanentAddressForm.value['PermanentPincode'],
      DATE_FROM: this.permanentAddressForm.value['PermanentDateForm'],
      DATE_TO: this.permanentAddressForm.value['PermanentDateTo'],
      PHONE_1: this.permanentAddressForm.value['PermanentPhone1'],
    };
 
    console.log("PermanentAddress",PermanentAddressData);
    this.addressService.addressData(PermanentAddressData).subscribe((res: any) => {
      console.log("res",res);

     
 
    },error=>{
      console.log("err",error);
     
    })
  }
 
  presentAddressUpdateData(){
    const updateData = {
      EMP_ID: this.permanentAddressForm.value['EmployeeId'],
      ADDRESS_TYPE: this.permanentAddressForm.value['PermanentAdressType'],
      ADDRESS: this.permanentAddressForm.value['PermanentAddress'],
      CITY: this.permanentAddressForm.value['PermanentCity'],
      STATE: this.permanentAddressForm.value['PermanentState'],
      COUNTRY: this.permanentAddressForm.value['PermanentCountry'],
      PIN_CODE: this.permanentAddressForm.value['PermanentPincode'],
      DATE_FROM: this.permanentAddressForm.value['PermanentDateForm'],
      DATE_TO: this.permanentAddressForm.value['PermanentDateTo'],
      PHONE_1: this.permanentAddressForm.value['PermanentPhone1'],
    };
 
    console.log("updateData",updateData);
 
    this.addressService.updateButtonPresentAddressData(updateData, this.employeListData.employee_details[0].EMP_ID).subscribe((res) => {
      console.log("res",res);
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Successful',
        showConfirmButton: false,
        timer: 2000,
      })
     
   
  },error=>{
    console.log("err",error);
    Swal.fire({
      position: 'top',
      icon: 'error',
      title: 'Oops...',
      text: `${error.error.error}`,
      width: 400,
    });
   
  })
}
 
PermanentAddressSearchByData(){
  let permanentAdd = 'PERMANENT';
  this.addressService.getPermanentAddressData(this.employeListData.employee_details[0].EMP_ID, permanentAdd, this.permanentEsdDate, this.permanentEedDate).subscribe((res: any) => {
    console.log("res",res);
    const arrayOfPermenantData=[]
    arrayOfPermenantData.push(res.data);
 
    this.permanentData=arrayOfPermenantData;
    console.log("this.permanentData", this.permanentData);
 
    if (this.permanentData){
      this.permanentGetData()
    }
   
 
 
   
 
},(error)=>{
  console.log("err",error);
 
})
}
 
 
openModal(id: any) {
  alert(`open ${id}`);
  if (id === 'custom-modal-10') {
    alert('sssssssss')
    this.closeModal('custom-modal-9')
    this.closeModal('custom-modal-6')
  }
  alert(`modelId : ${this.modalId}`);
  this.permanentViewHistoryData()
  this.modalId = id;
  this.modalService.open(id);
}
 
closeModal(id: any) {
  // alert(`close ${id}`);
  if (id==='custom-modal-8'){
    this.openModal('custom-modal-7')
  }
  this.modalService.close(id);
 
}
 
 
permanentViewHistoryData(){
  this.addressService.presentAddressview(this.employeListData.employee_details[0].EMP_ID).subscribe((res: any) => {
    console.log("res.............", res);
     this.permanentAddressDataView=res.data;
     console.log("this.presentAddressDataView", this.permanentAddressDataView);
 
})
}
 
 
empSearchPermanentViewHistory(date:any){
  this.permanentEsdDate=date;
 
  let type = "PRESENT"
  alert("gdfb")
  let eed = "4712-12-31"
  // this.addressDateFrom = date;
  this.addressService.getPresentAddressData(this.employeListData.employee_details[0].EMP_ID, type, date, eed).subscribe((res: any) => {
    console.log("res,,,,", res);
    const permanentAddressarrayDataByDate=[];
    permanentAddressarrayDataByDate.push(res.data);
    console.log("arrayData",permanentAddressarrayDataByDate);
    this.permanentData=permanentAddressarrayDataByDate;
    if (this.permanentData) {
      this.closeModal('custom-modal-10')
      this.openModal('custom-modal-9')
    }
    if (this.permanentData){
      this.permanentGetData()
    }
    // console.log("this.presentGetData", this.presentGetData);
   
 
 
})
 
}


getCountriesData() {
  this.addressStateService.getCountires().subscribe((data) => {
    console.log("Country Data:", data)
    this.countries = data.map((country: Country) => ({
      value: country.iso2,
      lable: country.name,
    }));
    console.log("this.countries:", this.countries)
  });
}

onCountryChange(event: any) {
  // console.log("target value:", event.target.value)
  this.selectedCountry = this.countries.find((country) => event.target.value === country.lable);
  // console.log("thsi.selectedCountry:", this.selectedCountry.value)
  this.addressStateService.getAllstates(this.selectedCountry.value).subscribe((statesData) => {
    console.log("States Data:", statesData)
    this.states = statesData.map((States: States) => ({
      value: States.iso2,
      lable: States.name,
    }));
    console.log("this.states:", this.states);
  });
}


onStateChange(event: any) {
  // console.log("targetvalue", event.target.value);
  this.selectedstate = this.states.find((state) => event.target.value === state.lable);
  // console.log('this.selectedstates:', this.selectedstate.value)
  this.addressStateService.getAllcities(this.selectedCountry.value, this.selectedstate.value).subscribe((citiesData) => {
    // console.log("cities Data:", citiesData)
    this.cities = citiesData.map((cities: cities) => ({
      label: cities.name,
    }));
    // console.log("cities:", this.cities);
  });
}
 
 
}
 
 