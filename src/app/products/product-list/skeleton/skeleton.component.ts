import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-skeleton',
	template: `
  <div class="row productListingPage">
  <div class="slider_itemBoxskeleton col-lg-4 col-sm-6">
	    <ngx-skeleton-loader count="1" appearance="circle" [theme]="{width: '220px', height: '200px'}"></ngx-skeleton-loader>
        <div class="justify-content-center">
            <ngx-skeleton-loader count="1" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '80%' }"></ngx-skeleton-loader>
            <div class="mb-1 mt-2 justify-content-center">
                <ngx-skeleton-loader count="1" [theme]="{ height: '30px', 'margin-bottom': '0px', width: '36%', 'border-radius': '20px' }"></ngx-skeleton-loader>
            </div>
            <div class="align-items-center justify-content-center">
                <ngx-skeleton-loader count="1" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '68%' }"></ngx-skeleton-loader>
				        <br>
                <ngx-skeleton-loader count="4" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '7%', 'margin-left': '5px' }"></ngx-skeleton-loader>
            </div>
            <div class="productInfo">
                <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '57%' }"></ngx-skeleton-loader>
            </div>
            <div class="cartbox">
                <ngx-skeleton-loader count="1" [theme]="{ height: '37px', 'margin-bottom': '0px', width: '45%', 'border-radius': '10px' }"></ngx-skeleton-loader>
            </div>
        </div>
    </div>
    <div class="slider_itemBoxskeleton col-lg-4 col-sm-6">
	    <ngx-skeleton-loader count="1" appearance="circle" [theme]="{width: '220px', height: '200px'}"></ngx-skeleton-loader>
        <div class="justify-content-center">
            <ngx-skeleton-loader count="1" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '80%' }"></ngx-skeleton-loader>
            <div class="justify-content-center mb-1 mt-2">
                <ngx-skeleton-loader count="1" [theme]="{ height: '30px', 'margin-bottom': '0px', width: '36%', 'border-radius': '20px' }"></ngx-skeleton-loader>
            </div>
            <div class="align-items-center justify-content-center">
                <ngx-skeleton-loader count="1" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '68%' }"></ngx-skeleton-loader>
				        <br>
                <ngx-skeleton-loader count="3" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '7%', 'margin-left': '5px' }"></ngx-skeleton-loader>
            </div>
            <div class="productInfo">
                <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '57%' }"></ngx-skeleton-loader>
            </div>
            <div class="cartbox">
                <ngx-skeleton-loader count="1" [theme]="{ height: '37px', 'margin-bottom': '0px', width: '45%', 'border-radius': '10px' }"></ngx-skeleton-loader>
            </div>
        </div>
    </div>
    <div class="slider_itemBoxskeleton col-lg-4 col-sm-6">
	    <ngx-skeleton-loader count="1" appearance="circle" [theme]="{width: '220px', height: '200px'}"></ngx-skeleton-loader>
        <div class="justify-content-center">
            <ngx-skeleton-loader count="1" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '80%' }"></ngx-skeleton-loader>
            <div class="justify-content-center mb-1 mt-2">
                <ngx-skeleton-loader count="1" [theme]="{ height: '30px', 'margin-bottom': '0px', width: '36%', 'border-radius': '20px' }"></ngx-skeleton-loader>
            </div>
            <div class="align-items-center justify-content-center">
                <ngx-skeleton-loader count="1" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '68%' }"></ngx-skeleton-loader>
				        <br>
                <ngx-skeleton-loader count="5" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '7%', 'margin-left': '5px' }"></ngx-skeleton-loader>
            </div>
            <div class="productInfo">
                <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '57%' }"></ngx-skeleton-loader>
            </div>
            <div class="cartbox">
                <ngx-skeleton-loader count="1" [theme]="{ height: '37px', 'margin-bottom': '0px', width: '45%', 'border-radius': '10px' }"></ngx-skeleton-loader>
            </div>
        </div>
    </div>
    <div class="slider_itemBoxskeleton col-lg-4 col-sm-6">
	    <ngx-skeleton-loader count="1" appearance="circle" [theme]="{width: '220px', height: '200px'}"></ngx-skeleton-loader>
        <div class="justify-content-center">
            <ngx-skeleton-loader count="1" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '80%' }"></ngx-skeleton-loader>
            <div class="justify-content-center mb-1 mt-2">
                <ngx-skeleton-loader count="1" [theme]="{ height: '30px', 'margin-bottom': '0px', width: '36%', 'border-radius': '20px' }"></ngx-skeleton-loader>
            </div>
            <div class="align-items-center justify-content-center">
                <ngx-skeleton-loader count="1" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '68%' }"></ngx-skeleton-loader>
				        <br>
                <ngx-skeleton-loader count="4" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '7%', 'margin-left': '5px' }"></ngx-skeleton-loader>
            </div>
            <div class="productInfo">
                <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '57%' }"></ngx-skeleton-loader>
            </div>
            <div class="cartbox">
                <ngx-skeleton-loader count="1" [theme]="{ height: '37px', 'margin-bottom': '0px', width: '45%', 'border-radius': '10px' }"></ngx-skeleton-loader>
            </div>
        </div>
    </div>
    <div class="slider_itemBoxskeleton col-lg-4 col-sm-6">
	    <ngx-skeleton-loader count="1" appearance="circle" [theme]="{width: '220px', height: '200px'}"></ngx-skeleton-loader>
        <div class="justify-content-center">
            <ngx-skeleton-loader count="1" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '80%' }"></ngx-skeleton-loader>
            <div class="justify-content-center mb-1 mt-2">
                <ngx-skeleton-loader count="1" [theme]="{ height: '30px', 'margin-bottom': '0px', width: '36%', 'border-radius': '20px' }"></ngx-skeleton-loader>
            </div>
            <div class="align-items-center justify-content-center">
                <ngx-skeleton-loader count="1" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '68%' }"></ngx-skeleton-loader>
				        <br>
                <ngx-skeleton-loader count="4" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '7%', 'margin-left': '5px' }"></ngx-skeleton-loader>
            </div>
            <div class="productInfo">
                <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '57%' }"></ngx-skeleton-loader>
            </div>
            <div class="cartbox">
                <ngx-skeleton-loader count="1" [theme]="{ height: '37px', 'margin-bottom': '0px', width: '45%', 'border-radius': '10px' }"></ngx-skeleton-loader>
            </div>
        </div>
    </div>
    <div class="slider_itemBoxskeleton col-lg-4 col-sm-6">
	    <ngx-skeleton-loader count="1" appearance="circle" [theme]="{width: '220px', height: '200px'}"></ngx-skeleton-loader>
        <div class="justify-content-center">
            <ngx-skeleton-loader count="1" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '80%' }"></ngx-skeleton-loader>
            <div class="justify-content-center mb-1 mt-2">
                <ngx-skeleton-loader count="1" [theme]="{ height: '30px', 'margin-bottom': '0px', width: '36%', 'border-radius': '20px' }"></ngx-skeleton-loader>
            </div>
            <div class="align-items-center justify-content-center">
                <ngx-skeleton-loader count="1" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '68%' }"></ngx-skeleton-loader>
				        <br>
                <ngx-skeleton-loader count="4" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '7%', 'margin-left': '5px' }"></ngx-skeleton-loader>
            </div>
            <div class="productInfo">
                <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '57%' }"></ngx-skeleton-loader>
            </div>
            <div class="cartbox">
                <ngx-skeleton-loader count="1" [theme]="{ height: '37px', 'margin-bottom': '0px', width: '45%', 'border-radius': '10px' }"></ngx-skeleton-loader>
            </div>
        </div>
    </div>
    <div class="slider_itemBoxskeleton col-lg-4 col-sm-6">
	    <ngx-skeleton-loader count="1" appearance="circle" [theme]="{width: '220px', height: '200px'}"></ngx-skeleton-loader>
        <div class="justify-content-center">
            <ngx-skeleton-loader count="1" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '80%' }"></ngx-skeleton-loader>
            <div class="justify-content-center mb-1 mt-2">
                <ngx-skeleton-loader count="1" [theme]="{ height: '30px', 'margin-bottom': '0px', width: '36%', 'border-radius': '20px' }"></ngx-skeleton-loader>
            </div>
            <div class="align-items-center justify-content-center">
                <ngx-skeleton-loader count="1" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '68%' }"></ngx-skeleton-loader>
				        <br>
                <ngx-skeleton-loader count="4" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '7%', 'margin-left': '5px' }"></ngx-skeleton-loader>
            </div>
            <div class="productInfo">
                <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '57%' }"></ngx-skeleton-loader>
            </div>
            <div class="cartbox">
                <ngx-skeleton-loader count="1" [theme]="{ height: '37px', 'margin-bottom': '0px', width: '45%', 'border-radius': '10px' }"></ngx-skeleton-loader>
            </div>
        </div>
    </div>
    <div class="slider_itemBoxskeleton col-lg-4 col-sm-6">
	    <ngx-skeleton-loader count="1" appearance="circle" [theme]="{width: '220px', height: '200px'}"></ngx-skeleton-loader>
        <div class="justify-content-center">
            <ngx-skeleton-loader count="1" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '80%' }"></ngx-skeleton-loader>
            <div class="justify-content-center mb-1 mt-2">
                <ngx-skeleton-loader count="1" [theme]="{ height: '30px', 'margin-bottom': '0px', width: '36%', 'border-radius': '20px' }"></ngx-skeleton-loader>
            </div>
            <div class="align-items-center justify-content-center">
                <ngx-skeleton-loader count="1" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '68%' }"></ngx-skeleton-loader>
				        <br>
                <ngx-skeleton-loader count="4" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '7%', 'margin-left': '5px' }"></ngx-skeleton-loader>
            </div>
            <div class="productInfo">
                <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '57%' }"></ngx-skeleton-loader>
            </div>
            <div class="cartbox">
                <ngx-skeleton-loader count="1" [theme]="{ height: '37px', 'margin-bottom': '0px', width: '45%', 'border-radius': '10px' }"></ngx-skeleton-loader>
            </div>
        </div>
    </div>
    <div class="slider_itemBoxskeleton col-lg-4 col-sm-6">
	    <ngx-skeleton-loader count="1" appearance="circle" [theme]="{width: '220px', height: '200px'}"></ngx-skeleton-loader>
        <div class="justify-content-center">
            <ngx-skeleton-loader count="1" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '80%' }"></ngx-skeleton-loader>
            <div class="justify-content-center mb-1 mt-2">
                <ngx-skeleton-loader count="1" [theme]="{ height: '30px', 'margin-bottom': '0px', width: '36%', 'border-radius': '20px' }"></ngx-skeleton-loader>
            </div>
            <div class="align-items-center justify-content-center">
                <ngx-skeleton-loader count="1" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '68%' }"></ngx-skeleton-loader>
				        <br>
                <ngx-skeleton-loader count="4" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '7%', 'margin-left': '5px' }"></ngx-skeleton-loader>
            </div>
            <div class="productInfo">
                <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '57%' }"></ngx-skeleton-loader>
            </div>
            <div class="cartbox">
                <ngx-skeleton-loader count="1" [theme]="{ height: '37px', 'margin-bottom': '0px', width: '45%', 'border-radius': '10px' }"></ngx-skeleton-loader>
            </div>
        </div>
    </div>
  </div>
  `,
	styles: [
	]
})
export class SkeletonComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

}
