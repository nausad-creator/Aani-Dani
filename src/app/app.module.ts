import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RootService } from './root.service';
import * as $ from 'jquery';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { CategoriesEffects } from './effects/categories.effects';
import { HomeEffects } from './effects/home.effects';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { HeaderModule } from './header/header.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { CmsEffects } from './effects/cms.effect';
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AuthenticationService } from './authentication.service';
import { LocationService } from './location.service';
import { OthersEffects } from './effects/others.effects';
import { TooltipModule } from 'ng2-tooltip-directive';
import { SeoService } from './seo.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ProductsEffects } from './effects/products.effects';
import { OrdersEffects } from './effects/temp-order.effects';

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		ReactiveFormsModule,
		ModalModule.forRoot(),
		HeaderModule,
		NgProgressModule,
		NgProgressHttpModule,
		FormsModule,
		CarouselModule,
		NgSelectModule,
		NgxPaginationModule,
		LazyLoadImageModule,
		TooltipModule,
		NgxSkeletonLoaderModule.forRoot({ animation: 'progress' }),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		}),
		ToastrModule.forRoot(
			{
				positionClass: 'toast-center-center',
				timeOut: 3000,
				preventDuplicates: true,
				maxOpened: 1,
				easeTime: 0,
			}),
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyAV0j-imLFwoEcRaCTHDVl0o9Tj6Mj7fZM'
		}),
		GooglePlaceModule,
		StoreModule.forRoot(reducers, { metaReducers }),
		!environment.production ? StoreDevtoolsModule.instrument() : [],
		EffectsModule.forRoot([CategoriesEffects, HomeEffects, CmsEffects, OthersEffects, ProductsEffects, OrdersEffects])
	],
	providers: [RootService, AuthenticationService, LocationService, SeoService],
	bootstrap: [AppComponent],
	exports: [TranslateModule],
})
export class AppModule { }
