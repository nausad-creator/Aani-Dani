import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./landing/landing.module').then((m) => m.LandingModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./landing/landing.module').then((m) => m.LandingModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./product-list/product-list.module').then((m) => m.ProductListModule)
  },
  {
    path: 'product-details',
    loadChildren: () => import('./product-details/product-details.module').then((m) => m.ProductDetailsModule)
  },
  {
    path: 'my-cart',
    loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule)
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
