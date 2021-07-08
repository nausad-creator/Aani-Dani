import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedListComponent } from './shared-list/shared-list.component';
import { ShopByCategoryComponent } from './shop-by-category/shop-by-category.component';
import { FilterByPriceComponent } from './filter-by-price/filter-by-price.component';
import { FilterByShapeComponent } from './filter-by-shape/filter-by-shape.component';
import { TopSellingComponent } from './top-selling/top-selling.component';
import { ItemsComponent } from './items/items.component';
import { SortHeaderComponent } from './sort-header/sort-header.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgProgressModule } from 'ngx-progressbar';
import { HeaderModule } from 'src/app/header/header.module';

@NgModule({
  declarations: [
    SharedListComponent,
    ShopByCategoryComponent,
    FilterByPriceComponent,
    FilterByShapeComponent,
    TopSellingComponent,
    ItemsComponent,
    SortHeaderComponent,
    SkeletonComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgProgressModule,
    FormsModule,
    NgSelectModule,
    HeaderModule,
    NgxPaginationModule,
	  LazyLoadImageModule,
	  NgxSkeletonLoaderModule,
    RouterModule.forChild([
      {
        path: '', component: SharedListComponent
      },
    ]),
  ]
})
export class ProductListModule { }
