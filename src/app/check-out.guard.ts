import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RootService } from './root.service';

@Injectable({
	providedIn: 'root'
})
export class CheckoutGuard implements CanActivate {
	constructor(private router: Router, private service: RootService) { }
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
		const s = this.service.is_checkout_state() as boolean;
		if (s || (route.queryParams?.fast_pay && route.queryParams?.p !== '0')) {
			return true;
		} else {
			return this.router.createUrlTree(['/'], { queryParams: { state: false } });
		}
	}
}
