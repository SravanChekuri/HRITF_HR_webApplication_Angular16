import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule  } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthService } from './AuthServices/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalModule } from './_modal/modal.module';
import { AddEmployeeComponent } from './Components/add-employee/add-employee.component';
import { LandingpageComponent } from './Components/landingpage/landingpage.component';
import { AddNewEmployeeComponent } from './Components/add-new-employee/add-new-employee.component';
import { BulkAddEmployeeComponent } from './Components/bulk-add-employee/bulk-add-employee.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { SearchGenerateLetterComponent } from './Components/search-generate-letter/search-generate-letter.component';
import { SelectTemplateComponent } from './Components/select-template/select-template.component';
import { RegisterComponent } from './Components/register/register.component';
import { EditUserComponent } from './Components/edit-user/edit-user.component';
import { NotificationsComponent } from './Components/notifications/notifications.component';
import { HomeComponent } from './Components/home/home.component';
import { AddTemplateComponent } from './Components/add-template/add-template.component';
import { LoginComponent } from './Components/login/login.component';
import { ViewEmployeesComponent } from './Components/view-employees/view-employees.component';
import { EmployeeCardDisplayComponent } from './Components/employee-card-display/employee-card-display.component';
import { EmployeeFilterComponent } from './Components/employee-filter/employee-filter.component';
import { OtpComponent } from './Components/otp/otp.component';
import { ResetComponent } from './Components/reset/reset.component';
import { EditDetailsComponent } from './Components/edit-details/edit-details.component';
import { BarcodeComponent } from './Components/barcode/barcode.component';
import { MfaOTPComponent } from './Components/mfaOTP/mfaOTP.component';
import { SalaryDetailsComponent } from './Components/SalaryDetails/SalaryDetails.component';
import { EmergencyDetailsComponent } from './Components/EmergencyDetails/EmergencyDetails.component';
import { AddressDetailsComponent } from './Components/AddressDetails/AddressDetails.component';
import { PresentAddressComponent } from './Components/PresentAddress/PresentAddress.component';
import { PermanentAddressComponent } from './Components/PermanentAddress/PermanentAddress.component';
import { ViewUsersComponent } from './Components/view-users/view-users.component';
import { GetEmployeesService } from './Services/Employee Services/get-employees.service';
import { EmployementDetailsComponent } from './Components/EmployementDetails/EmployementDetails.component';
// import { ModalService } from './_modal/modal.servcie';


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
    SalaryDetailsComponent,
    EmergencyDetailsComponent,
    AddressDetailsComponent,
    PresentAddressComponent,
    PermanentAddressComponent,
    EmployementDetailsComponent
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
