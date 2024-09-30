import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HttpClientModule  } from '@angular/common/http';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ViewEmployeesComponent } from './view-employees/view-employees.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { AddNewEmployeeComponent } from './add-new-employee/add-new-employee.component';
import { BulkAddEmployeeComponent } from './bulk-add-employee/bulk-add-employee.component';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FileUploadModule } from 'ng2-file-upload';
import { EmployeeCardDisplayComponent } from './view-employees/employee-card-display/employee-card-display.component';
import { EmployeeFilterComponent } from './view-employees/employee-filter/employee-filter.component';
import { GetEmployeesService } from '../app/services/get-employees.service';
import { OtpComponent } from './otp/otp.component';
import { ResetComponent } from './otp/reset/reset.component';
import { AddTemplateComponent } from './generate-letters/add-template/add-template.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { EditDetailsComponent } from './view-employees/edit-details/edit-details.component';
import { SearchGenerateLetterComponent } from './search-generate-letter/search-generate-letter.component';
import { SelectTemplateComponent } from './select-template/select-template.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthService } from './AuthServices/auth.service';
import { RegisterComponent } from './register/register.component';
import { BarcodeComponent } from './login/barcode/barcode.component';
import { MfaOTPComponent } from './login/mfaOTP/mfaOTP.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ViewUsersComponent } from './view-users/view-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ModalModule } from './_modal/modal.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AddEmployeeComponent,
    ViewEmployeesComponent,
    LandingpageComponent,
    AddNewEmployeeComponent,
    BulkAddEmployeeComponent,
    ForgotPasswordComponent,
    EmployeeCardDisplayComponent,
    EmployeeFilterComponent,
    OtpComponent,
    ResetComponent,
    AddTemplateComponent,
    EditDetailsComponent,
    SearchGenerateLetterComponent,
    SelectTemplateComponent,
    RegisterComponent,
    BarcodeComponent,
    MfaOTPComponent,
    ViewUsersComponent,
    EditUserComponent,
    NotificationsComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    EditorModule,
    FileUploadModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    FontAwesomeModule,
    ModalModule,
    
    
  ],
  providers: [
    AuthService,
    {provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js'},
    GetEmployeesService],
  bootstrap: [AppComponent],
 
})
export class AppModule { }
