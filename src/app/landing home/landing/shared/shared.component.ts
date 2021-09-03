import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Banner, Category, ProductList, TempCartItems } from 'src/app/interface';
import { selectHomeBannerList, selectHomeBestSellingList, selectHomeCategoryList, State } from 'src/app/reducers';
import { RootService } from 'src/app/root.service';
import { SubSink } from 'subsink';
@Component({
	selector: 'app-shared',
	templateUrl: './shared.component.html',
	styles: [
	], changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharedComponent implements OnInit, OnDestroy {
	cart: TempCartItems[] = JSON.parse(localStorage.getItem('tempCart') ? localStorage.getItem('tempCart') : '[]') as TempCartItems[];
	banner$: Observable<Banner[]> = this.store.select(selectHomeBannerList);
	products$: Observable<ProductList[]> = this.store.select(selectHomeBestSellingList).pipe(
		map(list => list.map(a => {
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
				categoryName: a.categoryName,
				isFavorite: a.isFavorite,
				similarproducts: a.similarproducts,
				addedCartCount: this.cart.filter(p => p.productID === a.productID).length > 0 ? this.cart.filter(p => p.productID === a.productID)[0].qty : 0,
			}
		}))
	)
	categories$: Observable<Category[]> = this.store.select(selectHomeCategoryList);
	subs = new SubSink();
	constructor(
		readonly router: Router,
		private store: Store<State>,
		private root: RootService) {
		this.subs.add(this.root.update$.subscribe(status => {
			if (status === 'refresh_or_reload') {
				this.cart = JSON.parse(localStorage.getItem('tempCart') ? localStorage.getItem('tempCart') : '[]') as TempCartItems[];
				this.products$ = this.store.select(selectHomeBestSellingList).pipe(
					map(list => list.map(a => {
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
							categoryName: a.categoryName,
							isFavorite: a.isFavorite,
							similarproducts: a.similarproducts,
							addedCartCount: this.cart.filter(p => p.productID === a.productID).length > 0 ? this.cart.filter(p => p.productID === a.productID)[0].qty : 0,
						}
					}))
				)
			}
		}));
	}
	ngOnInit(): void {
		this.jquery();
	}
	search = (s: string) => {
		this.router.navigate(['/products'], { queryParams: { page: '0', categoryID: '0', categoryName: s, q: s } })
	}
	ngOnDestroy(): void {
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
