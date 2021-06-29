import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as $ from 'jquery';
import { CategoryResolver } from './resolver.service';
import { FooterComponent } from './footer/footer.component';
import { TopBarComponent } from './header/top-bar/top-bar.component';
import { HeaderComponent } from './header/header.component';
import { UserModalComponent } from './header/user-modal/user-modal.component';
import { ScrollToTopComponent } from './footer/scroll-to-top/scroll-to-top.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    TopBarComponent,
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
  ],
  providers: [CategoryResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
