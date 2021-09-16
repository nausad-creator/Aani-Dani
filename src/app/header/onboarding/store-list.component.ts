import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { map, take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication.service';
import { ADDRESS, ProductList, TempCartItems, USER_RESPONSE } from 'src/app/interface';
import { RootService } from 'src/app/root.service';
import { SubSink } from 'subsink';

@Component({
	selector: 'app-store-list',
	template: `
     <!-- The Modal -->
     <div class="modal-contents" [loader]="preventAbuse">
      <!-- Modal Header -->
      <div class="modal-header">
        <h4 class="modal-title">{{'select_store' | translate}}</h4>
        <button type="button" (click)="!preventAbuse ? onClose() : ''" class="close" data-dismiss="modal">&times;</button>
      </div>
      <!-- Modal body -->
      <form method="post" (ngSubmit)="submit_store()" class="bootstrap-form needs-validation">
        <div class="modal-body">
        <div class="alerts alert-danger" role="alert" *ngIf="error">
      			<h5 class="alert-heading text-center">Error!</h5>
      			<p class="mb-0 text-center">{{'please_select_store' | translate}}</p>
    		  </div>
          <div class="superviser_content">
          <div class="supervisor_list demo-radio-button">
	  <div class="d-flex">
		<label _ngcontent-man-c117="">{{'stores_list' | translate}}</label>
  	</div>
             <div class="message-center" *ngFor="let store of list[0].stores">
                  <div class="radeio-list">					  	
                      <input name="store" (change)="onChange($event.target.value); error = '';" [value]="store?.storeID" [checked]="store?.storeID === storeID" type="radio" [id]="store?.storeID" class="with-gap radio-col-black cursr">
                      <label class="cursr" [for]="store?.storeID">{{store?.storeName | titlecase}}</label>
                  </div>				  
              </div>
          </div>
         </div>
          <div class="modal-footer">
            <button class="btn btn-them btn-md w-100" [disabled]="preventAbuse" type="submit">{{ preventAbuse ? ('wait' | translate) : ('done' | translate) }} </button>
          </div>
        </div>
      </form>
    </div>
	<!-- Modal Cancel Entire Order-->
	<!-- <div class="modal fade" bsModal #alert="bs-modal" tabindex="-1" role="dialog" aria-labelledby="dialog-nested-name2">
  	<div class="modal-dialog modal-dialog-centered">
	<div class="modal-contents" [loader]="preventAbuse">
		<div class="modal-body">
			<div class="pt-3">
				<p class="text-center">{{'Are you sure you want to change the store?'}}</p>
				<div class="text-center p-3">
					<button class="btn btn-default btn-sm btn-cancel pl-3 pr-3" (click)="alert.hide()"
						aria-label="Close"> No
					</button>
					<button class="btn btn-info btn-sm theme-btn" (click)="emptyCart(); preventAbuse = true;"
						style="margin-left: 5px;">Yes</button>
				</div>
			</div>
		</div>
	</div>
	</div>
	</div> -->
  `,
	styles: [
		`.modal-contents {
			position: relative;
			display: flex;
			flex-direction: column;
			width: 100%;
			pointer-events: auto;
			background-color: #fff;
			background-clip: padding-box;
			border-radius: .3rem;
			outline: 0;
		}
		.modal-backdrop~.modal-backdrop {
  			z-index: 1051;
		}
		.modal-backdrop~.modal-backdrop~.modal-backdrop {
  			z-index: 1052;
		}
		.modal-backdrop~.modal-backdrop~.modal-backdrop~.modal-backdrop {
  			z-index: 1053;
		}
		.modal-contents {
  			box-shadow: 0 5px 6px -3px rgba(0,0,0,.2), 0 9px 12px 1px rgba(0,0,0,.14), 0 3px 16px 2px rgba(0,0,0,.12);
		}
		.alerts{
			position: relative;
			padding: .75rem 0.25rem;
			margin-bottom: 2rem;
			border-radius: .25rem;
		}`
	], changeDetection: ChangeDetectionStrategy.Default
})
export class StoreListComponent implements OnInit, OnDestroy {
	error: string = '';
	list: {
		status: string, product: ProductList, address: ADDRESS[], stores: {
			storeID: string;
			storeName: string;
		}[]
	}[] = [];
	preventAbuse = false;
	logged_user: USER_RESPONSE = null;
	subs = new SubSink();
	storeID: string;
	@ViewChild('alert') public alert: ModalDirective;
	event_address_list: EventEmitter<{ data: string, res: number }> = new EventEmitter();
	constructor(
		private bsModal: BsModalRef,
		private router: Router,
		private root: RootService,
		private auth: AuthenticationService,
		private cookie: CookieService) {
		// getting auth user data
		this.subs.add(this.auth.user.subscribe(user => {
			if (user) {
				this.logged_user = user;
			}
			if (user === null) {
				this.logged_user = null;
			}
		}));
		// for updating address-list
		this.subs.add(this.root.update$.subscribe(status => {
			if (status === 'update_address_list') {
				this.list[0].address = this.logged_user?.address;
			}
		}));
	}
	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
	ngOnInit(): void {
		this.storeID = this.logged_user?.storeID ? this.logged_user?.storeID : '';
	}
	onClose = () => {
		this.bsModal.hide();
	}
	onChange = (e: string) => {
		this.storeID = e;
	}
	openModal = () => {
		this.alert.show();
	}
	emptyCart = () => {
		this.root.emptyCart(JSON.stringify({
			loginuserID: this.logged_user.userID,
			orderID: this.cookie.get('Temp_Order_ID')
		})).subscribe(r => {
			if (r.status === 'true') {
				this.emptyLocalCart();
				this.root.forceReload();
				this.root.update_user_status$.next('update_header');
				this.root.update_user_status$.next('refresh_or_reload');
				if (localStorage.getItem('USER_LOGGED')) {
					const tempUser = JSON.parse(localStorage.getItem('USER_LOGGED')) as USER_RESPONSE;
					tempUser.storeID = this.list[0]?.stores.filter(s => s.storeID === this.storeID)[0].storeID;
					tempUser.storeName = this.list[0]?.stores.filter(s => s.storeID === this.storeID)[0].storeName;
					tempUser.address = this.list[0]?.address;
					tempUser.stores = this.list[0]?.stores;
					this.auth.updateUser(tempUser);
					this.root.update_user_status$.next('200');
					localStorage.setItem('USER_LOGGED', JSON.stringify(tempUser));
				}
				if (sessionStorage.getItem('USER_LOGGED')) {
					const tempUser = JSON.parse(sessionStorage.getItem('USER_LOGGED')) as USER_RESPONSE;
					tempUser.storeID = this.list[0]?.stores.filter(s => s.storeID === this.storeID)[0].storeID;
					tempUser.storeName = this.list[0]?.stores.filter(s => s.storeID === this.storeID)[0].storeName;
					tempUser.address = this.list[0]?.address;
					tempUser.stores = this.list[0]?.stores;
					this.auth.updateUser(tempUser);
					this.root.update_user_status$.next('200');
					sessionStorage.setItem('USER_LOGGED', JSON.stringify(tempUser));
				}
				setTimeout(() => {
					// this.alert.hide();
					this.onClose();
					this.preventAbuse = false;
					if (this.router.url !== '/') {
						this.router.navigate(['/']);
					}
				}, 500);
			}
		}, err => console.error(err));
	}
	emptyLocalCart = () => {
		localStorage.setItem('tempCart', JSON.stringify([]));
	}
	submit_store = () => {
		if (this.storeID) {
			this.error = '';
			if (this.logged_user?.storeID) {
				if (this.logged_user?.storeID !== this.storeID) {
					// this.openModal();
					const r = confirm('Once you change store the cart items will be cleared!\nAre you sure you want to change the store?')
					if (r) {
						this.preventAbuse = true;
						this.emptyCart();
					}
				}
			}
			if (!this.logged_user?.storeID || this.logged_user?.storeID === this.storeID) {
				this.preventAbuse = true;
				if (localStorage.getItem('USER_LOGGED')) {
					const tempUser = JSON.parse(localStorage.getItem('USER_LOGGED')) as USER_RESPONSE;
					tempUser.storeID = this.list[0]?.stores.filter(s => s.storeID === this.storeID)[0].storeID;
					tempUser.storeName = this.list[0]?.stores.filter(s => s.storeID === this.storeID)[0].storeName;
					tempUser.address = this.list[0]?.address;
					tempUser.stores = this.list[0]?.stores;
					this.auth.updateUser(tempUser);
					this.root.update_user_status$.next('200');
					localStorage.setItem('USER_LOGGED', JSON.stringify(tempUser));
				}
				if (sessionStorage.getItem('USER_LOGGED')) {
					const tempUser = JSON.parse(sessionStorage.getItem('USER_LOGGED')) as USER_RESPONSE;
					tempUser.storeID = this.list[0]?.stores.filter(s => s.storeID === this.storeID)[0].storeID;
					tempUser.storeName = this.list[0]?.stores.filter(s => s.storeID === this.storeID)[0].storeName;
					tempUser.address = this.list[0]?.address;
					tempUser.stores = this.list[0]?.stores;
					this.auth.updateUser(tempUser);
					this.root.update_user_status$.next('200');
					sessionStorage.setItem('USER_LOGGED', JSON.stringify(tempUser));
				}
				if (this.list[0]?.status === 'true' || this.list[0]?.status === 'Location') {
					this.add_to_cart();
				}
				if (this.list[0]?.status === 'false') {
					setTimeout(() => {
						this.onClose();
						this.preventAbuse = false;
					}, 500);
				}
			}
		}
		if (!this.storeID) {
			this.error = 'Please select store?.';
			this.preventAbuse = false;
			if (localStorage.getItem('USER_LOGGED')) {
				const tempUser = JSON.parse(localStorage.getItem('USER_LOGGED')) as USER_RESPONSE;
				tempUser.storeID = '';
				tempUser.storeName = '';
				this.auth.updateUser(tempUser);
				localStorage.setItem('USER_LOGGED', JSON.stringify(tempUser));
			}
			if (sessionStorage.getItem('USER_LOGGED')) {
				const tempUser = JSON.parse(sessionStorage.getItem('USER_LOGGED')) as USER_RESPONSE;
				tempUser.storeID = '';
				tempUser.storeName = '';
				this.auth.updateUser(tempUser);
				sessionStorage.setItem('USER_LOGGED', JSON.stringify(tempUser));
			}
		}
	}
	add_to_cart = () => {
		this.subs.add(this.root.ordersTemp(JSON.stringify({
			orderID: '0',
			loginuserID: this.logged_user?.userID,
			languageID: '1'
		})).pipe(map((res) => res), take(1)).subscribe(async r => {
			if (r[0].status === 'true') {
				if (localStorage.getItem('tempCart')) {
					localStorage.removeItem('tempCart');
				}
				localStorage.setItem('tempCart', JSON.stringify(r[0].data[0].orderdetails.length > 0 ? r[0].data[0].orderdetails.map(c => {
					return {
						productID: c.productID,
						qty: +c.Qty.split('.')[0]
					}
				}) : []));
				this.cookie.set('Temp_Order_ID', r[0].data.length > 0 ? r[0].data[0].temporderID : '0');
				if (this.list[0]?.product) {
					const res = await this.addItemToCart({ userID: this.logged_user?.userID, tempID: r[0].data[0].temporderID, product: this.list[0]?.product }) as string;
					if (res === 'Added_sucessfully') {
						this.root.update_user_status$.next('refresh_or_reload');
					}
				}
				if (!this.list[0]?.product) {
					this.root.update_user_status$.next('refresh_or_reload');
				}
				this.preventAbuse = false;
			}
			if (r[0].status === 'false') {
				this.cookie.set('Temp_Order_ID', '0')
				if (this.list[0]?.product) {
					const res = await this.placeTempOrder({ userID: this.logged_user?.userID, tempID: '0', product: this.list[0]?.product }) as { message: string, temporderID: string };
					this.cookie.set('Temp_Order_ID', res.temporderID);
					if (res.message === 'Added_sucessfully') {
						this.root.update_user_status$.next('refresh_or_reload');
					}
				}
				if (!this.list[0]?.product) {
					this.root.update_user_status$.next('refresh_or_reload');
				}
				this.preventAbuse = false;
			}
			setTimeout(() => {
				this.root.forceReload();
				if (this.list[0]?.status === 'Location') {
					this.root.update_user_status$.next('update_header');
				}
				if (this.list[0]?.status === 'Header') {
					this.root.update_user_status$.next('update_header');
				}
				this.onClose()
			}, 100);
		}, err => console.error(err)));
	}
	placeTempOrder = (temp: { userID: string, tempID: string, product: ProductList }) => {
		return new Promise((resolve, reject) => {
			this.subs.add(this.root.placeNewOrderTemp(JSON.stringify({
				loginuserID: temp.userID,
				languageID: '1',
				orderdetails: [{
					productID: temp.product.productID,
					orderdetailsQty: 1,
					orderdetailsPrice: temp.product.productPrice
				}]
			})).subscribe(r => {
				if (r[0].status === 'true') {
					this.addToLocal({
						productID: temp.product.productID,
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
	addItemToCart = (temp: { userID: string, tempID: string, product: ProductList }) => {
		return new Promise((resolve, reject) => {
			this.subs.add(this.root.addItemToCartTemp(JSON.stringify({
				loginuserID: temp.userID,
				languageID: '1',
				orderID: temp.tempID,
				productID: temp.product.productID,
				orderdetailsQty: '1',
				orderdetailsPrice: temp.product.productPrice
			})).subscribe(r => {
				if (r.status === 'true') {
					this.addToLocal({
						productID: temp.product.productID,
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
}
