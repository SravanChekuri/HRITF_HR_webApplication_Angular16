import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard1 } from './AuthServices/RouterGuard/auth1.guard';
import { AuthGuard } from './AuthServices/RouterGuard/auth.guard';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { AddNewEmployeeComponent } from './Components/add-new-employee/add-new-employee.component';
import { LandingpageComponent } from './Components/landingpage/landingpage.component';
import { SelectTemplateComponent } from './Components/select-template/select-template.component';
import { SearchGenerateLetterComponent } from './Components/search-generate-letter/search-generate-letter.component';
import { RegisterComponent } from './Components/register/register.component';
import { ViewUsersComponent } from './Components/view-users/view-users.component';
import { EditUserComponent } from './Components/edit-user/edit-user.component';
import { NotificationsComponent } from './Components/notifications/notifications.component';
import { AddTemplateComponent } from './Components/add-template/add-template.component';
import { LoginComponent } from './Components/login/login.component';
import { BarcodeComponent } from './Components/barcode/barcode.component';
import { MfaOTPComponent } from './Components/mfaOTP/mfaOTP.component';
import { ViewEmployeesComponent } from './Components/view-employees/view-employees.component';
import { OtpComponent } from './Components/otp/otp.component';
import { ResetComponent } from './Components/reset/reset.component';
import { EditDetailsComponent } from './Components/edit-details/edit-details.component';
import { AddRoleComponent } from './Components/add-role/add-role.component';
import { ViewRolesComponent } from './Components/view-roles/view-roles.component';
import { EditRolesComponent } from './Components/edit-roles/edit-roles.component';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { hideHeader: true } },
  { path: 'barcode', component: BarcodeComponent, data: { hideHeader: true } },
  { path: 'mfaOtp', component: MfaOTPComponent, data: { hideHeader: true } },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'reset', component: ResetComponent, data: { hideHeader: true } },
  { path: 'OTPPage', component: OtpComponent, data: { hideHeader: true } },
  { path: 'OTPPage/:email', component: OtpComponent, data: { hideHeader: true } },
  { path: 'landing', component: LandingpageComponent,canActivate: [AuthGuard] },
  { path: 'addRole', component:AddRoleComponent, canActivate: [AuthGuard] },
  { path: 'viewRoles', component: ViewRolesComponent, canActivate: [AuthGuard1] },
  { path: 'editRole', component: EditRolesComponent, canActivate: [AuthGuard]},
  { path: 'editProfile', component: EditProfileComponent},
  { path: 'viewEmployees', component: ViewEmployeesComponent, canActivate: [AuthGuard] },
  { path: 'addNewEmployeePage', component: AddNewEmployeeComponent,canActivate: [AuthGuard] },
  { path: 'addTemplate', component: AddTemplateComponent, canActivate: [AuthGuard, AuthGuard1] },
  { path: 'edit', component: EditDetailsComponent,canActivate: [AuthGuard] },
  { path: 'editdetails', component: EditDetailsComponent,canActivate: [AuthGuard] },
  { path: 'SelectTemplate', component: SelectTemplateComponent,canActivate: [AuthGuard] },
  { path: 'employeeLetters', component: SearchGenerateLetterComponent,canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard, AuthGuard1] },
  { path: 'viewUsers', component: ViewUsersComponent, canActivate: [AuthGuard, AuthGuard1] },
  { path: "editUser", component: EditUserComponent, canActivate: [AuthGuard, AuthGuard1] },
  { path: 'notifications', component: NotificationsComponent,canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login', },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

