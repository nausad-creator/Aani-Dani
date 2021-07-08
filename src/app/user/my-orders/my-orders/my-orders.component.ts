import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  template: `
    <!--start Listing area-->
    <section id="product-list-section" class="pb-3 pt-4">
		<div class="container">
			<div class="row">			
				<div class="col-lg-3 col-md-4">
					<div class="Mobilefilter">
						<a href="#" class="FilterHandale"><i class="icofont-filter"></i> Filter </a>
					</div>	
					<div class="filterSection">
						<div class="filterLeftContent card">
							<h5 class="mb-0">Order Placed</h5>	
							<div class="listcategory">
								<a href="#">Last 30 days</a>
								<a href="#">Last 60 days</a>
								<a href="#">Last 90 days</a>
								<a href="#">Last 1 year</a>
							</div>	
						</div>
						<div class="filterLeftContent mt-3 card">
							<h5 class="mb-0 pb-2">Store Name</h5>
							<div class="searchStore">
								<span class="search_addons"><i class="fas fa-search"></i></span>
								<input type="text" class="form-control bg-white" placeholder="Search">
							</div>	
							<div class="listcategory">
								<a href="#">Al Nahdah</a>
								<a href="#">Uthman</a>
								<a href="#">Al Naeem</a>
								<a href="#">Ash Shati</a>
								<a href="#">Baghdadiyah</a>
							</div>	
						</div>
						<div class="filterLeftContent mt-3 card">
							<h5 class="mb-0">Order Type</h5>	
							<div class="listcategory">
								<a href="#">Order Type 1</a>
								<a href="#">Order Type 2</a>
								<a href="#">Order Type 3</a>
							</div>	
						</div>

					</div>
					<br>
				</div>
				
				<div class="lefprolist mb-3 col-lg-9 col-md-8">	
					<div class="category_slider card">
						<div class="card-header bg-white">
					        <div class="section-title row pb-0">
							  <div class="col-md-6">		
					          	<div class="brandcamp"><a href="index.html">Home > </a> <span> My Orders</span> </div>
							  </div>
							 				  	
					        </div>
				        </div>

				        <div class="orderDetailSection">
				        	<div class="orderDetailList">
				        		<div class="headerOrder form-row m-0 align-items-center">
				        			<div class="col-md-3 col-6">
				        				<p class="mb-0">Order Placed <br> 24 Aug 2020</p>
				        			</div>	
				        			<div class="col-md-3 col-6">
				        				<p class="mb-0">Total <br> 180.00 SR</p>
				        			</div>
				        			<div class="col-md-6 text-md-right mt-2 mt-md-0">
				        				<p class="mb-0">Order # 403-6007027-2138715</p>
				        				<div class="linksOrde">
				        					<a class="mr-3" href="order-details.html">Order Details</a>
				        					<a href="#">Invoice</a>
				        				</div>	
				        			</div>
				        		</div>	
				        		<div class="bodyOrder form-row m-0 align-items-center">
				        			<div class="col-md-2 col-4">
				        				<div class="smImg"><img src="assets/images/product-3.jpg" alt="product"></div>
				        			</div>	
				        			<div class="col-md-5 col-8">
				        				<p class="mb-0">Graduation Cake - Chocolate</p>
				        				<p class="mb-0 qty">1 kg x 1 qty</p>
				        				<h6 class="mb-0"><b>180.00 SR</b></h6>
				        			</div>
				        			<div class="col-md-5 text-md-right">
				        				<p class="mb-0">Delivery Expect by 20 Aug 2020</p>
				        				<p class="mb-0">Your order has been placed</p>
				        				<div class="linksOrde pt-2">
				        					<button type="button" class="btn btn-outline-secondary m-1">Track Order</button>
				        					<button type="button" class="btn btn-outline-secondary m-1">Reorder</button>
				        				</div>	
				        			</div>
				        		</div>
				        	</div>

				        	<div class="orderDetailList">
				        		<div class="headerOrder form-row m-0 align-items-center">
				        			<div class="col-md-3 col-6">
				        				<p class="mb-0">Order Placed <br> 20 Aug 2020</p>
				        			</div>	
				        			<div class="col-md-3 col-6">
				        				<p class="mb-0">Total <br> 392.62 SR</p>
				        			</div>
				        			<div class="col-md-6 text-md-right mt-2 mt-md-0">
				        				<p class="mb-0">Order # 403-6007027-2138715</p>
				        				<div class="linksOrde">
				        					<a class="mr-3" href="order-details.html">Order Details</a>
				        					<a href="#">Invoice</a>
				        				</div>	
				        			</div>
				        		</div>	
				        		<div class="bodyOrder form-row m-0 align-items-center">
				        			<div class="col-md-2 col-4">
				        				<div class="smImg"><img src="assets/images/product-6.jpg" alt="product"></div>
				        			</div>	
				        			<div class="col-md-5 col-8">
				        				<p class="mb-0">Red Velvet</p>
				        				<p class="mb-0 qty">1 kg x 1 qty</p>
				        				<h6 class="mb-0"><b>180.00 SR</b></h6>
				        			</div>
				        			<div class="col-md-5 text-md-right">
				        				<p class="mb-0">Delivery Expect by 20 Aug 2020</p>
				        				<p class="mb-0">Your Shipment cancelled</p>
				        			</div>
				        		</div>
				        		<div class="bodyOrder form-row m-0 align-items-center">
				        			<div class="col-md-2 col-4">
				        				<div class="smImg"><img src="assets/images/product-3.jpg" alt="product"></div>
				        			</div>	
				        			<div class="col-md-5 col-8">
				        				<p class="mb-0">Graduation Cake - Chocolate</p>
				        				<p class="mb-0 qty">1 kg x 1 qty</p>
				        				<h6 class="mb-0"><b>180.00 SR</b></h6>
				        			</div>
				        			<div class="col-md-5 text-md-right"></div>				        		
				        		</div>
				        		<div class="linksOrde p-3 btnReturn text-right">
		        					<button type="button" class="btn btn-outline-secondary m-1">Returned</button>
		        				</div>		
				        	</div>
				        </div>	
					</div>				
				</div>
			</div>	
		</div>		
		
    </section>
    <!--end Listing area-->
  `,
  styles: [
  ]
})
export class MyOrdersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
