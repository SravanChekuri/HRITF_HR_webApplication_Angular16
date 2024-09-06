import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ViewEmployeesComponent } from './view-employees/view-employees.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { AddNewEmployeeComponent } from './add-new-employee/add-new-employee.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OtpComponent } from './otp/otp.component';
import { ResetComponent } from './otp/reset/reset.component';
import { AddTemplateComponent } from './generate-letters/add-template/add-template.component'
import { ProfileComponent } from './profile/profile.component';
import { EditDetailsComponent } from './view-employees/edit-details/edit-details.component';
import { SearchGenerateLetterComponent } from './search-generate-letter/search-generate-letter.component';
import { SelectTemplateComponent } from './select-template/select-template.component';
import { RegisterComponent } from './register/register.component';
import { BarcodeComponent } from './login/barcode/barcode.component';
import { MfaOTPComponent } from './login/mfaOTP/mfaOTP.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AuthGuard1 } from './AuthServices/RouterGuard/auth1.guard';
import { AuthGuard2 } from './AuthServices/RouterGuard/auth2.guard';
import { AuthGuard } from './AuthServices/RouterGuard/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { hideHeader: true } },
  { path: 'barcode', component: BarcodeComponent, data: { hideHeader: true } },
  { path: 'mfaOtp', component: MfaOTPComponent, data: { hideHeader: true } },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'viewEmployees', component: ViewEmployeesComponent, canActivate: [AuthGuard] },
  { path: 'landing', component: LandingpageComponent,canActivate: [AuthGuard] },
  { path: 'addNewEmployeePage', component: AddNewEmployeeComponent,canActivate: [AuthGuard] },
  { path: 'OTPPage', component: OtpComponent, data: { hideHeader: true } },
  { path: 'OTPPage/:email', component: OtpComponent, data: { hideHeader: true } },
  { path: 'reset', component: ResetComponent, data: { hideHeader: true } },
  { path: 'addTemplate', component: AddTemplateComponent, canActivate: [AuthGuard, AuthGuard1] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile/:id', component: ProfileComponent,canActivate: [AuthGuard] },
  { path: 'edit', component: EditDetailsComponent,canActivate: [AuthGuard] },
  { path: 'edit123', component: EditDetailsComponent,canActivate: [AuthGuard] },
  { path: 'SelectTemplate', component: SelectTemplateComponent,canActivate: [AuthGuard] },
  { path: 'employeeLetters', component: SearchGenerateLetterComponent,canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard, AuthGuard1] },
  { path: 'viewUsers', component: ViewUsersComponent, canActivate: [AuthGuard, AuthGuard1] },
  { path: "editUser", component: EditUserComponent, canActivate: [AuthGuard, AuthGuard1] },
  { path: 'notifications', component: NotificationsComponent,canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

