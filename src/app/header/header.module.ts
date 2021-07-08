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

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ScrollToTopComponent,
    LoginComponent,
    RegistrationComponent,
    OtpComponent,
    ResetComponent,
    ForgotComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ScrollToTopComponent,
    CommonModule
]
})
export class HeaderModule { }
