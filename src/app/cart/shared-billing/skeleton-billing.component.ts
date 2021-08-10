import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TempOrders, OrderDetailsTemp } from 'src/app/interface';
import { RootService } from 'src/app/root.service';

@Component({
	selector: 'app-skeleton-billing',
	template: `
    <div class="paymentDetails">
                            <h5>Bill Details</h5>
                            <div class="coponCode">
                                <div class="form-group mb-0">
                                <ngx-skeleton-loader count="1" [theme]="{ height: '40px', 'margin-bottom': '0px', 'margin-left': (root.languages$ | async) === 'ar' ? '15px' : '0px', width: '55%', 'border-radius': '5px' }"></ngx-skeleton-loader>
                                <ngx-skeleton-loader count="1" [theme]="{ height: '40px', 'margin-bottom': '0px', 'margin-left': (root.languages$ | async) === 'en' ? '15px' : '0px', width: '40%', 'border-radius': '8px' }"></ngx-skeleton-loader>
                              </div>
                              <div class="pl-3">
                              </div>
                            </div>	

                            <div class="priceDiscri pt-3">
                                <div class="pb-2">
                                    <div class="totalPr">
                                        <ngx-skeleton-loader count="1" [theme]="{ height: '13px', 'margin-bottom': '0px', width: '55%' }"></ngx-skeleton-loader>
                                        <ngx-skeleton-loader count="1" [theme]="{ height: '12px', 'margin-bottom': '0px', 'margin-left': '20px', width: '15%' }"></ngx-skeleton-loader>
                                    </div>	
                                </div>
                                <div class="totalPr">
                                        <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '30%' }"></ngx-skeleton-loader>
                                        <ngx-skeleton-loader count="1" [theme]="{ height: '13px', 'margin-bottom': '0px', 'margin-left': '20px', width: '20%' }"></ngx-skeleton-loader>
                                    </div>	
                                    <div class="totalPr">
                                        <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '55%' }"></ngx-skeleton-loader>
                                        <ngx-skeleton-loader count="1" [theme]="{ height: '13px', 'margin-bottom': '0px', 'margin-left': '20px', width: '25%' }"></ngx-skeleton-loader>
                                    </div>	
                                    <div class="totalPr">
                                        <ngx-skeleton-loader count="1" [theme]="{ height: '13px', 'margin-bottom': '0px', width: '50%' }"></ngx-skeleton-loader>
                                        <ngx-skeleton-loader count="1" [theme]="{ height: '12px', 'margin-bottom': '0px', 'margin-left': '20px', width: '25%' }"></ngx-skeleton-loader>
                                    </div>
                                    <div class="totalPr">
                                        <ngx-skeleton-loader count="1" [theme]="{ height: '12px', 'margin-bottom': '0px', width: '40%' }"></ngx-skeleton-loader>
                                        <ngx-skeleton-loader count="1" [theme]="{ height: '13px', 'margin-bottom': '0px', 'margin-left': '20px', width: '25%' }"></ngx-skeleton-loader>
                                    </div>
                                    <div class="totalPr">
                                        <ngx-skeleton-loader count="1" [theme]="{ height: '12px', 'margin-bottom': '0px', width: '60%' }"></ngx-skeleton-loader>
                                        <ngx-skeleton-loader count="1" [theme]="{ height: '13px', 'margin-bottom': '0px', 'margin-left': '20px', width: '25%' }"></ngx-skeleton-loader>
                                    </div>
                            </div>	

                            <br>
                            <ngx-skeleton-loader count="1" [theme]="{ height: '37px', 'margin-bottom': '0px', 'border-radius': '10px' }"></ngx-skeleton-loader>

                        </div>
  `,
	styles: [
	]
})
export class SkeletonBillingComponent implements OnInit {
	@Input() orders: TempOrders[];
	data: OrderDetailsTemp;
	@Output() updateCart: EventEmitter<{ data: string, res: number }> = new EventEmitter();
	constructor(public root: RootService) { }
	ngOnInit(): void {
	}
}
