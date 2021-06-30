import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  template: `
     <!-- Hero Section -->
  <section id="hero">
    <div class="hero-container">
      <div id="heroCarousel" class="carousel slide carousel-fade" data-ride="carousel">
        <ol class="carousel-indicators" id="hero-carousel-indicators"></ol>
        <div class="carousel-inner" role="listbox">
          <!-- Slide 1 -->
          <div class="carousel-item active" style="background: url(assets/images/banner-img-1.jpg)">
            <div class="carousel-container">
              <div class="carousel-content">
                <h2 class="animated fadeInDown text-white mb-3">Happiness In <br>Every Bite</h2>
				        <div class="slider-button animated fadeInUp"><a href="#" class="shopnow-btn btn">Shop Now</a></div>
              </div>
            </div>
          </div>
          <!-- Slide 2 -->
          <div class="carousel-item" style="background: url(assets/images/banner-img-1.jpg)">
            <div class="carousel-container">
              <div class="carousel-content">
                <h2 class="animated fadeInDown text-white mb-3">Happiness In <br>Every Bite</h2>
                <div class="slider-button animated fadeInUp"><a href="#" class="shopnow-btn btn">Shop Now</a></div>             
              </div>
            </div>
          </div>
          <!-- Slide 3 -->
          <div class="carousel-item" style="background: url(assets/images/banner-img-1.jpg)">
            <div class="carousel-container">
              <div class="carousel-content">
                <h2 class="animated fadeInDown text-white mb-3">Happiness In <br>Every Bite</h2>
                <div class="slider-button animated fadeInUp"><a href="#" class="shopnow-btn btn">Shop Now</a></div>
              </div>
            </div>
          </div>
        </div>

        <a class="carousel-control-prev" href="#heroCarousel" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon icofont-rounded-left" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#heroCarousel" role="button" data-slide="next">
          <span class="carousel-control-next-icon icofont-rounded-right" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
  </section><!-- End Hero -->
  `,
  styles: [
  ]
})
export class BannerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.jquery();
  }
  jquery = () => {
    jQuery(() => {
      ($('.client_review_part') as any).owlCarousel({
        items: 1,
        loop: true,
        dots: true,
        autoplay: true,
        autoplayHoverPause: true,
        autoplayTimeout: 15000,
        nav: false,
        navText: ['<i class=\'ti-angle-left\'></i>', '<i class=\'ti-angle-right\'></i>'],
        smartSpeed: 2000,
        responsive: {
          0: {
            nav: true,
            mouseDrag: false
          },
          600: {
            nav: true,
            mouseDrag: false
          },
          1000: {

          }
        }
      });
      ($('.testimonials-carousel') as any).owlCarousel({
        loop: true,
        nav: true,
        margin: 10,
        items: 2,
        responsiveClass: true,
        navText: ['<i class=\'ti-angle-left\'></i>', '<i class=\'ti-angle-right\'></i>'],
        responsive: {
          0: {
            items: 1,
            nav: true
          },
          600: {
            items: 1,
            nav: false
          },
          1000: {
            items: 2,
            nav: true,
            loop: false
          }
        }
      });
    });
  }
}
