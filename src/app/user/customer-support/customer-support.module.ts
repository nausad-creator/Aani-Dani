import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerSupportComponent } from './customer-support/customer-support.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
	declarations: [
		CustomerSupportComponent
	],
	imports: [
		CommonModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormsModule,
		NgSelectModule,
		NgxPaginationModule,
		LazyLoadImageModule,
		NgxSkeletonLoaderModule,
		RouterModule.forChild([
			{
				path: '',
				component: CustomerSupportComponent,
			}
		])
	]
})
export class CustomerSupportModule { }
