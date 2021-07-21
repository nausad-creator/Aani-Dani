import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { AuthenticationService } from '../authentication.service';
import { data } from 'src/app/global';

@Component({
	selector: 'app-landing',
	template: `
  <!--start Listing area-->
  <section id="product-list-section" class="pb-3 pt-4">
		<div class="container">
			<div class="row">			
				<div class="col-lg-3 col-md-4">
					<div class="Mobilefilter">
						<a href="#" class="FilterHandale"><i class="icofont-filter"></i> Filter </a>
					</div>	
					<div class="filterSection">
						<div class="filterLeftContent card ">
							<h5 class="mb-0" *ngIf="userName">Hey, {{userName | titlecase}}!</h5>	
							<div class="accountTab pb-3">
								<ul class="nav nav-tabs" id="myTab" role="tablist">
								  <li class="nav-item">
								 <a class="nav-link" routerLink="/user/my-account" [routerLinkActiveOptions]="{ exact: true }" routerLinkActive="active"><i class="icofont-ui-user"></i> <span>My Account</span> <i class="icofont-simple-right"></i></a>
								  </li>
								  <li class="nav-item">
								 <a class="nav-link" routerLink="/user/saved-address" routerLinkActive="active"><i class="icofont-address-book"></i> <span>Saved Addresses</span> <i class="icofont-simple-right"></i></a>
								  </li>
								  <li class="nav-item">
								 <a class="nav-link" routerLink="/user/my-orders"><i class="fas fa-box"></i> <span>My Orders</span> <i class="icofont-simple-right"></i></a>
								  </li>
								  <li class="nav-item">
								 <a class="nav-link" routerLink="/user/my-review" [routerLinkActiveOptions]="{ exact: true }" routerLinkActive="active"><i class="icofont-star"></i> <span>My Reviews</span> <i class="icofont-simple-right"></i></a>
								  </li>
								  <li class="nav-item">
								 <a class="nav-link" routerLink="/user/my-wishlist" [routerLinkActiveOptions]="{ exact: true }" routerLinkActive="active"><i class="icofont-heart"></i> <span>My Wishlist</span> <i class="icofont-simple-right"></i></a>
								  </li>
								  <li class="nav-item">
								 <a class="nav-link" routerLink="/user/notifications" [routerLinkActiveOptions]="{ exact: true }" routerLinkActive="active"><i class="fas fa-bell"></i> <span>Notifications</span> <i class="icofont-simple-right"></i></a>
								  </li>
								  <li class="nav-item">
								 <a class="nav-link" routerLink="/user/settings" [routerLinkActiveOptions]="{ exact: true }" routerLinkActive="active"><i class="icofont-settings-alt"></i> <span>Settings</span> <i class="icofont-simple-right"></i></a>
								  </li>
								  <li class="nav-item">
								 <a class="nav-link" routerLink="/user/customer-support" [routerLinkActiveOptions]="{ exact: true }" routerLinkActive="active"><i class="icofont-headphone-alt"></i> <span>Customer Support</span> <i class="icofont-simple-right"></i></a>
								  </li>
								  <li class="nav-item">
								 <a class="nav-link cursr" (click)="logout();" ><i class="icofont-logout"></i> <span>Logout</span> <i class="icofont-simple-right"></i></a>
								  </li>
								</ul>
							</div>
						</div>
					</div>
					<br>
				</div>
				
				<div class="lefprolist mb-3 col-lg-9 col-md-8">	
					<div class="category_slider card">
				  <div class="tab-content accountVived p-3" id="myTabContent">
						  	<router-outlet></router-outlet>
						</div>
					</div>					
				</div>
			</div>	
		</div>		
 </section>
 <!--end Listing area-->
  `,
	styles: [
	], changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent implements OnInit, OnDestroy, AfterViewInit {
	subs = new SubSink();
	isLoggedID: boolean;
	userName: string;
	constructor(
		private auth: AuthenticationService,
		private cd: ChangeDetectorRef) { }
	ngOnInit(): void {
		this.checkStatus();
	}
	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
	ngAfterViewInit(): void {
	}
	checkStatus = () => {
		// getting auth user data
		this.subs.add(this.auth.user.subscribe(user => {
			if (user) {
				data.loginuserID = user.userID
				this.isLoggedID = true;
				this.userName = user.userFullName;
				this.cd.markForCheck();
			}
			if (user === null) {
				data.loginuserID = '0'
				this.isLoggedID = false;
				this.userName = 'undefined';
				this.cd.markForCheck();
			}
		}));
	}
	logout = () => {
		// clear all localstorages and redirect to main public page
		if (this.subs) {
			this.subs.unsubscribe();
		}
		this.auth.logout();
		setTimeout(() => {
			this.checkStatus();
		}, 100);
	}
}

