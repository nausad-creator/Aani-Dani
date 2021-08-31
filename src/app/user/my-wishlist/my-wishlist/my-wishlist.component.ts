import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LOAD_INITIAL, SEARCH_NEW_QUERY } from 'src/app/actions/wishlist.action';
import { AuthenticationService } from 'src/app/authentication.service';
import { wishlist } from 'src/app/global';
import { TempCartItems, Wishlist } from 'src/app/interface';
import { selectWishList, State } from 'src/app/reducers';
import { RootService } from 'src/app/root.service';
import { SubSink } from 'subsink';

@Component({
	selector: 'app-my-wishlist',
	template: `
<div class="tab-pane fade show active" id="MyWishlist" role="tabpanel" aria-labelledby="contact-tab">
	<div class="titleAccount">
		<h5>{{(wishLists$ | async)?.count ? ('my_wishlist' | translate) + ' ('+ (+(wishLists$ | async)?.count<10?'0'+(wishLists$ | async)?.count:(wishLists$ | async)?.count) +')' : ('my_wishlist' | translate) + ' ('+ '00' +')'}}</h5>
	</div>
	<div *ngIf="(wishLists$ | async)?.message !== 'initial_load'">
		<app-shared-wishlist (remove_fav)="remove($event)" [wishList]="(wishLists$ | async)?.data" *ngIf="(wishLists$ | async)?.data.length>0"></app-shared-wishlist>
		<div class="mt-3" style="overflow:hidden;" style="margin-bottom: 1rem; min-height: 320px;"
			*ngIf="(wishLists$ | async)?.data.length === 0">
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
	<div *ngIf="(wishLists$ | async)?.message === 'initial_load'">
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
		private store: Store<State>,
		readonly router: Router,
		private root: RootService,
		private auth: AuthenticationService,
		public route: ActivatedRoute) {
		// getting auth user data
		this.subs.add(this.auth.user.subscribe(user => {
			if (user) {
				wishlist.loginuserID = user.userID;
			}
			if (user === null) {
				wishlist.loginuserID = '1';
			}
		}));
		this.subs.add(this.root.update$.subscribe(status => {
			if (status === 'refresh_or_reload') {
				this.cart = JSON.parse(localStorage.getItem('tempCart') ? localStorage.getItem('tempCart') : '[]') as TempCartItems[];
				this.store.dispatch(new SEARCH_NEW_QUERY(JSON.stringify(wishlist)));
			}
		}));
	}
	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
	loader = true;
	subs = new SubSink();
	wishLists$: Observable<{ count: number; data: Wishlist[]; message: string; status: string; }>;
	ngOnInit(): void {
		// query changes
		wishlist.page = '0';
		this.state_wishlist();
		this.store.dispatch(new LOAD_INITIAL(JSON.stringify(wishlist)));
	}
	state_wishlist = () => {
		this.wishLists$ = this.state() as Observable<{ count: number; data: Wishlist[]; message: string; status: string; }>;
	}
	state = () => {
		return this.store.select(selectWishList).pipe(
			map((r) => {
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
							productImage: a.productImage ? a.productImage.split(',')[0] : 'xyz.png',
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
			}),
			catchError(() => of({
				data: [],
				count: 0,
				message: 'No Data Found',
				status: 'false'
			}))) as Observable<{ count: number; data: Wishlist[]; message: string; status: string; }>;
	}
	remove = (productID: string) => {
		this.root.remove_wishlist(JSON.stringify({
			loginuserID: wishlist.loginuserID,
			languageID: wishlist.languageID,
			productID
		})).subscribe(() => this.store.dispatch(new SEARCH_NEW_QUERY(JSON.stringify(wishlist))))
	}
}