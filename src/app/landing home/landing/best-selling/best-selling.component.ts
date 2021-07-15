import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthenticationService } from 'src/app/authentication.service';
import { ProductList, TempCartItems } from 'src/app/interface';
import { RootService } from 'src/app/root.service';
import { SubSink } from 'subsink';

@Component({
    selector: 'app-best-selling',
    template: `
    <section class="category-section pb-4">
    <div class="container">
        <div class="card">
            <div class="card-header bg-white">
              <div class="section-title row pb-0">
                <div class="col-md-6">		
                    <h2 class="mb-0">Bestselling Items</h2>
                </div>				  	
              </div>
          </div>  
          <div class="category_slider">
              <div class="product-carousel">
                <owl-carousel-o [options]="caseOptions">
                <ng-template carouselSlide *ngFor="let item of products">
                  <div class="slider_itemBox cursr" (click)="clickOnNavigate({categoryID: item.categoryID, productID: item.productID})">
                  <img offset="50"
            			defaultImage="http://164.52.209.69/aanidani/backend/web/uploads/products/{{item.productImage}}"
            			lazyLoad="http://164.52.209.69/aanidani/backend/web/uploads/products/{{item.productImage}}"
            			[errorImage]="'assets/images/error_not_found.png'" [alt]="item.productName" [title]="item.productName">
                        <div class="content_textContent">
                            <h5 class="text-dark mb-0">{{item.productName}}</h5>
                            <div class="d-flex align-items-center justify-content-center mt-2">
                                <div class="price_text">{{(item.productPrice | number) + ' SR'}}</div>
                                <div class="mrp_text">{{(item.productPriceVat | number) + ' SR'}}</div>					  		
                            </div>
                            <div class="productInfo">
                                <div class="ratings">
                                    <i [ngClass]="star <= item?.productRatingAvg ? 'fas fa-star' : 'far fa-star'" *ngFor="let star of stars"></i>
                                </div>
                                <p class="salinginfo">{{(item.productSoldCount | number) + ' people bought this'}}</p>
                            </div>		
                            
                            <div class="cartbox" [ngClass]="{'show-counter': item.addedCartCount>0}">
                              <a *ngIf="tempOrderID !== '0'" class="addcart-btn shopingcart-tbtn btn" (click)="addItemToCart(item); $event.stopPropagation();" id="addcart-1"><i class="icofont-shopping-cart"></i> Add to Cart</a>
                              <a *ngIf="tempOrderID === '0'" class="addcart-btn shopingcart-tbtn btn" (click)="placeTempOrder(item); $event.stopPropagation();" id="addcart-1"><i class="icofont-shopping-cart"></i> Add to Cart</a>
                              <div class="contercontern">
									<div class="handle-counter d-flex" id="handleCounter">
										<button (click)="deleteItemFromCart(item); $event.stopPropagation();" class="counter-minus btn">-</button>
										<input type="text" [ngModel]="item.addedCartCount" readonly>
										<button (click)="addItemToCart(item); $event.stopPropagation();" class="counter-plus btn">+</button>
									</div>
								</div>
                          </div>	
                        </div>	
                        </div>
                    </ng-template>
                </owl-carousel-o>    
              </div>
          </div>
      </div>
  </div>
  </section>
  `,
    styles: [
    ], changeDetection: ChangeDetectionStrategy.OnPush
})
export class BestSellingComponent implements OnInit {
    @Input() products: ProductList[] = []
    stars: number[] = [1, 2, 3, 4, 5];
    isLoggedIN: boolean;
    isLoggedID: string;
    tempOrderID: string;
    subs = new SubSink();
    @Output() updateHeader: EventEmitter<{ data: string, res: number }> = new EventEmitter();
    caseOptions: OwlOptions = {
        dots: false,
        loop: false,
        nav: true,
        margin: 0,
        navText: ["<i class='icofont-rounded-left'></i>", "<i class='icofont-rounded-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            767: {
                items: 2
            },
            1000: {
                items: 4
            },
            1200: {
                items: 4
            }
        }
    };
    constructor(
        private router: Router,
        public route: ActivatedRoute,
        private auth: AuthenticationService,
        private root: RootService,
        private cd: ChangeDetectorRef,
        private cookie: CookieService
    ) {
        // for updating user
        this.subs.add(this.root.update$.subscribe(status => {
            if (status === '200') {
                this.checkStatus();
                this.cd.markForCheck();
            }
        }));
    }
    checkStatus = () => {
        // getting auth user data
        this.subs.add(this.auth.user.subscribe(user => {
            if (user) {
                this.tempOrderID = this.cookie.get('Temp_Order_ID') ? this.cookie.get('Temp_Order_ID') : '0';
                this.isLoggedIN = user.userID ? true : false;
                this.isLoggedID = user.userID;
                this.cd.markForCheck();
            }
            if (user === null) {
                this.isLoggedIN = false;
                this.isLoggedID = '0';
                this.cd.markForCheck();
            }
        }));
    }
    ngOnInit(): void {
        this.tempOrderID = this.cookie.get('Temp_Order_ID') ? this.cookie.get('Temp_Order_ID') : '0';
        this.checkStatus();
    }
    clickOnNavigate = (category: { categoryID: string, productID: string }) => {
        this.router.navigate(['/product-details'], { queryParams: { page: '0', categoryID: category.categoryID, productID: category.productID } })
    }
    placeTempOrder = (pro: ProductList) => {
        pro.addedCartCount++;
        this.root.placeNewOrderTemp(JSON.stringify({
            loginuserID: this.isLoggedID,
            languageID: '1',
            orderdetails: [{
                productID: pro.productID,
                orderdetailsQty: 1,
                orderdetailsPrice: pro.productPrice
            }]
        })).subscribe(r => {
            if (r.status === 'true') {
                this.addToLocal({
                    productID: pro.productID,
                    qty: 1
                })
                this.updateHeader.emit({ data: '', res: Math.random() })
            }
        }), () => console.error('error while placing first temp item to cart!');
    }
    addItemToCart = (pro: ProductList) => {
        pro.addedCartCount++;
        this.root.addItemToCartTemp(JSON.stringify({
            loginuserID: this.isLoggedID,
            languageID: '1',
            orderID: this.tempOrderID,
            productID: pro.productID,
            orderdetailsQty: '1',
            orderdetailsPrice: pro.productPrice
        })).subscribe(r => {
            if (r.status === 'true') {
                this.addToLocal({
                    productID: pro.productID,
                    qty: 1
                })
                this.updateHeader.emit({ data: '', res: Math.random() })
            }
        }), () => console.error('error while adding item to cart!');
    }
    deleteItemFromCart = (pro: ProductList) => {
        pro.addedCartCount--;
        this.root.deleteItemFromCartTemp(JSON.stringify({
            loginuserID: this.isLoggedID,
            languageID: '1',
            orderID: this.tempOrderID,
            productID: pro.productID,
            orderdetailsQty: '1',
            orderdetailsPrice: pro.productPrice
        })).subscribe(r => {
            if (r.status === 'true') {
                this.removeFromLocal({
                    productID: pro.productID,
                    qty: 1
                })
                this.updateHeader.emit({ data: '', res: Math.random() })
            }
        }), () => console.error('error while deleting item from cart!');
    }
    addToLocal = (pro: {
        productID: string;
        qty: number;
    }) => {
        if (localStorage.getItem('tempCart')) {
            const cart = JSON.parse(localStorage.getItem('tempCart')) as TempCartItems[];
            const index = cart.map(c => c.productID).indexOf(pro.productID);
            if (index === -1) {
                cart.push(pro);
                localStorage.setItem('tempCart', JSON.stringify(cart));
            } else {
                for (let i = 0; i < cart.length; i++) {
                    if (cart[i].productID === pro.productID) {
                        cart[i].qty += pro.qty;
                        console.log(cart[i].qty)
                    }
                };
                localStorage.setItem('tempCart', JSON.stringify(cart));
            }
        } else {
            localStorage.setItem('tempCart', JSON.stringify([pro]));
        }
    }
    removeFromLocal = (pro: {
        productID: string;
        qty: number;
    }) => {
        if (localStorage.getItem('tempCart')) {
            const cart = JSON.parse(localStorage.getItem('tempCart')) as TempCartItems[];
            const index = cart.map(c => c.productID).indexOf(pro.productID);
            if (index !== -1) {
                for (let i = 0; i < cart.length; i++) {
                    if (cart[i].productID === pro.productID) {
                        cart[i].qty -= pro.qty;
                    }
                };
                localStorage.setItem('tempCart', JSON.stringify(cart));
            }
        } else {
            localStorage.removeItem('tempCart');
        }
    }
}
