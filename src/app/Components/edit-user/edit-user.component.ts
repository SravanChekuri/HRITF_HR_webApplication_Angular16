import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignInService } from 'src/app/Services/Add User Services/SignIn.service';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{
 
adminData:any;
updateForm:any= new FormGroup({});
loading:boolean=false;
msg: any;
submitted: boolean = false;

constructor(
            private formbuilder: FormBuilder, 
            private service:SignInService
          ){}
 
ngOnInit(): void {
  const admindata = localStorage.getItem("edituser")
  if (admindata){
    this.adminData=JSON.parse(admindata);
    this.updateUser();
  }
}
 
updateUser(){
  this.updateForm = this.formbuilder.group({
    USERID: [this.adminData.USER_ID, Validators.required],
    USERNAME: [this.adminData.USER_NAME, Validators.required],
    FIRSTNAME: [this.adminData.FIRST_NAME, Validators.required],
    MIDDLENAME: [this.adminData.MIDDLE_NAME,],
    LASTNAME: [this.adminData.LAST_NAME, Validators.required],
    EMAIL: [this.adminData.EMAIL, Validators.required],
    MOBILENUMBER:  [this.adminData.MOBILE_NO,[Validators. required, Validators. pattern(/^[0-9]{10}$/),Validators.maxLength(10),Validators.minLength(10)]],
    USERTYPE: [this.adminData.ROLE, Validators.required],
    STATUS:[this.adminData.STATUS,Validators.required]
  });
}
 
onSubmit(){
  this.submitted=true;
  const signIndata={
    USER_ID:this.updateForm.value['USERID'],
    USER_NAME:this.updateForm.value['USERNAME'],
    FIRST_NAME:this.updateForm.value['FIRSTNAME'],
    MIDDLE_NAME:this.updateForm.value['MIDDLENAME'],
    LAST_NAME:this.updateForm.value['LASTNAME'],
    EMAIL:this.updateForm.value['EMAIL'],
    MOBILE_NO:this.updateForm.value['MOBILENUMBER'],
    ROLE:this.updateForm.value['USERTYPE'],
    STATUS:this.updateForm.value['STATUS']
  }
 
  if (this.updateForm.status==="VALID"){
    this.loading=true;
    this.service.updateUser(signIndata,this.adminData.USER_ID).subscribe((res)=>{
    this.submitted=true;
    this.loading=false;
    Swal.fire({
      position:'top',
      title: "Success!",
      text: "Update Successful 👍",
      icon: "success",
      timer: 1500,
      showConfirmButton:false,
  });
  },( error: { error: { error: any; }; })=>{
      this.loading=false;
  if (error.error && error.error.error) {
    this.msg=error.error.error
  }
     Swal.fire({
      position:'top',
      title: "ERROR",
      text: `${this.msg}`,
      icon: "error",
      width: 400,
      showConfirmButton:true,
   });
  });
 }
}
 
 
 
}
 
 