import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2'
import { AuthService } from '../AuthServices/auth.service';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {

  loginForm: any = new FormGroup({});
  loginData:any;
  mfaData:any;
  qrCodeData:any;
  msg: any;
  submitted = false;
  loading:boolean=false;
  passwordFieldType: string = 'password';
  eyeIcon = faEye;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  tokenExpire:any;

  constructor(
              private formbuilder: FormBuilder, 
              private router: Router,
              @Inject(DOCUMENT) private document: Document, 
              private service: LoginService,
              private authservice:AuthService
            ) { }

  ngOnInit(): void {
    this.FormIntalization();
  }

  FormIntalization() {
    this.loginForm = this.formbuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.loading=true;
    if(this.loginForm.invalid){
      return
    }

    const loginData = {
      username_or_email: this.loginForm.value['userName'],
      password: this.loginForm.value['password']
    }
    this.service.sendLoginDetails(loginData).subscribe((res:any) => {
      this.loading=false;
      // console.log('res: ', res)
      this.loginData = res['data'];
      // console.log("this.loginData", this.loginData);
      this.qrCodeData=res['qrCode'];
      // console.log("this.qrCodeData", this.qrCodeData);
      localStorage.setItem('token',res.token);
      localStorage.setItem("qrdata",JSON.stringify(this.qrCodeData));
      localStorage.setItem("loginData",  JSON.stringify(this.loginData));
      // console.log(this.loginData.mfaenable);
      if (this.loginData.mfaenable===false){
        this.router.navigate(['barcode']);
      }
      else{
        this.authservice.login(this.loginData);
        const expiryTime = new Date().getTime() + 3600 * 1000;
        localStorage.setItem('expiryTime', expiryTime.toString());
        this.router.navigate(['mfaOtp']);
      }
    },(error) => {
      // console.log("error login",error);
      this.loading=false;
      if(error.error && error.error.error){
        this.msg=error.error.error;
      }
      else if(error.error && error.error.message){
        this.msg=error.error.message;
      }
      else{
        this.msg=error.statusText;
      }
        Swal.fire({
          position:'top',
          title: "Oops! 😞",
          text: `${this.msg}`,
          icon: "error",
          showCancelButton:false,
          width:400
        });
      });
  }


togglePasswordVisibility() {
  const passwordInput = this.document.getElementById('password') as HTMLInputElement;
  if (this.passwordFieldType === 'password') {
    this.passwordFieldType = 'text';
    this.eyeIcon = this.faEyeSlash;
  } else {
    this.passwordFieldType = 'password';
    this.eyeIcon = this.faEye;
  }
}



}