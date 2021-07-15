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
import { TempCartItems, Category, ProductList, TempOrders, OrderDetailsTemp, USER_RESPONSE } from 'src/app/interface';
import { selectHomeCategoryList, selectHomeBestSellingList, State } from 'src/app/reducers';
import { RootService } from 'src/app/root.service';
import { SubSink } from 'subsink';
import { SuccessPlacedOrderComponent } from './success.pop-up.component';

@Component({
  selector: 'app-checkout',
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
            <div class="brandcamp"><a href="index.html">Home  &gt;</a> <span> Checkout</span> </div>
            <div class="card mt-3">
                <div class="row m-0 pt-3 pb-3">
                    <div class="col-lg-7">
                        <div class="addressContent">
                            <div class="d-flex">
                                <div class="titleAssres">
                                    <h5><b>Delivery Address</b></h5>
                                    <p class="mb-0">3876 Ibn Aram<br> Riyadh, Riyadh Province<br> Saudi Arabia 12486</p>
                                </div>
                                <div class="EditeBtn ml-auto"><a class="SaveAddress" href="javascript:voild(0)">Change</a></div>
                            </div>	
                        </div>

                        <div class="addressContent">
                            <div class="d-flex">
                                <div class="titleAssres">
                                    <h5><b>Delivery Date & Time</b></h5>
                                    <p class="mb-0">Today 7:00 AM - 8:00 AM</p>
                                </div>
                                <div class="EditeBtn ml-auto"><a href="#" data-toggle="modal" data-target="#DeliveryDate">Change</a></div>
                            </div>	
                        </div>

                        <div class="addressContent">
                          <div class="titleAssres">
                              <h5><b>Payment Method</b></h5>
                          </div>	
                          <div class="cartlist-conten">
                              <p>Saved Cards</p>

                              <div class="saved-card mt-2">
                                  <div class="debitcarditem">
                                      <div class="controlgroup" style="padding: 0;">
                                          <label class="control control--radio mb-0" for="defaultUnchecked"> 
                                            <input type="radio" name="defaultExampleRadios" class="form-check-input" id="defaultUnchecked">
                                            <div class="crnumber d-flex">
                                                <div class="cardimg"><img src="assets/images/visa-img.png" alt=""></div>
                                              <div class="cardName">
                                                  <h6>HDFC</h6>
                                                  <p>5210 **** **** 1634</p>					
                                              </div>
                                              <div class="entercv">
                                                  <div class="form-group mb-0"><input type="text" class="form-control bg-white" placeholder="CVV"></div>
                                              </div>													
                                            </div>											  
                                          </label>
                                      </div>
                                  </div>
                                  <div class="debitcarditem">
                                      <div class="controlgroup" style="padding: 0;">
                                          <label class="control control--radio mb-0" for="defaultUnchecked1"> 
                                            <input type="radio" name="defaultExampleRadios" class="form-check-input" id="defaultUnchecked1">
                                            <div class="crnumber d-flex">
                                                <div class="cardimg"><img src="assets/images/mastercard-img.png" alt=""></div>
                                              <div class="cardName">
                                                  <h6>SBI</h6>
                                                  <p>5210 **** **** 1634</p>					
                                              </div>
                                              <div class="entercv">
                                                  <div class="form-group mb-0"><input type="text" class="form-control bg-white" placeholder="CVV"></div>
                                              </div>													
                                            </div>
                                          </label>
                                      </div>									
                                  </div>
                              </div>
                                          
                          </div>
                        </div>

                        <div class="addressContent">
                            <div class="controlgroup" style="padding-left:20px;">
                              <label class="control control--radio" for="Debit"> 
                                <input type="radio" name="defaultExampleRadios" class="form-check-input" id="Debit">Add Credit/ Debit Card</label>						
                          </div>	
                          <form class="text-left form-paymeny pt-2">							
                            <div class="form-row">
                                <div class="col-md-12 col-sm-12">
                                <div class="form-group"><input type="text" id="CardNumber" class="form-control bg-white" placeholder="Card Number"></div>
                              </div>
                              <div class="col-md-12 col-sm-12">
                                <div class="form-group is-empty"><input type="text" id="defaultRegisterFormFirstName" class="form-control bg-white" placeholder="Enter Holder Name"><span class="material-input"></span></div>
                              </div>										 							
                              <div class="col-md-6 col-sm-6">
                                <div class="form-group"><input type="date" class="form-control bg-white" placeholder="Valid Till(MM/YY)"></div>
                              </div>
                              <div class="col-md-6 col-sm-6">
                                <div class="form-group"><input type="text" id="cvv" class="form-control bg-white" placeholder="CVV"></div>
                              </div>	
                              <div class="col-md-12 col-sm-12">
                                  <div class="custom-control custom-checkbox mb-3">
                                    <input type="checkbox" class="custom-control-input" id="Save" name="Save1">
                                    <label class="custom-control-label" for="Save"> Save details for future transactions</label>
                                  </div>
                              </div>
                              <div class="col-md-12 col-sm-12">
                                  <div class="pt-3">
                                      <a href="javascript:voil(0)" class="apply-btn shopingcart-tbtn btn"> Pay Now</a>
                                  </div>
                              </div>											
                            </div>																		
                          </form>
                        </div>	

                        <div class="addressContent">
                            <div class="controlgroup" style="padding-left:20px;">
                              <label class="control control--radio" for="NetBanking"> 
                                <input type="radio" name="defaultExampleRadios" class="form-check-input" id="NetBanking">Net Banking</label>						
                          </div>
                          <form class="text-left form-paymeny pt-2">
                              <div class="form-group">
                                  <select class="form-control bg-white custom-select">
                                      <option>Select Bank for Net Banking</option>
                                      <option>HDFC</option>
                                      <option>ICICI</option>
                                      <option>BOB</option>
                                      <option>SBI</option>
                                  </select>	
                              </div>
                          </form>								
                        </div>

                        <div class="addressContent">
                            <div class="controlgroup" style="padding-left:20px;">
                              <label class="control control--radio" for="Cashon"> 
                                <input type="radio" name="defaultExampleRadios" class="form-check-input" id="Cashon">Cash on Delivery</label>						
                          </div>														
                        </div>	

                        <div class="addressContent border-0">
                            <div class="row">
                                <div class="col-4">
                                    <div class="controlgroup" style="padding-left:20px;">
                                      <label class="control control--radio" for="stcpay"> 
                                        <input type="radio" name="defaultExampleRadios" class="form-check-input" id="stcpay"><img src="assets/images/stcpay-img.png" alt=""></label>						
                                  </div>
                              </div>
                              <div class="col-4">
                                    <div class="controlgroup" style="padding-left:20px;">
                                      <label class="control control--radio" for="applepay"> 
                                        <input type="radio" name="defaultExampleRadios" class="form-check-input" id="applepay"><img src="assets/images/applepay-img.png" alt=""></label>						
                                  </div>
                              </div>
                              <div class="col-4">
                                    <div class="controlgroup" style="padding-left:20px;">
                                      <label class="control control--radio" for="cpay"> 
                                        <input type="radio" name="defaultExampleRadios" class="form-check-input" id="cpay"><img src="assets/images/cpay-img.png" alt=""></label>						
                                  </div>
                              </div>
                          </div>															
                        </div>

                    </div>	

                    <div class="col-lg-5">
                        <app-shared-orders-details (place)="placeOrder($event); preventAbuse=true" [preventAbuse]="preventAbuse" [billingDetails]="ordersList[0].billingDetails" [products]="ordersList[0].orderdetails" *ngIf="!loader"></app-shared-orders-details>	
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
  changedCountHeader: number;
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
        tepmOrder.loginuserID = user.userID;
        this.cd.markForCheck();
      }
      if (user === null) {
        this.user = null;
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
    this.root.placeOrder(JSON.stringify({
      orderDiscountCode: '',
      loginuserID: this.user.userID,
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
      orderPaymentMode: "Card",
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
        this.modal.show(SuccessPlacedOrderComponent, { id: 200 });
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
  emptyCart = () => {
    this.root.emptyCart(JSON.stringify({
      loginuserID: this.user.userID,
      orderID: this.cookie.get('Temp_Order_ID')
    })).subscribe(r => {
      if (r.status === 'true') {
        this.changedCountHeader = Math.random();
        this.cd.markForCheck();
      }
    }, err => console.error(err));
  }
  emptyLocalCart = () => {
    localStorage.setItem('tempCart', JSON.stringify([]));
  }
}