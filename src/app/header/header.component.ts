import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SubSink } from 'subsink';
import { LoginComponent } from './onboarding/login.component';
import { data, tepmOrder } from 'src/app/global';
import { AuthenticationService } from '../authentication.service';
import { RootService } from '../root.service';
import { Observable, of, Subject, merge } from 'rxjs';
import { take, catchError, mergeMap, map, debounceTime, distinctUntilChanged, delay } from 'rxjs/operators';
import { ADDRESS, Language, ProductList } from '../interface';
import { CookieService } from 'ngx-cookie-service';
import { AddressListComponent } from './onboarding/address-list.component';
import { TitleCasePipe } from '@angular/common';
import { selectLanguage, State } from '../reducers';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-header',
	template: `
  	<!-- Top Bar -->
	  <section id="topbar" class="">
	<div class="container">
		<div class="row align-items-center">
			<div class="left-siteinfo col-md-5 col-6 order-2 order-md-1 mr-auto d-flex align-items-center">
				<div>
					<form class="navbar-form searchloacation" [formGroup]="searchForm">
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
				<div class="selectedAddress d-none d-md-block" *ngIf="isLoggedID && defaultAddress">
					<div class="callUs">
						<a class="d-flex cursr"
							(click)="openAddress(address_list, {}, 'false')">
							<div class="callicon align-self-center pt-2"><i
									class="icofont-google-map"></i></div>
							<div class="callnumber"><small>{{'deliver_to' |
									translate}}</small>
								<h6 class="mb-0">{{defaultAddress}}</h6>
							</div>
						</a>
					</div>
				</div>
				<div class="selectedAddress d-md-none" *ngIf="isLoggedID && defaultAddress">
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
					*ngIf="(!isLoggedID && !defaultAddress) || (isLoggedID && !defaultAddress)">
					<a href="tel:920007709" class="d-flex">
						<div class="callicon align-self-center pt-2"><i
								class="icofont-headphone-alt"></i></div>
						<div class="callnumber"><small>{{'call_us' | translate}}</small>
							<h6 class="mb-0">920007709</h6>
						</div>
					</a>
				</div>

				<div class="signbtn" *ngIf="!isLoggedID"><a (click)="openLogin()" data-toggle="modal"
						class="btn user-cart-btrn"><i class="icofont-ui-user"></i></a></div>
				<div class="signbtn" *ngIf="isLoggedID">
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
						<i class="fas fa-shopping-basket"></i><span class="counter-addon"
							*ngIf="cartCount > 0">{{cartCount}}</span></a>
					<span class="cartamount align-self-center" *ngIf="cartTotal > 0">{{(cartTotal |
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
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
	subs = new SubSink();
	isLoggedID: boolean;
	cartCount: number = 0;
	cartTotal: number = 0;
	bsModal: BsModalRef;
	selected: string;
	defaultAddress: string;
	address_list: ADDRESS[];
	searchForm: FormGroup;
	language$: Observable<Language[]> = this.store.select(selectLanguage);
	@Output() search = new EventEmitter<string>();
	@Output() key_up = new EventEmitter<string>();
	@Input() isSearch: boolean;
	constructor(
		public route: ActivatedRoute,
		private modal: BsModalService,
		private auth: AuthenticationService,
		private cd: ChangeDetectorRef,
		private root: RootService,
		private cookie: CookieService,
		private titlecasePipe: TitleCasePipe,
		private fb: FormBuilder,
		private store: Store<State>) {
		// for updating user
		this.subs.add(this.root.update$.subscribe(status => {
			if (status === 'update_header') {
				this.orders();
				this.root.update_user_status$.next('not_found');
			}
		}));
		// global search form
		this.setupForm();
		// language default
		this.root.languages$.subscribe(lang => lang === 'ar' ? this.selected = '2' : this.selected = '1');
	}
	setupForm() {
		this.searchForm = this.fb.group({ preset: this.route.snapshot.queryParams?.q ? this.route.snapshot.queryParams?.q : '' });
		this.searchForm.valueChanges.pipe(map((event) => event), debounceTime(500), distinctUntilChanged(),
			mergeMap((search) => of(search).pipe(delay(100)))).subscribe((input: { preset: string }) => {
				this.key_up.emit(input.preset.trim());
			});
	}
	orders$: Observable<{
		status: string;
		cart: [{
			count: number;
			total: number;
		}]
	}[]> = of([{
		status: 'false',
		cart: [{
			count: 0,
			total: 0
		}]
	}]);
	forceReload$ = new Subject<void>();
	getOrdersTempUpdates = (t: string) => {
		return this.root.ordersTemp(t).pipe(
			map((res) => {
				return [{
					status: 'true',
					cart: res[0].data.map(o => {
						return {
							count: o.orderdetails.filter(f => +f.Qty > 0).length,
							total: o.orderdetails.filter(f => +f.Qty > 0).map(p => +p.Qty.split('.')[0] * +p.productPrice).reduce((a, b) => a + b, 0)
						}
					})
				}]
			}), take(1),
			catchError(() => of([{
				status: 'false',
				cart: [{
					count: 0,
					total: 0
				}]
			}]))) as Observable<{
				status: string;
				cart: [{
					count: number;
					total: number;
				}]
			}[]>;
	}
	getOrdersTempCached = (t: string) => {
		return this.root.ordersHeader(t).pipe(
			map((res) => {
				return [{
					status: 'true',
					cart: res[0].data.map(o => {
						return {
							count: o.orderdetails.filter(f => +f.Qty > 0).length,
							total: o.orderdetails.filter(f => +f.Qty > 0).map(p => +p.Qty.split('.')[0] * +p.productPrice).reduce((a, b) => a + b, 0)
						}
					})
				}]
			}), take(1),
			catchError(() => of([{
				status: 'false',
				cart: [{
					count: 0,
					total: 0
				}]
			}]))) as Observable<{
				status: string;
				cart: [{
					count: number;
					total: number;
				}]
			}[]>;
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
				this.checkStatus();
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
	checkStatus = () => {
		// getting auth user data
		this.subs.add(this.auth.user.subscribe(user => {
			if (user) {
				tepmOrder.loginuserID = user.userID;
				data.loginuserID = user.userID;
				this.isLoggedID = true;
				this.defaultAddress = user.address.filter(a => a.addressIsDefault === 'Yes').length > 0 ? `${user.address.filter(a => a.addressIsDefault === 'Yes')[0].cityName}, ${this.titlecasePipe.transform(user.address.filter(a => a.addressIsDefault === 'Yes')[0].countryName)}-${user.address.filter(a => a.addressIsDefault === 'Yes')[0].addressPincode}` : '';
				this.address_list = user.address;
				this.cd.markForCheck();
			}
			if (!user) {
				tepmOrder.loginuserID = '0';
				data.loginuserID = '0';
				this.isLoggedID = false;
				this.address_list = [];
				this.defaultAddress = '';
				this.cd.markForCheck();
			}
		}));
	}
	ngOnInit(): void {
		this.checkStatus();
		this.orders();
		$(function () {
			$(".dropdown-menu li a").on('click', function () {
				var selText = $(this).html();
				$(this).parents('.input-group-btn').find('.btn-search').html(selText);
			});
		});
	}
	orders = () => {
		const initial$ = this.getOrdersTempCached(JSON.stringify(tepmOrder)) as Observable<{
			status: string;
			cart: [{
				count: number;
				total: number;
			}]
		}[]>;
		const updates$ = this.forceReload$.pipe(mergeMap(() => this.getOrdersTempUpdates(JSON.stringify(tepmOrder)) as Observable<{
			status: string;
			cart: [{
				count: number;
				total: number;
			}]
		}[]>));
		this.orders$ = merge(initial$, updates$);
		this.subs.add(this.orders$.subscribe(r => {
			if (r[0].status === 'true') {
				this.cartCount = r[0].cart[0].count;
				this.cartTotal = r[0].cart[0].total;
				this.cd.markForCheck();
			}
			if (r[0].status === 'false') {
				this.cartCount = 0;
				this.cartTotal = 0;
				this.cd.markForCheck();
			}
		}, () => { throw new Error('Oops! Something went wrong.') }));
	}
	logout = () => {
		// clear all localstorages and redirect to main public page
		tepmOrder.loginuserID = '0';
		data.loginuserID = '0';
		this.isLoggedID = false;
		this.address_list = [];
		this.defaultAddress = '';
		this.auth.logout();
		this.cookie.delete('Temp_Order_ID');
		setTimeout(() => {
			this.root.update_user_status$.next('refresh_or_reload');
			this.root.forceReload();
			this.orders();
		}, 100);
	}
}
