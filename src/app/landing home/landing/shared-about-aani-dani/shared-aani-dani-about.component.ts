import { trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/animation';

@Component({
	selector: 'app-shared-about-aani-dani',
	template: `
<section class="aboutaanidani-section" style="background-image:url('assets/images/about_aanidani.jpg');">
	<div class="container position-relative contentAbout">
		<h2>{{'aani_dani_title' | translate}}</h2>
		<p class="pb-2">{{'aani_dani_about' | translate}}</p>
		<a routerLink="/content/about-us" class="btn-md btn btn-white">{{'read_more' | translate}}</a>
	</div>
</section>	
  `,
	styles: [
		`a:hover {
			background-color: #0f0e0e;
    			color: #ffffff;
		      }`
	],
	animations: [
		trigger('fadeIn', fadeIn())
	], changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutAaniDaniComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}
}
