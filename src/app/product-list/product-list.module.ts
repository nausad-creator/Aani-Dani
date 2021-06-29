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

@NgModule({
  declarations: [
    SharedListComponent,
    ShopByCategoryComponent,
    FilterByPriceComponent,
    FilterByShapeComponent,
    TopSellingComponent,
    ItemsComponent,
    SortHeaderComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '', component: SharedListComponent
      },
    ]),
  ]
})
export class ProductListModule { }
