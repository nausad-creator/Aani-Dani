import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, of, merge } from 'rxjs';
import { take, catchError, mergeMap, map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication.service';
import { Category } from 'src/app/interface';
import { RootService } from 'src/app/root.service';
import { SubSink } from 'subsink';

@Component({
    selector: 'app-cart',
    template: `
  <!-- Header -->
  <header id="header">
    <div class="container">
	    <div class="">		    
	      <div class="menu-content">
	      	<div class="main-menu d-flex align-items-center">
		      <nav class="nav-menu d-none d-lg-block" *ngIf="category$ | async as categories">
		        <ul>
		          <li class="drop-down categorymenu">
		          		<a class="maindrop" href="#"><i class="icofont-navigation-menu mr-2"></i> All Category</a>
		          		<ul>
						  <li><a routerLink="/products" [queryParams]="{page: '0', categoryID: category.categoryID}" *ngFor="let category of categories">{{category.categoryName | titlecase}}</a></li>
		          		</ul>	
		          </li>
		          <li *ngFor="let category of categories"><a routerLink="/products" [queryParams]="{page: '0', categoryID: category.categoryID}">{{category.categoryName | titlecase}}</a></li>		  
		        </ul>
		      </nav><!-- .nav-menu -->			
			</div> 			
		  </div>
		</div>  	  
    </div>
  </header>
  <!-- End Header -->
    <main id="main">
    <section id="cart-section" class="pb-3 pt-4">
        <div class="container">
            <div class="brandcamp"><a href="index.html">Home  &gt;</a> <span> My Cart</span> </div>
            <div class="card mt-3">
                <div class="row m-0 pt-3 pb-3">
                    <div class="col-lg-8">
                        <app-shared-details></app-shared-details>
                    </div>	
                    <div class="col-lg-4 ">
                        <app-shared-billing></app-shared-billing>	
                    </div>
                </div>	
            </div>	
        </div>	
    </section>	

   <app-shared-best-selling></app-shared-best-selling>

</main><!-- End #main -->
  `,
    styles: [
    ]
})
export class CartComponent implements OnInit, OnDestroy, AfterViewInit {
    loginuserID: string;
    forceReload$ = new Subject<void>();
    category$: Observable<Category[]>;
    subs = new SubSink();
    constructor(
        readonly router: Router,
        private root: RootService,
        private auth: AuthenticationService    ) {
        // getting auth user data
        this.subs.add(this.auth.user.subscribe(x => {
            if (x) {
                this.loginuserID = x.restaurantID ? x.restaurantID : '1';
            }
        }));
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
    getCategories = () => {
        return this.root.getCategories('').pipe(map((res) => res), take(1),
            catchError(() => of([]))) as Observable<Category[]>;
    }
    ngOnInit(): void {
        // categories
        const initialCategory$ = this.root.categories as Observable<Category[]>;
        const updatesCategory$ = this.forceReload$.pipe(mergeMap(() => this.getCategories() as Observable<Category[]>));
        this.category$ = merge(initialCategory$, updatesCategory$);
    }
}

