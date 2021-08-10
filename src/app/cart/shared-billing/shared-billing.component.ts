import { trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/animation';

@Component({
	selector: 'app-shared-billing',
	template: `
<div class="paymentDetails" *ngIf="billingDetails.item_Total !== null && billingDetails.item_Total !== 0" [@fadeIn]>
	<h5>{{'bill_details' | translate}}</h5>
	<div class="coponCode d-flex">
		<div class="form-group mb-0">
			<input type="text" class="form-control bg-white" [placeholder]="'coupon_code' | translate">
		</div>
		<div class="pl-3">
			<a href="javascript:voil(0)" class="apply-btn shopingcart-tbtn btn"> {{'apply_coupon' | translate}}</a>
		</div>
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
	<button type="button" routerLink='/checkout' class="btn btn-them btn-md w-100">{{'proceed_to_checkout' | translate}}</button>
</div>
  `,
	styles: [
	],
	animations: [
		trigger('fadeIn', fadeIn())
	], changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharedBillingComponent implements OnInit {
	@Input() billingDetails: {
		delivery_Tip: number;
		delivery_Fee: number;
		item_Total: number;
		vat: number;
		net_Payable: number;
	};
	constructor() { }
	ngOnInit(): void {
	}
}
