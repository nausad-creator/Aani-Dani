import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ProductList } from 'src/app/interface';

@Component({
	selector: 'app-items',
	template: `
  <div class="row productListingPage cursr" *ngIf="products">
						    <div class="slider_itemBox col-lg-4 col-sm-6" routerLink="/product-details" [queryParams]="{page: '0', categoryID: item.categoryID, productID: item.productID}" *ngFor="let item of products">
						  		<img offset="50"
            						defaultImage="http://164.52.209.69/aanidani/backend/web/uploads/products/{{item.productImage}}"
            						lazyLoad="http://164.52.209.69/aanidani/backend/web/uploads/products/{{item.productImage}}"
            						[errorImage]="'assets/images/error_not_found.png'" [alt]="item.productName" [title]="item.productName">
						  		<div class="content_textContent">
						  			<h5 class="text-dark mb-0">{{item.productName}}</h5>
						  			<div class="d-flex align-items-center justify-content-center mt-2">
						  				<div class="price_text">{{(item.productPrice | number) + ' SR'}}</div>
							  			<div class="mrp_text">{{(item.productPriceVat | number) + ' SR'}}</div>					  		
						  			</div>
						  			<div class="productInfo">
						  				<div class="ratings">
						  					<i class="fas fa-star"></i>
						  					<i class="fas fa-star"></i>
						  					<i class="fas fa-star"></i>
						  					<i class="fas fa-star-half-alt"></i>
						  					<i class="far fa-star"></i>
						  				</div>
						  				<p class="salinginfo">{{(item.productSoldCount | number) + ' people bought this'}}</p>
						  			</div>		
						  			
						  			<div class="cartbox">
										<a href="javascript:voil(0)" class="addcart-btn shopingcart-tbtn btn" id="addcart-1"> Add to Cart </a>
									</div>	
						  		</div>
						  </div>
  </div>
  `,
	styles: [
	], changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsComponent implements OnInit {
	@Input() products: ProductList[] = [];
	constructor() { }

	ngOnInit(): void {
	}
}
