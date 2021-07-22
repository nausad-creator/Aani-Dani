import { trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { fadeIn } from 'src/app/animation';
import { AuthenticationService } from 'src/app/authentication.service';
import { OrderDetailsTemp, ProductList, TempCartItems, TempOrders, USER_RESPONSE } from 'src/app/interface';
import { RootService } from 'src/app/root.service';
import { SubSink } from 'subsink';

@Component({
	selector: 'app-shared-details',
	template: `
    <div class="tableCart" *ngIf="this.orders[0].orderdetails.length>0" [@fadeIn]>
                            <div class="table-responsive">
                              <table class="table">
                              <thead>
                                <tr>
                                    <th></th>
                                  <th>Product</th>
                                  <th>Price</th>
                                  <th>Quantity</th>
                                  <th>Subtotal</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr *ngFor="let product of this.orders[0].orderdetails">
                                  <td class="align-middle"><div class="d-flex align-items-center"><a title="Remove" (click)="openModal(templateRemove, product)" class="mr-2 cursr"><i class="icofont-close-circled"></i></a> <img offset="50"
            				defaultImage="http://164.52.209.69/aanidani/backend/web/uploads/products/{{product.productImage}}"
            				lazyLoad="http://164.52.209.69/aanidani/backend/web/uploads/products/{{product.productImage}}"
            				[errorImage]="'assets/images/error_not_found.png'" width="80" [alt]="product.productName" [title]="product.productName"></div></td>
                                  <td class="align-middle">{{product.productName}}</td>
                                  <td class="align-middle">{{(product.productPrice | number) + ' SR'}}</td>
                                  <td class="align-middle">
				  <div class="form-group mb-0 detailBtn">
				  <div class="show-counter">
                              		<div class="conterconternCart">
					<div class="handle-counteredit d-flex" id="handleCounter">
					<button (click)="delete(product); $event.stopPropagation();" class="counter-minus btn">-</button>
					<input type="text" [ngModel]="product?.addedCartCount" readonly>
					<button (click)="add(product); $event.stopPropagation();" class="counter-plus btn">+</button>
					</div>
					</div>
                          	 </div>
				  </div>
				  </td>
                                  <td class="align-middle">{{(product.Price | number) + ' SR'}}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>  
                        </div>	
  <ng-template #templateRemove>
    <!-- Modal Cancel Entire Order-->
    <div class="modal-contents">
      <div class="modal-body">
        <div class="pt-3">
          <p class="text-center">Are you sure you want to remove this product?</p>
          <div class="text-center p-3">
            <button class="btn btn-default btn-sm btn-cancel pl-3 pr-3" (click)="decline()" aria-label="Close"> No
            </button>
            <button class="btn btn-info btn-sm theme-btn" (click)="removeItem(data)" style="margin-left: 5px;">Yes</button>
          </div>
        </div>
      </div>
    </div>
  </ng-template>
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
    		.button-block{
			display: block;
			width: 100%;
    		}`
	],
	animations: [
		trigger('fadeIn', fadeIn())
	], changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharedDetailsComponent implements OnInit {
	@Input() orders: TempOrders[];
	data: OrderDetailsTemp;
	logged_user: USER_RESPONSE = null;
	subs = new SubSink();
	modalRef: BsModalRef;
	@Output() updateCart: EventEmitter<{ data: string, res: number }> = new EventEmitter();
	constructor(
		private root: RootService,
		private auth: AuthenticationService,
		private cd: ChangeDetectorRef,
		private toastr: ToastrService,
		private modalService: BsModalService,
		private cookie: CookieService
	) { }
	ngOnInit(): void {
		this.checkStatus();
	}
	checkStatus = () => {
		// getting auth user data
		this.subs.add(this.auth.user.subscribe(user => {
			if (user) {
				this.logged_user = user;
				this.cd.markForCheck();
			}
			if (user === null) {
				this.logged_user = null;
				this.cd.markForCheck();
			}
		}));
	}
	decline = () => {
		this.modalRef.hide();
	}
	openModal = (template: TemplateRef<any>, item?: OrderDetailsTemp) => {
		this.data = item;
		this.modalRef = this.modalService.show(template, { class: 'modal-md' });
	}
	removeItem = (pro: OrderDetailsTemp) => {
		this.root.deleteItemFromCartTemp(JSON.stringify({
			loginuserID: this.logged_user.userID,
			languageID: '1',
			orderID: this.cookie.get('Temp_Order_ID'),
			productID: pro.productID,
			orderdetailsQty: pro.Qty,
			orderdetailsPrice: pro.productPrice
		})).subscribe(r => {
			if (r.status === 'true') {
				this.root.forceReload(); // empty cached cart
				this.updateCart.emit({ data: '', res: Math.random() }); // update cart-list
				this.toastr.success('Product removed successfully');
				this.removeFromLocal({
					productID: pro.productID,
					qty: +pro.Qty
				});
				this.root.update_user_status$.next('refresh_or_reload'); // update all cart values
				this.root.update_user_status$.next('update_header'); // update header
				this.decline();
			}
		}), () => console.error('error while deleting item from cart!');
	}
	delete = async (pro: ProductList) => {
		const res = await this.deleteItemFromCart(pro) as string;
		if (res === 'Deleted_sucessfully') {
			this.root.forceReload(); // empty cached cart
			this.updateCart.emit({ data: '', res: Math.random() }); // update cart-list
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
				reject('error while deleting item from cart!');
				console.error('error while adding item from cart!');
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
				orderID: this.cookie.get('Temp_Order_ID'),
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
	removeFromLocal = (pro: {
		productID: string;
		qty: number;
	}) => {
		if (localStorage.getItem('tempCart')) {
			const cart = JSON.parse(localStorage.getItem('tempCart')) as TempCartItems[];
			const index = cart.map(c => c.productID).indexOf(pro.productID);
			cart.splice(index, 1);
			localStorage.setItem('tempCart', JSON.stringify(cart));
		} else {
			localStorage.removeItem('tempCart');
		}
	}
}
