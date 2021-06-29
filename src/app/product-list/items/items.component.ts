import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-items',
  template: `
  <div class="row productListingPage">
  <div class="slider_itemBox col-lg-4 col-sm-6" routerLink="/product-details">
						  		<img src="assets/images/product-1.jpg" alt="Mamro Big"> 
						  		<div class="content_textContent">
						  			<h5 class="text-dark mb-0">Blueberry Buttercream</h5>
						  			<div class="form-group select_unit mb-2 mt-2">
						  				<select class="form-control">
						  					<option>200 gm</option>
						  					<option>500 gm</option>
						  					<option>1 Kg</option>
						  					<option>2 Kg</option>
						  					<option>5 Kg</option>	
						  				</select>	
						  			</div>
						  			<div class="d-flex align-items-center justify-content-center">
						  				<div class="price_text">202.62 SR</div>
							  			<div class="mrp_text">222.62 SR</div>					  		
						  			</div>
						  			<div class="productInfo">
						  				<div class="ratings">
						  					<i class="fas fa-star"></i>
						  					<i class="fas fa-star"></i>
						  					<i class="fas fa-star"></i>
						  					<i class="fas fa-star-half-alt"></i>
						  					<i class="far fa-star"></i>
						  				</div>
						  				<p class="salinginfo">110 people bought this</p>
						  			</div>		
						  			
						  			<div class="cartbox">
										<a href="javascript:voil(0)" class="addcart-btn shopingcart-tbtn btn" id="addcart-1"> Add to Cart</a>
										
									</div>	
						  		</div>	
						    </div>
						    <div class="slider_itemBox col-lg-4 col-sm-6" routerLink="/product-details">
						  		<img src="assets/images/product-2.jpg" alt="Turkish Apricots"> 
						  		<div class="content_textContent">
						  			<h5 class="text-dark mb-0">Chocolate Cupcake</h5>
						  			<div class="form-group select_unit mb-2 mt-2">
						  				<select class="form-control">
						  					<option>200 gm</option>
						  					<option>500 gm</option>
						  					<option>1 Kg</option>
						  					<option>2 Kg</option>
						  					<option>5 Kg</option>	
						  				</select>	
						  			</div>
						  			<div class="d-flex align-items-center justify-content-center">
						  				<div class="price_text">202.62 SR</div>
							  			<div class="mrp_text">222.62 SR</div>					  		
						  			</div>
						  			<div class="productInfo">
						  				<div class="ratings">
						  					<i class="fas fa-star"></i>
						  					<i class="fas fa-star"></i>
						  					<i class="fas fa-star"></i>
						  					<i class="fas fa-star-half-alt"></i>
						  					<i class="far fa-star"></i>
						  				</div>
						  				<p class="salinginfo">110 people bought this</p>
						  			</div>		
						  			
						  			<div class="cartbox">
										<a href="javascript:voil(0)" class="addcart-btn shopingcart-tbtn btn" id="addcart-1"> Add to Cart </a>
									</div>	
						  		</div>
						  </div>
						  <div class="slider_itemBox col-lg-4 col-sm-6" routerLink="/product-details">
						  		<img src="assets/images/product-3.jpg" alt="Maharaja Halwa"> 
						  		<div class="content_textContent">
						  			<h5 class="text-dark mb-0">Graduation Cake - Chocolate</h5>
						  			<div class="form-group select_unit mb-2 mt-2">
						  				<select class="form-control">
						  					<option>200 gm</option>
						  					<option>500 gm</option>
						  					<option>1 Kg</option>
						  					<option>2 Kg</option>
						  					<option>5 Kg</option>	
						  				</select>	
						  			</div>
						  			<div class="d-flex align-items-center justify-content-center">
						  				<div class="price_text">202.62 SR</div>
							  			<div class="mrp_text">222.62 SR</div>					  		
						  			</div>
						  			<div class="productInfo">
						  				<div class="ratings">
						  					<i class="fas fa-star"></i>
						  					<i class="fas fa-star"></i>
						  					<i class="fas fa-star"></i>
						  					<i class="fas fa-star-half-alt"></i>
						  					<i class="far fa-star"></i>
						  				</div>
						  				<p class="salinginfo">110 people bought this</p>
						  			</div>		
						  			
						  			<div class="cartbox">
										<a href="javascript:voil(0)" class="addcart-btn shopingcart-tbtn btn" id="addcart-1"> Add to Cart</a>
									</div>	
						  		</div>
						  </div>
						  <div class="slider_itemBox col-lg-4 col-sm-6" routerLink="/product-details">
						  		<img src="assets/images/product-4.jpg" alt="Badam Halwa"> 
						  		<div class="content_textContent">
						  			<h5 class="text-dark mb-0">Eggnog Cupcakes</h5>
						  			<div class="form-group select_unit mb-2 mt-2">
						  				<select class="form-control">
						  					<option>200 gm</option>
						  					<option>500 gm</option>
						  					<option>1 Kg</option>
						  					<option>2 Kg</option>
						  					<option>5 Kg</option>	
						  				</select>	
						  			</div>
						  			<div class="d-flex align-items-center justify-content-center">
						  				<div class="price_text">202.62 SR</div>
							  			<div class="mrp_text">222.62 SR</div>					  		
						  			</div>
						  			<div class="productInfo">
						  				<div class="ratings">
						  					<i class="fas fa-star"></i>
						  					<i class="fas fa-star"></i>
						  					<i class="fas fa-star"></i>
						  					<i class="fas fa-star-half-alt"></i>
						  					<i class="far fa-star"></i>
						  				</div>
						  				<p class="salinginfo">110 people bought this</p>
						  			</div>		
						  			
						  			<div class="cartbox">
										<a href="javascript:voil(0)" class="addcart-btn shopingcart-tbtn btn" id="addcart-1"> Add to Cart</a>
									</div>	
						  		</div>
						  </div>
						  <div class="slider_itemBox col-lg-4 col-sm-6" routerLink="/product-details">
						  		<img src="assets/images/product-5.jpg" alt="Fig"> 
						  		<div class="content_textContent">
						  			<h5 class="text-dark mb-0">Strawberry Cheesecake</h5>
						  			<div class="form-group select_unit mb-2 mt-2">
						  				<select class="form-control">
						  					<option>200 gm</option>
						  					<option>500 gm</option>
						  					<option>1 Kg</option>
						  					<option>2 Kg</option>
						  					<option>5 Kg</option>	
						  				</select>	
						  			</div>
						  			<div class="d-flex align-items-center justify-content-center">
						  				<div class="price_text">202.62 SR</div>
							  			<div class="mrp_text">222.62 SR</div>					  		
						  			</div>
						  			<div class="productInfo">
						  				<div class="ratings">
						  					<i class="fas fa-star"></i>
						  					<i class="fas fa-star"></i>
						  					<i class="fas fa-star"></i>
						  					<i class="fas fa-star-half-alt"></i>
						  					<i class="far fa-star"></i>
						  				</div>
						  				<p class="salinginfo">110 people bought this</p>
						  			</div>		
						  			
						  			<div class="cartbox">
										<a href="javascript:voil(0)" class="addcart-btn shopingcart-tbtn btn" id="addcart-1"> Add to Cart</a>
									</div>	
						  		</div>
						  </div>
						  <div class="slider_itemBox col-lg-4 col-sm-6" routerLink="/product-details">
						  		<img src="assets/images/product-1.jpg" alt="Grocery"> 
						  		<div class="content_textContent">
						  			<h5 class="text-dark mb-0">Blueberry Buttercream</h5>
						  			<div class="form-group select_unit mb-2 mt-2">
						  				<select class="form-control">
						  					<option>200 gm</option>
						  					<option>500 gm</option>
						  					<option>1 Kg</option>
						  					<option>2 Kg</option>
						  					<option>5 Kg</option>	
						  				</select>	
						  			</div>
						  			<div class="d-flex align-items-center justify-content-center">
						  				<div class="price_text">202.62 SR</div>
							  			<div class="mrp_text">222.62 SR</div>					  		
						  			</div>
						  			<div class="productInfo">
						  				<div class="ratings">
						  					<i class="fas fa-star"></i>
						  					<i class="fas fa-star"></i>
						  					<i class="fas fa-star"></i>
						  					<i class="fas fa-star-half-alt"></i>
						  					<i class="far fa-star"></i>
						  				</div>
						  				<p class="salinginfo">110 people bought this</p>
						  			</div>		
						  			<div class="cartbox">
										<a href="javascript:voil(0)" class="addcart-btn shopingcart-tbtn btn" id="addcart-1"> Add to Cart</a>
									</div>	
						  		</div>	
						  </div> 
  </div>
  `,
  styles: [
  ]
})
export class ItemsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
