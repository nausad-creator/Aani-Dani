import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SharedDetailsComponent } from './shared-details/shared-details.component';
import { SharedBillingComponent } from './shared-billing/shared-billing.component';
import { SharedBestSellingComponent } from './shared-best-selling/shared-best-selling.component';


@NgModule({
  declarations: [
    CartComponent,
    SharedDetailsComponent,
    SharedBillingComponent,
    SharedBestSellingComponent
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
        path: '', component: CartComponent
      },
    ]),
  ]
})
export class CartModule { }
