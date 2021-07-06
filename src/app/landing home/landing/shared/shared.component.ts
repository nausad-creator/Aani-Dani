import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Banner, Category, ProductList } from 'src/app/interface';
import { selectHomeBannerList, selectHomeBestSellingList, selectHomeCategoryList, State } from 'src/app/reducers';
@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styles: [
  ], changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharedComponent implements OnInit, OnDestroy {
  banner$: Observable<Banner[]> = this.store.select(selectHomeBannerList);
  products$: Observable<ProductList[]> = this.store.select(selectHomeBestSellingList);
  categories$: Observable<Category[]> = this.store.select(selectHomeCategoryList);

  constructor(
    readonly router: Router,
    private store: Store<State>) { }

  ngOnInit(): void {
    this.jquery();
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
