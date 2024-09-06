import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../AuthServices/auth.service';
import { ModalService } from '../_modal';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  closeModal() {
    throw new Error('Method not implemented.');
}

  userData: any;
  isOpen: any;
  routeId: any;
  loading: boolean = false;

  constructor(
              private router: Router, 
              private Authservices: AuthService, 
              private route: ActivatedRoute, 
              private modal: ModalService
            ) {
                const userData1 = localStorage.getItem('loginData');
                  if (userData1) {
                    this.userData = JSON.parse(userData1);
                    //  console.log('data ROLE',this.userData);
                  }
              }

   ngOnInit(): void {

    this.route.params.subscribe(param => {
      console.log("param", param)
      this.routeId = param['id']
    });

    setTimeout(() => {
      if (this.routeId) {
        this.openModal(this.routeId)
      }
    }, 100);
  }


  backToLogin() {
    this.router.navigate([''])
  }
  Signout() {
    this.Authservices.logout();
  }

  openModal(id: any) {
    console.log('id', id)
    this.modal.open(id);

  }
}
