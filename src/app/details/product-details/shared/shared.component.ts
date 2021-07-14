import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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
  <app-header [update]="changedCountHeader ? changedCountHeader : 0"></app-header> <!-- Top Bar -->
  <!-- Header -->
  <header id="header">
    <div class="container">
	    <div class="">		    
	      <div class="menu-content">
	      	<div class="main-menu d-flex align-items-center">
		      <nav class="nav-menu d-none d-lg-block" *ngIf="categories$ | async as categories">
		        <ul>
		          <li class="drop-down categorymenu">
		          		<a class="maindrop cursr"><i class="icofont-navigation-menu mr-2"></i> All Category</a>
		          		<ul>
						  <li><a routerLink="/products" [queryParams]="{page: '0', categoryID: category?.categoryID, categoryName: category?.categoryName}" *ngFor="let category of categories">{{category?.categoryName | titlecase}}</a></li>
		          		</ul>	
		          </li>
		          <li *ngFor="let category of categories"><a routerLink="/products" [queryParams]="{page: '0', categoryID: category?.categoryID, categoryName: category?.categoryName}">{{category?.categoryName | titlecase}}</a></li>		  
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
				<app-details (updateHeader)="changedCountHeader=$event.res" [product]="product"></app-details>
				<!-- <app-offers></app-offers>  -->
		      	<div class="row">
		      		<div class="col-md-8">
		      			<app-descriptions-and-review [product]="product"></app-descriptions-and-review>	
		      		</div>
		      		<div class="col-md-4 borleft">
		      			<app-top-sellings (updateFromSimilar)="changedCountHeader=$event.res" (change)="onChange($event); loader=true" [similarproduct]="product.similarproducts"></app-top-sellings>
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
export class SharedComponent implements OnInit, OnDestroy, AfterViewInit {
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
	changedCountHeader: number;
	forceReload$ = new Subject<void>();
	categories$: Observable<Category[]> = this.store.select(selectHomeCategoryList);
	subs = new SubSink();
	products$: Observable<ProductList[]> = of(null);
	product: ProductList;
	cart: TempCartItems[] = JSON.parse(localStorage.getItem('tempCart') ? localStorage.getItem('tempCart') : '[]') as TempCartItems[];
	getProducts = () => {
		return this.root.productLists(JSON.stringify(this.data)).pipe(map(list => list.map(a => {
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
		});
	}
	updateCart = () => {
		this.cart = JSON.parse(localStorage.getItem('tempCart') ? localStorage.getItem('tempCart') : '[]') as TempCartItems[];
	}
	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
	ngOnInit(): void {
		// query changes
		this.data.productID = this.route.snapshot.queryParams.productID ? this.route.snapshot.queryParams.productID : '0';
		this.data.page = this.route.snapshot.queryParams.page ? this.route.snapshot.queryParams.page : '0';
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
