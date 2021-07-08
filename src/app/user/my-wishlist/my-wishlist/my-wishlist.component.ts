import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-wishlist',
  template: `
    <div class="tab-pane fade show active" id="MyWishlist" role="tabpanel" aria-labelledby="contact-tab">
						  		<div class="titleAccount">
						  			<h5>My Wishlist (2)</h5>						  			
						  		</div>	
						  		<div class="orderDetailList">				        		
					        		<div class="bodyOrder form-row m-0 align-items-center">
					        			<div class="col-md-2 col-4">
					        				<div class="smImg"><img src="assets/images/product-2.jpg" alt="product"></div>
					        			</div>	
					        			<div class="col-md-5 col-8">
					        				<p class="mb-0">Graduation Cake - Chocolate</p>
					        				<div class="ratings">
							  					<i class="fas fa-star"></i>
							  					<i class="fas fa-star"></i>
							  					<i class="fas fa-star"></i>
							  					<i class="fas fa-star-half-alt"></i>
							  					<i class="far fa-star"></i>
							  					<span>105</span>
							  				</div>
							  				<div class="d-flex align-items-center mt-2">
								  				<div class="form-group select_unit mb-0">
									  				<select class="form-control bg-white">
									  					<option>200 gm</option>
									  					<option>500 gm</option>
									  					<option>1 Kg</option>
									  					<option>2 Kg</option>
									  					<option>5 Kg</option>	
									  				</select>								  			
									  			</div>
						        				<h6 class="mb-0 ml-3"><b>50 SR</b></h6>
					        				</div>
					        			</div>
					        			<div class="col-md-5 text-md-right">
					        				<div class="linksOrde pt-2">
					        					<a href="#" class="text-danger mr-3"><i class="icofont-trash"></i></a>
					        					<a href="javascript:voil(0)" class="addcart-btn shopingcart-tbtn btn"> Add to Cart</a>
					        				</div>	
					        			</div>
					        		</div>
					        	</div>
					        	<div class="orderDetailList">				        		
					        		<div class="bodyOrder form-row m-0 align-items-center">
					        			<div class="col-md-2 col-4">
					        				<div class="smImg"><img src="assets/images/product-3.jpg" alt="product"></div>
					        			</div>	
					        			<div class="col-md-5 col-8">
					        				<p class="mb-0">Graduation Cake - Chocolate</p>
					        				<div class="ratings">
							  					<i class="fas fa-star"></i>
							  					<i class="fas fa-star"></i>
							  					<i class="fas fa-star"></i>
							  					<i class="fas fa-star-half-alt"></i>
							  					<i class="far fa-star"></i>
							  					<span>105</span>
							  				</div>
							  				<div class="d-flex align-items-center mt-2">
								  				<div class="form-group select_unit mb-0">
									  				<select class="form-control bg-white">
									  					<option>200 gm</option>
									  					<option>500 gm</option>
									  					<option>1 Kg</option>
									  					<option>2 Kg</option>
									  					<option>5 Kg</option>	
									  				</select>								  			
									  			</div>
						        				<h6 class="mb-0 ml-3"><b>50 SR</b></h6>
					        				</div>
					        			</div>
					        			<div class="col-md-5 text-md-right">
					        				<div class="linksOrde pt-2">
					        					<a href="#" class="text-danger mr-3"><i class="icofont-trash"></i></a>
					        					<a href="javascript:voil(0)" class="addcart-btn shopingcart-tbtn btn"> Add to Cart</a>
					        				</div>	
					        			</div>
					        		</div>
					        	</div>
						  	</div>
  `,
  styles: [
  ]
})
export class MyWishlistComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
