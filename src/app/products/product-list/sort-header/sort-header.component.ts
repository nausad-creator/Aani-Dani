import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-sort-header',
	template: `
    <div class="card-header bg-white">
					        <div class="section-title row pb-0">
							  <div class="col-md-6">		
					          	<div class="brandcamp"><a routerLink="/">Home</a> <span> > {{categoryName}}</span> </div>
							  </div>
							  <div class="col-md-6">	
							  	<div class="sortby form-group d-flex align-items-center justify-content-end mb-0">
							  		<label class="mr-3 mb-0" style="white-space:nowrap;">Sort By:</label>
							  		<select class="form-control w-auto bg-white">
							  			<option>Sort by popularity</option>
							  			<option value="1">Popular Item</option>
							  			<option value="2">Price low to high</option>
							  			<option value="3">Price high to low</option>
							  		</select>	
							  	</div>	
							  </div>				  	
					        </div>
				        </div>
  `,
	styles: [
	]
})
export class SortHeaderComponent implements OnInit {
	@Input() categoryName: string;
	constructor() { }

	ngOnInit(): void {
	}

}
