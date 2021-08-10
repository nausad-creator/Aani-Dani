import { trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/animation';
import { Orders } from 'src/app/interface';
import { RootService } from 'src/app/root.service';

@Component({
	selector: 'app-shared-order',
	template: `
<div class="category_slider card">
	<div class="card-header bg-white">
		<div class="section-title row pb-0">
			<div class="col-md-6">
				<div class="brandcamp"><a routerLink="/">{{'home' | translate}} > </a> <span> {{'my_orders' | translate}}</span> </div>
			</div>

		</div>
	</div>

	<div class="orderDetailSection" *ngIf="orders.length > 0" [@fadeIn]>
		<div class="orderDetailList" *ngFor="let order of orders">
			<div class="headerOrder form-row m-0 align-items-center">
				<div class="col-md-3 col-6">
					<p class="mb-0">{{'order_placed' | translate}} <br> {{order.orderDate | date: 'mediumDate'}}</p>
				</div>
				<div class="col-md-3 col-6">
					<p class="mb-0">{{'total' | translate}} <br> {{order.orderNetAmount | number}}</p>
				</div>
				<div class="col-md-6 text-md-right mt-2 mt-md-0">
					<p class="mb-0">{{'order' | translate}} # {{order.orderID | number}}</p>
					<div class="linksOrde">
						<a class="mr-3" href="order-details.html">{{'order_details' | translate}}</a>
						<a href="#">{{'invoice' | translate}}</a>
					</div>
				</div>
			</div>
			<div class="bodyOrder form-row m-0 align-items-center"
				*ngFor="let product of order.orderdetails; let i=index;">
				<div class="col-md-2 col-4">
					<div class="smImg">
						<img offset="50"
							defaultImage="http://164.52.209.69/aanidani/backend/web/uploads/products/{{product?.productImage}}"
							lazyLoad="http://164.52.209.69/aanidani/backend/web/uploads/products/{{product?.productImage}}"
							[errorImage]="'assets/images/error_not_found.png'"
							[alt]="(root.languages$ | async) === 'en' ? product?.productName : product?.productArabicNme" [title]="(root.languages$ | async) === 'en' ? product?.productName : product?.productArabicNme">
					</div>
				</div>
				<div class="col-md-5 col-8">
					<p class="mb-0">{{(root.languages$ | async) === 'en' ? product?.productName : product?.productArabicNme}}</p>
					<p class="mb-0 qty">{{(product?.orderdetailsQty | number) + ' qty'}}</p>
					<h6 class="mb-0"><b>{{(product?.productPrice | number) + ' SR'}}</b></h6>
				</div>
				<div class="col-md-5 text-md-right" *ngIf="i===0">
					<p class="mb-0" *ngIf="order.orderDeliveryDate">{{'delivery_expected_by' | translate}}
						{{order.orderDeliveryDate |
						date: 'mediumDate'}}</p>
					<p class="mb-0" *ngIf="order.statusName === 'Placed'">{{'your_order_has_been_placed' | translate}}
					</p>
					<div class="linksOrde pt-2">
						<button type="button" class="btn btn-outline-secondary m-1">{{'tarck_order' | translate}}</button>
						<button type="button"
							class="btn btn-outline-secondary m-1">{{'re_order' | translate}}</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="orderDetailSection" *ngIf="orders.length === 0" [@fadeIn]>
		<div class="table-responsive" style="margin-top: 20px; min-height: 380px">
			<p class="text-center pt-20">No orders to show.</p>
		</div>
	</div>
</div>
  `,
	styles: [
	],
	animations: [
		trigger('fadeIn', fadeIn())
	], changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharedOrderComponent implements OnInit {
	@Input() orders: Orders[];
	constructor(public root: RootService) { }
	ngOnInit(): void {
	}

}
