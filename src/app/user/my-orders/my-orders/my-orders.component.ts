import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, of, Subject, merge, timer } from 'rxjs';
import { take, catchError, mergeMap, map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication.service';
import { data, dataChange, order } from 'src/app/global';
import { Orders } from 'src/app/interface';
import { RootService } from 'src/app/root.service';
import { SubSink } from 'subsink';

@Component({
	selector: 'app-my-orders',
	template: `
   <!--start Listing area-->
<section id="product-list-section" class="pb-3 pt-4">
	<div class="container">
		<div class="row">
			<div class="col-lg-3 col-md-4">
				<app-side-filter></app-side-filter>
			</div>
			<div class="lefprolist mb-3 col-lg-9 col-md-8">
				<app-shared-order [orders]="ordersList" *ngIf="!loader"></app-shared-order>
				<app-skeleton *ngIf="loader"></app-skeleton>
			</div>
		</div>
	</div>
</section>
<!--end Listing area-->
  `,
	styles: [
	]
})
export class MyOrdersComponent implements OnInit {
	constructor(
		readonly router: Router,
		private root: RootService,
		private auth: AuthenticationService,
		public route: ActivatedRoute,
		private cd: ChangeDetectorRef) {
		// getting auth user data
		this.subs.add(this.auth.user.subscribe(user => {
			if (user) {
				order.loginuserID = user.userID;
				this.cd.markForCheck();
			}
			if (user === null) {
				order.loginuserID = '1';
				this.cd.markForCheck();
			}
		}));
	}
	ngAfterViewInit(): void {
		this.jquery();
	}
	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
	loader = true;
	preventAbuse: boolean;
	subs = new SubSink();
	ordersList: Orders[];
	orders$: Observable<Orders[]> = of(null);
	forceReload$ = new Subject<void>();
	getOrders = (t: string) => {
		return this.root.orders(t).pipe(map((res) => res), take(1),
			catchError(() => of([]))) as Observable<Orders[]>;
	}
	ngOnInit(): void {
		// query changes
		order.page = '0';
		this.orders(JSON.stringify(order));
	}
	onChange = async (category: { categoryID: string, categoryName: string }) => {
		if (category.categoryID !== this.route.snapshot.queryParams.categoryID) {
			// query changes
			this.loader = true;
			dataChange.page = '0';
			dataChange.categoryID = category.categoryID ? category.categoryID : '0';
			dataChange.categoryName = category.categoryName ? category.categoryName : 'null';
			this.orders(JSON.stringify(dataChange));
			// updating query-param
			data.page = '0';
			data.categoryID = category.categoryID ? category.categoryID : '0';
			data.categoryName = category.categoryName ? category.categoryName : 'null';
			const queryParams: Params = { page: '0', categoryID: category.categoryID, categoryName: category.categoryName };
			this.router.navigate([],
				{
					relativeTo: this.route,
					queryParams: queryParams,
					queryParamsHandling: 'merge', // remove to replace all query params by provided
				});
		}
	}
	orders = (temp: string) => {
		// products
		const initial$ = this.getOrders(temp) as Observable<Orders[]>;
		const updates$ = this.forceReload$.pipe(mergeMap(() => this.getOrders(temp) as Observable<Orders[]>));
		this.orders$ = merge(initial$, updates$);
		this.subs.add(this.orders$.subscribe((res: Orders[]) => {
			if (res) {
				timer(500).subscribe(() => {
					this.ordersList = res;
					this.loader = false;
					this.cd.markForCheck();
				});
			}
			if (!res) {
				timer(500).subscribe(() => {
					this.ordersList = [];
					this.loader = false;
					this.cd.markForCheck();
				});
			}
		}, (err) => {
			this.loader = false;
			console.error(err);
		}));
	}
	onFilter = ($temp: string) => {
		this.getOrders(JSON.stringify(data)).subscribe((res: Orders[]) => {
			this.ordersList = res;
			this.preventAbuse = false;
			this.cd.markForCheck();
		}, (err) => {
			console.error(err);
		});
	}
	onSort = ($temp: string) => {
		data.sortBy = $temp ? $temp : '';
		this.getOrders(JSON.stringify(data)).subscribe((res: Orders[]) => {
			this.ordersList = res;
			this.cd.markForCheck();
		}, (err) => {
			console.error(err);
		});
	}
	jquery = () => {
		jQuery(() => {
			// Mobile Navigation
			if ($('.nav-menu').length) {
				var $mobile_nav = $('.nav-menu').clone().prop({
					class: 'mobile-nav d-lg-none'
				});
				$('body').append($mobile_nav);
				$('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
				$('body').append('<div class="mobile-nav-overly"></div>');

				$(document).on('click', '.mobile-nav-toggle', function (e) {
					$('body').toggleClass('mobile-nav-active');
					$('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
					$('.mobile-nav-overly').toggle();
				});

				$(document).on('click', '.mobile-nav .drop-down > a', function (e) {
					e.preventDefault();
					$(this).next().slideToggle(300);
					$(this).parent().toggleClass('active');
				});

				$(document).on('click', function (e) {
					var container = $(".mobile-nav, .mobile-nav-toggle");
					if (!container.is(e.target.nodeName) && container.has(e.target.nodeName).length === 0) {
						if ($('body').hasClass('mobile-nav-active')) {
							$('body').removeClass('mobile-nav-active');
							$('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
							$('.mobile-nav-overly').fadeOut();
						}
					}
				});
			} else if ($(".mobile-nav, .mobile-nav-toggle").length) {
				$(".mobile-nav, .mobile-nav-toggle").hide();
			}
			// Stick the header at top on scroll
			($("#header") as any).sticky({
				topSpacing: 0,
				zIndex: '50'
			});
			// Real view height for mobile devices
			if (window.matchMedia("(max-width: 767px)").matches) {
				($('#hero') as any).css({
					height: $(window).height()
				});
			}
			// filter
			$(".FilterHandale").on('click', function () {
				$(".filterSection").toggleClass("ShowFilter");
				$(this).toggleClass("ShowClose");
			});
		})
	}
}