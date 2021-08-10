import { trigger } from '@angular/animations';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { fadeIn } from 'src/app/animation';
import { Category } from 'src/app/interface';
import { RootService } from 'src/app/root.service';

@Component({
	selector: 'app-most-popular-best-seller',
	template: `
    <section class="LowestPrice-section pt-0" *ngIf="categories.length > 0">
    <div class="container">
        <div class="card">
            <div class="card-header bg-white">
              <div class="section-title row pb-0">
                <div class="col-md-6">		
                    <h2 class="mb-0">{{'shop_by_categories' | translate}}</h2>
                </div>
              </div> 
          </div>     

          <div class="category_slider">
              <owl-carousel-o [options]="caseOptions">
              <ng-template carouselSlide *ngFor="let category of categories">
              <div class="slider_itemBox cursr" routerLink="/products" [queryParams]="{page: '0', categoryID: category?.categoryID, categoryName: category?.categoryName}" [@fadeIn]>
                    <div class="form-row">
                        <div class="col-4">
                            <div class="catImgBox"><img offset="50"
            			defaultImage="http://164.52.209.69/aanidani/backend/web/uploads/category/{{category?.categoryImage}}"
            			lazyLoad="http://164.52.209.69/aanidani/backend/web/uploads/category/{{category?.categoryImage}}"
            			[errorImage]="'assets/images/error_not_found.png'" [alt]="category?.categoryName" [title]="category?.categoryName"> </div>
                        </div>
                        <div class="content_textContent col-8">
                            <h5 class="text-dark mb-0">{{(root.languages$ | async) === 'en' ? (category?.categoryName | titlecase) : (category?.categoryName | titlecase)}}</h5>
                            <div class="pb-2">About Cake</div>
                            <div class="productInfo">
                            </div>
                            <div class="explorBTN pt-2">
                                <a>{{'explore' | translate}} <i [ngClass]="{'icofont-rounded-left' : (root.languages$ | async) === 'ar', 'icofont-rounded-right' : (root.languages$ | async) === 'en'}"></i></a>
                            </div>
                        </div>	
                    </div>	
                </div>
              </ng-template>
              </owl-carousel-o>
          </div>
      </div>	
    </div>
  </section>
  `,
	styles: [
	],
	animations: [
		trigger('fadeIn', fadeIn())
	], changeDetection: ChangeDetectionStrategy.OnPush
})
export class MostPopularBestSellerComponent implements OnInit, AfterViewInit {
	@Input() categories: Category[] = []
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
			574: {
				items: 1
			},
			800: {
				items: 2
			},
			1000: {
				items: 3
			},
			1200: {
				items: 3
			}
		}
	};
	constructor(public root: RootService) { }
	ngAfterViewInit(): void {
	}
	ngOnInit(): void {
	}
}
