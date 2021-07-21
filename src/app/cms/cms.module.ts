import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '../header/header.module';

@NgModule({
	declarations: [
		LandingComponent
	],
	exports: [],
	imports: [
		CommonModule,
		HeaderModule,
		RouterModule.forChild([
			{
				path: '', component: LandingComponent,
				children: [
					{
						path: 'about-us',
						loadChildren: () => import('./about-us/about-us.module').then((m) => m.AboutUsModule),
					},
					{
						path: 'contact-us',
						loadChildren: () => import('./contact-us/contact-us.module').then((m) => m.ContactUsModule),
					},
					{
						path: 'terms-and-conditions',
						loadChildren: () => import('./terms-and-conditions/terms-and-conditions.module').then((m) => m.TermsAndConditionsModule),
					},
					{
						path: 'faqs',
						loadChildren: () => import('./faqs/faqs.module').then((m) => m.FaqsModule),
					},
					{
						path: 'privacy-policy',
						loadChildren: () => import('./privacy-policy/privacy-policy.module').then((m) => m.PrivacyPolicyModule),
					}]
			}
		]),
	]
})
export class CmsModule { }
