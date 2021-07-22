import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { merge, Observable, of, Subject, timer } from 'rxjs';
import { catchError, map, mergeMap, take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication.service';
import { tepmOrder } from 'src/app/global';
import { TempCartItems, Category, ProductList, TempOrders, OrderDetailsTemp, USER_RESPONSE, ADDRESS } from 'src/app/interface';
import { selectHomeCategoryList, selectHomeBestSellingList, State } from 'src/app/reducers';
import { RootService } from 'src/app/root.service';
import { SubSink } from 'subsink';
import { PaymentAlertComponent } from './payment-alert.component';
import { SuccessPlacedOrderComponent } from './success.pop-up.component';

@Component({
	selector: 'app-checkout',
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
		          <a class="maindrop" href="#"><i class="icofont-navigation-menu mr-2"></i> All Category</a>
		          <ul>
			  <li><a routerLink="/products" [queryParams]="{page: '0', categoryID: category?.categoryID}" *ngFor="let category of categories">{{category?.categoryName | titlecase}}</a></li>
		          </ul>	
		          </li>
		          <li *ngFor="let category of categories"><a routerLink="/products" [queryParams]="{page: '0', categoryID: category?.categoryID}">{{category?.categoryName | titlecase}}</a></li>		  
		        </ul>
		      </nav>			
		    </div> 			
		</div>
	</div>  	  
    </div>
  </header>
  <!-- End Header -->
  <main id="main">
    <section id="cart-section" class="pb-3 pt-4">
        <div class="container">
            <div class="brandcamp"><a routerLink='/'>Home  &gt;</a> <span> Checkout</span> </div>
            <div class="card mt-3">
                <div class="row m-0 pt-3 pb-3">
                    <div class="col-lg-7">
                        <div class="addressContent">
                            <div class="d-flex">
                                <div class="titleAssres">
                                    <h5><b>Delivery Address</b></h5>
                                    <p class="mb-0" *ngIf="selectedAddress">{{selectedAddress.address}}<br> {{(selectedAddress.city | titlecase) + ', ' + (selectedAddress.country | titlecase) + ' ' +  selectedAddress.zip_code}}</p>
                                </div>
                            </div>	
                        </div>

                	<div class="addressContent">
                        <div class="titleAssres">
                              <h5><b>Payment Method</b></h5>
                        </div>
			  <!-- saved debit or credit card shared	 -->
                        <app-saved-card (updateMode)="orderPaymentMode=$event"></app-saved-card>
                        </div>
			<!-- add debit or credit card shared form -->
                        <app-add-debit-credit-shared></app-add-debit-credit-shared>
			<!-- net-banking selection -->
                        <app-netbanking-shared (updateMode)="orderPaymentMode=$event"></app-netbanking-shared>
			<!-- cash-on-delivary selection -->
                        <app-cash-on-delivary-shared (updateMode)="orderPaymentMode=$event"></app-cash-on-delivary-shared>	
			<!-- upi-payment-selection -->
                        <app-upi-shared (updateMode)="orderPaymentMode=$event"></app-upi-shared>

                    </div>	

                    <div class="col-lg-5">
                        <app-shared-orders-details (place)="placeOrder($event);" [preventAbuse]="preventAbuse" [billingDetails]="ordersList[0].billingDetails" [products]="ordersList[0].orderdetails" *ngIf="!loader"></app-shared-orders-details>	
                        <app-shared-skeleton-orders-details *ngIf="loader"></app-shared-skeleton-orders-details>
                    </div>
                </div>	
            </div>	
        </div>	
    </section>	

</main><!-- End #main -->
<app-footer></app-footer> <!-- Footer Section -->
<app-scroll-to-top></app-scroll-to-top> <!-- Scroll-to-top Section -->
  `,
	styles: [
	]
})
export class CheckoutComponent implements OnInit {
	user: USER_RESPONSE;
	preventAbuse = false;
	orderPaymentMode: string;
	selectedAddress: { address: string; city: string; country: string; zip_code: string; } = { address: '', city: '', country: '', zip_code: '' };
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
		private cd: ChangeDetectorRef,
		private modal: BsModalService,
		private toastr: ToastrService,
		private cookie: CookieService) { }
	loader = true;
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
				this.user = user;
				this.selectedAddress.address = Object.keys(user.address.find(a => a.addressIsDefault === 'Yes')).filter((key: string) => {
					if (key === 'addressBlockNo' && user.address.find(a => a.addressIsDefault === 'Yes').addressBlockNo) {
						return `${user.address.find(a => a.addressIsDefault === 'Yes').addressBlockNo}`;
					}
					if (key === 'addressBuildingName' && user.address.find(a => a.addressIsDefault === 'Yes').addressBuildingName) {
						return `${user.address.find(a => a.addressIsDefault === 'Yes').addressBuildingName}`;
					}
					if (key === 'addressLandmark' && user.address.find(a => a.addressIsDefault === 'Yes').addressLandmark) {
						return `${user.address.find(a => a.addressIsDefault === 'Yes').addressLandmark}`;
					}
					if (key === 'addressStreetName' && user.address.find(a => a.addressIsDefault === 'Yes').addressStreetName) {
						return `${user.address.find(a => a.addressIsDefault === 'Yes').addressStreetName}`;
					}
				}).map(f => user.address.find(a => a.addressIsDefault === 'Yes')[f]).join(' ');
				this.selectedAddress.city = `${user.address.find(a => a.addressIsDefault === 'Yes').cityName}`;
				this.selectedAddress.country = `${user.address.find(a => a.addressIsDefault === 'Yes').countryName}`;
				this.selectedAddress.zip_code = `${user.address.find(a => a.addressIsDefault === 'Yes').addressPincode}`
				tepmOrder.loginuserID = user.userID;
				this.cd.markForCheck();
			}
			if (user === null) {
				this.user = null;
				Object.keys(this.selectedAddress).forEach(key => {
					delete this.selectedAddress[key];
				});
				tepmOrder.loginuserID = '0';
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
	placeOrder = (note: string) => {
		if (!this.orderPaymentMode) {
			this.modal.show(PaymentAlertComponent, { id: 73, animated: false, ignoreBackdropClick: true, keyboard: false, class: 'modal-sm modal-dialog-centered' });
		}
		if (this.orderPaymentMode) {
			this.preventAbuse = true;
			this.root.placeOrder(JSON.stringify({
				orderDiscountCode: '',
				loginuserID: this.user.userID,
				storeID: this.user.storeID,
				orderDiscount: '0',
				orderWalletAmt: '0',
				orderNotes: note ? note.trim() : '',
				orderVAT: this.ordersList[0].billingDetails.vat,
				orderGrossAmt: this.ordersList[0].billingDetails.net_Payable,
				orderDeliveryAddress: Object.keys(this.user.address.find(a => a.addressIsDefault === 'Yes')).filter((key: string) => {
					if (key === 'addressBlockNo' && this.user.address.find(a => a.addressIsDefault === 'Yes').addressBlockNo) {
						return `${this.user.address.find(a => a.addressIsDefault === 'Yes').addressBlockNo}`;
					}
					if (key === 'addressBuildingName' && this.user.address.find(a => a.addressIsDefault === 'Yes').addressBuildingName) {
						return `${this.user.address.find(a => a.addressIsDefault === 'Yes').addressBuildingName}`;
					}
					if (key === 'addressLandmark' && this.user.address.find(a => a.addressIsDefault === 'Yes').addressLandmark) {
						return `${this.user.address.find(a => a.addressIsDefault === 'Yes').addressLandmark}`;
					}
					if (key === 'addressStreetName' && this.user.address.find(a => a.addressIsDefault === 'Yes').addressStreetName) {
						return `${this.user.address.find(a => a.addressIsDefault === 'Yes').addressStreetName}`;
					}
				}).map(f => this.user.address.find(a => a.addressIsDefault === 'Yes')[f]).join(' ') + ', ' + `${this.user.address.find(a => a.addressIsDefault === 'Yes').cityName}, ${this.user.address.find(a => a.addressIsDefault === 'Yes').countryName}, ${this.user.address.find(a => a.addressIsDefault === 'Yes').addressPincode}`,
				orderDeliveryLat: this.user.address.find(a => a.addressIsDefault === 'Yes').addressLati,
				orderDeliveryLong: this.user.address.find(a => a.addressIsDefault === 'Yes').addressLongi,
				languageID: '1',
				orderPaymentMode: this.orderPaymentMode,
				orderNetAmount: this.ordersList[0].billingDetails.item_Total,
				orderdetails: this.ordersList[0].orderdetails.map((p: OrderDetailsTemp) => ({
					productID: p.productID,
					orderdetailsQty: p.Qty,
					orderdetailsPrice: p.productPrice,
				}))
			})).subscribe(r => {
				if (r.status === 'true') {
					this.emptyCart();
					this.emptyLocalCart();
					this.preventAbuse = false;
					const initialState = {
						list: [{
							orderID: r.data[0].orderID
						}]
					};
					this.modal.show(SuccessPlacedOrderComponent, { id: 200, initialState, ignoreBackdropClick: true, keyboard: false });
					this.cd.markForCheck();
				}
				if (r.status === 'false') {
					this.preventAbuse = false;
					this.toastr.error('Error while placing order, please try again!');
					this.cd.markForCheck();
				}
			}, (err) => {
				this.preventAbuse = false;
				console.error(err);
				this.cd.markForCheck();
			});
		}
	}
	emptyCart = () => {
		this.root.emptyCart(JSON.stringify({
			loginuserID: this.user.userID,
			orderID: this.cookie.get('Temp_Order_ID')
		})).subscribe(r => {
			if (r.status === 'true') {
				this.root.forceReload();
				this.cd.markForCheck();
				this.root.update_user_status$.next('update_header');
			}
		}, err => console.error(err));
	}
	emptyLocalCart = () => {
		localStorage.setItem('tempCart', JSON.stringify([]));
	}
}