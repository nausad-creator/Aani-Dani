import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject, of, merge } from 'rxjs';
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
		          		<a class="maindrop" href="#"><i class="icofont-navigation-menu mr-2"></i> All Category</a>
		          		<ul>
						  <li><a routerLink="/products" [queryParams]="{page: '0', categoryID: category.categoryID}" *ngFor="let category of categories">{{category.categoryName | titlecase}}</a></li>
		          		</ul>	
		          </li>
		          <li *ngFor="let category of categories"><a routerLink="/products" [queryParams]="{page: '0', categoryID: category.categoryID}">{{category.categoryName | titlecase}}</a></li>		  
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
						<app-shop-by-category [categories]="category$ | async"></app-shop-by-category>
						<app-filter-by-price></app-filter-by-price>
						<app-filter-by-shape></app-filter-by-shape>
						<app-top-selling></app-top-selling>
					</div>
					<br>
				</div>
				<div class="lefprolist mb-3 col-lg-9 col-md-8">	
					<div class="category_slider card">
						<app-sort-header></app-sort-header>
						<div class="sparetor_title">
				    <h5 class="mb-0">Item (90)</h5>
				    </div>
					<app-items [products]="products$ | async"></app-items>
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
	subs = new SubSink();
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
		// categories
		const initialCategory$ = this.root.categories as Observable<Category[]>;
		const updatesCategory$ = this.forceReload$.pipe(mergeMap(() => this.getCategories() as Observable<Category[]>));
		this.category$ = merge(initialCategory$, updatesCategory$);
		// query changes
		this.subs.add(this.route.queryParams.subscribe(async (p: { page: string, categoryID: string }) => {
			this.data.page = p.page ? p.page : '0';
			this.data.categoryID = p.categoryID ? p.categoryID : '0';
			if (p.categoryID) {
				this.getData();
			}
			if (!p.categoryID) {
				this.getData();
			}
		}));
	}
	getData = async () => {
		// products
		const initialProducts$ = this.getProducts() as Observable<ProductList[]>;
		const updatesProducts$ = this.forceReload$.pipe(mergeMap(() => this.getProducts() as Observable<ProductList[]>));
		this.products$ = merge(initialProducts$, updatesProducts$);
		this.cd.markForCheck();
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
