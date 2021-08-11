import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-side-filter',
	template: `
                <div class="Mobilefilter">
                    <a href="#" class="FilterHandale"><i class="icofont-filter"></i> {{'filter' | translate}} </a>
                </div>	
                <div class="filterSection">
                    <div class="filterLeftContent card">
                        <h5 class="mb-0">{{'order_placed' | translate}}</h5>	
                        <div class="listcategory">
                            <a href="#" *ngFor="let filter of filters">{{filter.label | translate}}</a>
                        </div>	
                    </div>
                    <div class="filterLeftContent mt-3 card">
                        <h5 class="mb-0 pb-2">{{'store_name' | translate}}</h5>
                        <div class="searchStore">
                            <span class="search_addons"><i class="fas fa-search"></i></span>
                            <input type="text" class="form-control bg-white" [placeholder]="'search' | translate">
                        </div>	
                        <div class="listcategory">
                            <a href="#">Al Nahdah</a>
                            <a href="#">Uthman</a>
                            <a href="#">Al Naeem</a>
                            <a href="#">Ash Shati</a>
                            <a href="#">Baghdadiyah</a>
                        </div>	
                    </div>
                    <div class="filterLeftContent mt-3 card">
                        <h5 class="mb-0">{{'order_type' | translate}}</h5>	
                        <div class="listcategory">
                            <a href="#">Order Type 1</a>
                            <a href="#">Order Type 2</a>
                            <a href="#">Order Type 3</a>
                        </div>	
                    </div>

                </div>
                <br>
  `,
	styles: [
	]
})
export class SideFilterComponent implements OnInit {
	filters = [
		{
			label: "last_30_days",
			value: '30 days before'
		},
		{
			label: "last_60_days",
			value: '60 days before'
		},
		{
			label: "last_90_days",
			value: '90 days before'
		},
		{
			label: "last_1_year",
			value: '1 year before'
		}
	]
	constructor() { }

	ngOnInit(): void {
	}

}
