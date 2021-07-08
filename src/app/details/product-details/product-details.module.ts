import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { DescriptionsAndReviewComponent } from './descriptions-and-review/descriptions-and-review.component';
import { TopSellingsComponent } from './top-sellings/top-sellings.component';
import { SharedComponent } from './shared/shared.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OffersComponent } from './offers/offers.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HeaderModule } from 'src/app/header/header.module';

@NgModule({
  declarations: [
    DetailsComponent,
    DescriptionsAndReviewComponent,
    TopSellingsComponent,
    SharedComponent,
    OffersComponent,
    SkeletonComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule,
    HeaderModule,
    NgSelectModule,
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
export class ProductDetailsModule { }
