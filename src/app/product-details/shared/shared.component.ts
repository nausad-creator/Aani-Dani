import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shared',
  template: `
    <main id="main">
  	<!--start Listing area-->
    <section id="product-detail-section" class="pb-3 pt-4">
		<div class="container">
			<div class="card">
				<app-details></app-details>
				<app-offers></app-offers> 
		      	<div class="row">
		      		<div class="col-md-8">
		      			<app-descriptions-and-review></app-descriptions-and-review>	
		      		</div>
		      		<div class="col-md-4 borleft">
		      			<app-top-sellings></app-top-sellings>
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
export class SharedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
