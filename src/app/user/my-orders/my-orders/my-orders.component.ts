import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LOAD_INITIAL } from 'src/app/actions/my-orders.action';
import { AuthenticationService } from 'src/app/authentication.service';
import { order } from 'src/app/global';
import { Orders } from 'src/app/interface';
import { select_my_orders, State } from 'src/app/reducers';
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
							<app-shared-order [orders]="(orders$ | async)?.data" *ngIf="(orders$ | async)?.message !== 'initial_load'"></app-shared-order>
							<app-skeleton *ngIf="(orders$ | async)?.message === 'initial_load'"></app-skeleton>
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
		private store: Store<State>,
		readonly router: Router,
		private auth: AuthenticationService,
		public route: ActivatedRoute) {
		// getting auth user data
		this.subs.add(this.auth.user.subscribe(user => {
			if (user) {
				order.loginuserID = user.userID;
			}
			if (user === null) {
				order.loginuserID = '1';
			}
		}));
	}
	preventAbuse: boolean;
	subs = new SubSink();
	orders$: Observable<{ data: Orders[]; message: string; status: string; }> = of(null);
	ngOnInit(): void {
		// query changes
		order.page = '0';
		this.state_wishlist();
		this.store.dispatch(new LOAD_INITIAL(JSON.stringify(order)));
	}
	state_wishlist = () => {
		this.orders$ = this.state() as Observable<{ data: Orders[]; message: string; status: string; }>;
	}
	state = () => {
		return this.store.select(select_my_orders).pipe(
			map((r) => {
				return {
					status: r.status,
					message: r.message,
					data: r.data.map(a => {
						return {
							orderID: a.orderID,
							userID: a.userID,
							orderNo: a.orderNo,
							orderDate: a.orderDate,
							orderBillingAddress: a.orderBillingAddress,
							orderDeliveryAddress: a.orderDeliveryAddress,
							orderDeliveryLat: a.orderDeliveryLat,
							orderDeliveryLong: a.orderDeliveryLong,
							orderDeliveryCharges: a.orderDeliveryCharges,
							statusID: a.statusID,
							orderStatusDate: a.orderStatusDate,
							orderStatusRemark: a.orderStatusRemark,
							orderDiscountCode: a.orderDiscountCode,
							orderDiscount: a.orderDiscount,
							orderWalletAmt: a.orderWalletAmt,
							orderGrossAmt: a.orderGrossAmt,
							orderVAT: a.orderVAT,
							orderNetAmount: a.orderNetAmount,
							orderPaymentMode: a.orderPaymentMode,
							orderDeliveryType: a.orderDeliveryType,
							orderDeliveryDate: a.orderDeliveryDate,
							orderPaymentStatus: a.orderPaymentStatus,
							orderPaymentTransactionID: a.orderPaymentTransactionID,
							orderNotes: a.orderNotes,
							orderRatingPending: a.orderRatingPending,
							userFullName: a.userFullName,
							userMobile: a.userMobile,
							statusName: a.statusName,
							orderdetails: a.orderdetails.map(a => {
								return {
									productID: a.productID,
									categoryID: a.categoryID,
									subcatID: a.subcatID,
									productName: a.productName,
									orderdetailsQty: a.orderdetailsQty,
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
									productCreatedDate: a.productCreatedDate
								}
							}),
							timeline: a.timeline
						}
					})
				}
			}),
			catchError(() => of({
				data: [],
				message: 'No Data Found',
				status: 'false'
			}))) as Observable<{ data: Orders[]; message: string; status: string; }>;
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
	ngAfterViewInit(): void {
		this.jquery();
	}
	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
}