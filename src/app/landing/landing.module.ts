import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { BestSellingComponent } from './best-selling/best-selling.component';
import { OffersComponent } from './offers/offers.component';
import { MostPopularBestSellerComponent } from './most-popular-best-seller/most-popular-best-seller.component';
import { OurPartnersComponent } from './our-partners/our-partners.component';
import { SharedComponent } from './shared/shared.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    BannerComponent,
    BestSellingComponent,
    OffersComponent,
    MostPopularBestSellerComponent,
    OurPartnersComponent,
    SharedComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '', component: SharedComponent
      },
    ]),
  ]
})
export class LandingModule { }
