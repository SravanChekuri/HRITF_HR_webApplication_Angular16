import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/AuthServices/auth.service';
import { LoginService } from 'src/app/Services/Login Services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mfaOTP',
  templateUrl: './mfaOTP.component.html',
  styleUrls: ['./mfaOTP.component.css']
})

export class MfaOTPComponent implements OnInit {

  mfaotppage:any=new FormGroup({});
  otpTypes: string[] = ['text', 'text', 'text', 'text', 'text', 'text'];
  data: any;
  loading: boolean = false;

  constructor(private service: LoginService, private route: Router,private formbuilder: FormBuilder,private authService:AuthService) { }

  ngOnInit() {
    const userData = localStorage.getItem("loginData");
    if (userData) {
      this.data = JSON.parse(userData);
    }
    this.FormInitialization();
  }

  FormInitialization() {
    this.mfaotppage = this.formbuilder.group({
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

    const otp =  this.mfaotppage.get('otp1').value +
                        this.mfaotppage.get('otp2').value +
                        this.mfaotppage.get('otp3').value +
                        this.mfaotppage.get('otp4').value +
                        this.mfaotppage.get('otp5').value +
                        this.mfaotppage.get('otp6').value;

    const mfaDataSend = {
      otp: otp,
      Id: this.data.user_id,
    };

    this.service.mfaAuth(mfaDataSend).subscribe(
      (res: any) => {
        this.loading = false;
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Successfully Verified",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.Login();
          // this.route.navigate(['/landing']);
        });
      },
      error => {
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

  Login(){
    this.authService.login(this.data);
  }



}
