import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Observable, of, merge } from 'rxjs';
import { take, catchError, mergeMap, map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication.service';
import { Category, ProductList } from 'src/app/interface';
import { RootService } from 'src/app/root.service';
import { SubSink } from 'subsink';

@Component({
	selector: 'app-shared',
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
    <section id="product-detail-section" class="pb-3 pt-4">
		<div class="container">
			<div class="card">
				<app-details [product]="products$ | async"></app-details>
				<app-offers></app-offers> 
		      	<div class="row">
		      		<div class="col-md-8">
		      			<app-descriptions-and-review [product]="products$ | async"></app-descriptions-and-review>	
		      		</div>
		      		<div class="col-md-4 borleft">
		      			<app-top-sellings [similarproduct]="products$ | async"></app-top-sellings>
		      		</div>	
		      	</div>	
			</div>	
		</div>		
    </section>
    <!--end Listing area-->
  </main><!-- End #main -->
  `,
	styles: [
	]
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
	forceReload$ = new Subject<void>();
	category$: Observable<Category[]>;
	subs = new SubSink();
	products$: Observable<ProductList> = of(null);
	getProducts = () => {
		return this.root.productLists(JSON.stringify(this.data)).pipe(map((res) => res[0]), take(1),
			catchError(() => of([]))) as Observable<ProductList>;
	}
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
	ngOnDestroy(): void {
		this.subs.unsubscribe();
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
		this.subs.add(this.route.queryParams.subscribe(async (p: { page: string, categoryID: string, productID: string }) => {
			this.data.page = p.page ? p.page : '0';
			this.data.categoryID = p.categoryID ? p.categoryID : '0';
			this.data.productID = p.productID ? p.productID : '0';
			if (p.productID) {
				this.getData();
			}
			if (!p.productID) {
				this.getData();
			}
		}));
	}
	getData = async () => {
		// products
		const initialProducts$ = this.getProducts() as Observable<ProductList>;
		const updatesProducts$ = this.forceReload$.pipe(mergeMap(() => this.getProducts() as Observable<ProductList>));
		this.products$ = merge(initialProducts$, updatesProducts$);
		this.products$.subscribe(r => console.log(r));
		this.cd.markForCheck();
	}
}
