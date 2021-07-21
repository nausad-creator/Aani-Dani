import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SafeHtmlPipe } from './cms.pipe';

@NgModule({
	declarations: [
		PrivacyPolicyComponent,
		SafeHtmlPipe
	],
	imports: [
		CommonModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormsModule,
		RouterModule.forChild([
			{
				path: '', component: PrivacyPolicyComponent,
			}
		])
	]
})
export class PrivacyPolicyModule { }
