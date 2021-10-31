import { trigger } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { shakeOnEnterAnimation } from 'angular-animations';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AddToCart } from 'src/app/actions/temp-orders.acton';
import { SEARCH_NEW_QUERY } from 'src/app/actions/wishlist.action';
import { fadeIn } from 'src/app/animation';
import { AuthenticationService } from 'src/app/authentication.service';
import { tepmOrder, wishlist } from 'src/app/global';
import { AddressListComponent } from 'src/app/header/onboarding/address-list.component';
import { AlertComponent } from 'src/app/header/onboarding/alert.component';
import { LocationSelectionComponent } from 'src/app/header/onboarding/location-selection.component';
import { ADDRESS, ProductList, ProductListDetails, TempCartItems, USER_RESPONSE } from 'src/app/interface';
import { State } from 'src/app/reducers';
import { RootService } from 'src/app/root.service';
import { SubSink } from 'subsink';

@Component({
	selector: 'app-details',
	template: `
<div class="prInfo row align-items-center card-body" [@fadeIn]>
	<div class="col-lg-5 col-md-5">
		<div class="bigIng" *ngIf="product">
			<a class="image-popup-no-margins" id="magnific" target="_blank"
				[title]="(root.languages$ | async) === 'en' ?  product?.productName : product?.productArabicNme"
				href="http://164.52.209.69/aanidani/backend/web/uploads/products/{{product?.productImage}}">
				<img 
					lazyLoad="http://164.52.209.69/aanidani/backend/web/uploads/products/{{product?.productImage}}"
					[errorImage]="'assets/images/error_not_found.png'"
					[alt]="(root.languages$ | async) === 'en' ? product?.productName : product?.productArabicNme"
					[title]="(root.languages$ | async) === 'en' ? product?.productName : product?.productArabicNme"
					(click)="openG()">
			</a>
		</div>
		<div class="productImg-content">
			<owl-carousel-o [options]="caseOptions">
				<ng-template carouselSlide *ngFor="let productImage of product.productImageArray">
					<div class="productImg-carousel">
						<span class="itemPrImg image-popup-no-margins-gallary cursr" [ngClass]="{'selected': product?.productImage === productImage?.src_img}" (click)="openGallary(productImage)"
							[title]="(root.languages$ | async) === 'en' ? productImage?.src_name_eng : productImage?.src_name_arb">
							<img defaultImage="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAUFBQUFBQYGBgYICQgJCAwLCgoLDBINDg0ODRIbERQRERQRGxgdGBYYHRgrIh4eIisyKigqMjw2NjxMSExkZIYBCgoKCgoKCwwMCw8RDxEPFxUTExUXIhkaGRoZIjQhJiEhJiE0LjguKy44LlNBOjpBU2BRTFFgdGhodJOLk8DA///AABEIAAUABQMBEQACEQEDEQH/xABcAAEAAAAAAAAAAAAAAAAAAAAHEAEAAgEFAAAAAAAAAAAAAAACAQMRAAQFB0EBAQEAAAAAAAAAAAAAAAAAAAMEEQAABQUAAAAAAAAAAAAAAAAAAQIDQRITISKR/9oADAMBAAIRAxEAPwAZjt2+oGm3hNumMwmLmIUx7ic6mtPQ/iNSC1plsuj/2Q=="
								lazyLoad="http://164.52.209.69/aanidani/backend/web/uploads/products/{{productImage?.src_img}}"
								[errorImage]="'assets/images/error_not_found.png'"
								[alt]="(root.languages$ | async) === 'en' ? productImage?.src_name_eng : productImage?.src_name_arb"
								[title]="(root.languages$ | async) === 'en' ? productImage?.src_name_eng : productImage?.src_name_arb">
						</span>
					</div>
				</ng-template>
			</owl-carousel-o>
		</div>
	</div>
	<div class="col-lg-7 col-md-7">
		<div class="detailInfo">
			<h4 class="" *ngIf="product"><b>{{(root.languages$ | async) === 'en' ? product?.productName :
					product?.productArabicNme}}</b></h4>
			<div class="d-flex align-items-center detailPrice">
				<div class="price_text" *ngIf="product">{{(product?.productPrice | number) + ' SR'}}
				</div>
				<div class="mrp_text" *ngIf="product">{{(product?.productPriceVat | number) + ' SR'}}
				</div>
			</div>
			<div class="form-group select_unit mb-2 mt-2">
			</div>
			<div class="row m-0 align-items-center detailBtn pt-1">
				<div class="cartbox pb-2" [ngClass]="{'show-counter': product?.addedCartCount>0}">
					<a [title]="'add_to_cart' | translate" class="addcart-btn shopingcart-tbtn btn" (click)="addToCart(product);"
						id="addcart-1"> {{'add_to_cart' | translate}}</a>
					<div class="contercontern">
						<div class="handle-counter d-flex" id="handleCounter">
							<button (click)="delete(product);"
								class="counter-minus btn">-</button>
							<input type="text" [ngModel]="product?.addedCartCount" readonly>
							<button (click)="add(product);"
								class="counter-plus btn">+</button>
						</div>
					</div>
				</div>
				<div class="cartbox prl pb-2">
					<a [title]="'checkout' | translate" (click)="logged_user?.storeID ? navigate(product?.productID) : fastPay(product?.productID)" class="btn-secondary btn btn-md" id="addcart-3">{{'Fast Pay'}}</a>
				</div>
				<div class="cartbox prl pb-2" *ngIf="product?.addedCartCount>0">
					<a [title]="'checkout' | translate" routerLink="/checkout" class="btn-secondary btn btn-md" id="addcart-2">{{'checkout' | translate}}</a>
				</div>
				<div class="cartbox prl pb-2 col-12 p-0" *ngIf="product?.addedCartCount>0">
					<a [title]="'continue_shopping' | translate" routerLink='/' class="btn-outline-secondary btn btn-md">{{'continue_shopping' | translate}}</a>
				</div>
			</div>
			<div class="wishlistConten d-flex align-items-center">
				<div class="pr-4">
					<a class="cursr"
						(click)="add_favourite(product?.productID); product.isFavorite='Yes';"
						*ngIf="product?.isFavorite === 'No'"><i class="far fa-heart"></i>
						{{'add_to_wishlist' | translate}}</a>
					<a class="cursr" (click)="remove(product?.productID); product.isFavorite='No';"
						*ngIf="product?.isFavorite === 'Yes'"><i class="fa fa-heart"
							[@shakeOnEnter] style="color:red;"></i> {{'added_to_wishlist' |
						translate}}</a>
				</div>
				<div class="shareDetail">
					<span class="pr-2">{{'share' | translate}}:</span>
					<a title="facebook" shareButton="facebook" #fbBtn="shareButton" class="cursr"><i *ngIf="fbBtn" [icon]="fbBtn.icon" size="lg" class="fab fa-facebook-f"></i></a>
					<a title="twitter" shareButton="twitter" #twiBtn="shareButton" class="cursr"><i *ngIf="twiBtn" [icon]="twiBtn.icon" size="lg" class="fab fa-twitter"></i></a>
					<a title="pinterest" shareButton="pinterest" #pntBtn="shareButton" class="cursr"><i *ngIf="pntBtn" [icon]="pntBtn.icon" size="lg" class="fab fa-pinterest"></i></a>
					<a title="whatsapp" shareButton="whatsapp" #gleBtn="shareButton" class="cursr"><i *ngIf="gleBtn" [icon]="gleBtn.icon" size="lg" class="fab fa-whatsapp"></i></a>
					<a title="linkedin" shareButton="linkedin" #likinBtn="shareButton" class="cursr"><i *ngIf="likinBtn" [icon]="likinBtn.icon" size="lg" class="fab fa-linkedin-in"></i></a>
				</div>
			</div>
		</div>
	</div>
</div>
  `,
	styles: [`a img { cursor: -webkit-zoom-in;  cursor: zoom-in; }`],
	animations: [
		trigger('fadeIn', fadeIn()),
		shakeOnEnterAnimation()
	]
})
export class DetailsComponent implements OnInit, OnDestroy {
	@Input() product?: ProductListDetails;
	stars: number[] = [1, 2, 3, 4, 5];
	logged_user: USER_RESPONSE = null;
	tempOrderID: string;
	subs = new SubSink();
	bModalRef: BsModalRef;
	caseOptions: OwlOptions = {
		autoplay: false,
		dots: false,
		loop: false,
		nav: true,
		navText: ["<span>‹</span>", "<span >›</span>"],
		responsive: {
			0: {
				items: 4
			},
			768: {
				items: 4
			},
			900: {
				items: 4
			},
			1000: {
				items: 4
			}
		}
	};
	constructor(
		private store: Store<State>,
		private auth: AuthenticationService,
		private root: RootService,
		private cookie: CookieService,
		private modal: BsModalService,
		private router: Router
	) {
		// for updating user
		this.subs.add(this.root.update$.subscribe(status => {
			if (status === '200') {
				this.checkStatus();
			}
		}));
	}
	ngOnInit(): void {
		this.tempOrderID = this.cookie.get('Temp_Order_ID') ? this.cookie.get('Temp_Order_ID') : '0';
		this.checkStatus();
	}
	navigate = (p: string) => {
		if (this.logged_user.storeID) {
			this.router.navigate(['/checkout'], { queryParams: { fast_pay: true, p: p } })
		}
	}
	openG = () => {
		($('#magnific') as any).magnificPopup({
			type: 'image',
			closeOnContentClick: true,
			closeBtnInside: false,
			fixedContentPos: true,
			tLoading: 'Loading...', // Text that is displayed during loading. Can contain %curr% and %total% keys
			mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
			items: this.product.productImageArrayCopy,
			gallery: {
				enabled: true
			},
			zoom: {
				enabled: false,
				duration: 300, // don't foget to change the duration also in CSS,
				mainClass: 'mfp-fade', //Adds magnific's fade effect
			},
			image: {
				verticalFit: true,
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
				titleSrc: function (item: { el: { attr: (arg0: string) => string; }; src: string; }) {
					return '<a class="image-source-link" href="' + item.src + '" target="_blank">image source</a>';
				}
			}
		})
		$.extend(true, ($ as any).magnificPopup.defaults, {
			tClose: 'Close (Esc)', // Alt text on close button
			tLoading: 'Loading...', // Text that is displayed during loading. Can contain %curr% and %total% keys
			gallery: {
				tPrev: 'Previous (Left arrow key)', // Alt text on left arrow
				tNext: 'Next (Right arrow key)', // Alt text on right arrow
				tCounter: '%curr% of %total%' // Markup for "1 of 7" counter
			},
			image: {
				tError: '<a href="%url%">The image</a> could not be loaded.' // Error message when image could not be loaded
			},
			ajax: {
				tError: '<a href="%url%">The content</a> could not be loaded.' // Error message when ajax request failed
			}
		});
	}
	openGallary = (productImage: {
		src_id: string;
		src_img: string;
		src_name_arb: string;
		src_name_eng: string;
	}) => {
		this.product.productImage = productImage.src_img;
		this.product.productImageArrayCopy.forEach((item, i) => {
			if (item.src_img === productImage.src_img) {
				this.product.productImageArrayCopy.splice(i, 1);
				this.product.productImageArrayCopy.unshift(item);
			}
		});
	}
	add_favourite = (productID: string) => {
		this.root.add_wishlist(JSON.stringify({
			loginuserID: this.logged_user.userID,
			languageID: this.logged_user.languageID,
			productID
		})).subscribe(() => this.store.dispatch(new SEARCH_NEW_QUERY(JSON.stringify(wishlist))))
	}
	remove = (productID: string) => {
		this.root.remove_wishlist(JSON.stringify({
			loginuserID: this.logged_user.userID,
			languageID: this.logged_user.languageID,
			productID
		})).subscribe(() => this.store.dispatch(new SEARCH_NEW_QUERY(JSON.stringify(wishlist))))
	}
	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
	checkStatus = () => {
		// getting auth user data
		this.subs.add(this.auth.user.subscribe(user => {
			if (user) {
				this.logged_user = user;
				tepmOrder.loginuserID = user.userID;
				wishlist.loginuserID = user.userID;
				this.tempOrderID = this.cookie.get('Temp_Order_ID') ? this.cookie.get('Temp_Order_ID') : '0';
			}
			if (user === null) {
				this.logged_user = null;
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
					this.openAddress(this.logged_user.address, { productID: item.productID, qty: '1', productPrice: item.productPrice }, 'details');
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
					status: 'details',
					product: { productID: item.productID, qty: '1', productPrice: item.productPrice }
				}]
			};
			this.bModalRef = this.modal.show(LocationSelectionComponent, { id: 399, initialState });
		}
	}
	fastPay = async (p: string) => {
		if (this.logged_user) {
			if (this.logged_user.address.length === 0) {
				this.modal.show(AlertComponent, { id: 93, animated: false, ignoreBackdropClick: true, keyboard: false, class: 'modal-sm modal-dialog-centered' });
			}
			if (this.logged_user.address.length > 0) {
				if (!this.logged_user.storeID) {
					this.openAddress(this.logged_user.address, { productID: p, qty: '1', productPrice: '' }, 'fast_pay');
				}
			}
		}
		if (!this.logged_user) {
			const initialState = {
				list: [{
					status: 'fast_pay',
					product: { productID: p, qty: '1', productPrice: '' }
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
	placeTempOrder = (pro: ProductList) => {
		pro.addedCartCount++;
		return new Promise((resolve, reject) => {
			this.subs.add(this.root.placeNewOrderTemp(JSON.stringify({
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
			}, () => {
				reject('Oops! Something went wrong while placing first temp item to cart!');
				console.error('Oops! Something went wrong while placing first temp item to cart!');
			}));
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
			this.subs.add(this.root.addItemToCartTemp(JSON.stringify({
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
			}, () => {
				reject('Oops! Something went wrong while adding item to cart!');
				console.error('Oops! Something went wrong while adding item to cart!');
			}));
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
			this.subs.add(this.root.deleteItemFromCartTemp(JSON.stringify({
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
			}, () => {
				reject('Oops! Something went wrong while deleting item from cart!');
				console.error('Oops! Something went wrong while adding item from cart!');
			}));
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
