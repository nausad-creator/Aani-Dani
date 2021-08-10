import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SharedOrderComponent } from './my-orders/shared-order.component';
import { SideFilterComponent } from './my-orders/shared-side-filter.component';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [
		MyOrdersComponent,
		SharedOrderComponent,
		SideFilterComponent,
		SkeletonComponent
	],
	imports: [
		CommonModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormsModule,
		NgSelectModule,
		NgxPaginationModule,
		LazyLoadImageModule,
		TranslateModule,
		NgxSkeletonLoaderModule,
		RouterModule.forChild([
			{
				path: '',
				component: MyOrdersComponent,
			}
		])
	]
})
export class MyOrdersModule { }
