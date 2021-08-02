import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of, Subject, merge, timer } from 'rxjs';
import { take, catchError, mergeMap, map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication.service';
import { wishlist } from 'src/app/global';
import { TempCartItems, Wishlist } from 'src/app/interface';
import { RootService } from 'src/app/root.service';
import { SubSink } from 'subsink';

@Component({
	selector: 'app-my-wishlist',
	template: `
<div class="tab-pane fade show active" id="MyWishlist" role="tabpanel" aria-labelledby="contact-tab">
	<div class="titleAccount">
		<h5>{{wishLists.count ? 'My Wishlist ' + '('+ (+wishLists.count<10?'0'+wishLists.count:wishLists.count) +')' : 'My Wishlist ' + '('+ '00' +')'}}</h5>
	</div>
	<div *ngIf="!loader">
		<app-shared-wishlist (remove_fav)="remove($event)" [wishList]="wishLists.data" *ngIf="wishLists.data.length>0"></app-shared-wishlist>
		<div class="mt-3" style="overflow:hidden;" style="margin-bottom: 1rem; min-height: 320px;"
			*ngIf="wishLists.data.length === 0">
			<div class="row">
				<div class="col">
					<div class="nodata_content text-center pt-lg-5">
						<img src="assets/images/no-data.png" alt="No-Data">
						<p class="text-muted" style="padding-right:32px;">No Data Found.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div *ngIf="loader">
		<app-skeleton></app-skeleton>
	</div>
</div>
  `,
	styles: [
	], changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyWishlistComponent implements OnInit {
	cart: TempCartItems[] = JSON.parse(localStorage.getItem('tempCart') ? localStorage.getItem('tempCart') : '[]') as TempCartItems[];
	constructor(
		readonly router: Router,
		private root: RootService,
		private auth: AuthenticationService,
		public route: ActivatedRoute,
		private cd: ChangeDetectorRef) {
		// getting auth user data
		this.subs.add(this.auth.user.subscribe(user => {
			if (user) {
				wishlist.loginuserID = user.userID;
				this.cd.markForCheck();
			}
			if (user === null) {
				wishlist.loginuserID = '1';
				this.cd.markForCheck();
			}
		}));
		this.subs.add(this.root.update$.subscribe(status => {
			if (status === 'refresh_or_reload') {
				this.cart = JSON.parse(localStorage.getItem('tempCart') ? localStorage.getItem('tempCart') : '[]') as TempCartItems[];
				this.forceReload$.next();
			}
		}));
	}
	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
	loader = true;
	subs = new SubSink();
	wishLists: { count: number; data: Wishlist[]; message: string; status: string; } = { count: 0, data: [], message: 'Data not found', status: 'false' };
	wishLists$: Observable<{ count: number; data: Wishlist[]; message: string; status: string; }> = of(null);
	forceReload$ = new Subject<void>();
	getWishlist = (t: string) => {
		return this.root.wishlists(t).pipe(map((r) => {
			return {
				status: r.status,
				message: r.message,
				count: r.count,
				data: r.data.map(a => {
					return {
						productID: a.productID,
						categoryID: a.categoryID,
						subcatID: a.subcatID,
						productName: a.productName,
						productArabicNme: a.productArabicNme,
						productSKU: a.productSKU,
						productTag: a.productTag,
						productDescription: a.productDescription,
						productPriceVat: a.productPriceVat,
						productPrice: a.productPrice,
						productMOQ: a.productMOQ,
						productImage: a.productImage,
						productPackagesize: a.productPackagesize,
						productReviewCount: a.productReviewCount,
						productRatingCount: a.productRatingCount,
						productRatingAvg: a.productRatingAvg.split('.')[0],
						productSoldCount: a.productSoldCount,
						productStatus: a.productStatus,
						productCreatedDate: a.productCreatedDate,
						addedCartCount: this.cart.filter(p => p.productID === a.productID).length > 0 ? this.cart.filter(p => p.productID === a.productID)[0].qty : 0,
					}
				})
			}
		}), take(1),
			catchError(() => of([]))) as Observable<{ count: number; data: Wishlist[]; message: string; status: string; }>;
	}
	ngOnInit(): void {
		// query changes
		wishlist.page = '0';
		this.list(JSON.stringify(wishlist));
	}
	remove = (productID: string) => {
		this.root.remove_wishlist(JSON.stringify({
			loginuserID: wishlist.loginuserID,
			languageID: wishlist.languageID,
			productID
		})).subscribe(() => this.forceReload$.next())
	}
	list = (temp: string) => {
		// products
		const initial$ = this.getWishlist(temp) as Observable<{ count: number; data: Wishlist[]; message: string; status: string; }>;
		const updates$ = this.forceReload$.pipe(mergeMap(() => this.getWishlist(temp) as Observable<{ count: number; data: Wishlist[]; message: string; status: string; }>));
		this.wishLists$ = merge(initial$, updates$);
		this.subs.add(this.wishLists$.subscribe((res: { count: number; data: Wishlist[]; message: string; status: string; }) => {
			if (res.data) {
				timer(500).subscribe(() => {
					this.wishLists = res;
					this.loader = false;
					this.cd.markForCheck();
				});
			}
			if (!res.data) {
				timer(500).subscribe(() => {
					this.wishLists = { count: 0, data: [], message: 'Data not found', status: 'false' };
					this.loader = false;
					this.cd.markForCheck();
				});
			}
		}, (err) => {
			this.wishLists = { count: 0, data: [], message: 'Data not found', status: 'false' };
			this.loader = false;
			console.error(err);
		}));
	}
}