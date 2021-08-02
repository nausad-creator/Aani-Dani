import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { LandingComponent } from './landing.component';
import { UserGuard } from '../user.guard';
import { LandingMyOrderComponent } from './landing-my-orders.component';
import { HeaderModule } from '../header/header.module';

@NgModule({
	declarations: [
		LandingComponent,
		LandingMyOrderComponent
	],
	imports: [
		CommonModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormsModule,
		HeaderModule,
		NgSelectModule,
		NgxPaginationModule,
		LazyLoadImageModule,
		NgxSkeletonLoaderModule,
		RouterModule.forChild([
			{
				path: '',
				component: LandingMyOrderComponent,
				children: [
					{
						path: '', component: LandingComponent,
						children: [
							{
								path: '', redirectTo: 'my-account', pathMatch: 'full'
							},
							{
								path: 'my-account',
								loadChildren: () => import('./my-account/my-account.module').then((m) => m.MyAccountModule),
								data: {
									seo: {
										title: 'MY-ACCOUNT | AANI DANI',
										metaTags: [
											{ name: 'keywords', content: 'Restaurant Order management, Restaurant Kitchen management, Hotel Management' },
											{ name: 'description', content: 'softQ is a Online Restaurant order management.' },
											{ name: 'robots', content: 'index, follow' }
										]
									}
								},
								canActivate: [UserGuard]
							},
							{
								path: 'saved-address',
								loadChildren: () => import('./saved-addresses/saved-addresses.module').then((m) => m.SavedAddressesModule),
								data: {
									seo: {
										title: 'SAVED ADDRESS | AANI DANI',
										metaTags: [
											{ name: 'keywords', content: 'Restaurant Order management, Restaurant Kitchen management, Hotel Management' },
											{ name: 'description', content: 'softQ is a Online Restaurant order management.' },
											{ name: 'robots', content: 'index, follow' }
										]
									}
								},
								canActivate: [UserGuard],
							},
							{
								path: 'my-review',
								loadChildren: () => import('./my-rewiews/my-rewiews.module').then((m) => m.MyRewiewsModule),
								data: {
									seo: {
										title: 'MY REVIEW | AANI DANI',
										metaTags: [
											{ name: 'keywords', content: 'Restaurant Order management, Restaurant Kitchen management, Hotel Management' },
											{ name: 'description', content: 'softQ is a Online Restaurant order management.' },
											{ name: 'robots', content: 'index, follow' }
										]
									}
								},
								canActivate: [UserGuard],
							},
							{
								path: 'my-wishlist',
								loadChildren: () => import('./my-wishlist/my-wishlist.module').then((m) => m.MyWishlistModule),
								data: {
									seo: {
										title: 'MY WISHLIST | AANI DANI',
										metaTags: [
											{ name: 'keywords', content: 'Restaurant Order management, Restaurant Kitchen management, Hotel Management' },
											{ name: 'description', content: 'softQ is a Online Restaurant order management.' },
											{ name: 'robots', content: 'index, follow' }
										]
									}
								},
								canActivate: [UserGuard],
							},
							{
								path: 'notifications',
								loadChildren: () => import('./notifications/notifications.module').then((m) => m.NotificationsModule),
								data: {
									seo: {
										title: 'NOTIFICATIONS | AANI DANI',
										metaTags: [
											{ name: 'keywords', content: 'Restaurant Order management, Restaurant Kitchen management, Hotel Management' },
											{ name: 'description', content: 'softQ is a Online Restaurant order management.' },
											{ name: 'robots', content: 'index, follow' }
										]
									}
								},
								canActivate: [UserGuard],
							},
							{
								path: 'settings',
								loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule),
								data: {
									seo: {
										title: 'SETTINGS | AANI DANI',
										metaTags: [
											{ name: 'keywords', content: 'Restaurant Order management, Restaurant Kitchen management, Hotel Management' },
											{ name: 'description', content: 'softQ is a Online Restaurant order management.' },
											{ name: 'robots', content: 'index, follow' }
										]
									}
								},
								canActivate: [UserGuard],
							},
							{
								path: 'customer-support',
								loadChildren: () => import('./customer-support/customer-support.module').then((m) => m.CustomerSupportModule),
								data: {
									seo: {
										title: 'CUSTOMER SUPPORT | AANI DANI',
										metaTags: [
											{ name: 'keywords', content: 'Restaurant Order management, Restaurant Kitchen management, Hotel Management' },
											{ name: 'description', content: 'softQ is a Online Restaurant order management.' },
											{ name: 'robots', content: 'index, follow' }
										]
									}
								},
								canActivate: [UserGuard],
							}
						]
					},
					{
						path: 'my-orders',
						loadChildren: () => import('./my-orders/my-orders.module').then((m) => m.MyOrdersModule),
						data: {
							seo: {
								title: 'MY ORDERS | AANI DANI',
								metaTags: [
									{ name: 'keywords', content: 'Restaurant Order management, Restaurant Kitchen management, Hotel Management' },
									{ name: 'description', content: 'softQ is a Online Restaurant order management.' },
									{ name: 'robots', content: 'index, follow' }
								]
							}
						},
						canActivate: [UserGuard],
					}
				]
			}
		]),
	]
})
export class UserModule { }
