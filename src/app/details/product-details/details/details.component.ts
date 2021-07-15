import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from 'src/app/authentication.service';
import { ProductList, TempCartItems } from 'src/app/interface';
import { RootService } from 'src/app/root.service';
import { SubSink } from 'subsink';

@Component({
	selector: 'app-details',
	template: `
    <div class="prInfo row align-items-center">
					<div class="col-lg-5 col-md-5">
						<div class="bigIng" *ngIf="product"><img offset="100"
									style="width: 552px; height: 343px"
            						defaultImage="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAUFBQUFBQYGBgYICQgJCAwLCgoLDBINDg0ODRIbERQRERQRGxgdGBYYHRgrIh4eIisyKigqMjw2NjxMSExkZIYBCgoKCgoKCwwMCw8RDxEPFxUTExUXIhkaGRoZIjQhJiEhJiE0LjguKy44LlNBOjpBU2BRTFFgdGhodJOLk8DA///AABEIAAUABQMBEQACEQEDEQH/xABcAAEAAAAAAAAAAAAAAAAAAAAHEAEAAgEFAAAAAAAAAAAAAAACAQMRAAQFB0EBAQEAAAAAAAAAAAAAAAAAAAMEEQAABQUAAAAAAAAAAAAAAAAAAQIDQRITISKR/9oADAMBAAIRAxEAPwAZjt2+oGm3hNumMwmLmIUx7ic6mtPQ/iNSC1plsuj/2Q=="
            						lazyLoad="http://164.52.209.69/aanidani/backend/web/uploads/products/{{product?.productImage}}"
            						[errorImage]="'assets/images/error_not_found.png'" [alt]="product?.productName" [title]="product?.productName"></div>	
					</div>	
					<div class="col-lg-7 col-md-7">	
						<div class="detailInfo">
							<h4 class="" *ngIf="product"><b>{{product?.productName}}</b></h4>	
							<div class="productInfo">
								<div class="ratings">
                                <i [ngClass]="star <= product?.productRatingAvg ? 'fas fa-star' : 'far fa-star'" *ngFor="let star of stars"></i>
				  				<span>{{product?.productRatingCount | number}}</span>
				  				</div>
				  				<p class="salinginfo" *ngIf="product">{{(product?.productSoldCount | number) + ' people bought this'}}</p>
			  				</div>
			  				<div class="d-flex align-items-center detailPrice">
				  				<div class="price_text" *ngIf="product">{{(product?.productPrice | number) + ' SR'}}</div>
					  			<div class="mrp_text" *ngIf="product">{{(product?.productPriceVat | number) + ' SR'}}</div>					
				  			</div>
				  			<div class="form-group select_unit mb-2 mt-2">
				  			</div>
				  			<div class="d-flex align-items-center detailBtn pt-1">
				  				<div class="cartbox" [ngClass]="{'show-counter': product?.addedCartCount>0}">
									<a *ngIf="tempOrderID !== '0'" class="addcart-btn shopingcart-tbtn btn" (click)="addItemToCart(product);" id="addcart-1"> Add to Cart</a>
                                    <a *ngIf="tempOrderID === '0'" class="addcart-btn shopingcart-tbtn btn" (click)="placeTempOrder(product);" id="addcart-1"> Add to Cart</a>
									<div class="contercontern">
									<div class="handle-counter d-flex" id="handleCounter">
										<button (click)="deleteItemFromCart(product);" class="counter-minus btn">-</button>
										<input type="text" [ngModel]="product?.addedCartCount" readonly>
										<button (click)="addItemToCart(product);" class="counter-plus btn">+</button>
									</div>
								</div>
								</div>
				  			</div>

				  			<div class="wishlistConten d-flex align-items-center">
				  				<div class="pr-4"><a href="#"><i class="far fa-heart"></i> Add to Wishlist</a></div>
				  				<div class="shareDetail">
				  					<span class="pr-2">Share:</span>
				  					<a href="#"><i class="fab fa-facebook-f"></i></a>
				  					<a href="#"><i class="fab fa-twitter"></i></a>
				  					<a href="#"><i class="fab fa-pinterest"></i></a>
				  					<a href="#"><i class="fab fa-google-plus-g"></i></a>
				  					<a href="#"><i class="fab fa-linkedin-in"></i></a>
				  				</div>
				  			</div>	
						</div>	
					</div>	
				</div>	
  `,
	styles: [
	]
})
export class DetailsComponent implements OnInit {
	@Input() product: ProductList;
    stars: number[] = [1, 2, 3, 4, 5];
	isLoggedIN: boolean;
    isLoggedID: string;
    tempOrderID: string;
    subs = new SubSink();
    @Output() updateHeader: EventEmitter<{ data: string, res: number }> = new EventEmitter();
	constructor(
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
