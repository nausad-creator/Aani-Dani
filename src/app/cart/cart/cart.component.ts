import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SearchNewQuery } from 'src/app/actions/temp-orders.acton';
import { AuthenticationService } from 'src/app/authentication.service';
import { tepmOrder } from 'src/app/global';
import { Category, ProductList, TempCartItems, TempOrders } from 'src/app/interface';
import { selectHomeBestSellingList, selectHomeCategoryList, selectTempOrdersList, State } from 'src/app/reducers';
import { RootService } from 'src/app/root.service';
import { SubSink } from 'subsink';

@Component({
	selector: 'app-cart',
	template: `
<app-header (search)="search($event)"></app-header> <!-- Top Bar -->
<!-- Header -->
<header id="header">
	<div class="container">
		<div class="">
			<div class="menu-content">
				<div class="main-menu d-flex align-items-center">
					<nav class="nav-menu d-none d-lg-block"
						*ngIf="categories$ | async as categories">
						<ul>
							<li *ngFor="let category of categories | slice:0:8"><a
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
	<section id="cart-section" class="pb-3 pt-4">
		<div class="container">
			<div class="brandcamp"><a routerLink='/'>{{'home' | translate}} &gt;</a> <span> {{'my_cart' | translate}}</span> </div>
			<div class="card mt-3">
				<div class="row m-0 pt-3 pb-3">
					<div class="col-lg-8">
						<app-shared-details (updateCart)="reload()"
							[orders]="(orders$ | async)?.orders.data" *ngIf="!(orders$ | async)?.isSearching"></app-shared-details>
						<app-shared-skeleton *ngIf="(orders$ | async)?.isSearching"></app-shared-skeleton>
					</div>
					<div class="col-lg-4">
						<app-shared-billing [billingDetails]="(orders$ | async)?.orders.data[0].billingDetails"
							*ngIf="!(orders$ | async)?.isSearching"></app-shared-billing>
						<app-skeleton-billing *ngIf="(orders$ | async)?.isSearching"></app-skeleton-billing>
					</div>
					<!-- when empty -->
					<div class="col-lg-12" *ngIf="!(orders$ | async)?.isSearching">
						<div class="table-responsive"
							style="margin-top: 20px; min-height: 280px"
							*ngIf="(orders$ | async)?.orders.data[0].orderdetails.length===0">
							<p class="text-center pt-20">{{'currently_cart_is_empty' | translate}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<app-shared-best-selling (update)="reload()" [products]="products"
		*ngIf="products$ | async as products"></app-shared-best-selling>
	<app-skeleton *ngIf="(products$ | async)?.length === 0"></app-skeleton>

</main><!-- End #main -->
<app-footer></app-footer> <!-- Footer Section -->
<app-scroll-to-top></app-scroll-to-top> <!-- Scroll-to-top Section -->
  `,
	styles: [
	], changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit, OnDestroy, AfterViewInit {
	cart: TempCartItems[] = JSON.parse(localStorage.getItem('tempCart') ? localStorage.getItem('tempCart') : '[]') as TempCartItems[];
	categories$: Observable<Category[]> = this.store.select(selectHomeCategoryList);
	products$: Observable<ProductList[]> = this.store.select(selectHomeBestSellingList).pipe(
		map(list => list.map(a => {
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
				productImage: a.productImage ? a.productImage.split(',')[0] : 'xyz.png',
				productPackagesize: a.productPackagesize,
				productReviewCount: a.productReviewCount,
				productRatingCount: a.productRatingCount,
				productRatingAvg: a.productRatingAvg.split('.')[0],
				productSoldCount: a.productSoldCount,
				productStatus: a.productStatus,
				productCreatedDate: a.productCreatedDate,
				categoryName: a.categoryName,
				isFavorite: a.isFavorite,
				similarproducts: a.similarproducts,
				addedCartCount: this.cart.filter(p => p.productID === a.productID).length > 0 ? this.cart.filter(p => p.productID === a.productID)[0].qty : 0,
			}
		}))
	);
	subs = new SubSink();
	constructor(
		private store: Store<State>,
		readonly router: Router,
		private root: RootService,
		private auth: AuthenticationService) {
		this.subs.add(this.root.update$.subscribe(status => {
			if (status === 'refresh_or_reload') {
				this.cart = JSON.parse(localStorage.getItem('tempCart') ? localStorage.getItem('tempCart') : '[]') as TempCartItems[];
				this.products$ = this.store.select(selectHomeBestSellingList).pipe(
					map(list => list.map(a => {
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
							productImage: a.productImage ? a.productImage.split(',')[0] : 'xyz.png',
							productPackagesize: a.productPackagesize,
							productReviewCount: a.productReviewCount,
							productRatingCount: a.productRatingCount,
							productRatingAvg: a.productRatingAvg.split('.')[0],
							productSoldCount: a.productSoldCount,
							productStatus: a.productStatus,
							productCreatedDate: a.productCreatedDate,
							categoryName: a.categoryName,
							isFavorite: a.isFavorite,
							similarproducts: a.similarproducts,
							addedCartCount: this.cart.filter(p => p.productID === a.productID).length > 0 ? this.cart.filter(p => p.productID === a.productID)[0].qty : 0,
						}
					}))
				)
			}
		}));
	}
	orders$: Observable<{ data: TempOrders[]; status: string, message: string }[]> = of(null);
	orders = () => {
		this.orders$ = this.state() as Observable<{ data: TempOrders[]; status: string, message: string }[]>;
	}
	reload = () => {
		this.store.dispatch(new SearchNewQuery(JSON.stringify(tepmOrder)));
	}
	checkStatus = () => {
		// getting auth user data
		this.subs.add(this.auth.user.subscribe(user => {
			if (user) {
				tepmOrder.loginuserID = user.userID;
			}
			if (user === null) {
				tepmOrder.loginuserID = '0';
			}
		}));
	}
	state = () => {
		this.cart = JSON.parse(localStorage.getItem('tempCart') ? localStorage.getItem('tempCart') : '[]') as TempCartItems[];
		return this.store.select(selectTempOrdersList).pipe(
			map((res) => {
				return {
					isSearching: res.isSearching,
					orders: {
						messsage: res.orders$[0].message,
						status: res.orders$[0].status,
						data: res.orders$[0].data.map(d => {
							return {
								orderdetails: d.orderdetails.filter(f => +f.Qty > 0).map(a => {
									return {
										Price: (+a.Qty.split('.')[0] * +a.productPrice).toString(),
										Qty: a.Qty.split('.')[0],
										categoryID: a.categoryID,
										categoryName: a.categoryName,
										productArabicNme: a.productArabicNme,
										productCreatedDate: a.productCreatedDate,
										productDescription: a.productDescription,
										productID: a.productID,
										productImage: a.productImage ? a.productImage.split(',')[0] : 'xyz.png',
										productMOQ: a.productMOQ,
										productName: a.productName,
										productPackagesize: a.productPackagesize,
										productPrice: a.productPrice,
										productPriceVat: a.productPriceVat,
										productRatingAvg: a.productRatingAvg.split('.')[0],
										productRatingCount: a.productRatingCount,
										productReviewCount: a.productReviewCount,
										productSKU: a.productSKU,
										productSoldCount: a.productSoldCount,
										productStatus: a.productStatus,
										productTag: a.productTag,
										subcatID: a.subcatID,
										addedCartCount: a.Qty.split('.')[0],
									}
								}).sort((a, b) => +a.productID - +b.productID),
								billingDetails: {
									delivery_Tip: 10,
									delivery_Fee: 30,
									item_Total: d.orderdetails.filter(f => +f.Qty > 0).map(p => +p.Qty.split('.')[0] * +p.productPrice).reduce((a, b) => a + b, 0),
									vat: d.orderdetails.filter(f => +f.Qty > 0).map(p => (+p.productPriceVat) - (+p.productPrice)).reduce((a, b) => a + b, 0),
									net_Payable: d.orderdetails.filter(f => +f.Qty > 0).map(p => +p.Qty.split('.')[0] * +p.productPrice).reduce((a, b) => a + b, 0) + 30 + 10 + d.orderdetails.filter(f => +f.Qty > 0).map(p => (+p.productPriceVat) - (+p.productPrice)).reduce((a, b) => a + b, 0),
								},
								temporderDate: d.temporderDate,
								temporderID: d.temporderID,
								userFullName: d.userFullName,
								userID: d.userID,
								userMobile: d.userMobile,
							}
						})
					}
				}
			}),
			catchError(() => of([]))) as Observable<{ data: TempOrders[]; status: string, message: string }[]>;
	}
	ngAfterViewInit(): void {
		jQuery(() => {
			// Mobile Navigation
			if ($('.nav-menu').length) {
				var $mobile_nav = $('.nav-menu').clone().prop({
					class: 'mobile-nav d-lg-none'
				});
				$('body').append($mobile_nav);
				$('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
				$('body').append('<div class="mobile-nav-overly"></div>');

				$(document).on('click', '.mobile-nav-toggle', function () {
					$('body').toggleClass('mobile-nav-active');
					$('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
					$('.mobile-nav-overly').toggle();
				});

				$(document).on('click', '.mobile-nav .drop-down > a', function (e) {
					e.preventDefault();
					$(this).next().slideToggle(300);
					$(this).parent().toggleClass('active');
				});

				$(document).on('click', function (e) {
					var container = $(".mobile-nav, .mobile-nav-toggle");
					if (!container.is(e.target.nodeName) && container.has(e.target.nodeName).length === 0) {
						if ($('body').hasClass('mobile-nav-active')) {
							$('body').removeClass('mobile-nav-active');
							$('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
							$('.mobile-nav-overly').fadeOut();
						}
					}
				});
			} else if ($(".mobile-nav, .mobile-nav-toggle").length) {
				$(".mobile-nav, .mobile-nav-toggle").hide();
			}
			// Stick the header at top on scroll
			($("#header") as any).sticky({
				topSpacing: 0,
				zIndex: '50'
			});
			// Real view height for mobile devices
			if (window.matchMedia("(max-width: 767px)").matches) {
				($('#hero') as any).css({
					height: $(window).height()
				});
			}
		});
	}
	search = (s: string) => {
		this.router.navigate(['/products'], { queryParams: { page: '0', categoryID: '0', categoryName: s, q: s } })
	}
	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
	ngOnInit(): void {
		this.checkStatus();
		this.orders();
	}
}

