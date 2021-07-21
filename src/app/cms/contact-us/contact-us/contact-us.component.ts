import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-contact-us',
	template: `
    <!-- ======= Contact Section ======= -->
    <section id="contact" class="contact pb-5 pt-3">
      <div class="container">
        <div class="brandcamp"><a href="index.html">Home  &gt;</a> <span> Contact Us</span> </div>

        <div class="card mt-3 p-3">
          <iframe class="mb-4 mb-lg-0" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621" frameborder="0" style="border:0;width:100%;height:250px;" allowfullscreen></iframe>

          <div class="form-row pt-3">
            <div class="col-lg-6">
              <form action="forms/contact.php" method="post" role="form" class="php-email-form">
                <div class="form-row">
                  <div class="col form-group">
                    <label for="name">Name</label>
                    <input type="text" name="name" class="form-control" id="name" placeholder="" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                    <div class="validate"></div>
                  </div>
                  <div class="col form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" name="email" id="email" placeholder="" data-rule="email" data-msg="Please enter a valid email" />
                    <div class="validate"></div>
                  </div>
                </div>

                <div class="form-row">
                  <div class="col form-group">
                    <label for="email">Phone Number</label>
                    <input type="text" class="form-control" name="phone" id="phone" placeholder="" data-rule="minlen:4" data-msg="Please enter valid number" />
                    <div class="validate"></div>
                  </div>
                  <div class="col form-group">
                    <label for="subject">Subject</label>
                    <input type="text" class="form-control" name="subject" id="subject" placeholder="" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
                    <div class="validate"></div>
                  </div>
                </div>  

                <div class="form-group">
                  <textarea class="form-control" name="message" rows="5" data-rule="required" data-msg="Please write something for us" placeholder="Message"></textarea>
                  <div class="validate"></div>
                </div>

                <div class="mb-3">
                  <div class="loading">Loading</div>
                  <div class="error-message"></div>
                  <div class="sent-message">Your message has been sent. Thank you!</div>
                </div>
                <div class=""><button class="btn btn-them btn-md">Send Message</button></div>
              </form>
            </div>
            <div class="col-lg-1"></div>
            <div class="col-lg-5">
                <div class="contactDetails pt-3">
                  <div class="contactItem d-flex">
                    <div class="iconTit mr-3"><i class="fas fa-phone-alt circleIcon"></i> Helpline Number</div>
                    <div class="ContInfo"> <a href="telto:966968554512">+96 6968554512</a></div>
                  </div> 
                  <div class="contactItem d-flex">
                    <div class="iconTit mr-3"><i class="fas fa-envelope circleIcon"></i> Helpline Email</div>
                    <div class="ContInfo"> <a href="mailto:support@aanidani.com">support@aanidani.com</a></div>
                  </div> 
                  <div class="contactItem d-flex">
                    <div class="iconTit mr-3"><i class="fab fa-whatsapp circleIcon"></i> WhatsApp Number</div>
                    <div class="ContInfo"> <a href="telto:966968558888">+96 6968558888</a></div>
                  </div> 
                  <div class="contactItem d-flex">
                    <div class="iconTit mr-3"><i class="fas fa-map-marker-alt circleIcon"></i> Head Office</div>
                    <div class="ContInfo"> <a href="#">2976 Imam Saud Ibn Abdulaziz Ibn <br> Mohammed Road Branch <br>Al Ezdihar District <br> Unit No 3  <br>RIYADH 12485 - 6162 <br>SAUDI ARIBIA</a></div>
                  </div> 
                  <div class="contactItem d-flex">
                    <div class="iconTit mr-3"><i class="fas fa-clock circleIcon"></i> Opening Hours</div>
                    <div class="ContInfo"> <a href="#">Sunday-Thursday 8:00 am - 5:00 pm <br> Friday & Saturday Close</a></div>
                  </div> 
                </div>  
            </div>

          </div>
        </div>
      </div>
    </section><!-- End Contact Section -->
  `,
	styles: [
	]
})
export class ContactUsComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

}
