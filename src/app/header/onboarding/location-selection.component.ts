import { ChangeDetectionStrategy, Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginComponent } from './login.component';

@Component({
	selector: 'app-location-selection',
	template: `
    <!--loaction selection-->
    <div class="modal-contents">
	      <div class="modal-header d-block">
	      	<h5 class="modal-title text-center mb-2" id="exampleModalLabel">{{'select_your_address' | translate}}</h5>
	      	<p class="text-center mb-0">{{'select_a_delivery_location_to_see_products_availbility_and_delivery_options' | translate}}</p>
	      </div>
	      <div class="modal-body">	      	
		      <form class="text-center profile-form"> 
		      	<div class="col pb-3">
					<button type="button" (click)="openLogin()" class="btn btn-them btn-md w-100">{{'login_to_see_your_address' | translate}}</button>
			</div>
		      </form>
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
	], changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationSelectionComponent implements OnInit {
	list: { product: { productID: string, qty?: string, productPrice: string }, status: string }[] = [];
	event_location_selection: EventEmitter<{ data: string, res: number }> = new EventEmitter();
	constructor(
		private modal: BsModalService,
		private bsModal: BsModalRef,
	) { }
	ngOnInit(): void {
	}
	onClose = () => {
		this.bsModal.hide();
	}
	openLogin = () => {
		this.onClose();
		const initialState = {
			list: [{
				status: this.list[0]?.status,
				product: this.list[0]?.product
			}]
		};
		this.modal.show(LoginComponent, { id: 99, initialState });
	}
}
