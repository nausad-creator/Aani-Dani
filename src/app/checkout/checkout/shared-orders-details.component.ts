import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductList } from 'src/app/interface';

@Component({
	selector: 'app-shared-orders-details',
	template: `
    <div class="paymentDetails">
                            <h5>Your Order</h5>
                            <div class="tableCart">
                                <div class="table-responsive">
                                  <table class="table">
                                  <thead>
                                    <tr>
                                      <th>Product</th>
                                      <th class="text-right">Subtotal</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr *ngFor="let item of products">
                                      <td class="align-middle">{{item?.productName}} <p class="mb-0">Qty:{{item?.Qty | number}}</p></td>
                                      <td class="align-middle text-right">{{(item?.productPrice | number) + ' SR'}}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>  
                            </div>	
                            <hr class="mt-0">
                            <div class="coponCode d-flex">
                                <div class="form-group mb-0 w-100">
                                    <input type="text" class="form-control bg-white" placeholder="Coupon Code">
                              </div>
                              <div class="pl-3">
                                  <a href="javascript:voil(0)" class="apply-btn shopingcart-tbtn btn"> Apply coupon</a>
                              </div>
                            </div>	
                            <div class="form-group mb-0 w-100 mt-3">
                              <textarea class="form-control bg-white" [formControl]="orderNote" id="comment" name="comment" rows="2"></textarea>
                          </div>
                          <div class="priceDiscri pt-3">
                                <div class="d-flex pb-2">
                                    <div class="totalPr">Item Total</div>	
                                    <div class="totalPr ml-auto">{{(billingDetails?.item_Total | number) + ' SR'}}</div>
                                </div>
                                <div class="d-flex pb-2">
                                    <div class="itemPr">Discount</div>	
                                    <div class="itemPr ml-auto text-success">0.00 SR</div>
                                </div>	
                                <div class="d-flex pb-2">
                                    <div class="itemPr">Delivery Fees <span class="text-success"></span></div>	
                                    <div class="itemPr ml-auto">{{(billingDetails?.delivery_Fee | number) + ' SR'}}</div>
                                </div>	
                                <div class="d-flex pb-2">
                                    <div class="itemPr">Delivery Tip </div>	
                                    <div class="itemPr ml-auto">{{(billingDetails?.delivery_Tip | number) + ' SR'}}</div>
                                </div>
                                <div class="d-flex pb-2">
                                    <div class="itemPr">Vat</div>	
                                    <div class="itemPr ml-auto">{{(billingDetails?.vat | number) + ' SR'}}</div>
                                </div>
                                <div class="d-flex pb-2">
                                    <div class="NTPr">Net Payable</div>	
                                    <div class="NTPr ml-auto">{{(billingDetails?.net_Payable | number) + ' SR'}}</div>
                                </div>
                            </div>		
                            <br>
                            <div class="row">
                                <div class="col-6">
                                    <button routerLink='/' class="btn w-100 btn-outline-secondary">Continue Shopping</button>
                                </div>
                                <div class="col-6">
                                    <button (click)="place.emit(orderNote.value)" type="button" class="btn btn-them w-100">
				    <span class="spinner-border spinner-border-sm" style="margin: 1px;" role="status" aria-hidden="true" *ngIf="preventAbuse"></span>
					    {{preventAbuse ? 'Please wait...' : 'Proceed to Pay'}}</button>
                                </div>		
                            </div>
        </div>
  `,
	styles: [
	]
})
export class SharedOrdersDetailsComponent implements OnInit {
	@Input() billingDetails: {
		delivery_Tip: string;
		delivery_Fee: string;
		item_Total: string;
		vat: string;
		net_Payable: string;
	};
	@Input() products: ProductList[] = [];
	@Input() preventAbuse: boolean;
	@Output() place: EventEmitter<string> = new EventEmitter();
	orderNote = new FormControl('');
	constructor() { }
	ngOnInit(): void {
	}
}
