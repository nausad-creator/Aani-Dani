import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-offers',
	template: `
    <section class="ads-section pt-0 pb-4">
    <div class="container">
        <div class="owl-carousel ads-carousel">
            <div class="ads-items">
                <a href="#"><img src="assets/images/ads1.jpg"></a>
            </div>
            <div class="ads-items">
                <a href="#"><img src="assets/images/ads2.jpg"></a>
            </div>	
            <div class="ads-items">
                <a href="#"><img src="assets/images/ads3.jpg"></a>
            </div>		
        </div>	
    </div> 
  </section> 
  `,
	styles: [
	]
})
export class OffersComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
		this.jquery();
	}
	jquery = () => {
		jQuery(() => {
			($(".ads-carousel") as any).owlCarousel({
				autoplay: true,
				dots: true,
				loop: false,
				nav: false,
				margin: 10,
				responsive: {
					0: {
						items: 1
					},
					768: {
						items: 2
					},
					900: {
						items: 2
					},
					1000: {
						items: 3
					}
				}
			});
		})
	}

}
