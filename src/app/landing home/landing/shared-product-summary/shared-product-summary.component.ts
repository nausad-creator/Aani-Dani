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
					<h3>{{'fresh_title' | translate}}</h3>
					<p>{{'fresh_detail' | translate}}</p>
				</div>
			</div>
			<div class="col-lg-4 col-md-6">
				<div class="uniqueItems">
					<div class="imgBox"><img src="assets/images/unique.jpg" alt="unique"></div>
					<h3>{{'unique_title' | translate}}</h3>
					<p>{{'unique_detail' | translate}}</p>
				</div>
			</div>
			<div class="col-lg-4 col-md-6">
				<div class="uniqueItems">
					<div class="imgBox"><img src="assets/images/creative.jpg" alt="fresh"></div>
					<h3>{{'creative_title' | translate}}</h3>
					<p>{{'creative_detail' | translate}}</p>
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
