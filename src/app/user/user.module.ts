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
								canActivate: [UserGuard]
							},
							{
								path: 'saved-address',
								loadChildren: () => import('./saved-addresses/saved-addresses.module').then((m) => m.SavedAddressesModule),
								canActivate: [UserGuard],
							},
							{
								path: 'my-review',
								loadChildren: () => import('./my-rewiews/my-rewiews.module').then((m) => m.MyRewiewsModule),
								canActivate: [UserGuard],
							},
							{
								path: 'my-wishlist',
								loadChildren: () => import('./my-wishlist/my-wishlist.module').then((m) => m.MyWishlistModule),
								canActivate: [UserGuard],
							},
							{
								path: 'notifications',
								loadChildren: () => import('./notifications/notifications.module').then((m) => m.NotificationsModule),
								canActivate: [UserGuard],
							},
							{
								path: 'settings',
								loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule),
								canActivate: [UserGuard],
							},
							{
								path: 'customer-support',
								loadChildren: () => import('./customer-support/customer-support.module').then((m) => m.CustomerSupportModule),
								canActivate: [UserGuard],
							}
						]
					},
					{
						path: 'my-orders',
						loadChildren: () => import('./my-orders/my-orders.module').then((m) => m.MyOrdersModule),
						canActivate: [UserGuard],
					}
				]
			}
		]),
	]
})
export class UserModule { }
