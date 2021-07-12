import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
     <!--  Footer  -->
  <footer id="footer">    
    <div class="footer-top">
      <div class="container">
        <div class="row">          
          <div class="col-lg-3 col-md-3 col-6 footer-links">
            <div class="callUs">
				  <a href="tel:920007709" class="d-flex text-white">
					<div class="callicon align-self-center pt-2"><i class="icofont-headphone-alt"></i></div>
					<div class="callnumber"><p class="mb-1">CALL US</p> <h6 class="mb-0">920007709</h6></div>
				</a>
			</div>
          </div>         
          <div class="col-lg-3 col-md-3 col-6 footer-links">
            <div class="callUs">
				<a href="mailto:info@aanidani.com" class="d-flex text-white">
					<div class="callicon align-self-center pt-2"><i class="icofont-envelope"></i></div>
					<div class="callnumber"><p class="mb-1">EMAIL US</p> <h6 class="mb-0">info@aanidani.com</h6></div>
				</a>
			</div>
      </div>
		  <div class="col-lg-3 col-md-6 col-sm-6 footer-links">
            <p class="text-white">FOLLOW US</p>
            <div class="footer-social-menu">
            	<a href="#"><i class="fab fa-facebook-square"></i></a>
            	<a href="#"><i class="fab fa-twitter-square"></i></a>
            	<a href="#"><i class="fab fa-instagram-square"></i></a>
            	<a href="#"><i class="fab fa-snapchat-square"></i></a>
            	<a href="#"><i class="fab fa-pinterest-square"></i></a>
            	<a href="#"><i class="fab fa-youtube-square"></i></a>
            	<a href="#"><i class="fab fa-linkedin-square"></i></a>
            </div>	
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 footer-links">
            <p class="text-white">DOWNLOAD APP</p>
            <div class="downloadbtnGrp">
            	<a href="#"><img src="assets/images/platstore-icon.png" alt="platstore"></a>
            	<a href="#"><img src="assets/images/appstore-icon.png" alt="appstore"></a>
            </div>		
          </div>
        </div>
      </div>
    </div>
	<div class="footerMenu">
		<div class="container">
			<a routerLink="/content/about-us" routerLinkActive="active">About Us</a>
			<a routerLink="/content/privacy-policy" routerLinkActive="active">Privacy Policy</a>
			<a routerLink="/content/terms-and-conditions" routerLinkActive="active">Terms & Conditions</a>
			<a routerLink="/content/contact-us" routerLinkActive="active">Contact Us</a>
			<a routerLink="/content/faqs" routerLinkActive="active">FAQ</a>
			<a href="#">Help</a>
			<a href="#">Support</a>
		</div>	
	</div>	
	<div class="copyright">
    	<div class="container">&copy; 2021 AANI & DANI, All Rights Reserved.</div>             
    </div>
  </footer>
  <!-- End Footer -->
  `,
  styles: [
  ]
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
