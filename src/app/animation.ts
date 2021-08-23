
import { style, animate, transition } from '@angular/animations';

export function fadeIn() {
	return [
		// route 'enter' transition
		transition(':enter', [
			// css styles at start of transition
			style({ opacity: 0 }),
			// animation and styles at end of transition
			animate('400ms ease-in', style({ opacity: 1 }))
		])
	];
}