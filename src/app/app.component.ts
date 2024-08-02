import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'LoginFormofNFCS';
  submitted = false;
  loginForm: any = new FormGroup({});
  showNavbar: boolean = true;
  hideNav: boolean = false;
  showHomeComponent: boolean = false;
  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService
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
        // console.log("events:", event)
        // console.log("navigate Value1:", this.route.firstChild?.snapshot.data['hideHeader'])
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

  login() {
    // console.log(this.loginForm.value.userName);
    // if (
    //   this.loginForm.value.userName === 'Sowmya' &&
    //   this.loginForm.value.password === '123'
    // ) {
    //   this.submitted = true;
    //   console.log(this.submitted);
    //   this.router.navigate(['/Home']);
    // } else {
    //   this.submitted = false
    //   console.log('Incorrect user details');
    // }
  }
  shouldShowHomeComponent(): boolean {
    return this.showNavbar;
  }
  // createSesssion() {
  //   this.loginService.setSession('12').subscribe(res => {
  //     console.log('res', res);

  //   })
  // }
  // getSesssion() {
  //   this.loginService.getSession().subscribe(res => {
  //     console.log('res', res);

  //   })
  }
