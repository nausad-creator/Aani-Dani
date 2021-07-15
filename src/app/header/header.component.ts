import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SubSink } from 'subsink';
import { LoginComponent } from './onboarding/login.component';
import { data, tepmOrder } from 'src/app/global';
import { AuthenticationService } from '../authentication.service';
import { RootService } from '../root.service';
import { Observable, of, Subject, merge } from 'rxjs';
import { take, catchError, mergeMap, map } from 'rxjs/operators';
import { TempOrders } from '../interface';
import { CookieService } from 'ngx-cookie-service';

@Component({
	selector: 'app-header',
	template: `
  	<!-- Top Bar -->
  <section id="topbar" class="">
    <div class="container">
      <div class="row align-items-center">
	      <div class="left-siteinfo col-md-6 mr-auto d-flex align-items-center">
		  	<div class="logo"> <a routerLink='/'><img src="assets/images/logo.png" alt="AaniDani" class="img-fluid"></a>
		  	</div> 
			<div>
				<form class="navbar-form searchloacation">
				  	<div class="searproduct">
				  		<div class="form-group d-flex align-items-center mb-0">
				  			<span class="search_addons"><i class="fas fa-search"></i></span>
				  			<input type="text" class="form-control" name="searchTop" id="searchTop" placeholder="Search products…">	
				  			<a href="#" class="search_btn"><span>Search</span> <i class="fas fa-search"></i></a>  
				  		</div>	
				  	</div>	
				</form>
			</div>		      
	      </div>
	      <div class="right-links col-md-6 d-flex spcial_lins_top justify-content-end">	  	
			<div class="dropdown_language pt-1">
				<select class="form-control custom-select">
					<option value="english">English</option>
					<option value="arabic">Arabic</option>
					<option value="french">French</option>				
				</select>
			</div>
			<div class="callUs">
				<a href="tel:920007709" class="d-flex">
					<div class="callicon align-self-center pt-2"><i class="icofont-headphone-alt"></i></div>
					<div class="callnumber"><small>CALL US</small> <h6 class="mb-0">920007709</h6></div>
				</a>
			</div>
			<div class="signbtn" *ngIf="!isLoggedID"><a (click)="openLogin()" data-toggle="modal" class="btn user-cart-btrn"><i class="icofont-ui-user"></i></a></div>
			<div class="signbtn" *ngIf="isLoggedID">
				<div class="dropdown userDropDwn">
					<a href="#" class="btn user-cart-btrn dropdown-toggle" data-toggle="dropdown">  <i class="icofont-ui-user"></i></a>
					<div class="dropdown-menu customUserMenu">
						<a routerLink="/user" routerLinkActive="active" class="btn"><i class="icofont-ui-user"></i> My Account</a>
						<a routerLink="/user/my-review" routerLinkActive="active" class="btn"><i class="icofont-star"></i> My Reviews</a>
						<a routerLink="/user/my-wishlist" routerLinkActive="active" class="btn"><i class="icofont-heart"></i> My Wishlist</a>
						<a routerLink="/user/notifications" routerLinkActive="active" class="btn"><i class="icofont-notification"></i> Notifications</a>
						<a (click)="logout();" class="btn"><i class="icofont-logout"></i> Logout</a>
					</div>	
				</div>
			</div>
			<div class="cart-topbtn d-flex" *ngIf="orders$ | async as orders">
				<a routerLink="/cart" class="btn user-cart-btrn">
				<i class="fas fa-shopping-basket"></i><span class="counter-addon" *ngIf="orders.length > 0 && orders[0].cart[0].count !== 0">{{orders[0]?.cart[0]?.count}}</span></a>
				<span class="cartamount align-self-center" *ngIf="orders.length > 0 && orders[0].cart[0].total !== 0">{{(orders[0]?.cart[0]?.total | number) + ' SR'}}</span>
			</div>	
	      </div>
      </div>
    </div>
  </section>
  `,
	styles: [
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnChanges {
	subs = new SubSink();
	isLoggedID: boolean;
	bsModal: BsModalRef;
	@Input() update: number;
	constructor(
		private modal: BsModalService,
		private auth: AuthenticationService,
		private cd: ChangeDetectorRef,
		private root: RootService,
		private cookie: CookieService) {
			// for updating user
			this.subs.add(this.root.update$.subscribe(status => {
				if (status === '302') {
				  	this.checkStatus();
					this.root.forceReload();
					this.orders();
					this.root.update_user_status$.next('000');
				}
			  }));
		 }
	orders$: Observable<{
		data: TempOrders[];
		status: string
		message: string
	}[]> = of(null);
	forceReload$ = new Subject<void>();
	getOrdersTempUpdates = (t: string) => {
		return this.root.ordersTemp(t).pipe(
			map((res) => {
				return [{
					status: 'true',
					cart: res[0].data.map(o => {
						return {
							count: o.orderdetails.filter(f => +f.Qty > 0).length,
							total: o.orderdetails.filter(f => +f.Qty > 0).map(p => +p.productPrice).reduce((a, b) => a + b, 0)
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
				data: TempOrders[];
				status: string
				message: string
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
							total: o.orderdetails.filter(f => +f.Qty > 0).map(p => +p.productPrice).reduce((a, b) => a + b, 0)
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
				data: TempOrders[];
				status: string
				message: string
			}[]>;
	}
	ngOnChanges(changes: SimpleChanges): void {
		if (changes.update.currentValue) {
			this.root.forceReload();
			this.orders();
		}
	}
	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
	openLogin = () => {
		this.bsModal = this.modal.show(LoginComponent, { id: 99 });
		this.bsModal.content.event.subscribe((res: { data: string; }) => {
			if (res.data === 'Confirmed') {
				this.checkStatus();
			} else {
				console.error(res.data);
			}
		});
	}
	checkStatus = () => {
		// getting auth user data
		this.subs.add(this.auth.user.subscribe(user => {
			if (user) {
				tepmOrder.loginuserID = user.userID;
				data.loginuserID = user.userID;
				this.isLoggedID = true;
				this.root.ordersTemp(JSON.stringify(tepmOrder)).pipe(
					map((res) => res), take(1),
				).subscribe(r => {
					if (r[0].status === 'true') {
						// tempOrderID is present!!!
						this.cookie.set('Temp_Order_ID', r[0].data.length > 0 ? r[0].data[0].temporderID : '0')
						this.root.update_user_status$.next('200');
					}
					if (r[0].status === 'false') {
						// tempOrderID is present!!!
						this.cookie.set('Temp_Order_ID', '0')
						this.root.update_user_status$.next('200');
					}
				}, err => console.error(err));
				this.cd.markForCheck();
			}
			if (user === null) {
				tepmOrder.loginuserID = '0';
				data.loginuserID = '0';
				this.isLoggedID = false;
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
			data: TempOrders[];
			status: string
			message: string
		}[]>;
		const updates$ = this.forceReload$.pipe(mergeMap(() => this.getOrdersTempUpdates(JSON.stringify(tepmOrder)) as Observable<{
			data: TempOrders[];
			status: string
			message: string
		}[]>));
		this.orders$ = merge(initial$, updates$);
		this.cd.markForCheck();
	}
	logout = () => {
		// clear all localstorages and redirect to main public page
		if (this.subs) {
			this.subs.unsubscribe();
		}
		this.auth.logout();
		this.root.update_user_status$.next('404');
		this.cookie.delete('Temp_Order_ID');
		setTimeout(() => {
			this.checkStatus();
		}, 100);
	}
}
