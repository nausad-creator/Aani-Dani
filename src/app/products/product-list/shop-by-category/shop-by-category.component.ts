import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/interface';
import { RootService } from 'src/app/root.service';

@Component({
	selector: 'app-shop-by-category',
	template: `
    <div class="filterLeftContent card" *ngIf="categories">
	<h5 class="mb-0">{{'shop_by_categories' | translate}}</h5>	
		<div class="listcategory" *ngFor="let category of categories">
			<a class="cursr" [ngClass]="{'selected': selected===category.categoryID}" (click)="change.emit(category);">{{(root.languages$
											| async) === 'en' ?
											category?.categoryName :
											category?.categoryArabicName}}</a>
			</div>	
	</div>
  `,
	styles: [
	]
})
export class ShopByCategoryComponent implements OnInit {
	@Input() selected: string;
	@Input() categories: Category[] = [];
	@Output() change = new EventEmitter<Category>();

	constructor(public root: RootService) { }

	ngOnInit(): void {
	}
}
