import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/_modal/modal.servcie';
import { AddressService } from 'src/app/Services/Address Services/address.service';
import { AddressstatecitycountryService } from 'src/app/Services/Address Services/addressstatecitycountry.service';
import Swal from 'sweetalert2';

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
  selector: 'app-PresentAddress',
  templateUrl: './PresentAddress.component.html',
  styleUrls: ['./PresentAddress.component.css'],
})
export class PresentAddressComponent implements OnInit {
  @Input() employeListData: any;
  @Input() employeeStartDate: any;
 
  presentAddressData: any;
  presentAddressDataView:any;
 
  presentAddressForm: any = new FormGroup({});
  modalId: any;
  wait: boolean;
  presentEsdDate: any;
  presentEndDate: string = '4712-12-31';

  presentSubmitButton:boolean=false;
  presentUpdateButton:boolean=false;

  

  countries: any[] = [];
  selectedCountry: any;
  states: any[] = [];
  selectedstate: any;
  cities: any[] = [];
 
  constructor(
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private addreessService:AddressService ,
    private addressStateService:AddressstatecitycountryService
  ) {}
 
  ngOnInit() {
    //  alert(22222);
     this.getCountriesData();
     this.presentEsdDate=this.employeeStartDate
    console.log('employeListData', this.employeListData);
    console.log('employeListData', this.employeeStartDate);
    // console.log(this.employeListData.employee_details[0].EMP_ID);
    this.presentEsdDate=this.employeeStartDate
 
    console.log(this.employeListData.work_address_details);
    this.presentAddressData = this.employeListData.work_address_details;
    console.log('this.presentAddressData', this.presentAddressData);
    // console.log("this.presentAddressData",this.presentAddressData[0].ADDRESS);
    // alert('length:' + this.presentAddressData.length);
 
    if (this.presentAddressData.length === 0) {
      // alert(1);
      this.formInilization();
      this.presentSubmitButton=true;
    } else {
      // alert(2);
      this.presentAddressDataa();
      this.presentUpdateButton=true;
    }
  }
 
  formInilization() {
    this.presentAddressForm = this.formBuilder.group({
      DateForm: ['', Validators.required],
      DateTo: [''],
      Phone1: [''],
      Address: [''],
      country: [''],
      state: [''],
      city: [''],
      pincode: [''],
    });
 
    this.wait = true;
  }
 
  presentAddressDataa() {
    console.log(
      'this.presentAddressData[0].DATE_FROM:',
      this.presentAddressData[0].DATE_FROM
    );
    console.log(this.presentAddressData);
    
    this.presentAddressForm = this.formBuilder.group({
      DateForm: [this.presentAddressData[0].DATE_FROM],
      DateTo: [this.presentAddressData[0].DATE_TO],
      Phone1: [this.presentAddressData[0].PHONE_1],
      Address: [this.presentAddressData[0].ADDRESS],
      country: [this.presentAddressData[0].COUNTRY],
      state: [this.presentAddressData[0].STATE],
      city: [this.presentAddressData[0].CITY],
      pincode: [this.presentAddressData[0].PIN_CODE],
    });
    this.wait = true;
  }
 
  updatePresentAddress() {
    // alert('update');
    const Data = {
      EMP_ID: this.employeListData.employee_details[0].EMP_ID,
      ADDRESS_TYPE: 'PRESENT',
      ADDRESS: this.presentAddressForm.value['Address'],
      CITY: this.presentAddressForm.value['city'],
      STATE: this.presentAddressForm.value['state'],
      COUNTRY: this.presentAddressForm.value['country'],
      PIN_CODE: this.presentAddressForm.value['pincode'],
      DATE_FROM: this.presentAddressForm.value['DateForm'],
      PHONE_1: this.presentAddressForm.value['Phone1'],
      DATE_TO: this.presentAddressForm.value['DateTo'],
    };
    console.log('Data', Data);
    this.addreessService
      .updateButtonPresentAddressData(
        Data,
        this.employeListData.employee_details[0].EMP_ID
      )
      .subscribe(
        (res) => {
          console.log('res,', res);
 
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Successful',
            showConfirmButton: false,
            timer: 2000,
          });
        },
        (error) => {
          console.log('error', error);
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Oops...',
            text: `${error.error.error}`,
            width: 400,
          });
        }
      );
  }
 
  presentAddressFormData() {
    const data = {
      DATE_FROM: this.presentAddressForm.value['DateForm'],
      DATE_TO: this.presentAddressForm.value['DateTo'],
      PHONE: this.presentAddressForm.value['Phone1'],
      ADDRESS: this.presentAddressForm.value['Address'],
      COUNTRY: this.presentAddressForm.value['country'],
      STATE: this.presentAddressForm.value['state'],
      CITY: this.presentAddressForm.value['city'],
      PINCODE: this.presentAddressForm.value['pincode'],
      EMP_ID: this.employeListData.employee_details[0].EMP_ID,
      ADDRESS_TYPE: 'PRESENT'
    };
 
    console.log('data', data);
 
    this.addreessService.addressData(data).subscribe(
      (res: any) => {
        console.log('res', res);
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Successful',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 2000,
        });
      },
      (error) => {
        console.log('err', error);
        if (error.error && error.error.error) {
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Oops...',
            text: `${error.error.error}`,
            width: 400,
          });
        } else if (error.error && error.error.message) {
          // alert("fail init 2")
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Oops...',
            text: `${error.error.message}`,
            width: 400,
          });
        }
      }
    );
  }
 
  closeModal(id: any) {
    // alert(`close ${id}`);
    if (id==='custom-modal-8'){
      this.openModal('custom-modal-7')
    }
    this.modalService.close(id);
 
  }
 
  openModal(id: any) {
    // alert(`open ${id}`);
    if (id === 'custom-modal-8') {
      // alert('sssssssss')
      this.closeModal('custom-modal-7')
      this.closeModal('custom-modal-6')
    }
    // alert(`modelId : ${this.modalId}`);
    this.viewHistoryPresentAddressData()
    this.modalId = id;
    this.modalService.open(id);
  }
 
  presentAddressDate() {
    // alert(this.presentEsdDate);
    // alert(this.presentEndDate);
    let addressType = 'PRESENT';
    this.addreessService.getPresentAddressData(this.employeListData.employee_details[0].EMP_ID, addressType, this.presentEsdDate, this.presentEndDate).subscribe((res: any) => {
      console.log("res",res);
      const presentAddressarrayDataByDate=[];
      presentAddressarrayDataByDate.push(res.data);
      console.log("arrayData",presentAddressarrayDataByDate);
      this.presentAddressData=presentAddressarrayDataByDate;
      if (this.presentAddressData){
        this.presentAddressDataa()
      }
    },(error:any)=>{
      console.log("err",error);
    })
  }
 
  viewHistoryPresentAddressData(){
    this.addreessService.presentAddressview(this.employeListData.employee_details[0].EMP_ID).subscribe((res: any) => {
      console.log("res.............", res);
       this.presentAddressDataView=res.data;
       console.log("this.presentAddressDataView", this.presentAddressDataView);
 
    }, (error:any) => {
      console.log("err", error);
    })
  }
 
 
  empSearchPresentViewHistory(date:any){
    this.presentEsdDate=date;
    let type = "PRESENT"
    // alert("gdfb")
    let eed = "4712-12-31"
    // this.addressDateFrom = date;
    this.addreessService.getPresentAddressData(this.employeListData.employee_details[0].EMP_ID, type, date, eed).subscribe((res: any) => {
      console.log("res,,,,", res);
      const presentAddressarrayDataByDate=[];
      presentAddressarrayDataByDate.push(res.data);
      console.log("arrayData",presentAddressarrayDataByDate);
      this.presentAddressData=presentAddressarrayDataByDate;
      if (this.presentAddressData) {
        this.closeModal('custom-modal-8')
        this.openModal('custom-modal-7')
      }
      if (this.presentAddressData){
        this.presentAddressDataa()
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
 
 