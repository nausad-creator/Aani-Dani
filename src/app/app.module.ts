import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { UserModalComponent } from './header/user-modal/user-modal.component';
import { ScrollToTopComponent } from './footer/scroll-to-top/scroll-to-top.component';
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
import { BestSellingsEffects } from './effects/best-sellings.effects';
import { CategoriesEffects } from './effects/categories.effects';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    UserModalComponent,
    ScrollToTopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule,
    NgSelectModule,
    NgxPaginationModule,
	  LazyLoadImageModule,
	  NgxSkeletonLoaderModule,
	  StoreModule.forRoot(reducers, { metaReducers }),
	  !environment.production ? StoreDevtoolsModule.instrument() : [],
	  EffectsModule.forRoot([BestSellingsEffects, CategoriesEffects])
  ],
  providers: [RootService],
  bootstrap: [AppComponent]
})
export class AppModule { }
