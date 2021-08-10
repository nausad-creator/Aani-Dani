import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-sort-header',
	template: `
    <div class="card-header bg-white">
		<div class="section-title row pb-0">
				<div class="col-md-6">		
					        <div class="brandcamp"><a routerLink="/">{{'home' | translate}}</a> <span> > {{categoryName}}</span> </div>
				</div>
				<div class="col-md-6">	
					<div class="sortby form-group d-flex align-items-center justify-content-end mb-0">
						<label class="mr-3 mb-0" style="white-space:nowrap;">{{'sort_by' | translate}}:</label>
						<ng-select (change)="sortBy.emit($event)" appearance="outline" [searchable]="false" [clearable]="true"
                        			 class="custom" [placeholder]="'select_to_sort' | translate">
                        			<ng-option *ngFor="let s of sorting" [value]="s.value">{{s.label | translate}}</ng-option>
                      				</ng-select>	
					</div>	
				</div>				  	
		</div>
	</div>
  `,
	styles: [
		`.ng-select.ng-select-single.custom ::ng-deep .ng-select-container {
    		width: 160px;
		height: 40px;
    		border-color: #E6E6E6;
    		background-color: #fff!important;
    		padding: .375rem .75rem;
    		font-size: 1rem;
    		font-weight: 400;
    		line-height: 1.5;
    		color: #495057;
    		border: 1px solid #ced4da;
    		border-radius: .25rem;
    		transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
		  }
		.ng-select.ng-select-single.custom ::ng-deep .ng-select-container .ng-value-container .ng-input {
			left: 0;
			padding-left: 18px;
			padding-right: 50px
		  }

		.ng-select.custom ::ng-deep .ng-arrow-wrapper {
    		width: 10px;
    		padding-right: 0px;
		 }
		.ng-select.custom ::ng-deep .ng-select-container .ng-value-container {
			align-items: center;
			padding-left: 0px;
		  }
		.ng-select.ng-select-single.custom ::ng-deep .ng-value-container .ng-value {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		  }
		.ng-select.custom ::ng-deep .ng-clear-wrapper {
			margin-top: 3px;
			padding: 5px;
		  }`
	]
})
export class SortHeaderComponent implements OnInit {
	@Input() categoryName?: string;
	@Output() sortBy = new EventEmitter<string>();
	sorting = [{
		label: 'popular_item',
		value: 'popular'
	}, {
		label: 'price_low_to_high',
		value: 'pricelowhigh'
	}, {
		label: 'price_high_to_low',
		value: 'pricehighlow'
	}]
	constructor() { }
	ngOnInit(): void {
	}

}
