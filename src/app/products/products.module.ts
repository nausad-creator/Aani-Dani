import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutletComponent } from './router-outlet/router-outlet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    RouterOutletComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '', component: RouterOutletComponent,
        children: [{
          path: '',
          loadChildren: () => import('./product-list/product-list.module').then((m) => m.ProductListModule)
        }]
      }
    ]),
  ]
})
export class ProductsModule { }
