import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./landing home/landing/landing.module').then((m) => m.LandingModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./landing home/landing/landing.module').then((m) => m.LandingModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./products/product-list/product-list.module').then((m) => m.ProductListModule)
  },
  {
    path: 'product-details',
    loadChildren: () => import('./details/product-details/product-details.module').then((m) => m.ProductDetailsModule)
  },
  {
    path: 'my-cart',
    loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule)
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
