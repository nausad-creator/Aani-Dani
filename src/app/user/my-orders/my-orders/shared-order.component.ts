import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Orders } from 'src/app/interface';

@Component({
	selector: 'app-shared-order',
	template: `
            <div class="category_slider card">
    <div class="card-header bg-white">
        <div class="section-title row pb-0">
            <div class="col-md-6">
                <div class="brandcamp"><a routerLink="/">Home > </a> <span> My Orders</span> </div>
            </div>

        </div>
    </div>

    <div class="orderDetailSection" *ngIf="orders.length > 0">
        <div class="orderDetailList" *ngFor="let order of orders">
            <div class="headerOrder form-row m-0 align-items-center">
                <div class="col-md-3 col-6">
                    <p class="mb-0">Order Placed <br> {{order.orderDate | date: 'mediumDate'}}</p>
                </div>
                <div class="col-md-3 col-6">
                    <p class="mb-0">Total <br> {{order.orderNetAmount | number}}</p>
                </div>
                <div class="col-md-6 text-md-right mt-2 mt-md-0">
                    <p class="mb-0">Order # {{order.orderID | number}}</p>
                    <div class="linksOrde">
                        <a class="mr-3" href="order-details.html">Order Details</a>
                        <a href="#">Invoice</a>
                    </div>
                </div>
            </div>
            <div class="bodyOrder form-row m-0 align-items-center"
                *ngFor="let product of order.orderdetails; let i=index;">
                <div class="col-md-2 col-4">
                    <div class="smImg">
                        <img offset="50"
                            defaultImage="http://164.52.209.69/aanidani/backend/web/uploads/products/{{product.productImage}}"
                            lazyLoad="http://164.52.209.69/aanidani/backend/web/uploads/products/{{product.productImage}}"
                            [errorImage]="'assets/images/error_not_found.png'" [alt]="product.productName"
                            [title]="product.productName">
                    </div>
                </div>
                <div class="col-md-5 col-8">
                    <p class="mb-0">{{product.productName}}</p>
                    <p class="mb-0 qty">{{(product.orderdetailsQty | number) + ' qty'}}</p>
                    <h6 class="mb-0"><b>{{(product.productPrice | number) + ' SR'}}</b></h6>
                </div>
                <div class="col-md-5 text-md-right" *ngIf="i===0">
                    <p class="mb-0" *ngIf="order.orderDeliveryDate">Delivery Expected by {{order.orderDeliveryDate |
                        date: 'mediumDate'}}</p>
                    <p class="mb-0" *ngIf="order.statusName === 'Placed'">Your order has been placed</p>
                    <div class="linksOrde pt-2">
                        <button type="button" class="btn btn-outline-secondary m-1">Track Order</button>
                        <button type="button" class="btn btn-outline-secondary m-1">Reorder</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="orderDetailSection" *ngIf="orders.length === 0">
        <div class="table-responsive" style="margin-top: 20px; min-height: 380px">
            <p class="text-center pt-20">No orders to show.</p>
        </div>
    </div>
</div>		
  `,
	styles: [
	], changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharedOrderComponent implements OnInit {
	@Input() orders: Orders[];
	constructor() { }
	ngOnInit(): void {
	}

}
