import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
	selector: 'app-success-pop-up',
	template: `
    <!--Succesfull Modal -->
    <div class="modal-contents">      
      <div class="modal-body">
        <div class="contenttopText text-center">
        	<div class="p-3 checkIcon"><i class="fas fa-check-circle text-success"></i></div>
        	<h5 class="">{{'order_successfully_placed' | translate}}</h5>
        	<small>{{'order_id' | translate}}: {{list[0].orderID}}</small>
        	<p class="pt-3">{{'thanks_for_placing_order_with_us' | translate}}</p>
        	<p class="mb-0">{{'query_and_further_information_contact_customer_support' | translate}}</p>        	
        </div>	
        <br>
        <div class="pt-3">
        	<div class="col-12 pb-3">
				<button type="button" (click)="bsModal.hide()" routerLink='/user/my-orders' class="btn btn-them w-100 btn-md">{{'tarck_order' | translate}}</button>
			</div>	
			<div class="col-12">
				<a (click)="bsModal.hide()" routerLink='/' class="btn w-100 btn-outline-secondary btn-md">{{'continue_shopping' | translate}}</a>
			</div>				
		</div>
		<br>	
      </div>
    </div>
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
          }`
	]
})
export class SuccessPlacedOrderComponent implements OnInit {
	list: { orderID: string }[] = [];
	constructor(public bsModal: BsModalRef) { }
	ngOnInit(): void {
	}
}
