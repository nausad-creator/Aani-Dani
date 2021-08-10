import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
	declarations: [NotFoundComponent],
	imports: [
		CommonModule,
		TranslateModule,
		RouterModule.forChild([
			{ path: '', component: NotFoundComponent }
		]),
	]
})
export class NotFoundModule { }
