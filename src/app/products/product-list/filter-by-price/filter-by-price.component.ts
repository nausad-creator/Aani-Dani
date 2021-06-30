import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-filter-by-price',
	template: `
    <div class="filterLeftContent mt-3 card">
							<h5 class="mb-0">Filter by Price</h5>	
							<div class="pricecontent">
								<form>
									 <div class="form-group">
									   	 <input type="text" id="example_id" name="example_name" value="" />
									 </div>
									 <a href="javascript:voil(0)" class="addcart-btn shopingcart-tbtn btn"> Filter</a>
								 </form>
							</div>	
				</div>
  `,
	styles: [
	]
})
export class FilterByPriceComponent implements OnInit {

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
				//grid: true
			});
		});
	}
}
