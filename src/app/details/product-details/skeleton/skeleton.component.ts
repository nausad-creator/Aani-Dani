import { Component, OnInit } from '@angular/core';
import { RootService } from 'src/app/root.service';

@Component({
	selector: 'app-skeleton',
	template: `
    <section id="product-detail-section" class="pb-3 pt-4">
    <div class="container">
        <div class="card">
            <div class="prInfo row align-items-center">
                <div class="col-lg-5 col-md-5">
                    <div class="bigIng"><ngx-skeleton-loader count="1" appearance="circle" [theme]="{width: '96%', height: '380px', 'border-radius': '10px' }"></ngx-skeleton-loader></div>	
                </div>	
                <div class="col-lg-7 col-md-7">	
                    <div class="detailInfo">
                      <ngx-skeleton-loader count="1" [theme]="{ height: '22px', 'margin-bottom': '0px', width: '50%' }"></ngx-skeleton-loader>	
                          <div class="align-items-center detailPrice mt-2">
                              <div class="price_text mt-3">
                              <ngx-skeleton-loader count="1" [theme]="{ height: '23px', 'margin-bottom': '0px', width: '20%', 'border-radius': '5px' }"></ngx-skeleton-loader>
			</div>
                          </div>
                          <div class="align-items-center detailBtn pt-2">
                              <div class="form-group mb-0">
                                  <ngx-skeleton-loader count="1" [theme]="{ height: '40px', 'margin-bottom': '0px', width: '22%', 'border-radius': '10px' }"></ngx-skeleton-loader>				  					
                              </div>	
                          </div>
                    </div>	
                </div>	
            </div>	
              <div class="row">
                  <div class="col-md-8">
                      <div class="reviewSection" style="margin-top: 20px;">
                            <ngx-skeleton-loader count="1" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '15%', 'margin-left': '15px'  }"></ngx-skeleton-loader>
                            <ngx-skeleton-loader count="1" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '15%', 'margin-left': '15px' }"></ngx-skeleton-loader>
                            <!-- <hr> -->
                        <div class="tab-content" id="myTabContent">
                          <div class="tab-pane fade show active" id="Discription" role="tabpanel" aria-labelledby="home-tab">
                              <div class="p-3">
                                <ngx-skeleton-loader count="3" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '100%' }"></ngx-skeleton-loader>
                                <ngx-skeleton-loader count="2" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '100%' }"></ngx-skeleton-loader>
                                <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '95%' }"></ngx-skeleton-loader>
                              </div>
                          </div>
                        </div>
                      </div>	
                  </div>
                  <div class="col-md-4 borleft">
                      <div class="category-section">
                          <div class="card-header bg-white">
                            <div class="section-title row pb-0">
                              <div class="col-md-8 p-0">		
                                  <ngx-skeleton-loader count="1" [theme]="{ height: '15px', 'margin-bottom': '0px', width: '60%' }"></ngx-skeleton-loader>
                              </div>				  	
                            </div>
                        </div>  
                        <div class="category_slider">
                          <div class="productListingPage">
                              <div class="slider_itemBoxskeleton">
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
              </div>	
        </div>	
    </div>		
</section>
  `,
	styles: [
	]
})
export class SkeletonComponent implements OnInit {

	constructor(public root: RootService) { }

	ngOnInit(): void {
	}

}
