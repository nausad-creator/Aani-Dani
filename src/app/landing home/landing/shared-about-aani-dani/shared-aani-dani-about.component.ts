import { trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/animation';

@Component({
	selector: 'app-shared-about-aani-dani',
	template: `
<section class="aboutaanidani-section" style="background-image:url('assets/images/about_aanidani.jpg');">
	<div class="container position-relative contentAbout">
		<h2>AANI &amp; DANI</h2>
		<p class="pb-2">AANI &amp; DANI began as a vision in the 1998s of Mr. Khaled Al-Othaim. Khaled knew that
			many European countries, particularly Belgium and Switzerland, produced the best chocolates,
			cakes, and sweets the world had to offer. Hundreds of flavors, along with various colors and
			textures, were painstakingly blended to create luxurious sweets, and presented in ways that
			appealed to all five senses. They were amazingly fresh, incredibly elegant and beautifully
			formed.</p>
		<a routerLink="/content/about-us" class="btn-md btn btn-white">Read More</a>
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
