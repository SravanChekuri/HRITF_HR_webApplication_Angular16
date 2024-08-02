import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.css']
})
export class BarcodeComponent implements OnInit {

  barcodeotppage:any=new FormGroup({});
  data: any;
  mfaData: any;
  imageUrl: any;
  Secret: any;
  loading: boolean = false;
  otpTypes: string[] = ['text', 'text', 'text', 'text', 'text', 'text'];

  constructor(private service: LoginService, private route: Router, private formbuilder: FormBuilder) { }

  ngOnInit() {
    const userData = localStorage.getItem("loginData");
    // console.log("user data",userData);
    if (userData) {
      this.data = JSON.parse(userData);
    }
    const userMfa = localStorage.getItem("qrdata");
    if (userMfa) {
      this.mfaData = JSON.parse(userMfa);
      this.imageUrl = this.mfaData.qrCodeUrl;
      this.Secret = this.mfaData.secret;
    }
    this.FormInitialization();
  }

  FormInitialization() {
    this.barcodeotppage = this.formbuilder.group({
      otp1: ['', Validators.required],
      otp2: ['', Validators.required],
      otp3: ['', Validators.required],
      otp4: ['', Validators.required],
      otp5: ['', Validators.required],
      otp6: ['', Validators.required],
    });
  }

  move(e: any, p: any, c: any, n: any, index: number) {
    var length = c.value.length;
    var maxlength = c.getAttribute('maxlength');

    if (e.key === "Enter") {
      this.mfc();
      return;
    }

    if (length == maxlength) {
      if (n !== '') {
        n.focus();
      }
      this.updateOtpType(index + 1);
    } else if (e.key === "Backspace") {
      if (p !== '') {
        p.focus();
      }
      this.resetOtpType(index);
    }
  }
  
  updateOtpType(index: number) {
    if (index < this.otpTypes.length) {
      this.otpTypes[index - 1] = 'password';
    }
  }

  resetOtpType(index: number) {
    for (let i = index - 1; i < this.otpTypes.length; i++) {
      this.otpTypes[i] = 'text';
    }
  }

  mfc() {
    this.loading = true;

    const otpCombined = this.barcodeotppage.get('otp1').value +
                        this.barcodeotppage.get('otp2').value +
                        this.barcodeotppage.get('otp3').value +
                        this.barcodeotppage.get('otp4').value +
                        this.barcodeotppage.get('otp5').value +
                        this.barcodeotppage.get('otp6').value;

    const mfaDataSend = {
      Id: this.data.user_id,
      otp: otpCombined,
    };
    // console.log("mfaDataSend",mfaDataSend);
    this.service.mfaAuth(mfaDataSend).subscribe((res: any) => {
      this.loading = false;
      this.mfaData = res['data'];
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Successfully Verified",
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.route.navigate(['/reset', { email: this.data.email }]);
      });
    }, error => {
      this.loading = false;
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Oops...",
        text: `${error.error.message}`,
        showConfirmButton: true
      });
    });
  }




}
