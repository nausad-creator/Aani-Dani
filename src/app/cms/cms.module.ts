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
						data: {
							seo: {
								title: 'ABOUT-US | AANI DANI',
								metaTags: [
									{ name: 'keywords', content: 'Restaurant Order management, Restaurant Kitchen management, Hotel Management' },
									{ name: 'description', content: 'softQ is a Online Restaurant order management.' },
									{ name: 'robots', content: 'index, follow' }
								]
							}
						}
					},
					{
						path: 'contact-us',
						loadChildren: () => import('./contact-us/contact-us.module').then((m) => m.ContactUsModule),
						data: {
							seo: {
								title: 'CONTACT-US | AANI DANI',
								metaTags: [
									{ name: 'keywords', content: 'Restaurant Order management, Restaurant Kitchen management, Hotel Management' },
									{ name: 'description', content: 'softQ is a Online Restaurant order management.' },
									{ name: 'robots', content: 'index, follow' }
								]
							}
						}
					},
					{
						path: 'terms-and-conditions',
						loadChildren: () => import('./terms-and-conditions/terms-and-conditions.module').then((m) => m.TermsAndConditionsModule),
						data: {
							seo: {
								title: 'TERMS & CONDITIONS | AANI DANI',
								metaTags: [
									{ name: 'keywords', content: 'Restaurant Order management, Restaurant Kitchen management, Hotel Management' },
									{ name: 'description', content: 'softQ is a Online Restaurant order management.' },
									{ name: 'robots', content: 'index, follow' }
								]
							}
						}
					},
					{
						path: 'faqs',
						loadChildren: () => import('./faqs/faqs.module').then((m) => m.FaqsModule),
						data: {
							seo: {
								title: 'FAQS | AANI DANI',
								metaTags: [
									{ name: 'keywords', content: 'Restaurant Order management, Restaurant Kitchen management, Hotel Management' },
									{ name: 'description', content: 'softQ is a Online Restaurant order management.' },
									{ name: 'robots', content: 'index, follow' }
								]
							}
						}
					},
					{
						path: 'privacy-policy',
						loadChildren: () => import('./privacy-policy/privacy-policy.module').then((m) => m.PrivacyPolicyModule),
						data: {
							seo: {
								title: 'PRIVACY POLICY | AANI DANI',
								metaTags: [
									{ name: 'keywords', content: 'Restaurant Order management, Restaurant Kitchen management, Hotel Management' },
									{ name: 'description', content: 'softQ is a Online Restaurant order management.' },
									{ name: 'robots', content: 'index, follow' }
								]
							}
						}
					}]
			}
		]),
	]
})
export class CmsModule { }
