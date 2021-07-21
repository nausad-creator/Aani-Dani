import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-my-reviews',
	template: `
    <div class="tab-pane fade show active" id="MyReviews" role="tabpanel" aria-labelledby="contact-tab">
						  		<div class="titleAccount">
						  			<h5>My Reviews (2)</h5>						  			
						  		</div>
						  		<div class="orderDetailList ml-0 mr-0">
					        		<div class="form-row m-0 p-3">
					        			<div class="col-md-6 col-6">
					        				<h6 class="mb-0"><b>Red Velvet</b></h6>
					        			</div>	
					        			<div class="col-md-6 text-md-right mt-2 mt-md-0">
					        				<p class="mb-0 small">Order # 403-6007027-2138715</p>			   	
					        			</div>
					        		</div>	
					        		<div class="bodyOrder form-row m-0 pt-0">
					        			<div class="col-md-8">
					        				<div class="ratings">
							  					<i class="fas fa-star"></i>
							  					<i class="fas fa-star"></i>
							  					<i class="fas fa-star"></i>
							  					<i class="fas fa-star-half-alt"></i>
							  					<i class="far fa-star"></i>
							  					<span>4.5</span>
							  				</div>
					        				<p class="mb-0">Leo Hottinger on Aug 21, 2020</p>
					        				<p class="mb-0 qty">I always get bargained prices, wich are amazing. You can really save a lot of money as I do.</p>
					        			</div>
					        			<div class="col-md-4 text-md-right">
					        				<div class="linksOrde">
					        					<a class="mr-3" href="#">Edit</a>
					        					<a href="#" class="text-danger">Delete</a>
					        				</div>	
					        			</div>
					        		</div>
					        	</div>

						  		<div class="orderDetailList ml-0 mr-0">
					        		<div class="form-row m-0 p-3">
					        			<div class="col-md-6 col-6">
					        				<h6 class="mb-0"><b>Red Velvet</b></h6>
					        			</div>	
					        			<div class="col-md-6 text-md-right mt-2 mt-md-0">
					        				<p class="mb-0 small">Order # 403-6007027-2138715</p>			   	
					        			</div>
					        		</div>	
					        		<div class="bodyOrder form-row m-0 pt-0">
					        			<div class="col-md-8">
					        				<div class="ratings">
							  					<i class="fas fa-star"></i>
							  					<i class="fas fa-star"></i>
							  					<i class="fas fa-star"></i>
							  					<i class="fas fa-star-half-alt"></i>
							  					<i class="far fa-star"></i>
							  					<span>4.5</span>
							  				</div>
					        				<p class="mb-0">Leo Hottinger on Aug 21, 2020</p>
					        				<p class="mb-0 qty">I always get bargained prices, wich are amazing. You can really save a lot of money as I do.</p>
					        			</div>
					        			<div class="col-md-4 text-md-right">
					        				<div class="linksOrde">
					        					<a class="mr-3" href="#">Edit</a>
					        					<a href="#" class="text-danger">Delete</a>
					        				</div>	
					        			</div>
					        		</div>
					        	</div>
					        	
						  	</div>
  `,
	styles: [
	]
})
export class MyReviewsComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

}
