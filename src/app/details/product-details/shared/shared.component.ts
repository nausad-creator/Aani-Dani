import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, Observable, of, merge, timer } from 'rxjs';
import { take, catchError, mergeMap, map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication.service';
import { Category, ProductList, TempCartItems } from 'src/app/interface';
import { selectHomeCategoryList, State } from 'src/app/reducers';
import { RootService } from 'src/app/root.service';
import { SubSink } from 'subsink';

@Component({
	selector: 'app-shared',
	template: `
<app-header></app-header> <!-- Top Bar -->
<!-- Header -->
<header id="header">
	<div class="container">
		<div class="">
			<div class="menu-content">
				<div class="main-menu d-flex align-items-center">
					<nav class="nav-menu d-none d-lg-block"
						*ngIf="categories$ | async as categories">
						<ul>
							<li class="drop-down categorymenu">
								<a class="maindrop cursr"><i
										class="icofont-navigation-menu mr-2"></i>
										{{'all_category' | translate}}</a>
								<ul>
									<li><a routerLink="/products"
											[queryParams]="{page: '0', categoryID: category?.categoryID, categoryName: category?.categoryName+'_'+category?.categoryArabicName}"
											*ngFor="let category of categories">{{(root.languages$
											| async) === 'en' ?
											category?.categoryName :
											category?.categoryArabicName}}</a></li>
								</ul>
							</li>
							<li *ngFor="let category of categories"><a
									routerLink="/products"
									[queryParams]="{page: '0', categoryID: category?.categoryID, categoryName: category?.categoryName+'_'+category?.categoryArabicName}">{{(root.languages$
											| async) === 'en' ?
											category?.categoryName :
											category?.categoryArabicName}}</a></li>
						</ul>
					</nav><!-- .nav-menu -->
				</div>
			</div>
		</div>
	</div>
</header>
<!-- End Header -->
<main id="main">
	<!--start Listing area-->
	<section id="product-detail-section" class="pb-3 pt-4" *ngIf="!loader">
		<div class="container">
			<div class="card">
				<app-details [product]="product"></app-details>
				<div class="row">
					<div class="col-md-8">
						<app-descriptions-and-review [product]="product">
						</app-descriptions-and-review>
					</div>
					<div class="col-md-4 borleft">
						<app-top-sellings (change)="onChange($event); loader=true"
							[similarproduct]="product.similarproducts"></app-top-sellings>
					</div>
				</div>
			</div>
		</div>
	</section>
	<app-skeleton *ngIf="loader"></app-skeleton>
	<!--end Listing area-->
</main><!-- End #main -->
<app-footer></app-footer> <!-- Footer Section -->
<app-scroll-to-top></app-scroll-to-top> <!-- Scroll-to-top Section -->
  `,
	styles: [
	], changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharedComponent implements OnInit, OnDestroy {
	data = {
		loginuserID: '1',
		languageID: '1',
		searchWord: '',
		productID: '0',
		subcatID: '0',
		categoryID: '0',
		searchkeyword: '',
		cityName: '',
		minPrice: '',
		maxPrice: '',
		sortBy: '',
		page: '0',
		pagesize: '1',
	};
	loader = true;
	forceReload$ = new Subject<void>();
	categories$: Observable<Category[]> = this.store.select(selectHomeCategoryList);
	subs = new SubSink();
	products$: Observable<ProductList[]> = of(null);
	product: ProductList;
	cart: TempCartItems[] = JSON.parse(localStorage.getItem('tempCart') ? localStorage.getItem('tempCart') : '[]') as TempCartItems[];
	getProducts = () => {
		return this.root.product(JSON.stringify(this.data)).pipe(map(list => list.map(a => {
			return {
				productID: a.productID,
				categoryID: a.categoryID,
				subcatID: a.subcatID,
				productName: a.productName,
				productArabicNme: a.productArabicNme,
				productSKU: a.productSKU,
				productTag: a.productTag,
				productDescription: a.productDescription,
				productPriceVat: a.productPriceVat,
				productPrice: a.productPrice,
				productMOQ: a.productMOQ,
				productImage: a.productImage,
				productPackagesize: a.productPackagesize,
				productReviewCount: a.productReviewCount,
				productRatingCount: a.productRatingCount,
				productRatingAvg: a.productRatingAvg.split('.')[0],
				productSoldCount: a.productSoldCount,
				productStatus: a.productStatus,
				productCreatedDate: a.productCreatedDate,
				categoryName: a.categoryName,
				isFavorite: a.isFavorite,
				similarproducts: a.similarproducts.map(pr => {
					return {
						productID: pr.productID,
						categoryID: pr.categoryID,
						subcatID: pr.subcatID,
						productName: pr.productName,
						productArabicNme: pr.productArabicNme,
						productSKU: pr.productSKU,
						productTag: pr.productTag,
						productDescription: pr.productDescription,
						productPriceVat: pr.productPriceVat,
						productPrice: pr.productPrice,
						productMOQ: pr.productMOQ,
						productImage: pr.productImage,
						productPackagesize: pr.productPackagesize,
						productReviewCount: pr.productReviewCount,
						productRatingCount: pr.productRatingCount,
						productRatingAvg: pr.productRatingAvg.split('.')[0],
						productSoldCount: pr.productSoldCount,
						productStatus: pr.productStatus,
						productCreatedDate: pr.productCreatedDate,
						categoryName: pr.categoryName,
						isFavorite: pr.isFavorite,
						addedCartCount: this.cart.filter(p => p.productID === pr.productID).length > 0 ? this.cart.filter(p => p.productID === pr.productID)[0].qty : 0,
					}
				}),
				addedCartCount: this.cart.filter(p => p.productID === a.productID).length > 0 ? this.cart.filter(p => p.productID === a.productID)[0].qty : 0,
			}
		})), take(1),
			catchError(() => of([]))) as Observable<ProductList[]>;
	}
	constructor(
		private store: Store<State>,
		readonly router: Router,
		private root: RootService,
		private auth: AuthenticationService,
		private route: ActivatedRoute,
		private cd: ChangeDetectorRef
	) {
		// getting auth user data
		this.subs.add(this.auth.user.subscribe(x => {
			if (x) {
				this.data.loginuserID = '1';
			}
		}));
		this.subs.add(this.root.update$.subscribe(status => {
			if (status === 'refresh_or_reload') {
				this.cart = JSON.parse(localStorage.getItem('tempCart') ? localStorage.getItem('tempCart') : '[]') as TempCartItems[];
				this.forceReload$.next();
			}
		}));
	}
	updateCart = () => {
		this.cart = JSON.parse(localStorage.getItem('tempCart') ? localStorage.getItem('tempCart') : '[]') as TempCartItems[];
	}
	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
	ngOnInit(): void {
		// query changes
		this.data.productID = this.route.snapshot.queryParams?.productID ? this.route.snapshot.queryParams?.productID : '0';
		this.data.page = this.route.snapshot.queryParams?.page ? this.route.snapshot.queryParams?.page : '0';
		this.products();
	}
	onChange = async (ids: { categoryID: string, productID: string }) => {
		const queryParams: Params = { page: '0', categoryID: ids.categoryID, productID: ids.productID };
		this.router.navigate([],
			{
				relativeTo: this.route,
				queryParams: queryParams,
				queryParamsHandling: 'merge', // remove to replace all query params by provided
			});
		// query changes
		this.data.page = '0';
		this.data.categoryID = ids.categoryID ? ids.categoryID : '0';
		this.data.productID = ids.productID ? ids.productID : '0';
		this.products();
	}
	products = () => {
		// products
		const initialProducts$ = this.getProducts() as Observable<ProductList[]>;
		const updatesProducts$ = this.forceReload$.pipe(mergeMap(() => this.getProducts() as Observable<ProductList[]>));
		this.products$ = merge(initialProducts$, updatesProducts$);
		this.subs.add(this.products$.subscribe((res: ProductList[]) => {
			timer(500).subscribe(() => {
				this.loader = false;
				this.product = res[0];
				this.cd.markForCheck();
			});
		}, (err) => {
			this.loader = false;
			console.error(err);
		}));
	}
}
