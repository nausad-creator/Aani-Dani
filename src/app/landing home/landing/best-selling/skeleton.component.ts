import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-skeleton',
	template: `
  <section class="category-section pb-4">
    <div class="container">
        <div class="card">
            <div class="card-header bg-white">
              <div class="section-title row pb-0">
                <div class="col-md-6">		
                    <h2 class="mb-0">Bestselling Items</h2>
                </div>				  	
              </div>
          </div>  
          <div class="category_slider">
              <div class="row productListingPage">
                <div class="slider_itemBoxskeleton col-lg-3 col-sm-6">
                    <ngx-skeleton-loader count="1" appearance="circle" [theme]="{width: '220px', height: '200px'}"></ngx-skeleton-loader>
                    <div class="justify-content-center">
                        <ngx-skeleton-loader count="1" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '80%' }"></ngx-skeleton-loader>
                        <div class="justify-content-center mb-1 mt-2">
                            <ngx-skeleton-loader count="1" [theme]="{ height: '30px', 'margin-bottom': '0px', width: '36%', 'border-radius': '20px' }"></ngx-skeleton-loader>
                        </div>
                        <div class="align-items-center justify-content-center">
                            <ngx-skeleton-loader count="1" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '75%' }"></ngx-skeleton-loader>
                                    <br>
                            <ngx-skeleton-loader count="4" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '7%', 'margin-left': '5px' }"></ngx-skeleton-loader>
                        </div>
                        <div class="productInfo">
                            <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '65%' }"></ngx-skeleton-loader>
                        </div>
                        <div class="cartbox">
                            <ngx-skeleton-loader count="1" [theme]="{ height: '37px', 'margin-bottom': '0px', width: '45%', 'border-radius': '10px' }"></ngx-skeleton-loader>
                        </div>
                    </div>
                </div>  
                <div class="slider_itemBoxskeleton col-lg-3 col-sm-6">
                    <ngx-skeleton-loader count="1" appearance="circle" [theme]="{width: '220px', height: '200px'}"></ngx-skeleton-loader>
                    <div class="justify-content-center">
                        <ngx-skeleton-loader count="1" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '80%' }"></ngx-skeleton-loader>
                        <div class="justify-content-center mb-1 mt-2">
                            <ngx-skeleton-loader count="1" [theme]="{ height: '30px', 'margin-bottom': '0px', width: '36%', 'border-radius': '20px' }"></ngx-skeleton-loader>
                        </div>
                        <div class="align-items-center justify-content-center">
                            <ngx-skeleton-loader count="1" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '75%' }"></ngx-skeleton-loader>
                                    <br>
                            <ngx-skeleton-loader count="4" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '7%', 'margin-left': '5px' }"></ngx-skeleton-loader>
                        </div>
                        <div class="productInfo">
                            <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '65%' }"></ngx-skeleton-loader>
                        </div>
                        <div class="cartbox">
                            <ngx-skeleton-loader count="1" [theme]="{ height: '37px', 'margin-bottom': '0px', width: '45%', 'border-radius': '10px' }"></ngx-skeleton-loader>
                        </div>
                    </div>
                </div>  
                <div class="slider_itemBoxskeleton col-lg-3 col-sm-6">
                    <ngx-skeleton-loader count="1" appearance="circle" [theme]="{width: '220px', height: '200px'}"></ngx-skeleton-loader>
                    <div class="justify-content-center">
                        <ngx-skeleton-loader count="1" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '80%' }"></ngx-skeleton-loader>
                        <div class="justify-content-center mb-1 mt-2">
                            <ngx-skeleton-loader count="1" [theme]="{ height: '30px', 'margin-bottom': '0px', width: '36%', 'border-radius': '20px' }"></ngx-skeleton-loader>
                        </div>
                        <div class="align-items-center justify-content-center">
                            <ngx-skeleton-loader count="1" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '75%' }"></ngx-skeleton-loader>
                                    <br>
                            <ngx-skeleton-loader count="4" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '7%', 'margin-left': '5px' }"></ngx-skeleton-loader>
                        </div>
                        <div class="productInfo">
                            <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '65%' }"></ngx-skeleton-loader>
                        </div>
                        <div class="cartbox">
                            <ngx-skeleton-loader count="1" [theme]="{ height: '37px', 'margin-bottom': '0px', width: '45%', 'border-radius': '10px' }"></ngx-skeleton-loader>
                        </div>
                    </div>
                </div>
                <div class="slider_itemBoxskeleton col-lg-3 col-sm-6">
                    <ngx-skeleton-loader count="1" appearance="circle" [theme]="{width: '220px', height: '200px'}"></ngx-skeleton-loader>
                    <div class="justify-content-center">
                        <ngx-skeleton-loader count="1" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '80%' }"></ngx-skeleton-loader>
                        <div class="justify-content-center mb-1 mt-2">
                            <ngx-skeleton-loader count="1" [theme]="{ height: '30px', 'margin-bottom': '0px', width: '36%', 'border-radius': '20px' }"></ngx-skeleton-loader>
                        </div>
                        <div class="align-items-center justify-content-center">
                            <ngx-skeleton-loader count="1" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '75%' }"></ngx-skeleton-loader>
                                    <br>
                            <ngx-skeleton-loader count="4" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '7%', 'margin-left': '5px' }"></ngx-skeleton-loader>
                        </div>
                        <div class="productInfo">
                            <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '65%' }"></ngx-skeleton-loader>
                        </div>
                        <div class="cartbox">
                            <ngx-skeleton-loader count="1" [theme]="{ height: '37px', 'margin-bottom': '0px', width: '45%', 'border-radius': '10px' }"></ngx-skeleton-loader>
                        </div>
                    </div>
                </div>  
              </div>
          </div>
      </div>
  </div>
  </section>
  `,
	styles: [
	]
})
export class SkeletonComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

}
