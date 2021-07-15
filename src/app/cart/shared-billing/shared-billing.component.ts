import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-shared-billing',
    template: `
    <div class="paymentDetails" *ngIf="billingDetails.item_Total !== null && billingDetails.item_Total !== 0">
                            <h5>Bill Details</h5>
                            <div class="coponCode d-flex">
                                <div class="form-group mb-0">
                                    <input type="text" class="form-control bg-white" placeholder="Coupon Code">
                              </div>
                              <div class="pl-3">
                                  <a href="javascript:voil(0)" class="apply-btn shopingcart-tbtn btn"> Apply coupon</a>
                              </div>
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
                            <button type="button" routerLink='/checkout' class="btn btn-them btn-md w-100">Proceed to Checkout</button>
    </div>
  `,
    styles: [
    ], changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharedBillingComponent implements OnInit {
    @Input() billingDetails: {
		delivery_Tip: number;
        delivery_Fee: number;
        item_Total: number;
        vat: number;
        net_Payable: number;
	};
    constructor() { }
    ngOnInit(): void {
    }
}
