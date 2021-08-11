import { Component } from '@angular/core';

@Component({
	selector: 'app-add-debit-credit-shared',
	template: `
    		<div class="addressContent">
                            <div class="controlgroup" style="padding-left:20px;">
                              <label class="control control--radio" for="Debit"> 
                                <input type="radio" name="defaultExampleRadios" class="form-check-input" id="Debit">{{'add_credit_debit' | translate}}</label>						
                          </div>	
                          <form class="text-left form-paymeny pt-2">							
                            <div class="form-row">
                                <div class="col-md-12 col-sm-12">
                                <div class="form-group"><input type="text" id="CardNumber" class="form-control bg-white" [placeholder]="'card_number' | translate"></div>
                              </div>
                              <div class="col-md-12 col-sm-12">
                                <div class="form-group is-empty"><input type="text" id="defaultRegisterFormFirstName" class="form-control bg-white" [placeholder]="'enter_card_holder_name' | translate"><span class="material-input"></span></div>
                              </div>										 							
                              <div class="col-md-6 col-sm-6">
                                <div class="form-group"><input type="date" class="form-control bg-white" placeholder="Valid Till(MM/YY)"></div>
                              </div>
                              <div class="col-md-6 col-sm-6">
                                <div class="form-group"><input type="text" id="cvv" class="form-control bg-white" placeholder="CVV"></div>
                              </div>	
                              <div class="col-md-12 col-sm-12">
                                  <div class="custom-control custom-checkbox mb-3">
                                    <input type="checkbox" class="custom-control-input" id="Save" name="Save1">
                                    <label class="custom-control-label" for="Save"> {{'save_details_for_future_use' | translate}}</label>
                                  </div>
                              </div>
                              <div class="col-md-12 col-sm-12">
                                  <div class="pt-3">
                                      <a href="javascript:voil(0)" class="apply-btn shopingcart-tbtn btn"> {{'pay_now' | translate}}</a>
                                  </div>
                              </div>											
                            </div>																		
                          </form>
                        </div>	
  `,
	styles: [
	]
})
export class AddDebitCreditSharedComponent {
}
