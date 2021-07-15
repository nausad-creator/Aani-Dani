import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/authentication.service';
import { OrderDetailsTemp, TempCartItems, TempOrders } from 'src/app/interface';
import { RootService } from 'src/app/root.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-shared-details',
  template: `
    <div class="tableCart" *ngIf="this.orders[0].orderdetails.length>0">
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
                                  <td class="align-middle"><div class="form-group mb-0 detailBtn"><input type="number" class="form-control" [value]="product.Qty" min="1" readonly></div></td>
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
  ], changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharedDetailsComponent implements OnInit {
  @Input() orders: TempOrders[];
  data: OrderDetailsTemp;
  isLoggedIN: boolean;
  isLoggedID: string;
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
  decline = () => {
    this.modalRef.hide();
  }
  openModal = (template: TemplateRef<any>, item: OrderDetailsTemp) => {
    this.data = item;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }
  removeItem = (pro: OrderDetailsTemp) => {
    this.root.deleteItemFromCartTemp(JSON.stringify({
      loginuserID: this.isLoggedID,
      languageID: '1',
      orderID: this.cookie.get('Temp_Order_ID'),
      productID: pro.productID,
      orderdetailsQty: pro.Qty,
      orderdetailsPrice: pro.productPrice
    })).subscribe(r => {
      if (r.status === 'true') {
        this.updateCart.emit({ data: '', res: Math.random() })
        this.decline();
        this.toastr.success('Product removed successfully');
        this.removeFromLocal({
          productID: pro.productID,
          qty: +pro.Qty
        });
      }
    }), () => console.error('error while deleting item from cart!');
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
