import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-upi-shared',
	template: `
    		<div class="addressContent border-0">
                            <div class="row">
                                <div class="col-4" *ngFor="let item of dummy_upi">
                                    <div class="controlgroup" style="padding-left:20px;">
                                      <label class="control control--radio" [for]="item.img_id"> 
                                        <input type="radio" (change)="updateMode.emit('UPI')" name="defaultExampleRadios" class="form-check-input cursr" [id]="item.img_id"><img [src]="item.img_src" alt=""></label>						
                                  </div>
                              </div>
                          </div>															
                        </div>	
  `,
	styles: [
	]
})
export class UpiSharedComponent {
	dummy_upi = [
		{
			img_src: 'assets/images/stcpay-img.png',
			img_id: `upi_phone_pay_${1}`
		},
		{
			img_src: 'assets/images/applepay-img.png',
			img_id: `upi_google_pay_${2}`
		},
		{
			img_src: 'assets/images/cpay-img.png',
			img_id: `upi_bharat_pay_${3}`
		}
	]
	@Output() updateMode = new EventEmitter<string>();
}
