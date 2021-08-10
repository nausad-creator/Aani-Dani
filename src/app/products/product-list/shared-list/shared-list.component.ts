import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject, of, merge, timer } from 'rxjs';
import { take, catchError, mergeMap, map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication.service';
import { Category, ProductList, TempCartItems } from 'src/app/interface';
import { selectHomeCategoryList, State } from 'src/app/reducers';
import { RootService } from 'src/app/root.service';
import { SubSink } from 'subsink';
import { data } from 'src/app/global';
import { dataChange } from 'src/app/global';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-shared-list',
	template: `
	<app-header></app-header> <!-- Top Bar -->
	<!-- Header -->
	<header id="header">
    <div class="container">
	    <div class="">		    
	      <div class="menu-content">
	      	<div class="main-menu d-flex align-items-center">
		      <nav class="nav-menu d-none d-lg-block" *ngIf="categories$ | async as categories">
		        <ul>
		          <li class="drop-down categorymenu">
		          		<a class="maindrop cursr"><i class="icofont-navigation-menu mr-2"></i> {{'all_category' | translate}}</a>
		          		<ul>
						  <li><a class="cursr" (click)="onChange({categoryID: category?.categoryID, categoryName: category?.categoryName});" *ngFor="let category of categories">{{(root.languages$
											| async) === 'en' ?
											category?.categoryName :
											category?.categoryArabicName}}</a></li>
		          		</ul>	
		          </li>
		          <li *ngFor="let category of categories"><a class="cursr" (click)="onChange({categoryID: category?.categoryID, categoryName: category?.categoryName});">{{(root.languages$
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
    <section id="product-list-section" class="pb-3 pt-4">
		<div class="container">
			<div class="row">			
				<div class="col-lg-3 col-md-4">
					<div class="Mobilefilter">
						<a href="#" class="FilterHandale"><i class="icofont-filter"></i> {{'filter' | translate}} </a>
					</div>	
					<div class="filterSection">
						<app-shop-by-category (change)="onChange($event);" [categories]="categories$ | async"></app-shop-by-category>
						<app-filter-by-price [preventAbuse]="preventAbuse" (filterByPrice)="onFilter($event); preventAbuse=true"></app-filter-by-price>
						<app-top-selling [products]="product.bestselling" *ngIf="!loader"></app-top-selling>
						<app-skeleton-top-selling *ngIf="loader"></app-skeleton-top-selling>
					</div>
					<br>
				</div>
				<div class="lefprolist mb-3 col-lg-9 col-md-8">	
					<div class="category_slider card">
						<app-sort-header (sortBy)="onSort($event);" [categoryName]="route.snapshot.queryParams?.categoryName"></app-sort-header>
						<div class="sparetor_title">
				    <h5 class="mb-0">{{product.itemscount ? ('item' | translate) + ' ' + '('+ (+product.itemscount<10?'0'+product.itemscount:product.itemscount) +')' : ('item' | translate) + ' ' + '('+ '00' +')'}}</h5>
				    </div>
					<app-items [products]="product.data" *ngIf="!loader"></app-items>
					<app-skeleton *ngIf="loader"></app-skeleton>
					</div>				
				</div>
			</div>	
		</div>		
    </section>
    <!--end Listing area-->
  </main><!-- End #main -->
  <app-footer></app-footer> <!-- Footer Section -->
  <app-scroll-to-top></app-scroll-to-top> <!-- Scroll-to-top Section -->
  `,
	styles: [
	], changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharedListComponent implements OnInit, AfterViewInit, OnDestroy {
	categories$: Observable<Category[]> = this.store.select(selectHomeCategoryList);
	cart: TempCartItems[] = JSON.parse(localStorage.getItem('tempCart') ? localStorage.getItem('tempCart') : '[]') as TempCartItems[];
	constructor(
		private store: Store<State>,
		readonly router: Router,
		private root: RootService,
		private auth: AuthenticationService,
		public route: ActivatedRoute,
		private cd: ChangeDetectorRef
	) {
		// getting auth user data
		this.subs.add(this.auth.user.subscribe(x => {
			if (x) {
				data.loginuserID = '1';
			}
		}));
		this.subs.add(this.root.update$.subscribe(status => {
			if (status === 'refresh_or_reload') {
				this.cart = JSON.parse(localStorage.getItem('tempCart') ? localStorage.getItem('tempCart') : '[]') as TempCartItems[];
				this.forceReload$.next();
			}
		}));
	}
	ngAfterViewInit(): void {
		this.jquery();
	}
	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
	loader = true;
	preventAbuse: boolean;
	subs = new SubSink();
	product: { data: ProductList[]; itemscount: string; bestselling: ProductList[]; message: string; status: string; } = {
		data: [],
		itemscount: '0',
		bestselling: [],
		message: '',
		status: ''
	};
	changedCountHeader: number;
	products$: Observable<{ data: ProductList[]; itemscount: string; bestselling: ProductList[]; message: string; status: string; }> = of(null);
	forceReload$ = new Subject<void>();
	getProducts = (t: string) => {
		return this.root.productLists(t).pipe(map(r => {
			return {
				status: r.status,
				message: r.message,
				itemscount: r.itemscount,
				bestselling: r.bestselling.map(a => {
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
						similarproducts: a.similarproducts,
						addedCartCount: this.cart.filter(p => p.productID === a.productID).length > 0 ? this.cart.filter(p => p.productID === a.productID)[0].qty : 0,
					}
				}),
				data: r.data.map(a => {
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
						similarproducts: a.similarproducts,
						addedCartCount: this.cart.filter(p => p.productID === a.productID).length > 0 ? this.cart.filter(p => p.productID === a.productID)[0].qty : 0,
					}
				})
			}
		}), take(1),
			catchError(() => of([]))) as Observable<{
				data: ProductList[];
				itemscount: string;
				bestselling: ProductList[];
				message: string;
				status: string;
			}>;
	}
	updateCart = () => {
		this.cart = JSON.parse(localStorage.getItem('tempCart') ? localStorage.getItem('tempCart') : '[]') as TempCartItems[];
	}
	ngOnInit(): void {
		// query changes
		data.categoryID = this.route.snapshot.queryParams?.categoryID ? this.route.snapshot.queryParams?.categoryID : '0';
		data.categoryName = this.route.snapshot.queryParams?.categoryName ? this.route.snapshot.queryParams?.categoryName : 'null';
		data.page = this.route.snapshot.queryParams?.page ? this.route.snapshot.queryParams?.page : '0';
		this.products(JSON.stringify(data));
	}
	onChange = async (category: { categoryID: string, categoryName: string }) => {
		if (category?.categoryID !== this.route.snapshot.queryParams?.categoryID) {
			// query changes
			this.loader = true;
			dataChange.page = '0';
			dataChange.categoryID = category?.categoryID ? category?.categoryID : '0';
			dataChange.categoryName = category?.categoryName ? category?.categoryName : 'null';
			this.products(JSON.stringify(dataChange));
			// updating query-param
			data.page = '0';
			data.categoryID = category?.categoryID ? category?.categoryID : '0';
			data.categoryName = category?.categoryName ? category?.categoryName : 'null';
			const queryParams: Params = { page: '0', categoryID: category?.categoryID, categoryName: category?.categoryName };
			this.router.navigate([],
				{
					relativeTo: this.route,
					queryParams: queryParams,
					queryParamsHandling: 'merge', // remove to replace all query params by provided
				});
		}
	}
	products = (temp: string) => {
		// products
		const initialProducts$ = this.getProducts(temp) as Observable<{ data: ProductList[]; itemscount: string; bestselling: ProductList[]; message: string; status: string; }>;
		const updatesProducts$ = this.forceReload$.pipe(mergeMap(() => this.getProducts(temp) as Observable<{ data: ProductList[]; itemscount: string; bestselling: ProductList[]; message: string; status: string; }>));
		this.products$ = merge(initialProducts$, updatesProducts$);
		this.subs.add(this.products$.subscribe((res: { data: ProductList[]; itemscount: string; bestselling: ProductList[]; message: string; status: string; }) => {
			timer(500).subscribe(() => {
				this.product = res;
				this.loader = false;
				this.cd.markForCheck();
			});
		}, (err) => {
			this.loader = false;
			console.error(err);
		}));
	}
	onFilter = ($temp: string) => {
		data.minPrice = $temp.split(';')[0];
		data.maxPrice = $temp.split(';')[1];
		this.subs.add(this.getProducts(JSON.stringify(data)).subscribe((res: { data: ProductList[]; itemscount: string; bestselling: ProductList[]; message: string; status: string; }) => {
			this.product = res;
			this.preventAbuse = false;
			this.cd.markForCheck();
		}, (err) => {
			console.error(err);
		}));
	}
	onSort = ($temp: string) => {
		data.sortBy = $temp ? $temp : '';
		this.subs.add(this.getProducts(JSON.stringify(data)).subscribe((res: { data: ProductList[]; itemscount: string; bestselling: ProductList[]; message: string; status: string; }) => {
			this.product = res;
			this.cd.markForCheck();
		}, (err) => {
			console.error(err);
		}));
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
