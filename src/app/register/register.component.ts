import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SignInService } from '../services/SignIn.service';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
 
export class RegisterComponent implements OnInit {
 
  RegisterForm: any = new FormGroup({});
  msg:any;
  submitted:boolean=false;
  loading:boolean=false;

  constructor(
              private FormBuilder1: FormBuilder,
              private router: Router,
              private services:SignInService
            ) {}
 
  ngOnInit(): void {
    this.FormIntialization();
  }
 
  FormIntialization() {
    this.RegisterForm = this.FormBuilder1.group({
      USERID: ['', Validators.required],
      USERNAME: ['', Validators.required],
      FIRSTNAME: ['', Validators.required],
      MIDDLENAME: [''],
      LASTNAME: ['', Validators.required],
      EMAIL: ['', [Validators.required,Validators.email]],
      MOBILENUMBER:  ['', [Validators. required, Validators.pattern(/^\d{10}$/)]],
      USERTYPE: ['', Validators.required]
    });
  }
 
  onSubmit() {
    this.submitted = true;
    // Mark all controls as touched to show validation messages
    Object.keys(this.RegisterForm.controls).forEach(key => {
        const control = this.RegisterForm.get(key);
        control?.markAsTouched();
        control?.updateValueAndValidity();
    });
 
    if (this.RegisterForm.valid) {
        // console.log("reg", this.RegisterForm);
        const signIndata = {
            USER_ID: this.RegisterForm.value['USERID'],
            USER_NAME: this.RegisterForm.value['USERNAME'],
            FIRST_NAME: this.RegisterForm.value['FIRSTNAME'],
            MIDDLE_NAME: this.RegisterForm.value['MIDDLENAME'],
            LAST_NAME: this.RegisterForm.value['LASTNAME'],
            EMAIL: this.RegisterForm.value['EMAIL'],
            MOBILE_NO: this.RegisterForm.value['MOBILENUMBER'],
            USER_TYPE: this.RegisterForm.value['USERTYPE']
        };
        this.loading = true;
        this.services.Signdetails(signIndata).subscribe(res => {
                this.submitted = true;
                this.loading = false;
                Swal.fire({
                    position: 'top',
                    title: "Success!",
                    text: "Registration Successful 👍",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    this.router.navigate(['/landing']);
                });
            },error => {
                this.loading = false;
                if (error.error && error.error.error) {
                    this.msg = error.error.error;
                }
                Swal.fire({
                    position: 'top',
                    title: "ERROR",
                    text: `${this.msg}`,
                    icon: "error",
                    width: 400,
                    showConfirmButton: true
                });
            });
     }
  }
 
}
 
 
 
 
 
 