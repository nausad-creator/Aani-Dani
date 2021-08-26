import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject, of, merge } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication.service';
import { Category, ProductList, TempCartItems } from 'src/app/interface';
import { selectHomeCategoryList, selectProductList, State } from 'src/app/reducers';
import { RootService } from 'src/app/root.service';
import { SubSink } from 'subsink';
import { Store } from '@ngrx/store';
import { Pipe, PipeTransform } from '@angular/core';
import { FilterQuery, LoadInitial, SearchGlobal, SearchNewQuery, SortingQuery } from 'src/app/actions/products.action';
import { change, filter_sort, initial, search_global } from 'src/app/global';

@Component({
	selector: 'app-shared-list',
	template: `
<app-header [isSearch]="(product_state$ | async)?.isSearch" (search)="search($event)"></app-header>
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
									<li><a class="cursr"
											(click)="onChange(category);"
											*ngFor="let category of categories">{{(root.languages$
											| async) === 'en' ?
											category?.categoryName :
											category?.categoryArabicName}}</a>
									</li>
								</ul>
							</li>
							<li *ngFor="let category of categories | slice:0:5"><a [ngClass]="{'active': category.categoryID===route.snapshot.queryParams?.categoryID}" class="cursr"
									(click)="onChange(category);">{{(root.languages$
									| async) === 'en' ?
									category?.categoryName :
									category?.categoryArabicName}}</a></li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
	</div>
</header>
<!-- End Header -->
<main id="main">
	<section id="product-list-section" class="pb-3 pt-4">
		<div class="container">
			<div class="row">
				<div class="col-lg-3 col-md-4">
					<div class="Mobilefilter">
						<a class="FilterHandale cursr"><i class="icofont-filter"></i>
							{{'filter' | translate}} </a>
					</div>
					<div class="filterSection">
						<app-shop-by-category [selected]="route.snapshot.queryParams?.categoryID" (change)="onChange($event);"
							[categories]="categories$ | async"></app-shop-by-category>
						<app-filter-by-price [filtered]="filtered" [preventAbuse]="(product_state$ | async)?.isFilter"
							(filterByPrice)="onFilter($event);filtered=$event"
							(clearFilter)="onClear();filtered=''">
						</app-filter-by-price>
						<app-top-selling [products]="(product_state$ | async)?.products$?.bestselling" *ngIf="!(product_state$ | async)?.isChange">
						</app-top-selling>
						<app-skeleton-top-selling *ngIf="(product_state$ | async)?.isChange"></app-skeleton-top-selling>
					</div>
					<br>
				</div>
				<div class="lefprolist mb-3 col-lg-9 col-md-8">
					<div class="category_slider card">
						<app-sort-header (sortBy)="onSort($event);"
							[preventAbuse]="(product_state$ | async)?.isSorting"
							[categoryName]="(root.languages$
									| async) === 'en' ?
									(route.snapshot.queryParams?.categoryName | splitEnglish) :
									(route.snapshot.queryParams?.categoryName | splitArabic)">
						</app-sort-header>
						<div class="sparetor_title">
							<h5 class="mb-0">{{(product_state$ | async)?.products$?.itemscount ? ('item' | translate) + ' ' + '('+ (+(product_state$ | async)?.products$?.itemscount<10?'0'+(product_state$ | async)?.products$?.itemscount:(product_state$ | async)?.products$?.itemscount) +')' : ('item' | translate) + ' ' + '(' + '00' + ')'}}</h5>
						</div>
						<app-items [products]="(product_state$ | async)?.products$?.data" *ngIf="!(product_state$ | async)?.isChange"></app-items>
						<app-skeleton *ngIf="(product_state$ | async)?.isChange"></app-skeleton>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>
<app-footer></app-footer>
<app-scroll-to-top></app-scroll-to-top>
  `,
	styles: [
	]
})
export class SharedListComponent implements OnInit, AfterViewInit, OnDestroy {
	subs = new SubSink();
	filtered: string;
	forceReload$ = new Subject<void>();
	categories$: Observable<Category[]> = this.store.select(selectHomeCategoryList);
	cart: TempCartItems[] = JSON.parse(localStorage.getItem('tempCart') ? localStorage.getItem('tempCart') : '[]') as TempCartItems[];
	product_state$: Observable<{
		isChange: boolean;
		isSearch: boolean;
		isFilter: boolean;
		isSorting: boolean;
		preset: string;
		query: string;
		products$: {
			data: ProductList[];
			itemscount: string;
			bestselling: ProductList[];
			message: string;
			status: string;
		}
	}>
	constructor(
		private store: Store<State>,
		readonly router: Router,
		public root: RootService,
		private auth: AuthenticationService,
		public route: ActivatedRoute) {
		this.subs.add(this.auth.user.subscribe(x => {
			if (x) {
				initial.loginuserID = '1';
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
	ngOnInit(): void {
		// query changes
		initial.categoryID = this.route.snapshot.queryParams?.categoryID ? this.route.snapshot.queryParams?.categoryID : '0';
		initial.categoryName = this.route.snapshot.queryParams?.categoryName ? this.route.snapshot.queryParams?.categoryName : 'undefined';
		initial.page = this.route.snapshot.queryParams?.page ? this.route.snapshot.queryParams?.page : '0';
		this.store.dispatch(new LoadInitial(JSON.stringify(initial)));
		this.state_product();
	}
	state_product = () => {
		// products
		const initial$ = this.state() as Observable<{
			isChange: boolean;
			isSearch: boolean;
			isFilter: boolean;
			isSorting: boolean;
			preset: string;
			query: string;
			products$: {
				data: ProductList[];
				itemscount: string;
				bestselling: ProductList[];
				message: string;
				status: string;
			}
		}>;
		const updates$ = this.forceReload$.pipe(mergeMap(() => this.state() as Observable<{
			isChange: boolean;
			isSearch: boolean;
			isFilter: boolean;
			isSorting: boolean;
			preset: string;
			query: string;
			products$: {
				data: ProductList[];
				itemscount: string;
				bestselling: ProductList[];
				message: string;
				status: string;
			}
		}>));
		this.product_state$ = merge(initial$, updates$);
	}
	state = () => {
		return this.store.select(selectProductList).pipe(
			map((r: {
				isChange: boolean;
				isSearch: boolean;
				isFilter: boolean;
				isSorting: boolean;
				preset: string;
				query: string;
				products$: {
					data: ProductList[];
					itemscount: string;
					bestselling: ProductList[];
					message: string;
					status: string;
				}
			}) => {
				return {
					isChange: r.isChange,
					isSearch: r.isSearch,
					isSorting: r.isSorting,
					isFilter: r.isFilter,
					preset: r.preset,
					query: r.query,
					products$: {
						status: r.products$.status,
						message: r.products$.message,
						itemscount: r.products$.itemscount,
						bestselling: r.products$.bestselling.map(a => {
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
						}),
						data: r.products$.data.map(a => {
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
						})
					}
				}
			}),
			catchError(() => of([]))) as Observable<{
				isChange: boolean;
				isSearch: boolean;
				isFilter: boolean;
				isSorting: boolean;
				preset: string;
				query: string;
				products$: {
					data: ProductList[];
					itemscount: string;
					bestselling: ProductList[];
					message: string;
					status: string;
				}
			}>;
	}
	onChange = async (category: Category) => {
		change.page = '0';
		change.categoryID = category?.categoryID ? category?.categoryID : '0';
		change.categoryName = category?.categoryName ? `${category?.categoryName}_${category?.categoryArabicName}` : 'undefined';
		this.store.dispatch(new SearchNewQuery(JSON.stringify(change)));
	}
	onFilter = ($temp: string) => {
		filter_sort.minPrice = $temp.split(';')[0];
		filter_sort.maxPrice = $temp.split(';')[1];
		filter_sort.categoryID = this.route.snapshot.queryParams?.categoryID ? this.route.snapshot.queryParams?.categoryID : '0';
		this.store.dispatch(new FilterQuery(JSON.stringify(filter_sort)));
	}
	onClear = () => {
		filter_sort.minPrice = '';
		filter_sort.maxPrice = '';
		filter_sort.categoryID = this.route.snapshot.queryParams?.categoryID ? this.route.snapshot.queryParams?.categoryID : '0';
		this.store.dispatch(new FilterQuery(JSON.stringify(filter_sort)));
	}
	onSort = ($temp: string) => {
		filter_sort.sortBy = $temp ? $temp : '';
		filter_sort.categoryID = this.route.snapshot.queryParams?.categoryID ? this.route.snapshot.queryParams?.categoryID : '0';
		this.store.dispatch(new SortingQuery(JSON.stringify(filter_sort)));
	}
	search = (s: string) => {
		search_global.searchkeyword = s;
		search_global.categoryID = s ? '0' : this.route.snapshot.queryParams?.categoryID;
		this.store.dispatch(new SearchGlobal(JSON.stringify(search_global)));
	}
	ngAfterViewInit(): void {
		this.jquery();
	}
	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
	jquery = () => {
		jQuery(() => {
			// Mobile Navigation
			if ($('.nav-menu').length) {
				var $mobile_nav = $('.nav-menu').clone().prop({
					class: 'mobile-nav d-lg-none'
				});
				$('body').append($mobile_nav);
				$('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
				$('body').append('<div class="mobile-nav-overly"></div>');

				$(document).on('click', '.mobile-nav-toggle', function (e) {
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
			// filter
			$(".FilterHandale").on('click', function () {
				$(".filterSection").toggleClass("ShowFilter");
				$(this).toggleClass("ShowClose");
			});
		})
	}
}

@Pipe({
	name: 'splitArabic'
})
export class ArabicPipe implements PipeTransform {
	transform(name: string): string {
		if (name == "" || name == null) {
			name = "undefined";
		}
		return name.split("_")[1];
	}
}
@Pipe({
	name: 'splitEnglish'
})
export class EnglishPipe implements PipeTransform {
	transform(name: string): string {
		if (name == "" || name == null) {
			name = "undefined";
		}
		return name.split("_")[0];
	}
}
