import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-filter-by-price',
	template: `
    <div class="filterLeftContent mt-3 card">
		<h5 class="mb-0">Filter by Price</h5>	
				<div class="pricecontent">
					<form>
						<div class="form-group">
							<input type="text" #price id="example_id" name="example_name" value="" />
						</div>
							<a (click)="filterByPrice.emit(price.value); preventAbuse=true" class="addcart-btn shopingcart-tbtn btn" [ngClass]="{'disabled' : preventAbuse}"> {{ preventAbuse ? 'Wait..' : 'Filter' }}</a>
					</form>
				</div>
   </div>
  `,
	styles: [
		`.disabled {
			color: gray;
			cursor: not-allowed;
		}`
	]
})
export class FilterByPriceComponent implements OnInit {
	@Output() filterByPrice = new EventEmitter<string>();
	@Input() preventAbuse: boolean;
	constructor() { }
	ngOnInit(): void {
		jQuery(() => {
			($("#example_id") as any).ionRangeSlider({
				type: "double",
				min: 0,
				max: 1000,
				from: 200,
				to: 500,
				prefix: "SR "
			});
		});
	}
}
