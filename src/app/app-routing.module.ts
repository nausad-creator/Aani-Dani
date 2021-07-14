import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from './user.guard';

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
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then((m) => m.CheckoutModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
    canActivate: [UserGuard],
  },
  {
    path: 'content',
    loadChildren: () => import('./cms/cms.module').then((m) => m.CmsModule)
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
