import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountComponent } from './my-account/my-account.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';

@NgModule({
	declarations: [
		MyAccountComponent
	],
	imports: [
		CommonModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormsModule,
		NgSelectModule,
		OwlDateTimeModule,
		OwlNativeDateTimeModule,
		NgxSkeletonLoaderModule,
		RouterModule.forChild([
			{
				path: '',
				component: MyAccountComponent,
			}
		])
	]
})
export class MyAccountModule { }
