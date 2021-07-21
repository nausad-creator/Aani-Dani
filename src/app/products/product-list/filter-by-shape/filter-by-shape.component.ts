import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-filter-by-shape',
	template: `
    <div class="filterLeftContent mt-3 card">
							<h5 class="mb-0">Filter by Shape</h5>	
							<div class="shapeContent">
								<div class="checkcontent">
									<div class="custom-control custom-checkbox">
									  <input type="checkbox" class="custom-control-input" id="customCheck1" >
									  <label class="custom-control-label" for="customCheck1">Heart</label>
									</div>
									<div class="custom-control custom-checkbox">
									  <input type="checkbox" class="custom-control-input" id="customCheck2" >
									  <label class="custom-control-label" for="customCheck2">Round</label>
									</div>
									<div class="custom-control custom-checkbox">
									  <input type="checkbox" class="custom-control-input" id="customCheck3" >
									  <label class="custom-control-label" for="customCheck3">Square</label>
									</div>

								</div>
							</div>	
						</div>
  `,
	styles: [
	]
})
export class FilterByShapeComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

}
