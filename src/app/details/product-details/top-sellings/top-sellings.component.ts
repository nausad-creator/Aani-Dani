import { trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { fadeIn } from 'src/app/animation';
import { AuthenticationService } from 'src/app/authentication.service';
import { AddressListComponent } from 'src/app/header/onboarding/address-list.component';
import { AlertComponent } from 'src/app/header/onboarding/alert.component';
import { LocationSelectionComponent } from 'src/app/header/onboarding/location-selection.component';
import { ADDRESS, ProductList, SimilarProducts, TempCartItems, USER_RESPONSE } from 'src/app/interface';
import { RootService } from 'src/app/root.service';
import { SubSink } from 'subsink';

@Component({
	selector: 'app-top-sellings',
	template: `
   <div class="category-section">
    <div class="card-header bg-white">
      <div class="section-title row pb-0">
        <div class="col-md-8 p-0">		
            <h6 class="mb-0"><b>{{'similar_items' | translate}}</b></h6>
        </div>				  	
      </div>
  </div>  

  <div class="category_slider" [@fadeIn]>
        <owl-carousel-o [options]="caseOptions">
            <ng-template carouselSlide *ngFor="let item of similarproduct">
              <div class="slider_itemBox text-center cursr" (click)="change.emit({categoryID: item?.categoryID, productID: item?.productID}); onScroll()">
              <img offset="50" class="w-auto m-auto"
                    defaultImage="http://164.52.209.69/aanidani/backend/web/uploads/products/{{item?.productImage}}"
                    lazyLoad="http://164.52.209.69/aanidani/backend/web/uploads/products/{{item?.productImage}}"
                    [errorImage]="'assets/images/error_not_found.png'" [alt]="(root.languages$ | async) === 'en' ? item?.productName : item?.productArabicNme" [title]="(root.languages$ | async) === 'en' ? item?.productName : item?.productArabicNme">
                    <div class="content_textContent">
                        <h5 class="text-dark mb-0">{{(root.languages$ | async) === 'en' ? item?.productName : item?.productArabicNme}}</h5>
                        <div class="d-flex align-items-center justify-content-center mt-2">
                            <div class="price_text">{{(item?.productPrice | number) + ' SR'}}</div>
                            <div class="mrp_text">{{(item?.productPriceVat | number) + ' SR'}}</div>					  		
                        </div>
                        <div class="productInfo">
                            <div class="ratings">
                            <i [ngClass]="star <= product?.productRatingAvg ? 'fas fa-star' : 'far fa-star'" *ngFor="let star of stars"></i>
                            </div>
                            <p class="salinginfo">{{(item?.productSoldCount | number) + ' ' + ('people_bought_this' | translate)}}</p>
                        </div>		
                        
                        <div class="cartbox" [ngClass]="{'show-counter': item?.addedCartCount>0}">
                        <a class="addcart-btn shopingcart-tbtn btn" (click)="addToCart(item); $event.stopPropagation();" id="addcart-1"><i class="icofont-shopping-cart"></i> {{'add_to_cart' | translate}}</a>
                              <div class="contercontern">
				<div class="handle-counter d-flex" id="handleCounter">
				<button (click)="delete(item); $event.stopPropagation();" class="counter-minus btn">-</button>
				<input type="text" [ngModel]="item?.addedCartCount" readonly>
				<button (click)="add(item); $event.stopPropagation();" class="counter-plus btn">+</button>
				</div>
			</div>
                      </div>	
                    </div>	
                    </div>
                </ng-template>
            </owl-carousel-o>							   			       
      </div>
</div>
  `,
	styles: [
	],
	animations: [
		trigger('fadeIn', fadeIn())
	], changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopSellingsComponent implements OnInit {
	@Input() similarproduct: SimilarProducts[] = [];
	stars: number[] = [1, 2, 3, 4, 5];
	logged_user: USER_RESPONSE = null;
	tempOrderID: string;
	subs = new SubSink();
	bModalRef: BsModalRef;
	@Output() change = new EventEmitter<{ categoryID: string, productID: string }>();
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
				items: 1
			},
			1000: {
				items: 1
			},
			1200: {
				items: 1
			}
		}
	};
	onScroll = () => {
		window.scroll(0, 0);
	}
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
