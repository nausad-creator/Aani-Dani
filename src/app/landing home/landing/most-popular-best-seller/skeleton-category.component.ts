import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-skeleton-category',
	template: `
  <section class="LowestPrice-section pt-0">
	<div class="container">
		<div class="card">
			<div class="card-header bg-white">
				<div class="section-title row pb-0">
					<div class="col-md-6">
						<ngx-skeleton-loader count="1"
							[theme]="{ height: '18px', 'margin-bottom': '0px', width: '35%' }">
						</ngx-skeleton-loader>
					</div>
				</div>
			</div>

			<div class="category_slider">
				<div class="row productListingPage">
					<div class="slider_itemBoxskeleton col-lg-4 col-sm-6">
						<div class="form-row">
							<div class="col-4">
								<div class="catImgBox">
									<ngx-skeleton-loader count="1"
										appearance="circle"
										[theme]="{width: '80px', height: '80px', 'border-radius': '10px'}">
									</ngx-skeleton-loader>
								</div>
							</div>
							<div class="content_textContent col-8">
								<ngx-skeleton-loader count="1"
									[theme]="{ height: '11px', 'margin': '0px', width: '75%' }">
								</ngx-skeleton-loader>
								<br>
								<ngx-skeleton-loader count="1"
									[theme]="{ height: '11px', 'margin': '0px', width: '25%' }">
								</ngx-skeleton-loader>
								<div class="explorBTN pt-2">
									<ngx-skeleton-loader count="1"
										[theme]="{ height: '15px', 'margin': '0px', width: '65%' }">
									</ngx-skeleton-loader>
								</div>
							</div>
						</div>

					</div>
					<div class="slider_itemBoxskeleton col-lg-4 col-sm-6">
						<div class="form-row">
							<div class="col-4">
								<div class="catImgBox">
									<ngx-skeleton-loader count="1"
										appearance="circle"
										[theme]="{width: '80px', height: '80px', 'border-radius': '10px'}">
									</ngx-skeleton-loader>
								</div>
							</div>
							<div class="content_textContent col-8">
								<ngx-skeleton-loader count="1"
									[theme]="{ height: '11px', 'margin': '0px', width: '75%' }">
								</ngx-skeleton-loader>
								<br>
								<ngx-skeleton-loader count="1"
									[theme]="{ height: '11px', 'margin': '0px', width: '25%' }">
								</ngx-skeleton-loader>
								<div class="explorBTN pt-2">
									<ngx-skeleton-loader count="1"
										[theme]="{ height: '15px', 'margin': '0px', width: '65%' }">
									</ngx-skeleton-loader>
								</div>
							</div>
						</div>

					</div>
					<div class="slider_itemBoxskeleton col-lg-4 col-sm-6">
						<div class="form-row">
							<div class="col-4">
								<div class="catImgBox">
									<ngx-skeleton-loader count="1"
										appearance="circle"
										[theme]="{width: '80px', height: '80px', 'border-radius': '10px'}">
									</ngx-skeleton-loader>
								</div>
							</div>
							<div class="content_textContent col-8">
								<ngx-skeleton-loader count="1"
									[theme]="{ height: '11px', 'margin': '0px', width: '75%' }">
								</ngx-skeleton-loader>
								<br>
								<ngx-skeleton-loader count="1"
									[theme]="{ height: '11px', 'margin': '0px', width: '25%' }">
								</ngx-skeleton-loader>
								<div class="explorBTN pt-2">
									<ngx-skeleton-loader count="1"
										[theme]="{ height: '15px', 'margin': '0px', width: '65%' }">
									</ngx-skeleton-loader>
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
export class SkeletonCategoryComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

}
