import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsComponent } from './terms/terms.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SafeHtmlPipe } from './cms.pipe';

@NgModule({
  declarations: [
    TermsComponent,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '', component: TermsComponent,
      }
    ])
  ]
})
export class TermsAndConditionsModule { }
