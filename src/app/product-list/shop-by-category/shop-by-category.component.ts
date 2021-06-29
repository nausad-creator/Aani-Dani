import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/interface';

@Component({
  selector: 'app-shop-by-category',
  template: `
    <div class="filterLeftContent card" *ngIf="categories">
							<h5 class="mb-0">Shop by Categories</h5>	
							<div class="listcategory" *ngFor="let category of categories">
								<a routerLink="/products" [queryParams]="{page: '0', categoryID: category.categoryID}">{{category.categoryName | titlecase}}</a>
							</div>	
			</div>
  `,
  styles: [
  ]
})
export class ShopByCategoryComponent implements OnInit {
  @Input() categories: Category[] = []
  constructor() { }

  ngOnInit(): void {
  }

}
