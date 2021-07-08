import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RootService } from './root.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { CategoriesEffects } from './effects/categories.effects';
import { HomeEffects } from './effects/home.effects';
import { ProductsEffects } from './effects/products-list.effects';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { HeaderModule } from './header/header.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';

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
	  NgxSkeletonLoaderModule,
    ToastrModule.forRoot(
        {
          positionClass: 'toast-center-center',
          timeOut: 3000,
          preventDuplicates: true,
          maxOpened: 1,
          easeTime: 0,
        }),
	  StoreModule.forRoot(reducers, { metaReducers }),
	  !environment.production ? StoreDevtoolsModule.instrument() : [],
	  EffectsModule.forRoot([ProductsEffects, CategoriesEffects, HomeEffects])
  ],
  providers: [RootService],
  bootstrap: [AppComponent]
})
export class AppModule { }
