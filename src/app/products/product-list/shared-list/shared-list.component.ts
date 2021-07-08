import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject, of, merge, timer } from 'rxjs';
import { take, catchError, mergeMap, map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication.service';
import { Category, ProductList } from 'src/app/interface';
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
		          		<a class="maindrop cursr"><i class="icofont-navigation-menu mr-2"></i> All Category</a>
		          		<ul>
						  <li><a class="cursr" (click)="onChange({categoryID: category?.categoryID, categoryName: category?.categoryName}); loader=true" *ngFor="let category of categories">{{category?.categoryName | titlecase}}</a></li>
		          		</ul>	
		          </li>
		          <li *ngFor="let category of categories"><a class="cursr" (click)="onChange({categoryID: category?.categoryID, categoryName: category?.categoryName}); loader=true">{{category?.categoryName | titlecase}}</a></li>		  
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
						<app-shop-by-category (change)="onChange($event); loader=true" [categories]="categories$ | async"></app-shop-by-category>
						<app-filter-by-price [preventAbuse]="preventAbuse" (filterByPrice)="onFilter($event); preventAbuse=true"></app-filter-by-price>
						<!-- <app-filter-by-shape></app-filter-by-shape> -->
						<app-top-selling></app-top-selling>
					</div>
					<br>
				</div>
				<div class="lefprolist mb-3 col-lg-9 col-md-8">	
					<div class="category_slider card">
						<app-sort-header (sortBy)="onSort($event);" [categoryName]="route.snapshot.queryParams?.categoryName"></app-sort-header>
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
  <app-footer></app-footer> <!-- Footer Section -->
  <app-scroll-to-top></app-scroll-to-top> <!-- Scroll-to-top Section -->
  `,
	styles: [
	], changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharedListComponent implements OnInit, AfterViewInit, OnDestroy {
	categories$: Observable<Category[]> = this.store.select(selectHomeCategoryList);
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
	product: ProductList[];
	products$: Observable<ProductList[]> = of(null);
	forceReload$ = new Subject<void>();
	getProducts = (t: string) => {
		return this.root.productLists(t).pipe(map((res) => res), take(1),
			catchError(() => of([]))) as Observable<ProductList[]>;
	}
	ngOnInit(): void {
		// query changes
		data.categoryID = this.route.snapshot.queryParams.categoryID ? this.route.snapshot.queryParams.categoryID : '0';
		data.categoryName = this.route.snapshot.queryParams.categoryName ? this.route.snapshot.queryParams.categoryName : 'null';
		data.page = this.route.snapshot.queryParams.page ? this.route.snapshot.queryParams.page : '0';
		this.products(JSON.stringify(data));
	}
	onChange = async (category: { categoryID: string, categoryName: string }) => {
		// query changes
		dataChange.page = '0';
		dataChange.categoryID = category.categoryID ? category.categoryID : '0';
		dataChange.categoryName = category.categoryName ? category.categoryName : 'null';
		this.products(JSON.stringify(dataChange));
		// updating query-param
		data.page = '0';
		data.categoryID = category.categoryID ? category.categoryID : '0';
		data.categoryName = category.categoryName ? category.categoryName : 'null';
		const queryParams: Params = { page: '0', categoryID: category.categoryID, categoryName: category.categoryName };
		this.router.navigate([],
			{
				relativeTo: this.route,
				queryParams: queryParams,
				queryParamsHandling: 'merge', // remove to replace all query params by provided
			});
	}
	products = (temp: string) => {
		// products
		const initialProducts$ = this.getProducts(temp) as Observable<ProductList[]>;
		const updatesProducts$ = this.forceReload$.pipe(mergeMap(() => this.getProducts(temp) as Observable<ProductList[]>));
		this.products$ = merge(initialProducts$, updatesProducts$);
		this.subs.add(this.products$.subscribe((res: ProductList[]) => {
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
		this.getProducts(JSON.stringify(data)).subscribe((res: ProductList[]) => {
				this.product = res;
				this.preventAbuse = false;
				this.cd.markForCheck();
		}, (err) => {
			console.error(err);
		});
	}
	onSort = ($temp: string) => {
		data.sortBy = $temp ? $temp : '';
		this.getProducts(JSON.stringify(data)).subscribe((res: ProductList[]) => {
				this.product = res;
				this.cd.markForCheck();
		}, (err) => {
			console.error(err);
		});
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
