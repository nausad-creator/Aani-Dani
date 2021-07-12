import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-filter',
  template: `
                <div class="Mobilefilter">
                    <a href="#" class="FilterHandale"><i class="icofont-filter"></i> Filter </a>
                </div>	
                <div class="filterSection">
                    <div class="filterLeftContent card">
                        <h5 class="mb-0">Order Placed</h5>	
                        <div class="listcategory">
                            <a href="#">Last 30 days</a>
                            <a href="#">Last 60 days</a>
                            <a href="#">Last 90 days</a>
                            <a href="#">Last 1 year</a>
                        </div>	
                    </div>
                    <div class="filterLeftContent mt-3 card">
                        <h5 class="mb-0 pb-2">Store Name</h5>
                        <div class="searchStore">
                            <span class="search_addons"><i class="fas fa-search"></i></span>
                            <input type="text" class="form-control bg-white" placeholder="Search">
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
                        <h5 class="mb-0">Order Type</h5>	
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

  constructor() { }

  ngOnInit(): void {
  }

}
