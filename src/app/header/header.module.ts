import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { FooterComponent } from '../footer/footer.component';
import { ScrollToTopComponent } from '../footer/scroll-to-top/scroll-to-top.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './onboarding/login.component';
import { RegistrationComponent } from './onboarding/registration.component';
import { OtpComponent } from './onboarding/otp.component';
import { ResetComponent } from './onboarding/reset.component';
import { ForgotComponent } from './onboarding/forgot.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { OtpRegisterComponent } from './onboarding/otp.register.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ScrollToTopComponent,
    LoginComponent,
    RegistrationComponent,
    OtpComponent,
    ResetComponent,
    ForgotComponent,
    OtpRegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ScrollToTopComponent,
    CommonModule
]
})
export class HeaderModule { }
