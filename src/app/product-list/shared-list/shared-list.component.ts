import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shared-list',
  template: `
    <main id="main">
  	<!--start Listing area-->
    <section id="product-list-section" class="pb-3 pt-4">
		<div class="container">
			<div class="row">			
				<div class="col-lg-3 col-md-4">
					<div class="Mobilefilter">
						<a href="#" class="FilterHandale"><i class="icofont-filter"></i> Filter </a>
					</div>	
					<div class="filterSection">
						<app-shop-by-category></app-shop-by-category>
						<app-filter-by-price></app-filter-by-price>
						<app-filter-by-shape></app-filter-by-shape>
						<app-top-selling></app-top-selling>
					</div>
					<br>
				</div>
				<div class="lefprolist mb-3 col-lg-9 col-md-8">	
					<div class="category_slider card">
						<app-sort-header></app-sort-header>
						<div class="sparetor_title">
				    <h5 class="mb-0">Item (90)</h5>
				    </div>
					<app-items></app-items>
					</div>				
				</div>
			</div>	
		</div>		
    </section>
    <!--end Listing area-->
  </main><!-- End #main -->
  `,
  styles: [
  ]
})
export class SharedListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    jQuery(() => {
			$(".FilterHandale").on('click', function(){
        $(".filterSection").toggleClass("ShowFilter");
        $(this).toggleClass("ShowClose");				 
      });
		})
  }
}
