import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-saved-card',
	template: `
    		<div class="cartlist-conten">
                              <p>{{'saved_cards' | translate}}</p>

                              <div class="saved-card mt-2">
                                  <div class="debitcarditem" *ngFor="let card of dummy_saved_card;">
                                      <div class="controlgroup" style="padding: 0;">
                                          <label class="control control--radio mb-0" [for]="card.card_holder"> 
                                            <input type="radio" name="defaultExampleRadios" (change)="updateMode.emit(card.payment_mode)" class="form-check-input cursr" [id]="card.card_holder">
                                            <div class="crnumber d-flex">
                                                <div class="cardimg"><img [src]="card.img_scr" alt=""></div>
                                              <div class="cardName">
                                                  <h6>{{card.bank}}</h6>
                                                  <p>{{card.card_number}}</p>					
                                              </div>
                                              <div class="entercv">
                                                  <div class="form-group mb-0"><input type="text" class="form-control bg-white" placeholder="CVV"></div>
                                              </div>													
                                            </div>											  
                                          </label>
                                      </div>
                                  </div>
                              </div>
                                          
                          </div>
  `,
	styles: [
	]
})
export class SavedCardSharedComponent {
	dummy_saved_card = [
		{
			card_holder: 'Nausad Ansari',
			card_number: '5210 **** **** 1634',
			bank: 'HDFC',
			img_scr: 'assets/images/visa-img.png',
			payment_mode: 'Card'
		},
		{
			card_holder: 'Samsad Ansari',
			card_number: '5210 **** **** 1634',
			bank: 'SBI',
			img_scr: 'assets/images/mastercard-img.png',
			payment_mode: 'Card'
		}
	]
	@Output() updateMode = new EventEmitter<string>();
}
