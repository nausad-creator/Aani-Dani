import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-header',
	template: `
  	<!-- Top Bar -->
  <section id="topbar" class="">
    <div class="container">
      <div class="row align-items-center">
	      <div class="left-siteinfo col-md-6 mr-auto d-flex align-items-center">
		  	<div class="logo"> <a routerLink='/'><img src="assets/images/logo.png" alt="AaniDani" class="img-fluid"></a>
		  	</div> 
			<div>
				<form class="navbar-form searchloacation">
				  	<div class="searproduct">
				  		<div class="form-group d-flex align-items-center mb-0">
				  			<span class="search_addons"><i class="fas fa-search"></i></span>
				  			<input type="text" class="form-control" name="searchTop" id="searchTop" placeholder="Search products…">	
				  			<a href="#" class="search_btn"><span>Search</span> <i class="fas fa-search"></i></a>  
				  		</div>	
				  	</div>	
				</form>
			</div>		      
	      </div>
	      <div class="right-links col-md-6 d-flex spcial_lins_top justify-content-end">	  	
			<div class="dropdown_language pt-1">
				<select class="form-control custom-select">
					<option value="english">English</option>
					<option value="arabic">Arabic</option>
					<option value="french">French</option>				
				</select>
			</div>
			<div class="callUs">
				<a href="tel:920007709" class="d-flex">
					<div class="callicon align-self-center pt-2"><i class="icofont-headphone-alt"></i></div>
					<div class="callnumber"><small>CALL US</small> <h6 class="mb-0">920007709</h6></div>
				</a>
			</div>
			<div class="signbtn">
				<div class="dropdown userDropDwn">
					<a href="#" class="btn user-cart-btrn dropdown-toggle" data-toggle="dropdown">  <i class="icofont-ui-user"></i></a>
					<div class="dropdown-menu customUserMenu">
						<a href="#" class="btn"><i class="icofont-ui-user"></i> My Account</a>
						<a href="#" class="btn"><i class="icofont-star"></i> My Reviews</a>
						<a href="#" class="btn"><i class="icofont-heart"></i> My Wishlist</a>
						<a href="#" class="btn"><i class="icofont-notification"></i> Notifications</a>
						<a href="#" class="btn"><i class="icofont-logout"></i> Logout</a>
					</div>	
				</div>
			</div>
			<div class="cart-topbtn d-flex">
				<a routerLink="/my-cart" class="btn user-cart-btrn"><i class="fas fa-shopping-basket"></i>  <span class="counter-addon">1</span></a>
				<span class="cartamount align-self-center">165.00 SR</span>
			</div>		
	      </div>
      </div>
    </div>
  </section>
  `,
	styles: [
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
	constructor() { }
	ngOnInit(): void {
		$(function () {
			$(".dropdown-menu li a").on('click', function () {
				var selText = $(this).html();
				$(this).parents('.input-group-btn').find('.btn-search').html(selText);
			});
		});
	}
}
