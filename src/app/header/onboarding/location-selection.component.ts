import { ChangeDetectionStrategy, Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProductList } from 'src/app/interface';
import { LoginComponent } from './login.component';

@Component({
	selector: 'app-location-selection',
	template: `
    <!--loaction selection-->
    <div class="modal-contents">
	      <div class="modal-header d-block">
	      	<h5 class="modal-title text-center mb-2" id="exampleModalLabel">Select your address</h5>
	      	<p class="text-center mb-0">Select a delivery location to see product availbility and delivery options.</p>
	      </div>
	      <div class="modal-body">	      	
		      <form class="text-center profile-form"> 
		      	<div class="col pb-3">
					<button type="button" (click)="openLogin()" class="btn btn-them btn-md w-100">Login to see your address</button>
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
	list: { product: ProductList }[] = [];
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
				status: 'Location',
				product: this.list[0].product
			}]
		};
		this.modal.show(LoginComponent, { id: 99, initialState });
	}
}
