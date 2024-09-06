import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NPUSService } from 'src/app/services/NPUS.service';
import Swal from 'sweetalert2';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;
  @ViewChild('reEnterPasswordInput') reEnterPasswordInput!: ElementRef<HTMLInputElement>;
  forgotpassword: FormGroup;
  submitted: any;
  username: any;
  msg: any;
  showPasswordRules: boolean = false;
  loading: boolean = false;
  passwordFieldType: string = 'password';
  reEnterPasswordFieldType: string = 'password';
  eyeIcon = faEye;
  reEnterEyeIcon = faEye;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  userData:any;

  constructor(
    private formbuilder: FormBuilder, 
    private router: Router, 
    private service: NPUSService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
     this.userData = localStorage.getItem("loginData");
      if (this.userData) {
        this.userData = JSON.parse(this.userData);
        // console.log("dfghh",this.userData['username']);
        this.username=this.userData['username'];
        // console.log("username",this.username);
        // console.log("Username:", this.userData.username);
      } else {
        this.username = this.route.snapshot.params['username'];
        // console.log("username:",this.username);  
      }     
    this.FormIntialization();
  }


  FormIntialization() {
    this.forgotpassword = this.formbuilder.group({
      EnterNewPassword: ['', Validators.required],
      ReEnterPassword: ['', Validators.required]
    });
  }

  SAVENEWPASSWORD() {
    // console.log("username",this.username);
    const newPassword = this.forgotpassword.get('EnterNewPassword')?.value;
    const reEnterPassword = this.forgotpassword.get('ReEnterPassword')?.value;

    if (newPassword !== reEnterPassword) {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Password does not match',
        text: 'Please make sure that both password fields match.',
        showConfirmButton: true,
        width: 400,
      });
      return; 
    }

    this.loading = true;
    const data = {
      "username": this.username,
      "New_password": newPassword
    };
    // console.log("data",data);
    if (newPassword === reEnterPassword) {
      this.service.resetDetails(data).subscribe((res: any) => {
        this.loading = false;
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
          this.router.navigate(['/']);
        });
      }, error => {
        this.loading = false;
        if (error.error && error.error.error) {
          this.msg = error.error.error;
        } else if (error.error && error.error.message) {
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

togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
      this.eyeIcon = this.passwordFieldType === 'password' ? this.faEye : this.faEyeSlash;
    } else if (field === 'reenterpassword') {
      this.reEnterPasswordFieldType = this.reEnterPasswordFieldType === 'password' ? 'text' : 'password';
      this.reEnterEyeIcon = this.reEnterPasswordFieldType === 'password' ? this.faEye : this.faEyeSlash;
    }
  }


}
