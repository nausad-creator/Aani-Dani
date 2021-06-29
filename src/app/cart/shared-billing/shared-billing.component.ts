import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shared-billing',
  template: `
    <div class="paymentDetails">
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
                                    <div class="totalPr ml-auto">382.62 SR</div>
                                </div>
                                <div class="d-flex pb-2">
                                    <div class="itemPr">Discount</div>	
                                    <div class="itemPr ml-auto text-success">50.00 SR</div>
                                </div>	
                                <div class="d-flex pb-2">
                                    <div class="itemPr">Delivery Fees <span class="text-success"></span></div>	
                                    <div class="itemPr ml-auto">10.00 SR</div>
                                </div>	
                                <div class="d-flex pb-2">
                                    <div class="itemPr">Delivery Tip </div>	
                                    <div class="itemPr ml-auto">0.00 SR</div>
                                </div>
                                <div class="d-flex pb-2">
                                    <div class="itemPr">Vat</div>	
                                    <div class="itemPr ml-auto">50.00 SR</div>
                                </div>
                                <div class="d-flex pb-2">
                                    <div class="NTPr">Net Payable</div>	
                                    <div class="NTPr ml-auto">392.62 SR</div>
                                </div>
                            </div>	

                            <br>
                            <button type="button" class="btn btn-them btn-md w-100">Proceed to Checkout</button>

                        </div>
  `,
  styles: [
  ]
})
export class SharedBillingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
