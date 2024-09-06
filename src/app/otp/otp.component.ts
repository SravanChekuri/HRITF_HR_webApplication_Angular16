import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OTPService } from '../services/OTP.service';
import Swal from 'sweetalert2';
import { ForgotPasswordService } from '../services/ForgotPassword.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
})
export class OtpComponent implements OnInit {

  otppage:any=new FormGroup({});
  otpVal: any;
  username: any;
  loading2: boolean = false;
  msg: any;
  loading: boolean = false;
  otp1Type: string = 'password';
  otp2Type: string = 'password';
  otp3Type: string = 'password';
  otp4Type: string = 'password';

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private service: OTPService,
    private route: ActivatedRoute,
    private services: ForgotPasswordService
  ) { }

  ngOnInit(): void {    
    this.username = this.route.snapshot.params['username'];
    // console.log("username:", this.username)
    this.FormIntalization();
    
  }

  FormIntalization() {
    this.otppage = this.formbuilder.group({
      otp1: ['', Validators.required],
      otp2: ['', Validators.required],
      otp3: ['', Validators.required],
      otp4: ['', Validators.required],
    });
  }

  move(e: any, p: any, c: any, n: any) {
    var length = c.value.length;
    var maxlength = c.getAttribute('maxlength');
    if (length == maxlength) {
      if (n !== '') {
        n.focus();
      }
    }
    if (e.key === "Backspace") {
      if (p !== "") {
        p.focus();
      }
    }
    this.updateOtpTypes();
  }

  updateOtpTypes() {
    this.otp1Type = this.otppage.value['otp2'] ? 'password' : 'text';
    this.otp2Type = this.otppage.value['otp3'] ? 'password' : 'text';
    this.otp3Type = this.otppage.value['otp4'] ? 'password' : 'text';
    this.otp4Type = this.otppage.value['otp4'] ? 'text' : 'password';
  }

  onSubmit() {
    this.otpVal = this.otppage.value['otp1'] + this.otppage.value['otp2'] + this.otppage.value['otp3'] + this.otppage.value['otp4'];
    this.loading2 = true;
    const otppage = {
      username: this.username,
      otp: this.otpVal
    }
    // console.log("otppage",otppage);
    
    this.service.OtpDetails(otppage).subscribe((res) => {
      this.loading2 = false;
      if (res && res.message) {
        this.msg = res.message;
      }
      Swal.fire({
        position: "top",
        title: "Success",
        text: `${this.msg}`,
        icon: "success",
        showConfirmButton: false,
        width: 400,
        timer: 2000,
      }).then(() => {
        // console.log(this.username);
        
        this.router.navigate(['/reset', { username: this.username }]);
      });
    },error => {
        this.loading2 = false;
        if (error.error && error.error.error) {
          this.msg = error.error.error;
        }
        else if (error.error && error.error.message) {
          this.msg = error.error.message;
        }
        Swal.fire({
          position: 'top',
          icon: "error",
          title: "Oops...",
          text: `${this.msg}`,
          showConfirmButton: true,
          width: 400,
        });
      });
  }

  resendOTP() {
    const FgpwPage = { username: this.username }
    this.loading = true;
    this.services.ForgotDetails(FgpwPage).subscribe((res: any) => {
      this.loading = false;
      if (res && res.message) {
        this.msg = res.message;
      }
      Swal.fire({
        position: "top",
        title: "Success",
        text: `Resent ${this.msg}`,
        icon: "success",
        showConfirmButton: false,
        width: 400,
        timer: 2000,
      })
    },error => {
        this.loading = false;
        if (error.error && error.error.message) {
          this.msg = error.error.message;
        }
        Swal.fire({
          position: 'top',
          icon: "error",
          title: "Oops...",
          text: `${this.msg}`,
          showConfirmButton: true,
          width: 400,
        });
      });
  }


  
}
