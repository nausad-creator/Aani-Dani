import { trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { fadeIn } from 'src/app/animation';
import { Banner } from 'src/app/interface';

@Component({
	selector: 'app-banner',
	template: `
    <!-- Hero Section -->
<section id="hero">
	<div class="hero-container">
		<div id="heroCarousel" class="carousel slide carousel-fade" data-ride="carousel">
			<ol class="carousel-indicators" id="hero-carousel-indicators"></ol>
			<div class="carousel-inner" role="listbox" [@fadeIn]>
				<!-- Slides -->
				<owl-carousel-o [options]="caseOptions" (translated)="getPassedData($event)">
					<ng-container *ngFor="let item of banner">
						<ng-template carouselSlide [id]="item?.bannerID">
							<div class="carousel-item active"
								[style.background-image]="'url(http://164.52.209.69/aanidani/backend/web/uploads/banners/'+item?.bannerImage+')'"
								lazyLoad="http://164.52.209.69/aanidani/backend/web/uploads/banners/{{item?.bannerImage}}">
								<div class="carousel-container">
									<div class="carousel-content">
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
		``
	],
	animations: [
		trigger('fadeIn', fadeIn()),
	], changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent implements OnInit {
	@Input() banner: Banner[] = [];
	caseOptions: OwlOptions = {
		loop: true,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: false,
		dots: true,
		autoplay: true,
		animateIn: 'fadeIn',
		animateOut: 'fadeOut',
		autoplaySpeed: 800,
		autoplayTimeout: 5000,
		navSpeed: 700,
		nav: true,
		navText: ["<a class='carousel-control-prev' role='button' data-slide='prev'> <span class='carousel-control-prev-icon icofont-rounded-left' aria-hidden='true'></span> <span class='sr-only'>Previous</span> </a>", "<a class='carousel-control-next' role='button' data-slide='next'><span class='carousel-control-next-icon icofont-rounded-right' aria-hidden='true'></span><span class='sr-only'>Next</span></a>"],
		responsive: {
			0: {
				items: 1
			},
			768: {
				items: 1
			},
			900: {
				items: 1
			}
		}
	};
	activeSlides: SlidesOutputData;
	constructor() { }
	getPassedData(data: SlidesOutputData) {
		this.activeSlides = data;
		this.caseOptions.animateIn = `<li data-target='#${data.slides[0].id}' data-slide-to='" + ${data.startPosition} + "' class='active'></li>`
	}
	ngOnInit(): void {
	}
}
