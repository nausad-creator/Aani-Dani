import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutGuard } from './check-out.guard';
import { UserGuard } from './user.guard';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./landing home/landing/landing.module').then((m) => m.LandingModule),
		data: {
			seo: {
				title: 'HOME | AANI DANI',
				metaTags: [
					{ name: 'keywords', content: 'Restaurant Order management, Restaurant Kitchen management, Hotel Management' },
					{ name: 'description', content: 'softQ is a Online Restaurant order management.' },
					{ name: 'robots', content: 'index, follow' }
				]
			}
		}
	},
	{
		path: 'home',
		loadChildren: () => import('./landing home/landing/landing.module').then((m) => m.LandingModule),
		data: {
			seo: {
				title: 'HOME | AANI DANI',
				metaTags: [
					{ name: 'keywords', content: 'Restaurant Order management, Restaurant Kitchen management, Hotel Management' },
					{ name: 'description', content: 'softQ is a Online Restaurant order management.' },
					{ name: 'robots', content: 'index, follow' }
				]
			}
		}
	},
	{
		path: 'products',
		loadChildren: () => import('./products/product-list/product-list.module').then((m) => m.ProductListModule),
		data: {
			seo: {
				title: 'PRODUCTS | AANI DANI',
				metaTags: [
					{ name: 'keywords', content: 'Restaurant Order management, Restaurant Kitchen management, Hotel Management' },
					{ name: 'description', content: 'softQ is a Online Restaurant order management.' },
					{ name: 'robots', content: 'index, follow' }
				]
			}
		}
	},
	{
		path: 'product-details',
		loadChildren: () => import('./details/product-details/product-details.module').then((m) => m.ProductDetailsModule),
		data: {
			seo: {
				title: 'PRODUCT-DETAILS | AANI DANI',
				metaTags: [
					{ name: 'keywords', content: 'Restaurant Order management, Restaurant Kitchen management, Hotel Management' },
					{ name: 'description', content: 'softQ is a Online Restaurant order management.' },
					{ name: 'robots', content: 'index, follow' }
				]
			}
		}
	},
	{
		path: 'cart',
		loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule),
		data: {
			seo: {
				title: 'CART | AANI DANI',
				metaTags: [
					{ name: 'keywords', content: 'Restaurant Order management, Restaurant Kitchen management, Hotel Management' },
					{ name: 'description', content: 'softQ is a Online Restaurant order management.' },
					{ name: 'robots', content: 'index, follow' }
				]
			}
		}
	},
	{
		path: 'checkout',
		loadChildren: () => import('./checkout/checkout.module').then((m) => m.CheckoutModule),
		canActivate: [CheckoutGuard],
		data: {
			seo: {
				title: 'CHECKOUT | AANI DANI',
				metaTags: [
					{ name: 'keywords', content: 'Restaurant Order management, Restaurant Kitchen management, Hotel Management' },
					{ name: 'description', content: 'softQ is a Online Restaurant order management.' },
					{ name: 'robots', content: 'index, follow' }
				]
			}
		}
	},
	{
		path: 'user',
		loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
		canActivate: [UserGuard],
	},
	{
		path: 'content',
		loadChildren: () => import('./cms/cms.module').then((m) => m.CmsModule)
	},
	{
		path: '404',
		loadChildren: () => import('./not-found/not-found.module').then((m) => m.NotFoundModule),
		data: {
			seo: {
				title: 'NOT FOUND 404 | AANI DANI',
				metaTags: [
					{ name: 'keywords', content: 'Restaurant Order management, Restaurant Kitchen management, Hotel Management' },
					{ name: 'description', content: 'softQ is a Online Restaurant order management.' },
					{ name: 'robots', content: 'index, follow' }
				]
			}
		}
	},
	{ path: '**', redirectTo: '/404' }];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
