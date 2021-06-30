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
                            <div class="catImgBox"><img src="assets/images/product-5.jpg" alt="Cashew Whole"> </div>
                        </div>
                        <div class="content_textContent col-8">
                            <h5 class="text-dark mb-0">{{category.categoryName | titlecase}}</h5>
                            <div class="pb-2">About Cake</div>
                            <div class="productInfo">
                                <div class="ratings">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star-half-alt"></i>
                                    <i class="far fa-star"></i> <small class="text-muted">105</small>
                                </div>
                                <p class="salinginfo text-left">Min AED 50  <span class="pl-3">27 MINS</span></p>
                            </div>
                            <div class="explorBTN pt-2">
                                <a href="#">Explore <i class="icofont-rounded-right"></i></a>
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
