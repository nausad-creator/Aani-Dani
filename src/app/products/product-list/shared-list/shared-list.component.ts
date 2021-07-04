import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject, of, merge, timer } from 'rxjs';
import { take, catchError, mergeMap, map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication.service';
import { Category, ProductList } from 'src/app/interface';
import { RootService } from 'src/app/root.service';
import { SubSink } from 'subsink';

@Component({
	selector: 'app-shared-list',
	template: `
	<!-- Header -->
	<header id="header">
    <div class="container">
	    <div class="">		    
	      <div class="menu-content">
	      	<div class="main-menu d-flex align-items-center">
		      <nav class="nav-menu d-none d-lg-block" *ngIf="category$ | async as categories">
		        <ul>
		          <li class="drop-down categorymenu">
		          		<a class="maindrop cursr"><i class="icofont-navigation-menu mr-2"></i> All Category</a>
		          		<ul>
						  <li><a class="cursr" (click)="onChange({categoryID: category.categoryID, categoryName: category.categoryName}); loader=true" *ngFor="let category of categories">{{category.categoryName | titlecase}}</a></li>
		          		</ul>	
		          </li>
		          <li *ngFor="let category of categories"><a class="cursr" (click)="onChange({categoryID: category.categoryID, categoryName: category.categoryName}); loader=true">{{category.categoryName | titlecase}}</a></li>		  
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
						<a href="#" class="FilterHandale"><i class="icofont-filter"></i> Filter </a>
					</div>	
					<div class="filterSection">
						<app-shop-by-category (change)="onChange($event); loader=true" [categories]="category$ | async"></app-shop-by-category>
						<app-filter-by-price></app-filter-by-price>
						<!-- <app-filter-by-shape></app-filter-by-shape> -->
						<app-top-selling></app-top-selling>
					</div>
					<br>
				</div>
				<div class="lefprolist mb-3 col-lg-9 col-md-8">	
					<div class="category_slider card">
						<app-sort-header [categoryName]="data.categoryName"></app-sort-header>
						<div class="sparetor_title">
				    <h5 class="mb-0">Item (90)</h5>
				    </div>
					<app-items [products]="product" *ngIf="!loader"></app-items>
					<app-skeleton *ngIf="loader"></app-skeleton>
					</div>				
				</div>
			</div>	
		</div>		
    </section>
    <!--end Listing area-->
  </main><!-- End #main -->
  `,
	styles: [
	], changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharedListComponent implements OnInit, AfterViewInit, OnDestroy {
	data = {
		loginuserID: '1',
		languageID: '1',
		searchWord: '',
		productID: '0',
		subcatID: '0',
		categoryID: '0',
		categoryName: '',
		searchkeyword: '',
		cityName: '',
		minPrice: '',
		maxPrice: '',
		sortBy: '',
		page: '0',
		pagesize: '50',
	};
	constructor(
		readonly router: Router,
		private root: RootService,
		private auth: AuthenticationService,
		private route: ActivatedRoute,
		private cd: ChangeDetectorRef
	) {
		// getting auth user data
		this.subs.add(this.auth.user.subscribe(x => {
			if (x) {
				this.data.loginuserID = x.restaurantID ? x.restaurantID : '1';
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
	subs = new SubSink();
	product: ProductList[];
	products$: Observable<ProductList[]> = of(null);
	category$: Observable<Category[]>;
	forceReload$ = new Subject<void>();
	getProducts = () => {
		return this.root.productLists(JSON.stringify(this.data)).pipe(map((res) => res), take(1),
			catchError(() => of([]))) as Observable<ProductList[]>;
	}
	getCategories = () => {
		return this.root.getCategories('').pipe(map((res) => res), take(1),
			catchError(() => of([]))) as Observable<Category[]>;
	}
	ngOnInit(): void {
		// query changes
		this.data.categoryID = this.route.snapshot.queryParams.categoryID ? this.route.snapshot.queryParams.categoryID : '0';
		this.data.categoryName = this.route.snapshot.queryParams.categoryName ? this.route.snapshot.queryParams.categoryName : 'null';
		this.data.page = this.route.snapshot.queryParams.page ? this.route.snapshot.queryParams.page : '0';
		// categories
		const initialCategory$ = this.root.categories as Observable<Category[]>;
		const updatesCategory$ = this.forceReload$.pipe(mergeMap(() => this.getCategories() as Observable<Category[]>));
		this.category$ = merge(initialCategory$, updatesCategory$);
		this.products();
	}
	onChange = async (category: {categoryID: string, categoryName: string}) => {
		const queryParams: Params = { page: '0', categoryID: category.categoryID, categoryName: category.categoryName };
		this.router.navigate([], 
		  {
			relativeTo: this.route,
			queryParams: queryParams, 
			queryParamsHandling: 'merge', // remove to replace all query params by provided
		  });
		// query changes
		this.data.page = '0';
		this.data.categoryID = category.categoryID ? category.categoryID : '0';
		this.data.categoryName = category.categoryName ? category.categoryName : 'null';
		this.products();
	}
	products = () => {
		// products
		const initialProducts$ = this.getProducts() as Observable<ProductList[]>;
		const updatesProducts$ = this.forceReload$.pipe(mergeMap(() => this.getProducts() as Observable<ProductList[]>));
		this.products$ = merge(initialProducts$, updatesProducts$);
		this.subs.add(this.products$.subscribe((res: ProductList[]) => {
					timer(800).subscribe(() => {
						this.loader = false;
						this.product = res;
						this.cd.markForCheck();
					  });
				}, (err) => {
					this.loader = false;
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
