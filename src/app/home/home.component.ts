import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { AuthService } from '../AuthServices/auth.service';
import { ModalService } from '../_modal';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {

  userData: any;
  notificationCount: number = 0;
  modalRef: any;
  buttonClick: boolean=true;

  constructor(
              private router: Router, 
              private service: LoginService, 
              private Authservices: AuthService, 
              private modal: ModalService) 
              {
                const userData1 = localStorage.getItem('loginData');
                if (userData1) {
                this.userData = JSON.parse(userData1);
                }
              }

  ngOnInit() {
    this.service.currentNotificationCount.subscribe(count => {
      this.notificationCount = count;
    });
  }

  backToHome() {
    this.router.navigate(['./landing']);
  }

  Signout() {
    this.Logout();
    // window.location.reload();
  }

  Logout(){
    this.Authservices.logout();
  }

  // navigateToProfile(id: any) {
  //   this.router.navigate(['/profile', id])
  // }

  // openModal(id: any) {
  //   this.modal.open(id);
  // }

  closeModal(id: any) {
    this.modal.close(id);
  }

  crossIcon(){
    this.buttonClick=false;
    // this.closeModal();
    location.reload();
  }

}

