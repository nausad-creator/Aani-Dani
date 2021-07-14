import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { Banner } from 'src/app/interface';

@Component({
  selector: 'app-banner',
  template: `
     <!-- Hero Section -->
  <section id="hero">
    <div class="hero-container">
      <div id="heroCarousel" class="carousel slide carousel-fade" data-ride="carousel">
        <ol class="carousel-indicators" id="hero-carousel-indicators"></ol>
        <div class="carousel-inner" role="listbox">
          <!-- Slides -->
          <owl-carousel-o 
          [options]="caseOptions" 
          (translated)="getPassedData($event)">
          <ng-container *ngFor="let item of banner">
          <ng-template carouselSlide [id]="item?.bannerID">
          <div class="carousel-item active" [style.background-image]="'url(http://164.52.209.69/aanidani/backend/web/uploads/banners/'+item?.bannerImage+')'" lazyLoad="http://164.52.209.69/aanidani/backend/web/uploads/banners/{{item?.bannerImage}}">
            <div class="carousel-container">
              <div class="carousel-content">
                <!-- <h2 class="animated fadeInDown mb-3">{{item?.bannerName}}</h2>
				        <div class="slider-button animated fadeInUp"><a href="#" class="shopnow-btn btn">Shop Now</a></div> -->
              </div>
            </div>
          </div>
          </ng-template>
          </ng-container>
        </owl-carousel-o> 
        </div>
      </div>
    </div>
  </section><!-- End Hero -->
  `,
  styles: [
  ], changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent implements OnInit {
  @Input() banner: Banner[] = [];
  caseOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplaySpeed: 3000,
    autoplayHoverPause: true,
    dots: true,
    nav: true,
    navSpeed: 1500,
    navText: ["<a class='carousel-control-prev' role='button' data-slide='prev'> <span class='carousel-control-prev-icon icofont-rounded-left' aria-hidden='true'></span> <span class='sr-only'>Previous</span> </a>", "<a class='carousel-control-next' role='button' data-slide='next'><span class='carousel-control-next-icon icofont-rounded-right' aria-hidden='true'></span><span class='sr-only'>Next</span></a>"],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
      1000: {
				items: 1,
			},
			1200: {
				items: 1,
			}
    },
  };
  activeSlides: SlidesOutputData;
  constructor() { }
  getPassedData(data: SlidesOutputData) {
    this.activeSlides = data;
    this.caseOptions.animateIn = `<li data-target='#${data.slides[0].id}' data-slide-to='" + ${data.startPosition} + "' class='active'></li>`
  }
  ngOnInit(): void {
    this.jquery();
  }
  jquery = () => {
    jQuery(() => {
      // Intro carousel
      const heroCarousel = $("#heroCarousel");
      const heroCarouselIndicators = $("#hero-carousel-indicators");
      heroCarousel.find(".carousel-inner").children(".carousel-item").each(function (index) {
        (index === 0) ?
          heroCarouselIndicators.append("<li data-target='#heroCarousel' data-slide-to='" + index + "' class='active'></li>") :
          heroCarouselIndicators.append("<li data-target='#heroCarousel' data-slide-to='" + index + "'></li>");

      });
      heroCarousel.on('slid.bs.carousel', function (e) {
        $(this).find('h2').addClass('animated fadeInDown');
        $(this).find('p').addClass('animated fadeInUp');
        $(this).find('.btn-get-started').addClass('animated fadeInUp');
      });
    });
  }
}
