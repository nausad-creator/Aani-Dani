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
import { ADDRESS, ProductList, TempCartItems, USER_RESPONSE, Wishlist } from 'src/app/interface';
import { RootService } from 'src/app/root.service';
import { SubSink } from 'subsink';

@Component({
	selector: 'app-shared-wishlist',
	template: `
<div class="orderDetailList cursr" *ngFor="let product of wishList; let i=index;"
	(click)="clickOnNavigate({categoryID: product?.categoryID, productID: product?.productID})">
	<div class="bodyOrder form-row m-0 align-items-center">
		<div class="col-md-2 col-4">
			<div class="smImg">
				<img offset="50"
					defaultImage="http://164.52.209.69/aanidani/backend/web/uploads/products/{{product?.productImage}}"
					lazyLoad="http://164.52.209.69/aanidani/backend/web/uploads/products/{{product?.productImage}}"
					[errorImage]="'assets/images/error_not_found.png'" [alt]="product?.productName"
					[title]="product?.productName">
			</div>
		</div>
		<div class="col-md-5 col-8">
			<p class="mb-0">{{product?.productName}}</p>
			<div class="ratings">
				<i [ngClass]="star <= product?.productRatingAvg ? 'fas fa-star' : 'far fa-star'"
					*ngFor="let star of stars;"></i>
				<span>{{product?.productRatingCount | number}}</span>
			</div>
			<div class="d-flex align-items-center mt-2">
				<h6 class="mb-0"><b>{{(product?.productPrice | number) + ' SR'}}</b></h6>
			</div>
		</div>
		<div class="col-md-5 text-md-right">
			<div class="linksOrde cartbox pt-2" [ngClass]="{'show-counter': product?.addedCartCount>0}">
				<a (click)="remove_fav.emit(product?.productID); $event.stopPropagation()"
					class="text-danger mr-3 cursr">
					<span tooltip="Remove" width="50" autoPlacement="false" placement="left"
						show-delay="100"><i class="icofont-trash"></i></span></a>
				<a (click)="addToCart(product); $event.stopPropagation();"
					class="addcart-btn shopingcart-tbtn btn"> Add to Cart</a>
				<div class="contercontern">
					<div class="handle-counter d-flex">
						<button (click)="delete(product); $event.stopPropagation();"
							class="counter-minus btn">-</button>
						<input type="text" [ngModel]="product?.addedCartCount" readonly>
						<button (click)="add(product); $event.stopPropagation();"
							class="counter-plus btn">+</button>
					</div>
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
export class SharedWishlistComponent implements OnInit {
	subs = new SubSink();
	tempOrderID: string;
	bModalRef: BsModalRef;
	@Input() wishList: Wishlist[];
	stars: number[] = [1, 2, 3, 4, 5];
	logged_user: USER_RESPONSE = null;
	@Output() remove_fav = new EventEmitter<string>();
	constructor(
		private router: Router,
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
