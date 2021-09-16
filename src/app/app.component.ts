import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadHome } from './actions/home.action';
import { State } from './reducers';
import { about_us, filter_sort, home, privacy_policy, search, search_global, terms_conditions } from 'src/app/global';
import { LoadAboutUs, LoadFaqs, LoadPrivacyPolicy, LoadTermsCondition } from './actions/cms.action';
import { LoadCountry, LoadLabels, LoadLanguage, LoadNationality } from './actions/others.action';
import { AuthenticationService } from './authentication.service';
import { SubSink } from 'subsink';
import { USER_RESPONSE } from './interface';
import { RootService } from './root.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { SeoService } from './seo.service';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	animations: [],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
	subs = new SubSink();
	constructor(
		private store: Store<State>,
		private auth: AuthenticationService,
		public root: RootService,
		private cookie: CookieService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private seoService: SeoService,
		private translate: TranslateService,
		@Inject(DOCUMENT) private document: Document) {
		this.checkStatus();
		this.translate.addLangs(['en', 'ar']);
		this.subs.add(this.root.languages$.subscribe(language => {
			if (language) {
				this.translate.setDefaultLang(language);
				this.translate.use(language);
				this.changeCssFile(language);
				localStorage.setItem('lang', language);
			}
		}));
		this.store.dispatch(new LoadLanguage());
		this.store.dispatch(new LoadLabels('1'));
	}
	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
	onActivate = () => {
		window.scroll(0, 0);
	}
	checkStatus = () => {
		this.subs.add(this.auth.user.subscribe(async (user: USER_RESPONSE) => {
			if (user) {
				home.loginuserID = user.userID;
				await this.root.ordersTemp(JSON.stringify({
					orderID: '0',
					loginuserID: user.userID,
					languageID: '1'
				})).toPromise().then(r => {
					if (r[0].status === 'true') {
						if (localStorage.getItem('tempCart')) {
							localStorage.removeItem('tempCart');
						}
						localStorage.setItem('tempCart', JSON.stringify(r[0].data[0].orderdetails.length > 0 ? r[0].data[0].orderdetails.map(c => {
							return {
								productID: c.productID,
								qty: +c.Qty.split('.')[0]
							}
						}) : []));
						this.cookie.set('Temp_Order_ID', r[0].data.length > 0 ? r[0].data[0].temporderID : '0');
					}
					if (r[0].status === 'false') {
						if (localStorage.getItem('tempCart')) {
							localStorage.removeItem('tempCart');
						}
						this.cookie.set('Temp_Order_ID', '0')
						this.root.update_user_status$.next('update_header');
					}
				}).catch(err => console.error(err));
			}
			if (!user) {
				if (localStorage.getItem('tempCart')) {
					localStorage.removeItem('tempCart');
				}
			}
		}));
	}
	async ngOnInit(): Promise<void> {
		// dispatch initial action;
		this.store.dispatch(new LoadHome(JSON.stringify(home)));
		this.store.dispatch(new LoadAboutUs(about_us.code));
		this.store.dispatch(new LoadTermsCondition(terms_conditions.code));
		this.store.dispatch(new LoadFaqs());
		this.store.dispatch(new LoadPrivacyPolicy(privacy_policy.code));
		this.store.dispatch(new LoadNationality(search.code));
		this.store.dispatch(new LoadCountry());
		// detect route changing
		this.subs.add(this.router.events.pipe(filter(e => e instanceof NavigationEnd),
			map((r: {
				id: number;
				url: string;
				urlAfterRedirects: string
			}) => {
				return {
					route: r.urlAfterRedirects,
					activatedRoute: this.activatedRoute
				};
			}), map((route) => {
				if (!route.route.startsWith('/products')) {
					filter_sort.minPrice = '';
					filter_sort.maxPrice = '';
					filter_sort.sortBy = '';
					search_global.searchkeyword = '';
				}
				while (route.activatedRoute.firstChild) {
					route.activatedRoute = route.activatedRoute.firstChild;
				}
				return route.activatedRoute;
			}),
			filter((route) => route.outlet === 'primary'),
			mergeMap((route) => route.data)).subscribe(data => {
				const seoData = data.seo;
				this.seoService.updateTitle(seoData.title);
				this.seoService.updateMetaTags(seoData.metaTags);
			}));
		// scrolling
		jQuery(() => {
			($(window) as any).scroll(() => {
				const windowTop = ($(window) as any).scrollTop() + 1;
				if (windowTop > 50) {
					$('body').addClass('stick-header');
				} else {
					$('body').removeClass('stick-header');
				}
			});
		});
	}
	changeCssFile(lang: string) {
		let htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement;
		let headTag = this.document.getElementsByTagName("head")[0] as HTMLHeadElement;
		let existingLink = this.document.getElementById("langCss") as HTMLLinkElement;
		let bundleName = lang === "ar" ? "arabicStyle.css" : "englishStyle.css";
		htmlTag.dir = lang === "ar" ? "rtl" : "ltr";
		htmlTag.lang = lang === "ar" ? "ar" : "en";
		if (existingLink) {
			existingLink.href = bundleName;
		} else {
			let newLink = this.document.createElement("link");
			newLink.rel = "stylesheet";
			newLink.type = "text/css";
			newLink.id = "langCss";
			newLink.href = bundleName;
			headTag.appendChild(newLink);
		}
	}
}
