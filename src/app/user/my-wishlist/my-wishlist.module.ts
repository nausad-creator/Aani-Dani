import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyWishlistComponent } from './my-wishlist/my-wishlist.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SharedWishlistComponent } from './my-wishlist/shared-wishlist.component';
import { SkeletonComponent } from './my-wishlist/skeleton.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [
		MyWishlistComponent,
		SharedWishlistComponent,
		SkeletonComponent
	],
	imports: [
		CommonModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormsModule,
		TooltipModule,
		NgSelectModule,
		NgxPaginationModule,
		LazyLoadImageModule,
		TranslateModule,
		NgxSkeletonLoaderModule,
		RouterModule.forChild([
			{
				path: '',
				component: MyWishlistComponent,
			}
		])
	]
})
export class MyWishlistModule { }
