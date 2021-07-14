import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { merge, Observable, of, Subject, timer } from 'rxjs';
import { take, catchError, mergeMap, map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication.service';
import { data, tepmOrder } from 'src/app/global';
import { Category, ProductList, TempCartItems, TempOrders } from 'src/app/interface';
import { selectHomeBestSellingList, selectHomeCategoryList, State } from 'src/app/reducers';
import { RootService } from 'src/app/root.service';
import { SubSink } from 'subsink';

@Component({
    selector: 'app-cart',
    template: `
  <app-header [update]="ordersList ? ordersList[0].orderdetails.length : 0"></app-header> <!-- Top Bar -->
  <!-- Header -->
  <header id="header">
    <div class="container">
	    <div class="">		    
	      <div class="menu-content">
	      	<div class="main-menu d-flex align-items-center">
		      <nav class="nav-menu d-none d-lg-block" *ngIf="categories$ | async as categories">
		        <ul>
		          <li class="drop-down categorymenu">
		          		<a class="maindrop" href="#"><i class="icofont-navigation-menu mr-2"></i> All Category</a>
		          		<ul>
						  <li><a routerLink="/products" [queryParams]="{page: '0', categoryID: category?.categoryID}" *ngFor="let category of categories">{{category?.categoryName | titlecase}}</a></li>
		          		</ul>	
		          </li>
		          <li *ngFor="let category of categories"><a routerLink="/products" [queryParams]="{page: '0', categoryID: category?.categoryID}">{{category?.categoryName | titlecase}}</a></li>		  
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
            <div class="brandcamp"><a href="index.html">Home  &gt;</a> <span> My Cart</span> </div>
            <div class="card mt-3">
                <div class="row m-0 pt-3 pb-3">
                    <div class="col-lg-8">
                        <app-shared-details (updateCart)="forceReload$.next()" [orders]="ordersList" *ngIf="!loader"></app-shared-details>
                        <app-shared-skeleton *ngIf="loader"></app-shared-skeleton>
                    </div>	
                    <div class="col-lg-4 ">
                        <app-shared-billing [billingDetails]="ordersList[0].billingDetails" *ngIf="!loader"></app-shared-billing>	
                        <app-skeleton-billing *ngIf="loader"></app-skeleton-billing>
                    </div>
                    <!-- when empty -->
                    <div class="col-lg-12" style="margin-top: 20px; min-height: 180px" *ngIf="!loader">
                            <div class="table-responsive" *ngIf="ordersList[0].orderdetails.length===0">
                              <p class="text-center pt-20">Your cart is empty.</p>
                    </div>  
                    </div>
                </div>	
            </div>	
        </div>	
    </section>	

   <app-shared-best-selling (updateHeader)="forceReload$.next()" [products]="products" *ngIf="products$ | async as products"></app-shared-best-selling>
   <app-skeleton *ngIf="(products$ | async) === null"></app-skeleton>

</main><!-- End #main -->
<app-footer></app-footer> <!-- Footer Section -->
<app-scroll-to-top></app-scroll-to-top> <!-- Scroll-to-top Section -->
  `,
    styles: [
    ]
})
export class CartComponent implements OnInit, OnDestroy, AfterViewInit {
    loginuserID: string;
    cart:TempCartItems[] = JSON.parse(localStorage.getItem('tempCart') ? localStorage.getItem('tempCart') : '[]') as TempCartItems[];
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
				productImage: a.productImage,
				productPackagesize: a.productPackagesize,
				productReviewCount: a.productReviewCount,
				productRatingCount: a.productRatingCount,
				productRatingAvg: a.productRatingAvg,
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
        private auth: AuthenticationService,
        private cd: ChangeDetectorRef) { }
    loader = true;
    preventAbuse: boolean;
    ordersList: TempOrders[];
    orders$: Observable<{
        data: TempOrders[];
        status: string
        message: string
    }[]> = of(null);
    forceReload$ = new Subject<void>();
    getOrders = (t: string) => {
        return this.root.ordersTemp(t).pipe(map((res) => {
            return [{
                messsage: res[0].status,
                status: res[0].status,
                data: res[0].data.map(d => {
                    return {
                    orderdetails: d.orderdetails.filter(f => +f.Qty > 0).map(a => {
                        return {
                            Price: a.Price,
                            Qty: a.Qty.split('.')[0],
                            categoryID: a.categoryID,
                            categoryName: a.categoryName,
                            productArabicNme: a.productArabicNme,
                            productCreatedDate: a.productCreatedDate,
                            productDescription: a.productDescription,
                            productID: a.productID,
                            productImage: a.productImage,
                            productMOQ: a.productMOQ,
                            productName: a.productName,
                            productPackagesize: a.productPackagesize,
                            productPrice: a.productPrice,
                            productPriceVat: a.productPriceVat,
                            productRatingAvg: a.productRatingAvg,
                            productRatingCount: a.productRatingCount,
                            productReviewCount: a.productReviewCount,
                            productSKU: a.productSKU,
                            productSoldCount: a.productSoldCount,
                            productStatus: a.productStatus,
                            productTag: a.productTag,
                            subcatID: a.subcatID,
                        }
                    }),
                    billingDetails: {
                        delivery_Tip: 10,
                        delivery_Fee: 30,
                        item_Total: d.orderdetails.filter(f => +f.Qty > 0).map(p => +p.productPrice).reduce((a, b) => a + b, 0),
                        vat: d.orderdetails.filter(f => +f.Qty > 0).map(p => (+p.productPriceVat) - (+p.productPrice)).reduce((a, b) => a + b, 0),
                        net_Payable: d.orderdetails.filter(f => +f.Qty > 0).map(p => +p.productPriceVat).reduce((a, b) => a + b, 0) + 30 + 10,
                    },
	                temporderDate: d.temporderDate,
	                temporderID: d.temporderID,
	                userFullName: d.userFullName,
	                userID: d.userID,
	                userMobile: d.userMobile,
                    }
                })
            }]
        }), take(1),
            catchError(() => of([]))) as Observable<{
                data: TempOrders[];
                status: string
                message: string
            }[]>;
    }
    orders = (temp: string) => {
        // products
        const initial$ = this.getOrders(temp) as Observable<{
            data: TempOrders[];
            status: string
            message: string
        }[]>;
        const updates$ = this.forceReload$.pipe(mergeMap(() => this.getOrders(temp) as Observable<{
            data: TempOrders[];
            status: string
            message: string
        }[]>));
        this.orders$ = merge(initial$, updates$);
        this.subs.add(this.orders$.subscribe((res: {
            data: TempOrders[];
            status: string
            message: string
        }[]) => {
            if (res[0].status === 'true') {
                timer(500).subscribe(() => {
                    this.ordersList = res[0].data;
                    this.loader = false;
                    this.cd.markForCheck();
                });
            }
            if (res[0].status === 'false') {
                timer(500).subscribe(() => {
                    this.ordersList = [];
                    this.loader = false;
                    this.cd.markForCheck();
                });
            }
        }, (err) => {
            this.loader = false;
            console.error(err);
        }));
    }
    checkStatus = () => {
        // getting auth user data
        this.subs.add(this.auth.user.subscribe(user => {
            if (user) {
                tepmOrder.loginuserID = user.userID;
                data.loginuserID = user.userID;
                this.cd.markForCheck();
            }
            if (user === null) {
                tepmOrder.loginuserID = '0';
                data.loginuserID = '0';
                this.cd.markForCheck();
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
    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
    ngOnInit(): void {
        this.checkStatus();
        this.orders(JSON.stringify(tepmOrder));
    }
}

