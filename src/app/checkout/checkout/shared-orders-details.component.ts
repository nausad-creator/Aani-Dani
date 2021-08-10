import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductList } from 'src/app/interface';
import { RootService } from 'src/app/root.service';

@Component({
	selector: 'app-shared-orders-details',
	template: `
<div class="paymentDetails">
	<h5>{{'your_order' | translate}}</h5>
	<div class="tableCart">
		<div class="table-responsive">
			<table class="table">
				<thead>
					<tr>
						<th>{{'product' | translate}}</th>
						<th class="text-right">{{'subtotal' | translate}}</th>
					</tr>
				</thead>
				<tbody>
					<tr *ngFor="let item of products">
						<td class="align-middle">{{(root.languages$ | async) === 'en' ? item?.productName : item?.productArabicNme}} <p class="mb-0">
								Qty:{{item?.Qty | number}}</p>
						</td>
						<td class="align-middle text-right">{{(item?.Price | number) + ' SR'}}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<hr class="mt-0">
	<div class="coponCode d-flex">
		<div class="form-group mb-0 w-100">
			<input type="text" class="form-control bg-white" [placeholder]="'coupon_code' | translate">
		</div>
		<div class="pl-3">
			<a href="javascript:voil(0)" class="apply-btn shopingcart-tbtn btn"> {{'apply_coupon' | translate}}</a>
		</div>
	</div>
	<div class="form-group mb-0 w-100 mt-3">
		<textarea class="form-control bg-white" [formControl]="orderNote" id="comment" name="comment"
			rows="2"></textarea>
	</div>
	<div class="priceDiscri pt-3">
		<div class="d-flex pb-2">
			<div class="totalPr">{{'item_total' | translate}}</div>
			<div class="totalPr ml-auto">{{(billingDetails?.item_Total | number) + ' SR'}}</div>
		</div>
		<div class="d-flex pb-2">
			<div class="itemPr">{{'discount' | translate}}</div>
			<div class="itemPr ml-auto text-success">0.00 SR</div>
		</div>
		<div class="d-flex pb-2">
			<div class="itemPr">{{'delivery_fees' | translate}} <span class="text-success">{{'normal' | translate}}</span></div>
			<div class="itemPr ml-auto">{{(billingDetails?.delivery_Fee | number) + ' SR'}}</div>
		</div>
		<div class="d-flex pb-2">
			<div class="itemPr">{{'delivery_tip' | translate}} </div>
			<div class="itemPr ml-auto">{{(billingDetails?.delivery_Tip | number) + ' SR'}}</div>
		</div>
		<div class="d-flex pb-2">
			<div class="itemPr">{{'vat' | translate}}</div>
			<div class="itemPr ml-auto">{{(billingDetails?.vat | number) + ' SR'}}</div>
		</div>
		<div class="d-flex pb-2">
			<div class="NTPr">{{'net_payable' | translate}}</div>
			<div class="NTPr ml-auto">{{(billingDetails?.net_Payable | number) + ' SR'}}</div>
		</div>
	</div>
	<br>
	<div class="row">
		<div class="col-6">
			<button routerLink='/' class="btn w-100 btn-outline-secondary">{{'continue_shopping' | translate}}</button>
		</div>
		<div class="col-6">
			<button (click)="place.emit(orderNote.value)" type="button" class="btn btn-them w-100">
				<span class="spinner-border spinner-border-sm" style="margin: 1px;" role="status"
					aria-hidden="true" *ngIf="preventAbuse"></span>
				{{preventAbuse ? ('please_wait' | translate) : ('proceed_to_pay' | translate)}}</button>
		</div>
	</div>
</div>
  `,
	styles: [
	]
})
export class SharedOrdersDetailsComponent {
	@Input() billingDetails: {
		delivery_Tip: string;
		delivery_Fee: string;
		item_Total: string;
		vat: string;
		net_Payable: string;
	};
	@Input() products: ProductList[] = [];
	@Input() preventAbuse: boolean;
	@Output() place: EventEmitter<string> = new EventEmitter();
	orderNote = new FormControl('');
	constructor(public root: RootService) { }
}
