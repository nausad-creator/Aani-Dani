import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication.service';
import { Category } from 'src/app/interface';
import { selectHomeCategoryList, State } from 'src/app/reducers';
import { SubSink } from 'subsink';

@Component({
	selector: 'app-landing',
	template: `
  <app-header (search)="search($event)"></app-header> <!-- Top Bar -->
  <!-- Header -->
  <header id="header">
    <div class="container">
	    <div class="">		    
	      <div class="menu-content">
	      	<div class="main-menu d-flex align-items-center">
		      <nav class="nav-menu d-none d-lg-block" *ngIf="categories$ | async as categories">
		        <ul>
		          <li *ngFor="let category of categories | slice:0:8"><a routerLink="/products" [queryParams]="{page: '0', categoryID: category?.categoryID, categoryName: category?.categoryName+'_'+category?.categoryArabicName}">{{category?.categoryName | titlecase}}</a></li>		  
		        </ul>
		      </nav><!-- .nav-menu -->			
			</div> 			
		  </div>
		</div>  	  
    </div>
  </header>
  <main id="main">
  <router-outlet (activate)="onActivate()"></router-outlet>
  </main><!-- End #main -->
  <app-footer></app-footer> <!-- Footer Section -->
  <app-scroll-to-top></app-scroll-to-top> <!-- Scroll-to-top Section -->
  `,
	styles: [
	]
})
export class LandingComponent implements OnInit {
	loginuserID: string;
	categories$: Observable<Category[]> = this.store.select(selectHomeCategoryList);
	subs = new SubSink();
	constructor(
		private store: Store<State>,
		readonly router: Router,
		private auth: AuthenticationService) {
		// getting auth user data
		this.subs.add(this.auth.user.subscribe(x => {
			if (x) {
				this.loginuserID = '1';
			}
		}));
	}
	onActivate = () => {
		window.scroll(0, 0);
	}
	ngAfterViewInit(): void {
		jQuery(() => {
			// Mobile Navigation
			if ($('.nav-menu').length) {
				var $mobile_nav = $('.nav-menu').clone().prop({
					class: 'mobile-nav d-lg-none'
				});
				$('body').append($mobile_nav);
				$('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
				$('body').append('<div class="mobile-nav-overly"></div>');

				$(document).on('click', '.mobile-nav-toggle', function () {
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
		});
	}
	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
	ngOnInit(): void {
	}
	search = (s: string) => {
		this.router.navigate(['/products'], { queryParams: { page: '0', categoryID: '0', categoryName: s, q: s } })
	}
}