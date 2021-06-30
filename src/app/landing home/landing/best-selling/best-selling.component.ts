import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductList } from 'src/app/interface';

@Component({
	selector: 'app-best-selling',
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
              <div class="product-carousel">
                <owl-carousel-o [options]="caseOptions">
                <ng-template carouselSlide *ngFor="let item of products">
                  <div class="slider_itemBox cursr" routerLink="/product-details" [queryParams]="{page: '0', categoryID: item.categoryID, productID: item.productID}">
                  <img offset="50"
            			defaultImage="http://164.52.209.69/aanidani/backend/web/uploads/products/{{item.productImage}}"
            			lazyLoad="http://164.52.209.69/aanidani/backend/web/uploads/products/{{item.productImage}}"
            			[errorImage]="'assets/images/error_not_found.png'" alt="category-file" title="file_item_image">
                        <div class="content_textContent">
                            <h5 class="text-dark mb-0">{{item.productName}}</h5>
                            <!-- <div class="form-group select_unit mb-2 mt-2">
                                <select class="form-control">
                                    <option>200 gm</option>
                                    <option>500 gm</option>
                                    <option>1 Kg</option>
                                    <option>2 Kg</option>
                                    <option>5 Kg</option>	
                                </select>	
                            </div> -->
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
                              <a href="javascript:voil(0)" class="addcart-btn shopingcart-tbtn btn" id="addcart-1"><i class="icofont-shopping-cart"></i> Add to Cart</a>
                          </div>	
                        </div>	
                        </div>
                    </ng-template>
                </owl-carousel-o>    
              </div>
          </div>
      </div>
  </div>
  </section>
  `,
	styles: [
	], changeDetection: ChangeDetectionStrategy.OnPush
})
export class BestSellingComponent implements OnInit {
	@Input() products: ProductList[] = []
	caseOptions: OwlOptions = {
		dots: false,
		loop: false,
		nav: true,
		margin: 0,
		navText: ["<i class='icofont-rounded-left'></i>", "<i class='icofont-rounded-right'></i>"],
		responsive: {
			0: {
				items: 1
			},
			767: {
				items: 2
			},
			1000: {
				items: 4
			},
			1200: {
				items: 4
			}
		}
	};
	constructor() { }

	ngOnInit(): void {
	}
}
