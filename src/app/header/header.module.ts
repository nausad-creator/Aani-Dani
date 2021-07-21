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
import { LocationSelectionComponent } from './onboarding/location-selection.component';
import { AddressListComponent } from './onboarding/address-list.component';
import { MyFilterAdressPipe } from './onboarding/add.pipe';
import { TooltipModule } from 'ng2-tooltip-directive';
import { AlertComponent } from './onboarding/alert.component';

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
		OtpRegisterComponent,
		LocationSelectionComponent,
		AddressListComponent,
		MyFilterAdressPipe,
		AlertComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		OwlDateTimeModule,
		OwlNativeDateTimeModule,
		ReactiveFormsModule,
		FormsModule,
		NgSelectModule,
		TooltipModule
	],
	exports: [
		HeaderComponent,
		FooterComponent,
		ScrollToTopComponent,
		CommonModule
	]
})
export class HeaderModule { }
