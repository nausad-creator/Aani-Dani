import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { map, take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication.service';
import { ADDRESS, ProductList, Store, TempCartItems, USER_RESPONSE } from 'src/app/interface';
import { RootService } from 'src/app/root.service';
import { SubSink } from 'subsink';

@Component({
	selector: 'app-address-list',
	template: `
     <!-- The Modal -->
     <div class="modal-contents">
      <!-- Modal Header -->
      <div class="modal-header">
        <h4 class="modal-title">Select Address</h4>
        <button type="button" (click)="!preventAbuse ? onClose() : ''" class="close" data-dismiss="modal">&times;</button>
      </div>
      <!-- Modal body -->
      <form method="post" (ngSubmit)="submit_address();error=''" class="bootstrap-form needs-validation">
        <div class="modal-body">
        <div class="alerts alert-danger" role="alert" *ngIf="error">
      			<h5 class="alert-heading text-center">Error!</h5>
      			<p class="mb-0 text-center">{{error}}</p>
    		  </div>
          <div class="superviser_content">
          <div class="supervisor_list demo-radio-button">
	  <div class="d-flex">
		<label _ngcontent-man-c117="">Address List</label>
  		<div class="ml-auto"><a class="cursr" (click)="clickOnNavigate()">+ Add Address</a></div>
  	</div>
             <div class="message-center" *ngFor="let address of list[0].address | myfilterAddress">
                  <div class="radeio-list">					  	
                      <input name="Supervisor" (change)="onChange($event.target.value)" [value]="address.addressID" [checked]="address.addressID === checked_address" type="radio" [id]="address.addressID" class="with-gap radio-col-black cursr">
                      <label class="cursr" [for]="address.addressID">{{address.fullAddress}} <br>{{address.cityName + ' ' + address.countryName + ' ' + address.addressPincode}} </label>
                  </div>				  
              </div>
          </div>
         </div>
          <div class="modal-footer">
            <button class="btn btn-them btn-md w-100" [disabled]="preventAbuse" type="submit">{{ preventAbuse ? 'Wait..' : 'Done' }} </button>
          </div>
        </div>
      </form>
    </div>
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
	.alerts{
		position: relative;
    		padding: .75rem 0.25rem;
    		margin-bottom: 2rem;
    		border-radius: .25rem;
	}`
	], changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressListComponent implements OnInit {
	error: string = '';
	list: { status: string, product: ProductList, address: ADDRESS[] }[] = [];
	preventAbuse = false;
	logged_user: USER_RESPONSE = null;
	checked_address: string;
	subs = new SubSink();
	event_address_list: EventEmitter<{ data: string, res: number }> = new EventEmitter();
	constructor(
		private bsModal: BsModalRef,
		private root: RootService,
		private cd: ChangeDetectorRef,
		private auth: AuthenticationService,
		private cookie: CookieService,
		private router: Router
	) {
		// getting auth user data
		this.subs.add(this.auth.user.subscribe(user => {
			if (user) {
				this.logged_user = user;
			}
			if (user === null) {
				this.logged_user = null;
			}
		}));
	}
	clickOnNavigate = () => {
		this.onClose();
		setTimeout(() => {
			this.router.navigate(['/user/saved-address'], { queryParams: { tag: 'add_new' } });
		}, 300);
	}
	ngOnInit(): void {
		this.checked_address = this.list[0].address.filter(a => a.addressIsDefault === 'Yes')[0].addressID;
	}
	onClose = () => {
		this.bsModal.hide();
	}
	onChange = (e: string) => {
		this.checked_address = e;
	}
	submit_address = () => {
		if (!this.checked_address) {
			this.error = 'Please select delivery address.'
		}
		if (this.checked_address) {
			this.preventAbuse = true;
			this.get_store(JSON.stringify(
				{
					currentLat: '24.7253981',
					currentLong: '46.2620271'
				}
			));
		}
	}
	get_store = (cordinate: string) => {
		this.root.store(cordinate).subscribe((res: { status: string; data: Store[]; message: string; }) => {
			if (res.status === 'true') {
				this.list[0].address.map(a => {
					if (a.addressID === this.checked_address) {
						a.addressIsDefault = 'Yes';
					} else {
						a.addressIsDefault = 'No';
					}
				});
				if (localStorage.getItem('USER_LOGGED')) {
					const tempUser = JSON.parse(localStorage.getItem('USER_LOGGED')) as USER_RESPONSE;
					tempUser.storeID = res.data[0].storeID;
					tempUser.address = this.list[0].address;
					this.auth.updateUser(tempUser);
					this.root.update_user_status$.next('200');
					localStorage.setItem('USER_LOGGED', JSON.stringify(tempUser));
				}
				if (sessionStorage.getItem('USER_LOGGED')) {
					const tempUser = JSON.parse(sessionStorage.getItem('USER_LOGGED')) as USER_RESPONSE;
					tempUser.storeID = res.data[0].storeID;
					tempUser.address = this.list[0].address;
					this.auth.updateUser(tempUser);
					this.root.update_user_status$.next('200');
					sessionStorage.setItem('USER_LOGGED', JSON.stringify(tempUser));
				}
				this.add_to_cart();
			}
			if (res.status === 'false') {
				this.error = 'No store is found on selected address.';
				this.preventAbuse = false;
				this.cd.markForCheck();
				if (localStorage.getItem('USER_LOGGED')) {
					const tempUser = JSON.parse(localStorage.getItem('USER_LOGGED')) as USER_RESPONSE;
					tempUser.storeID = '';
					this.auth.updateUser(tempUser);
					localStorage.setItem('USER_LOGGED', JSON.stringify(tempUser));
				}
				if (sessionStorage.getItem('USER_LOGGED')) {
					const tempUser = JSON.parse(sessionStorage.getItem('USER_LOGGED')) as USER_RESPONSE;
					tempUser.storeID = '';
					this.auth.updateUser(tempUser);
					sessionStorage.setItem('USER_LOGGED', JSON.stringify(tempUser));
				}
			}
		}, (err: any) => {
			this.preventAbuse = false;
			throw new Error(`Error while fetching store: ${err}`);
		});
	}
	add_to_cart = () => {
		this.root.ordersTemp(JSON.stringify({
			orderID: '0',
			loginuserID: this.logged_user.userID,
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
				if (this.list[0].product) {
					const res = await this.addItemToCart({ userID: this.logged_user.userID, tempID: r[0].data[0].temporderID, product: this.list[0].product }) as string;
					if (res === 'Added_sucessfully') {
						this.root.update_user_status$.next('refresh_or_reload');
					}
				}
				if (!this.list[0].product) {
					this.root.update_user_status$.next('refresh_or_reload');
				}
				this.preventAbuse = false;
			}
			if (r[0].status === 'false') {
				this.cookie.set('Temp_Order_ID', '0')
				if (this.list[0].product) {
					const res = await this.placeTempOrder({ userID: this.logged_user.userID, tempID: '0', product: this.list[0].product }) as { message: string, temporderID: string };
					this.cookie.set('Temp_Order_ID', res.temporderID);
					if (res.message === 'Added_sucessfully') {
						this.root.update_user_status$.next('refresh_or_reload');
					}
				}
				if (!this.list[0].product) {
					this.root.update_user_status$.next('refresh_or_reload');
				}
				this.preventAbuse = false;
			}
			setTimeout(() => {
				this.root.forceReload();
				if (this.list[0].status === 'Location') {
					this.root.update_user_status$.next('update_header');
				}
				if (this.list[0].status === 'Header') {
					this.root.update_user_status$.next('update_header');
				}
				this.onClose()
			}, 100);
		}, err => console.error(err));
	}
	placeTempOrder = (temp: { userID: string, tempID: string, product: ProductList }) => {
		return new Promise((resolve, reject) => {
			this.root.placeNewOrderTemp(JSON.stringify({
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
			}), () => {
				reject('error while placing first temp item to cart!');
				console.error('error while placing first temp item to cart!');
			};
		});
	}
	addItemToCart = (temp: { userID: string, tempID: string, product: ProductList }) => {
		return new Promise((resolve, reject) => {
			this.root.addItemToCartTemp(JSON.stringify({
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
			}), () => {
				reject('error while adding item to cart!');
				console.error('error while adding item to cart!');
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
}
