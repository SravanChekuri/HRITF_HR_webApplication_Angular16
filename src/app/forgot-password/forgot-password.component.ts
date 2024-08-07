import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPasswordService } from '../services/ForgotPassword.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent implements OnInit {


  FgpwPage: any = new FormGroup({});
  loading: boolean = false;
  msg: any;

  constructor(
              private formBuilder: FormBuilder, 
              private router: Router,
              private service:ForgotPasswordService
            ) {}

  ngOnInit(): void {
    this.FormInitialization();
  }

  FormInitialization() {
    this.FgpwPage = this.formBuilder.group({
      username: ['', Validators.required]
    });
  }

  SENDOTP() {
    const FgpwPage={
      username:this.FgpwPage.value['username']
    }
    this.loading = true;
    this.service.ForgotDetails(FgpwPage).subscribe((res:any)=>{
            this.loading = false;
      // console.log("fpw",res);
    if (res && res.message) {
      // alert(res.message);
      this.msg = res.message;
    }
    Swal.fire({
      position:"top",
      title: "Sucess",
      text: `${this.msg}`,
      icon: "success",
      showConfirmButton:false,
      width:400,
      timer: 2000,
    }).then(()=>{
      // this.isEditable1 = !this.isEditable1;
      this.router.navigate(['/OTPPage',{username:FgpwPage.username}]);
    });
  },
   error=>{
    // console.log(error); 
    // alert("fail")
    this.loading = false;
    if (error.error && error.error.message) {
      // console.log(error);
      // this.updateFailMsg = true;
      this.msg = error.error.message;
  }
  Swal.fire({
    position:'top',
    icon: "error",
    title: "Oops...",
    text: `${this.msg}`,
    showConfirmButton: true,
    width:400,
  });      
});
}




  
}
