import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RootService } from './root.service';

@Injectable({
	providedIn: 'root'
})
export class NotUserGuard implements CanActivate {
	constructor(readonly router: Router, private service: RootService) { }
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
		const assistant = this.service.isAuthenticated();
		if (assistant) {
			return this.router.createUrlTree(['/dashboard-office-assistant'], { queryParams: { redirect: true } });
		}
		if (!assistant) {
			return true;
		}
	}
}
