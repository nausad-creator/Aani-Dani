import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from 'src/app/interface';

@Component({
    selector: 'app-most-popular-best-seller',
    template: `
    <section class="LowestPrice-section pt-0">
    <div class="container">
        <div class="card">
            <div class="card-header bg-white">
              <div class="section-title row pb-0">
                <div class="col-md-6">		
                    <h2 class="mb-0">Shop by Categories</h2>
                </div>
              </div> 
          </div>     

          <div class="category_slider">
              <owl-carousel-o [options]="caseOptions">
              <ng-template carouselSlide *ngFor="let category of categories">
              <div class="slider_itemBox cursr">
                    <div class="form-row">
                        <div class="col-4">
                            <div class="catImgBox"><img offset="50"
            			defaultImage="http://164.52.209.69/aanidani/backend/web/uploads/category/{{category.categoryImage}}"
            			lazyLoad="http://164.52.209.69/aanidani/backend/web/uploads/category/{{category.categoryImage}}"
            			[errorImage]="'assets/images/error_not_found.png'" [alt]="category.categoryName" [title]="category.categoryName"> </div>
                        </div>
                        <div class="content_textContent col-8">
                            <h5 class="text-dark mb-0">{{category.categoryName | titlecase}}</h5>
                            <div class="pb-2">About Cake</div>
                            <div class="productInfo">
                            </div>
                            <div class="explorBTN pt-2">
                                <a routerLink="/products" [queryParams]="{page: '0', categoryID: category.categoryID, categoryName: category.categoryName}">Explore <i class="icofont-rounded-right"></i></a>
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
    constructor() { }
    ngAfterViewInit(): void {
    }
    ngOnInit(): void {
    }
}
