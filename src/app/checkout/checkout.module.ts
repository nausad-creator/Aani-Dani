import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout/checkout.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { HeaderModule } from '../header/header.module';
import { SharedOrdersDetailsComponent } from './checkout/shared-orders-details.component';
import { SharedSkeletonDetailsComponent } from './checkout/shared-orders-details-skeleton';
import { SuccessPlacedOrderComponent } from './checkout/success.pop-up.component';

@NgModule({
  declarations: [
    CheckoutComponent,
    SharedOrdersDetailsComponent,
    SharedSkeletonDetailsComponent,
    SuccessPlacedOrderComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    HeaderModule,
    CarouselModule,
    NgSelectModule,
    NgxPaginationModule,
    LazyLoadImageModule,
    NgxSkeletonLoaderModule,
    RouterModule.forChild([
      {
        path: '', component: CheckoutComponent
      },
    ]),
  ]
})
export class CheckoutModule { }
