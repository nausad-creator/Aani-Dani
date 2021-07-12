import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  template: `
					<div class="category_slider card">
						<div class="card-header bg-white">
					        <div class="section-title row pb-0">
							  <div class="col-md-6">		
                              <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '45%' }"></ngx-skeleton-loader>
							  </div>
							 				  	
					        </div>
				        </div>

				        <div class="orderDetailSection">
				        	<div class="orderDetailList">
				        		<div class="headerOrder form-row m-0 align-items-center">
				        			<div class="col-md-3 col-6">
                                    <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '55%' }"></ngx-skeleton-loader>
                                    <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '55%' }"></ngx-skeleton-loader>
				        			</div>	
				        			<div class="col-md-3 col-6">
                                    <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '35%' }"></ngx-skeleton-loader><br>
                                    <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '55%' }"></ngx-skeleton-loader>
				        			</div>
				        			<div class="col-md-6 text-md-right mt-2 mt-md-0">
                                    <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '65%' }"></ngx-skeleton-loader>
				        				<div class="linksOrde">
                                        <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '25%' }"></ngx-skeleton-loader>
                                        <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px','margin-left': '10px', width: '20%' }"></ngx-skeleton-loader>
				        				</div>	
				        			</div>
				        		</div>	
				        		<div class="bodyOrder form-row m-0 align-items-center">
				        			<div class="col-md-2 col-4">
				        				<div class="smImg">
                                        <ngx-skeleton-loader count="1" appearance="circle" [theme]="{width: '110px', height: '110px', 'border-radius': '10px'}"></ngx-skeleton-loader>
                                        </div>
				        			</div>	
				        			<div class="col-md-5 col-8">
                                    <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '65%' }"></ngx-skeleton-loader><br>
                                    <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '35%' }"></ngx-skeleton-loader><br>
                                    <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '45%' }"></ngx-skeleton-loader>
				        			</div>
				        			<div class="col-md-5 text-md-right">
                                    <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '75%' }"></ngx-skeleton-loader>
                                    <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '65%' }"></ngx-skeleton-loader>
				        				<div class="linksOrde pt-2">
                                        <ngx-skeleton-loader count="1" [theme]="{ height: '37px', 'margin-bottom': '0px', width: '30%', 'border-radius': '10px' }"></ngx-skeleton-loader>
                                        <ngx-skeleton-loader count="1" [theme]="{ height: '37px', 'margin-bottom': '0px','margin-left': '5px', width: '30%', 'border-radius': '10px' }"></ngx-skeleton-loader>
				        				</div>	
				        			</div>
				        		</div>
				        	</div>

				        	<div class="orderDetailList">
				        		<div class="headerOrder form-row m-0 align-items-center">
                                <div class="col-md-3 col-6">
                                    <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '55%' }"></ngx-skeleton-loader>
                                    <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '55%' }"></ngx-skeleton-loader>
				        			</div>	
				        			<div class="col-md-3 col-6">
                                    <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '35%' }"></ngx-skeleton-loader><br>
                                    <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '55%' }"></ngx-skeleton-loader>
				        			</div>
				        			<div class="col-md-6 text-md-right mt-2 mt-md-0">
                                    <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '65%' }"></ngx-skeleton-loader>
				        				<div class="linksOrde">
                                        <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '25%' }"></ngx-skeleton-loader>
                                        <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px','margin-left': '10px', width: '20%' }"></ngx-skeleton-loader>
				        				</div>	
				        			</div>
				        		</div>	
				        		<div class="bodyOrder form-row m-0 align-items-center">
                                <div class="col-md-2 col-4">
				        				<div class="smImg">
                                        <ngx-skeleton-loader count="1" appearance="circle" [theme]="{width: '110px', height: '110px', 'border-radius': '10px'}"></ngx-skeleton-loader>
                                        </div>
				        			</div>	
				        			<div class="col-md-5 col-8">
                                    <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '65%' }"></ngx-skeleton-loader><br>
                                    <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '35%' }"></ngx-skeleton-loader><br>
                                    <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '45%' }"></ngx-skeleton-loader>
				        			</div>
				        			<div class="col-md-5 text-md-right">
                                    <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '75%' }"></ngx-skeleton-loader>
                                    <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '65%' }"></ngx-skeleton-loader>
				        			</div>
				        		</div>
				        		<div class="bodyOrder form-row m-0 align-items-center">
                                <div class="col-md-2 col-4">
				        				<div class="smImg">
                                        <ngx-skeleton-loader count="1" appearance="circle" [theme]="{width: '110px', height: '110px', 'border-radius': '10px'}"></ngx-skeleton-loader>
                                        </div>
				        			</div>	
				        			<div class="col-md-5 col-8">
                                    <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '65%' }"></ngx-skeleton-loader><br>
                                    <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '35%' }"></ngx-skeleton-loader><br>
                                    <ngx-skeleton-loader count="1" [theme]="{ height: '11px', 'margin-bottom': '0px', width: '45%' }"></ngx-skeleton-loader>
				        			</div>
				        			<div class="col-md-5 text-md-right"></div>				        		
				        		</div>
				        		<div class="linksOrde p-3 btnReturn text-right">
                                <ngx-skeleton-loader count="1" [theme]="{ height: '37px', 'margin-bottom': '0px', width: '12%', 'border-radius': '10px' }"></ngx-skeleton-loader>
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
