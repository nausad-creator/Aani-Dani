import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./landing home/landing.module').then((m) => m.LandingModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./landing home/landing.module').then((m) => m.LandingModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then((m) => m.ProductsModule)
  },
  {
    path: 'product-details',
    loadChildren: () => import('./details/details.module').then((m) => m.DetailsModule)
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
