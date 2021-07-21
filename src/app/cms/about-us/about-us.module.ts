import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us/about-us.component';
import { RouterModule } from '@angular/router';
import { SafeHtmlPipe } from './cms.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		AboutUsComponent,
		SafeHtmlPipe
	],
	imports: [
		CommonModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormsModule,
		RouterModule.forChild([
			{
				path: '', component: AboutUsComponent,
			}
		])
	]
})
export class AboutUsModule { }
