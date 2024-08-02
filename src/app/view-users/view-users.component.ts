import { Component } from '@angular/core';
import { SignInService } from '../services/SignIn.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent {

adminData:any;

loading:boolean=false;

constructor(private service:SignInService, private router:Router){ }

ngOnInit(): void {
  this.getAdminDetails();
  
}

getAdminDetails():void{
  this.loading=true;
  this.service.getadmin().subscribe((res:any)=>{
    this.loading=false;
    // console.log('Admin details:',res);
    this.adminData = res;

    // console.log("admin Data:",this.adminData);

  },error=>{
    this.loading=false;
    // console.log('Error fetching admin details:', error);
  }); 
  }


  editUser(data:any){
    
    localStorage.setItem("edituser",  JSON.stringify(data));

    this.router.navigateByUrl("/editUser");
  }

}
