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
					<div class="callnumber"><p class="mb-1">{{'call_us' | translate}}</p> <h6 class="mb-0">920007709</h6></div>
				</a>
			</div>
          </div>         
          <div class="col-lg-3 col-md-3 col-6 footer-links">
            <div class="callUs">
				<a href="mailto:info@aanidani.com" class="d-flex text-white">
					<div class="callicon align-self-center pt-2"><i class="icofont-envelope"></i></div>
					<div class="callnumber"><p class="mb-1">{{'email_us' | translate}}</p> <h6 class="mb-0">info@aanidani.com</h6></div>
				</a>
			</div>
      </div>
		  <div class="col-lg-3 col-md-6 col-sm-6 footer-links">
            <p class="text-white">{{'follow_us' | translate}}</p>
            <div class="footer-social-menu">
            	<a href="https://www.facebook.com/aanidani/" target="_blank"><i class="fab fa-facebook-square"></i></a>
            	<a href="https://twitter.com/aanidani/" target="_blank"><i class="fab fa-twitter-square"></i></a>
            	<a href="https://www.instagram.com/aanidani/" target="_blank"><i class="fab fa-instagram-square"></i></a>
            	<a href="https://www.snapchat.com/add/AANIDANI" target="_blank"><i class="fab fa-snapchat-square"></i></a>
            	<a href="https://www.pinterest.com/aanidani/" target="_blank"><i class="fab fa-pinterest-square"></i></a>
            	<a href="https://www.youtube.com/user/aanidani/videos" target="_blank"><i class="fab fa-youtube-square"></i></a>
            	<a href="https://www.linkedin.com/company/aani-&-dani/" target="_blank"><i class="fab fa-linkedin-square"></i></a>
            </div>	
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 footer-links">
            <p class="text-white">{{'download_app' | translate}}</p>
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
			<a routerLink="/content/about-us" routerLinkActive="active">{{'about_us' | translate}}</a>
			<a routerLink="/content/privacy-policy" routerLinkActive="active">{{'privacy_policy' | translate}}</a>
			<a routerLink="/content/terms-and-conditions" routerLinkActive="active">{{'terms_conditions' | translate}}</a>
			<a routerLink="/content/contact-us" routerLinkActive="active">{{'contact_us' | translate}}</a>
			<a routerLink="/content/faqs" routerLinkActive="active">{{'faq' | translate}}</a>
			<a href="#">{{'help' | translate}}</a>
			<a href="#">{{'support' | translate}}</a>
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
