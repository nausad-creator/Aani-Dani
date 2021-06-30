import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutletComponent } from './router-outlet/router-outlet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    RouterOutletComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule,
    RouterModule.forChild([
      {
        path: '', component: RouterOutletComponent,
        children: [{
            path: '',
            loadChildren: () => import('./landing/landing.module').then((m) => m.LandingModule)
          }]
      }
    ]),
  ]
})
export class LandingModule { }
