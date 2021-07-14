import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-success-pop-up',
    template: `
    <!--Succesfull Modal -->
    <div class="modal-contents">      
      <div class="modal-body">
        <div class="contenttopText text-center">
        	<div class="p-3 checkIcon"><i class="fas fa-check-circle text-success"></i></div>
        	<h5 class="">Order Successfully Placed</h5>
        	<small>Order ID: AND002-99</small>
        	<p class="pt-3">Thanks for placing your order with us</p>
        	<p class="mb-0">for any queations and futher information please contact our customer support</p>        	
        </div>	
        <br>
        <div class="pt-3">
        	<div class="col-12 pb-3">
				<button type="button" (click)="bsModal.hide()" routerLink='/user/my-orders' routerLinkActive='active' class="btn btn-them w-100 btn-md">Track Order</button>
			</div>	
			<div class="col-12">
				<a type="button" class="btn w-100 btn-outline-secondary btn-md">Continue Shopping</a>
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
export class SuccessPlacedOrderComponent {
    constructor(public bsModal: BsModalRef){}
}
