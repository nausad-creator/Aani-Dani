import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-netbanking-shared',
	template: `
    		<div class="addressContent">
                            <div class="controlgroup" style="padding-left:20px;">
                              <label class="control control--radio" for="NetBanking"> 
                                <input type="radio" (click)="updateMode.emit('Net Banking')" name="defaultExampleRadios" class="form-check-input cursr" id="NetBanking">Net Banking</label>						
                          </div>
                          <form class="text-left form-paymeny pt-2">
                              <div class="form-group">
                                  <select class="form-control bg-white custom-select">
                                      <option selected disabled>Select Bank for Net Banking</option>
                                      <option *ngFor="let item of dummy_banks">{{item.bank}}</option>
                                  </select>	
                              </div>
                          </form>								
                        </div>	
  `,
	styles: [
	]
})
export class NetBankingSharedComponent {
	dummy_banks = [
		{
			bank: 'HDFC'
		},
		{
			bank: 'ICICI'
		},
		{
			bank: 'Kotak'
		},
		{
			bank: 'BOB'
		},
		{
			bank: 'SBI'
		}
	]
	@Output() updateMode = new EventEmitter<string>();
}
