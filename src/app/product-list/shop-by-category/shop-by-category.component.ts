import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-by-category',
  template: `
    <div class="filterLeftContent card">
							<h5 class="mb-0">Shop by Categories</h5>	
							<div class="listcategory">
								<a href="#">Chocolates</a>
								<a href="#">Cakes</a>
								<a href="#">Savory</a>
								<a href="#">Choco Pizza</a>
								<a href="#">Macarons</a>
							</div>	
			</div>
  `,
  styles: [
  ]
})
export class ShopByCategoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
