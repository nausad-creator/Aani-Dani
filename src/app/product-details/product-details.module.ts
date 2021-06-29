import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { DescriptionsAndReviewComponent } from './descriptions-and-review/descriptions-and-review.component';
import { TopSellingsComponent } from './top-sellings/top-sellings.component';
import { SharedComponent } from './shared/shared.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OffersComponent } from './offers/offers.component';

@NgModule({
  declarations: [
    DetailsComponent,
    DescriptionsAndReviewComponent,
    TopSellingsComponent,
    SharedComponent,
    OffersComponent
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
export class ProductDetailsModule { }
