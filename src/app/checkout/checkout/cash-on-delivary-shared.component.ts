import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-cash-on-delivary-shared',
	template: `
    		<div class="addressContent">
                            <div class="controlgroup" style="padding-left:20px;">
                              <label class="control control--radio" for="Cashon"> 
                                <input type="radio" (click)="updateMode.emit('Cash On Delivary')" name="defaultExampleRadios" class="form-check-input cursr" id="Cashon">{{'cash_on_delivery' | translate}}</label>						
                          </div>														
                        </div>	
  `,
	styles: [
	]
})
export class CashOnDelivarySharedComponent {
	@Output() updateMode = new EventEmitter<string>();
}
