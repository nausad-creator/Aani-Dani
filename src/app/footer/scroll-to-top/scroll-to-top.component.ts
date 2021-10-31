import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-scroll-to-top',
	template: `<a class="back-to-top" style="cursor: pointer;"><i class="icofont-simple-up"></i></a>`,
	styles: [
	]
})
export class ScrollToTopComponent implements OnInit {
	constructor() { }
	ngOnInit(): void {
		// Back to top button
		($(window) as any).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('.back-to-top').fadeIn('slow');
			} else {
				$('.back-to-top').fadeOut('slow');
			}
		});
		jQuery(() => {
			$('.back-to-top').on('click', function () {
				$("html, body").animate({ scrollTop: 0 }, 100);
			});
		})
	}
}
