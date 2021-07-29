import { trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { fadeIn } from 'src/app/animation';
import { AuthenticationService } from 'src/app/authentication.service';
import { AddressListComponent } from 'src/app/header/onboarding/address-list.component';
import { AlertComponent } from 'src/app/header/onboarding/alert.component';
import { LocationSelectionComponent } from 'src/app/header/onboarding/location-selection.component';
import { ADDRESS, ProductList, TempCartItems, USER_RESPONSE } from 'src/app/interface';
import { RootService } from 'src/app/root.service';
import { SubSink } from 'subsink';

@Component({
	selector: 'app-details',
	template: `
    			<div class="prInfo row align-items-center" [@fadeIn]>
					<div class="col-lg-5 col-md-5">
						<div class="bigIng" *ngIf="product"><img offset="0"
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
									<a class="addcart-btn shopingcart-tbtn btn" (click)="addToCart(product);" id="addcart-1"> Add to Cart</a>
									<div class="contercontern">
									<div class="handle-counter d-flex" id="handleCounter">
										<button (click)="delete(product);" class="counter-minus btn">-</button>
										<input type="text" [ngModel]="product?.addedCartCount" readonly>
										<button (click)="add(product);" class="counter-plus btn">+</button>
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
	],
	animations: [
		trigger('fadeIn', fadeIn())
	], changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnInit {
	@Input() product: ProductList;
	stars: number[] = [1, 2, 3, 4, 5];
	logged_user: USER_RESPONSE = null;
	tempOrderID: string;
	subs = new SubSink();
	bModalRef: BsModalRef;
	constructor(
		public route: ActivatedRoute,
		private auth: AuthenticationService,
		private root: RootService,
		private cd: ChangeDetectorRef,
		private cookie: CookieService,
		private modal: BsModalService
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
				this.logged_user = user;
				this.cd.markForCheck();
			}
			if (user === null) {
				this.logged_user = null;
				this.cd.markForCheck();
			}
		}));
	}
	addToCart = async (item: ProductList) => {
		if (this.logged_user) {
			if (this.logged_user.address.length === 0) {
				this.modal.show(AlertComponent, { id: 93, animated: false, ignoreBackdropClick: true, keyboard: false, class: 'modal-sm modal-dialog-centered' });
			}
			if (this.logged_user.address.length > 0) {
				if (!this.logged_user.storeID) {
					this.openAddress(this.logged_user.address, item);
				}
				if (this.logged_user.storeID) {
					if (this.tempOrderID !== '0') {
						const res = await this.addItemToCart(item) as string;
						if (res === 'Added_sucessfully') {
							this.root.forceReload();
							this.root.update_user_status$.next('refresh_or_reload');
							this.root.update_user_status$.next('update_header');
						}
					}
					if (this.tempOrderID === '0') {
						const res = await this.placeTempOrder(item) as { message: string, temporderID: string };
						this.cookie.set('Temp_Order_ID', res.temporderID);
						if (res.message === 'Added_sucessfully') {
							this.root.forceReload();
							this.root.update_user_status$.next('refresh_or_reload');
							this.root.update_user_status$.next('update_header');
						}
					}
				}
			}
		}
		if (!this.logged_user) {
			const initialState = {
				list: [{
					product: item
				}]
			};
			this.bModalRef = this.modal.show(LocationSelectionComponent, { id: 399, initialState });
		}
	}
	openAddress = (add: ADDRESS[], product: ProductList) => {
		const initialState = {
			list: [{
				status: 'Location',
				product: product,
				address: add
			}]
		};
		this.bModalRef = this.modal.show(AddressListComponent, { id: 499, initialState });
	}
	ngOnInit(): void {
		this.tempOrderID = this.cookie.get('Temp_Order_ID') ? this.cookie.get('Temp_Order_ID') : '0';
		this.checkStatus();
	}
	placeTempOrder = (pro: ProductList) => {
		pro.addedCartCount++;
		return new Promise((resolve, reject) => {
			this.root.placeNewOrderTemp(JSON.stringify({
				loginuserID: this.logged_user.userID,
				languageID: '1',
				orderdetails: [{
					productID: pro.productID,
					orderdetailsQty: 1,
					orderdetailsPrice: pro.productPrice
				}]
			})).subscribe(r => {
				if (r[0].status === 'true') {
					this.addToLocal({
						productID: pro.productID,
						qty: 1
					});
					resolve({
						message: 'Added_sucessfully',
						temporderID: r[0].data[0].temporderID
					});
				}
			}), () => {
				reject('Oops! Something went wrong while placing first temp item to cart!');
				console.error('Oops! Something went wrong while placing first temp item to cart!');
			};
		});
	}
	add = async (pro: ProductList) => {
		const res = await this.addItemToCart(pro) as string;
		if (res === 'Added_sucessfully') {
			this.root.forceReload();
			this.root.update_user_status$.next('refresh_or_reload');
			this.root.update_user_status$.next('update_header');
		}
	}
	addItemToCart = (pro: ProductList) => {
		pro.addedCartCount++;
		return new Promise((resolve, reject) => {
			this.root.addItemToCartTemp(JSON.stringify({
				loginuserID: this.logged_user.userID,
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
					});
					resolve('Added_sucessfully');
				}
			}), () => {
				reject('Oops! Something went wrong while adding item to cart!');
				console.error('Oops! Something went wrong while adding item to cart!');
			};
		});
	}
	delete = async (pro: ProductList) => {
		const res = await this.deleteItemFromCart(pro) as string;
		if (res === 'Deleted_sucessfully') {
			this.root.forceReload(); // empty cached cart
			this.root.update_user_status$.next('refresh_or_reload'); // update all cart values
			this.root.update_user_status$.next('update_header'); // update header
		}
	}
	deleteItemFromCart = (pro: ProductList) => {
		pro.addedCartCount--;
		return new Promise((resolve, reject) => {
			this.root.deleteItemFromCartTemp(JSON.stringify({
				loginuserID: this.logged_user.userID,
				languageID: '1',
				orderID: this.cookie.get('Temp_Order_ID'),
				productID: pro.productID,
				orderdetailsQty: '1',
				orderdetailsPrice: pro.productPrice
			})).subscribe(r => {
				if (r.status === 'true') {
					this.root.forceReload();
					this.removeFromLocal({
						productID: pro.productID,
						qty: 1
					});
					resolve('Deleted_sucessfully');
				}
			}), () => {
				reject('Oops! Something went wrong while deleting item from cart!');
				console.error('Oops! Something went wrong while adding item from cart!');
			};
		});
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
