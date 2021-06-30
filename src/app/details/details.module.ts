import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterOutletComponent } from './router-outlet/router-outlet.component';

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
          loadChildren: () => import('./product-details/product-details.module').then((m) => m.ProductDetailsModule)
        }]
      }
    ]),
  ]
})
export class DetailsModule { }
