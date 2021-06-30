import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SimilarProducts } from 'src/app/interface';

@Component({
	selector: 'app-top-sellings',
	template: `
   <div class="category-section">
    <div class="card-header bg-white">
      <div class="section-title row pb-0">
        <div class="col-md-8 p-0">		
            <h6 class="mb-0"><b>Similar Items</b></h6>
        </div>				  	
      </div>
  </div>  

  <div class="category_slider">
      <div class="">
        <owl-carousel-o [options]="caseOptions">
            <ng-template carouselSlide *ngFor="let item of similarproduct">
              <div class="slider_itemBox text-center cursr" (click)="change.emit({categoryID: item.categoryID, productID: item.productID})">
              <img offset="50" class="w-auto m-auto"
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
  `,
	styles: [
	], changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopSellingsComponent implements OnInit {
	@Input() similarproduct: SimilarProducts[] = [];
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
				items: 1
			},
			1000: {
				items: 1
			},
			1200: {
				items: 1
			}
		}
	};
	@Output() change = new EventEmitter<{categoryID: string, productID: string}>();
	constructor() { }
	ngOnInit(): void {
	}
}
