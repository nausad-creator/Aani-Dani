import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { BestSellingComponent } from './best-selling/best-selling.component';
import { MostPopularBestSellerComponent } from './most-popular-best-seller/most-popular-best-seller.component';
import { OurPartnersComponent } from './our-partners/our-partners.component';
import { SharedComponent } from './shared/shared.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SkeletonComponent } from './best-selling/skeleton.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { HeaderModule } from 'src/app/header/header.module';
import { SkeletonCategoryComponent } from './most-popular-best-seller/skeleton-category.component';
import { AboutAaniDaniComponent } from './shared-about-aani-dani/shared-aani-dani-about.component';
import { ProductSummaryComponent } from './shared-product-summary/shared-product-summary.component';

@NgModule({
	declarations: [
		BannerComponent,
		BestSellingComponent,
		SkeletonComponent,
		MostPopularBestSellerComponent,
		OurPartnersComponent,
		SharedComponent,
		SkeletonCategoryComponent,
		AboutAaniDaniComponent,
		ProductSummaryComponent
	],
	imports: [
		CommonModule,
		HttpClientModule,
		CarouselModule,
		ReactiveFormsModule,
		FormsModule,
		NgSelectModule,
		HeaderModule,
		NgxPaginationModule,
		LazyLoadImageModule,
		NgxSkeletonLoaderModule,
		RouterModule.forChild([
			{
				path: '', component: SharedComponent
			},
		]),
	]
})
export class LandingModule { }
