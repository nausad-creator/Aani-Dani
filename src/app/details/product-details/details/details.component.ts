import { Component, Input, OnInit } from '@angular/core';
import { ProductList } from 'src/app/interface';

@Component({
	selector: 'app-details',
	template: `
    <div class="prInfo row align-items-center">
					<div class="col-lg-5 col-md-5">
						<div class="bigIng" *ngIf="product"><img offset="100"
									style="width: 552px; height: 343px"
            						defaultImage="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAUFBQUFBQYGBgYICQgJCAwLCgoLDBINDg0ODRIbERQRERQRGxgdGBYYHRgrIh4eIisyKigqMjw2NjxMSExkZIYBCgoKCgoKCwwMCw8RDxEPFxUTExUXIhkaGRoZIjQhJiEhJiE0LjguKy44LlNBOjpBU2BRTFFgdGhodJOLk8DA///AABEIAAUABQMBEQACEQEDEQH/xABcAAEAAAAAAAAAAAAAAAAAAAAHEAEAAgEFAAAAAAAAAAAAAAACAQMRAAQFB0EBAQEAAAAAAAAAAAAAAAAAAAMEEQAABQUAAAAAAAAAAAAAAAAAAQIDQRITISKR/9oADAMBAAIRAxEAPwAZjt2+oGm3hNumMwmLmIUx7ic6mtPQ/iNSC1plsuj/2Q=="
            						lazyLoad="http://164.52.209.69/aanidani/backend/web/uploads/products/{{product.productImage}}"
            						[errorImage]="'assets/images/error_not_found.png'" alt="category-file" title="file_item_image"></div>	
					</div>	
					<div class="col-lg-7 col-md-7">	
						<div class="detailInfo">
							<h4 class="" *ngIf="product"><b>{{product.productName}}</b></h4>	
							<div class="productInfo">
								<div class="ratings">
				  					<i class="fas fa-star"></i>
				  					<i class="fas fa-star"></i>
				  					<i class="fas fa-star"></i>
				  					<i class="fas fa-star-half-alt"></i>
				  					<i class="far fa-star"></i>
				  					<span>105</span>
				  				</div>
				  				<p class="salinginfo" *ngIf="product">{{(product.productSoldCount | number) + ' people bought this'}}</p>
			  				</div>
			  				<div class="d-flex align-items-center detailPrice">
				  				<div class="price_text" *ngIf="product">{{(product.productPrice | number) + ' SR'}}</div>
					  			<div class="mrp_text" *ngIf="product">{{(product.productPriceVat | number) + ' SR'}}</div>					
				  			</div>
				  			<div class="form-group select_unit mb-2 mt-2">
				  				<select class="form-control">
				  					<option>200 gm</option>
				  					<option>500 gm</option>
				  					<option>1 Kg</option>
				  					<option>2 Kg</option>
				  					<option>5 Kg</option>	
				  				</select>	
				  			</div>
				  			<div class="d-flex align-items-center detailBtn pt-2">
				  				<div class="form-group mb-0">
				  					<input type="number" id="quantity" class="form-control" min="1">				  					
				  				</div>	
				  				<div class="pl-3">
									<a href="javascript:voil(0)" class="addcart-btn shopingcart-tbtn btn" id="addcart-1"> Add to Cart</a>
								</div>
				  			</div>

				  			<div class="wishlistConten d-flex align-items-center">
				  				<div class="pr-4"><a href="#"><i class="far fa-heart"></i> Add to Wishlist</a></div>
				  				<div class="shareDetail">
				  					<span class="pr-2">Share:</span>
				  					<a href="#"><i class="fab fa-facebook-f"></i></a>
				  					<a href="#"><i class="fab fa-twitter"></i></a>
				  					<a href="#"><i class="fab fa-pinterest"></i></a>
				  					<a href="#"><i class="fab fa-google-plus-g"></i></a>
				  					<a href="#"><i class="fab fa-linkedin-in"></i></a>
				  				</div>
				  			</div>	
						</div>	
					</div>	
				</div>	
  `,
	styles: [
	]
})
export class DetailsComponent implements OnInit {
	@Input() product: ProductList;
	constructor() { }

	ngOnInit(): void {
	}

}
