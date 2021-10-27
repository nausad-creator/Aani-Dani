import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SubSink } from 'subsink';
import { LoginComponent } from './onboarding/login.component';
import { data, tepmOrder } from 'src/app/global';
import { AuthenticationService } from '../authentication.service';
import { RootService } from '../root.service';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap, map, debounceTime, distinctUntilChanged, delay } from 'rxjs/operators';
import { ADDRESS, Language, ProductList, USER_RESPONSE } from '../interface';
import { CookieService } from 'ngx-cookie-service';
import { AddressListComponent } from './onboarding/address-list.component';
import { TitleCasePipe } from '@angular/common';
import { selectLanguage, selectTempOrdersList, State } from '../reducers';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StoreListComponent } from './onboarding/store-list.component';
import { LoadInitial, SearchNewQuery } from 'src/app/actions/temp-orders.acton';
import { bounceAnimation } from 'angular-animations';

@Component({
	selector: 'app-header',
	template: `
  	<!-- Top Bar -->
	  <section id="topbar" class="">
	<div class="container">
		<div class="row align-items-center">
			<div class="left-siteinfo col-md-5 col-6 order-2 order-md-1 mr-auto d-flex align-items-center">
				<div>
					<form class="navbar-form searchloacation" (ngSubmit)="on_search_button()" [formGroup]="searchForm">
						<div class="searproduct">
							<div class="form-group d-flex align-items-center mb-0">
								<span class="search_addons"><i
										class="fas fa-search"></i></span>
								<input type="text" class="form-control"
									formControlName="preset" name="preset"
									id="searchTop"
									[placeholder]="'search_products' | translate">
								<a (click)="on_search_button()"
									[ngClass]="{'disable-anchor-tag': isSearch}"
									[title]="'search' | translate"
									class="search_btn cursr"><span>{{'search' |
										translate}}</span> <i
										class="fas fa-search"></i></a>
							</div>
						</div>
					</form>
				</div>
				<div class="dropdown_language pt-1">
					<select class="form-control custom-select cursr" [(ngModel)]="selected"
						(change)="onChangeLang($event.target.value === '1' ? 'en' : 'ar')">
						<option class="cursr" [value]="language.languageID"
							*ngFor="let language of language$ | async">
							{{language.languageName}}</option>
					</select>
				</div>
			</div>

			<div class="left-siteinfo col-md-2 order-1 order-md-2">
				<div class="logo text-center"> <a routerLink='/'><img src="assets/images/logo.png" alt="AaniDani"
							class="img-fluid"></a>
				</div>
			</div>

			<div
				class="right-links col-md-5 col-6 order-3 order-md-3 d-flex spcial_lins_top justify-content-end">
				<div class="callUs align-self-center" *ngIf="user && defaultAddress && user?.storeName">
					<a role="button" [delay]="200" placement="bottom" (click)="openStores(user?.stores, user?.address, {}, 'false')" [popover]="user?.storeName" triggers="mouseenter:mouseleave"
						[popoverTitle]="'Store Name'" class="pl-0 pr-md-0 cursr">
						<img src="assets/images/shop.png" alt="store" width="20px;"></a>
				</div>
				<div class="selectedAddres d-none d-md-block" *ngIf="user && defaultAddress">
					<div class="callUs">
						<a class="d-flex cursr"
							(click)="openAddress(user?.address, {}, 'false')">
							<div class="callicon align-self-center pt-2"><i
									class="icofont-google-map"></i></div>
							<div class="callnumber"><small>{{'deliver_to' |
									translate}}</small>
								<h6 class="mb-0">{{defaultAddress}}</h6>
							</div>
						</a>
					</div>
				</div>
				<div class="selectedAddress d-md-none" *ngIf="user && defaultAddress">
					<div class="callUs">
						<a class="d-flex cursr">
							<div class="callicon align-self-center pt-2"><i
									class="icofont-google-map"></i></div>
							<div class="callnumber"><small>{{'deliver_to' |
									translate}}</small>
								<h6 class="mb-0">{{defaultAddress}}</h6>
							</div>
						</a>
					</div>
				</div>
				<div class="callUs"
					*ngIf="(!user && !defaultAddress) || (user && !defaultAddress)">
					<a href="tel:920007709" class="d-flex">
						<div class="callicon align-self-center pt-2"><i
								class="icofont-headphone-alt"></i></div>
						<div class="callnumber"><small>{{'call_us' | translate}}</small>
							<h6 class="mb-0">920007709</h6>
						</div>
					</a>
				</div>

				<div class="signbtn" *ngIf="!user"><a (click)="openLogin()" data-toggle="modal"
						class="btn user-cart-btrn"><i class="icofont-ui-user"></i></a></div>
				<div class="signbtn" *ngIf="user">
					<div class="dropdown userDropDwn">
						<a href="#" class="btn user-cart-btrn dropdown-toggle"
							data-toggle="dropdown"> <i class="icofont-ui-user"></i></a>
						<div class="dropdown-menu customUserMenu">
							<a routerLink="/user" routerLinkActive="active" class="btn"><i
									class="icofont-ui-user"></i> {{'my_account' |
								translate}}</a>
							<a routerLink="/user/my-review" routerLinkActive="active"
								class="btn"><i class="icofont-star"></i> {{'my_reviews'
								| translate}}</a>
							<a routerLink="/user/my-wishlist" routerLinkActive="active"
								class="btn"><i class="icofont-heart"></i>
								{{'my_wishlist' | translate}}</a>
							<a routerLink="/user/my-orders" routerLinkActive="active"
								class="btn"><i class="fa fa-list"></i> {{'my_orders' |
								translate}}</a>
							<a routerLink="/user/notifications" routerLinkActive="active"
								class="btn"><i class="icofont-notification"></i>
								{{'notifications' | translate}}</a>
							<a (click)="logout();" class="btn"><i
									class="icofont-logout"></i> {{'logout' |
								translate}}</a>
						</div>
					</div>
				</div>
				<div class="cart-topbtn d-flex">
					<a routerLink="/cart" class="btn user-cart-btrn">
						<i class="fas fa-shopping-basket" [@bounce]="isUpdated"></i><span class="counter-addon"
							*ngIf="(orders$ | async)?.cart[0]?.count > 0">{{(orders$ | async)?.cart[0]?.count}}</span></a>
					<span class="cartamount align-self-center" *ngIf="(orders$ | async)?.cart[0]?.total > 0">{{((orders$ | async)?.cart[0]?.total |
						number) + ' SR'}}</span>
				</div>
			</div>

		</div>
	</div>
</section>
  <!-- add-address sidebar -->
  <app-shared-add-address></app-shared-add-address>
  `,
	styles: [
		`.disable-anchor-tag { 
			pointer-events: none; 
		}`
	],
	animations: [
		bounceAnimation(),
	], changeDetection: ChangeDetectionStrategy.Default
})
export class HeaderComponent implements OnInit, OnDestroy {
	selected: string;
	isUpdated: boolean;
	subs = new SubSink();
	user: USER_RESPONSE;
	bsModal: BsModalRef;
	searchForm: FormGroup;
	defaultAddress: string;
	@Input() isSearch: boolean;
	@Output() search = new EventEmitter<string>();
	@Output() key_up = new EventEmitter<string>();
	language$: Observable<Language[]> = this.store.select(selectLanguage);
	orders$: Observable<{ status: string; cart: { count: number; total: number; } }[]> = of([{ status: 'false', cart: { count: 0, total: 0 } }]);
	constructor(
		public route: ActivatedRoute,
		private modal: BsModalService,
		private auth: AuthenticationService,
		private root: RootService,
		private cookie: CookieService,
		private titlecasePipe: TitleCasePipe,
		private fb: FormBuilder,
		private store: Store<State>) {
		// for updating user
		this.subs.add(this.root.update$.subscribe(status => {
			if (status === 'update_header') {
				this.animate();
				this.store.dispatch(new SearchNewQuery(JSON.stringify(tepmOrder)));
				this.root.update_user_status$.next('not_found');
			}
		}));
		// user data
		this.subs.add(this.auth.user.subscribe(user => {
			if (user) {
				this.user = user;
				data.loginuserID = user.userID;
				tepmOrder.loginuserID = user.userID;
				this.defaultAddress = user.address.filter(a => a.addressIsDefault === 'Yes').length > 0 ? `${user.address.filter(a => a.addressIsDefault === 'Yes')[0].cityName}, ${this.titlecasePipe.transform(user.address.filter(a => a.addressIsDefault === 'Yes')[0].countryName)}-${user.address.filter(a => a.addressIsDefault === 'Yes')[0].addressPincode}` : '';
			}
			if (!user) {
				this.user = null;
				data.loginuserID = '0';
				this.defaultAddress = '';
				tepmOrder.loginuserID = '0';
			}
		}));
		// global search form
		this.setupForm();
		// language default
		this.root.languages$.subscribe(lang => lang === 'ar' ? this.selected = '2' : this.selected = '1');
	}
	animate = () => {
		this.isUpdated = false;
		setTimeout(() => {
			this.isUpdated = true;
		}, 1);
	}
	ngOnInit(): void {
		this.cart();
		this.store.dispatch(new LoadInitial(JSON.stringify(tepmOrder)));
		$(function () {
			$(".dropdown-menu li a").on('click', function () {
				var selText = $(this).html();
				$(this).parents('.input-group-btn').find('.btn-search').html(selText);
			});
		});
	}
	cart = () => {
		this.orders$ = this.getOrdersTempUpdates() as Observable<{ status: string; cart: { count: number; total: number; } }[]>;
	}
	getOrdersTempUpdates = () => {
		return this.store.select(selectTempOrdersList).pipe(
			map((res) => {
				return {
					status: res.orders$[0].status,
					cart: res.orders$[0].data.map(o => {
						return {
							count: o.orderdetails.filter(f => +f.Qty > 0).length,
							total: o.orderdetails.filter(f => +f.Qty > 0).map(p => +p.Qty.split('.')[0] * +p.productPrice).reduce((a, b) => a + b, 0)
						}
					})
				}
			}),
			catchError(() => of([{
				status: 'false',
				cart: {
					count: 0,
					total: 0
				}
			}]))) as Observable<{
				status: string;
				cart: {
					count: number;
					total: number;
				}
			}[]>;
	}
	setupForm() {
		this.searchForm = this.fb.group({ preset: this.route.snapshot.queryParams?.q ? this.route.snapshot.queryParams?.q : '' });
		this.searchForm.valueChanges.pipe(map((event) => event), debounceTime(500), distinctUntilChanged(),
			mergeMap((search) => of(search).pipe(delay(100)))).subscribe((input: { preset: string }) => {
				this.key_up.emit(input.preset.trim());
			});
	}
	on_search_button = () => {
		if (this.searchForm.get('preset').value) {
			this.search.emit(this.searchForm.get('preset').value.trim());
		}
	}
	onChangeLang = (lang: string) => {
		this.root.update_user_language$.next(lang);
	}
	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
	openLogin = () => {
		const initialState = {
			list: [{
				status: 'Header',
				product: null
			}]
		};
		this.bsModal = this.modal.show(LoginComponent, { id: 99, initialState });
		this.bsModal.content.event.subscribe((res: { data: string; }) => {
			if (res.data === 'Confirmed') {
				this.subs.add(this.auth.user.subscribe(user => {
					if (user) {
						this.user = user;
						data.loginuserID = user.userID;
						tepmOrder.loginuserID = user.userID;
						this.defaultAddress = user.address.filter(a => a.addressIsDefault === 'Yes').length > 0 ? `${user.address.filter(a => a.addressIsDefault === 'Yes')[0].cityName}, ${this.titlecasePipe.transform(user.address.filter(a => a.addressIsDefault === 'Yes')[0].countryName)}-${user.address.filter(a => a.addressIsDefault === 'Yes')[0].addressPincode}` : '';
					}
					if (!user) {
						this.user = null;
						data.loginuserID = '0';
						this.defaultAddress = '';
						tepmOrder.loginuserID = '0';
					}
				}));
			} else {
				console.error(res.data);
			}
		});
	}
	openAddress = (add: ADDRESS[], product?: ProductList, status?: string) => {
		const initialState = {
			list: [{
				status: status,
				product: product,
				address: add
			}]
		};
		this.bsModal = this.modal.show(AddressListComponent, { id: 499, initialState });
	}
	openStores = (stores: {
		storeID: string;
		storeName: string;
	}[], add: ADDRESS[], product?: ProductList, status?: string) => {
		const initialState = {
			list: [{
				status: status,
				product: product,
				address: add,
				stores
			}]
		};
		this.bsModal = this.modal.show(StoreListComponent, { id: 939, initialState });
	}
	logout = () => {
		// clear all localstorages and redirect to main public page
		this.user = null;
		this.auth.logout();
		data.loginuserID = '0';
		this.defaultAddress = '';
		tepmOrder.loginuserID = '0';
		this.cookie.delete('Temp_Order_ID');
		setTimeout(() => {
			this.root.update_user_status$.next('refresh_or_reload');
			this.root.update_user_status$.next('update_header');
			this.root.forceReload();
		}, 100);
	}
}
