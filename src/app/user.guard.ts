import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RootService } from './root.service';

@Injectable({
	providedIn: 'root'
})
export class UserGuard implements CanActivate {
	constructor(readonly router: Router, private service: RootService) { }
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
		const currentUser = this.service.is_authenticated();
		if (currentUser) {
			return true;
		} else {
			return this.router.createUrlTree(['/'], { queryParams: { auth: false } });
		}
	}
}
