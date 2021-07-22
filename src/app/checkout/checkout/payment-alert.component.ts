import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
	selector: 'app-payment-alert',
	template: `
    		<div class="modal-contents">
      			<div class="modal-header">
        			<h5 class="modal-title ml-auto text-danger" id="exampleModalLabel">Alert</h5>
        			<button type="button" (click)="onClose()" class="close" data-dismiss="modal" aria-label="Close">
          			<span aria-hidden="true">&times;</span>
        			</button>
      			</div>
      			<div class="modal-body">
        			<h5 class="text-center"> Please select any payment method.</h5>
				<br>
			<div class="text-center pb-1">
				<button type="button" (click)="onClose()" class="addcart-btn shopingcart-tbtn btn">Ok</button></div>
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
		      }
		      .text-danger {
    			color: #dc3545!important;
		      }
		      h5 {
    		        font-size: 16px;
			font-weight: 500;
		      }`
	], encapsulation: ViewEncapsulation.None
})
export class PaymentAlertComponent implements OnInit {
	constructor(
		private bsModalRef: BsModalRef) { }
	ngOnInit(): void {
	}
	onClose = () => {
		this.bsModalRef.hide();
	}
}
