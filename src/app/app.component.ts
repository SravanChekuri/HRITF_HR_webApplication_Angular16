import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { LoginService } from './Services/Login Services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  title = 'LoginFormofHRITF';
  submitted = false;
  loginForm: any = new FormGroup({});
  showNavbar: boolean = true;
  hideNav: boolean = false;
  showHomeComponent: boolean = false;

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  hideHomeComponentRoutes: string[] = ['', 'forgotPassword', 'signUp', 'OTPPage', 'NPUSucess', 'reset', 'vsup', 'cnfrmsup',];
  
  shouldHideHomeComponent(): boolean {
    const currentRoute = this.router.url.split('/')[1];
    return this.hideHomeComponentRoutes.includes(currentRoute);
  }

  ngOnInit(): void {
    this.FormIntalization();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
          this.hideNav = this.route.firstChild?.snapshot.data['hideHeader']
          this.updateNavbarVisibility();
      }
    });
  }

  updateNavbarVisibility() {
    if (this.hideNav) {
      this.showNavbar = !this.hideNav
    } else {
      this.showNavbar = !this.shouldHideHomeComponent();
    }

  }

  FormIntalization() {
    this.loginForm = this.formbuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {  }

  shouldShowHomeComponent(): boolean {
    return this.showNavbar;
  }


}
