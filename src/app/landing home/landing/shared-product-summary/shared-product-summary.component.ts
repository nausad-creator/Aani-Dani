import { trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/animation';

@Component({
	selector: 'app-shared-product-summary',
	template: `
<section class="unique-section bg-gray">
	<div class="container">
		<div class="row">
			<div class="col-lg-4 col-md-6">
				<div class="uniqueItems">
					<div class="imgBox"><img src="assets/images/fresh.jpg" alt="fresh"></div>
					<h3>Fresh</h3>
					<p>We make sure that our customers are close to us and will never forget our
						products when they enjoy tasting our fresh and sweets to satisfy their
						desired favorite choices.</p>
				</div>
			</div>
			<div class="col-lg-4 col-md-6">
				<div class="uniqueItems">
					<div class="imgBox"><img src="assets/images/unique.jpg" alt="unique"></div>
					<h3>Unique</h3>
					<p>Is part of our soul at AANI &amp; DANI we believe that our chocolate lovers
						deserve the best original and organic Ingredients to enjoy a truly
						unforgettable and unique memorable experience when they taste our
						chocolate.</p>
				</div>
			</div>
			<div class="col-lg-4 col-md-6">
				<div class="uniqueItems">
					<div class="imgBox"><img src="assets/images/creative.jpg" alt="fresh"></div>
					<h3>Creative</h3>
					<p>We always strive to make new tests and modern handcrafted designs that
						compete with world best standard chocolates, cakes and macarons by
						making our signature in each element we make.</p>
				</div>
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
export class ProductSummaryComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}
}
