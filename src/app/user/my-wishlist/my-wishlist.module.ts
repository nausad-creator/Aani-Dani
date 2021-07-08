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

@NgModule({
  declarations: [
    MyWishlistComponent
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
        component: MyWishlistComponent,
      }
    ])
  ]
})
export class MyWishlistModule { }
