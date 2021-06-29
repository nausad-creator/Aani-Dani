import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryResolver } from './resolver.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./landing/landing.module').then((m) => m.LandingModule),
    resolve: {
      category: CategoryResolver
    }
  },
  {
    path: 'home',
    loadChildren: () => import('./landing/landing.module').then((m) => m.LandingModule),
    resolve: {
      category: CategoryResolver
    }
  },
  {
    path: 'products',
    loadChildren: () => import('./product-list/product-list.module').then((m) => m.ProductListModule),
    resolve: {
      category: CategoryResolver
    }
  },
  {
    path: 'product-details',
    loadChildren: () => import('./product-details/product-details.module').then((m) => m.ProductDetailsModule),
    resolve: {
      category: CategoryResolver
    }
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
