import { trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { AddToCart } from 'src/app/actions/temp-orders.acton';
import { fadeIn } from 'src/app/animation';
import { AuthenticationService } from 'src/app/authentication.service';
import { tepmOrder } from 'src/app/global';
import { AddressListComponent } from 'src/app/header/onboarding/address-list.component';
import { AlertComponent } from 'src/app/header/onboarding/alert.component';
import { LocationSelectionComponent } from 'src/app/header/onboarding/location-selection.component';
import { ADDRESS, ProductList, TempCartItems, USER_RESPONSE } from 'src/app/interface';
import { State } from 'src/app/reducers';
import { RootService } from 'src/app/root.service';
import { SubSink } from 'subsink';

@Component({
	selector: 'app-items',
	template: `
  <div class="row productListingPage cursr" *ngIf="products" [@fadeIn]>
	<div class="slider_itemBox col-lg-4 col-sm-6" (click)="clickOnNavigate({categoryID: item?.categoryID, productID: item?.productID})" *ngFor="let item of products">
	<img 
        defaultImage="http://164.52.209.69/aanidani/backend/web/uploads/products/{{item?.productImage}}"
        lazyLoad="http://164.52.209.69/aanidani/backend/web/uploads/products/{{item?.productImage}}"
        [errorImage]="'assets/images/error_not_found.png'" [alt]="(root.languages$ | async) === 'en' ? item?.productName : item?.productArabicNme" [title]="(root.languages$ | async) === 'en' ? item?.productName : item?.productArabicNme">
	<div class="content_textContent">
		<h5 class="text-dark mb-0">{{(root.languages$ | async) === 'en' ? item?.productName : item?.productArabicNme}}</h5>
			<div class="d-flex align-items-center justify-content-center mt-2">
				<div class="price_text">{{(item?.productPrice | number) + ' SR'}}</div>
				<div class="mrp_text">{{(item?.productPriceVat | number) + ' SR'}}</div>					  		
			</div>
			<!-- <div class="productInfo">
				<div class="ratings">
                                <i [ngClass]="star <= item?.productRatingAvg ? 'fas fa-star' : 'far fa-star'" *ngFor="let star of stars"></i>
			</div>
				<p class="salinginfo">{{(item?.productSoldCount | number) + ' ' + ('people_bought_this' | translate)}}</p>
	</div>		 -->
						  			
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
  </div>
  <div class="card mt-3" style="overflow:hidden;" style="margin-bottom: 1rem; min-height: 320px;"
	*ngIf="products.length === 0 || products === null || products === undefined">
	<div class="row">
		<div class="col">
			<div class="nodata_content text-center pt-lg-5">
				<img src="assets/images/no-data.png" alt="No-Data">
				<p class="text-muted" style="padding-right:32px;">No Data Found.</p>
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
export class ItemsComponent implements OnInit {
	tempOrderID: string;
	bModalRef: BsModalRef;
	subs = new SubSink();
	stars: number[] = [1, 2, 3, 4, 5];
	logged_user: USER_RESPONSE = null;
	@Input() products: ProductList[] = [];
	constructor(
		private router: Router,
		public route: ActivatedRoute,
		private auth: AuthenticationService,
		private root: RootService,
		private cd: ChangeDetectorRef,
		private cookie: CookieService,
		private modal: BsModalService,
		private store: Store<State>,
	) {
		// for updating user
		this.subs.add(this.root.update$.subscribe(status => {
			if (status === '200') {
				this.checkStatus();
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
					this.openAddress(this.logged_user.address, { productID: item.productID, qty: '1', productPrice: item.productPrice }, 'product_list');
				}
				if (this.logged_user.storeID) {
					if (this.tempOrderID !== '0') {
						const res = await this.addItemToCart(item) as string;
						if (res === 'Added_sucessfully') {
							this.root.forceReload();
							this.root.update_user_status$.next('refresh_or_reload');
							this.store.dispatch(new AddToCart(JSON.stringify(tepmOrder)));
						}
					}
					if (this.tempOrderID === '0') {
						const res = await this.placeTempOrder(item) as { message: string, temporderID: string };
						this.cookie.set('Temp_Order_ID', res.temporderID);
						if (res.message === 'Added_sucessfully') {
							this.root.forceReload();
							this.root.update_user_status$.next('refresh_or_reload');
							this.store.dispatch(new AddToCart(JSON.stringify(tepmOrder)));
						}
					}
				}
			}
		}
		if (!this.logged_user) {
			const initialState = {
				list: [{
					status: 'product_list',
					product: { productID: item.productID, qty: '1', productPrice: item.productPrice }
				}]
			};
			this.bModalRef = this.modal.show(LocationSelectionComponent, { id: 399, initialState });
		}
	}
	openAddress = (add: ADDRESS[], product: { productID: string, qty?: string, productPrice: string }, status: string) => {
		const initialState = {
			list: [{
				status: status,
				product: product,
				address: add
			}]
		};
		this.bModalRef = this.modal.show(AddressListComponent, { id: 499, initialState });
	}
	checkStatus = () => {
		// getting auth user data
		this.subs.add(this.auth.user.subscribe(user => {
			if (user) {
				this.logged_user = user;
				tepmOrder.loginuserID = user.userID;
				this.tempOrderID = this.cookie.get('Temp_Order_ID') ? this.cookie.get('Temp_Order_ID') : '0';
				this.cd.markForCheck();
			}
			if (user === null) {
				this.logged_user = null;
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
			this.store.dispatch(new AddToCart(JSON.stringify(tepmOrder)));
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
			this.store.dispatch(new AddToCart(JSON.stringify(tepmOrder))); // update header
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
