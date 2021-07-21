import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-customer-support',
	template: `
    <div class="tab-pane fade show active" id="Support" role="tabpanel" aria-labelledby="contact-tab">
						  		<div class="titleAccount">
						  			<h5>Customer Support</h5>						  			
						  		</div>	

						  		<div class="row">
						  			<div class="col-lg-6">
								  		<form action="#" method="post" role="form" class="">
								  			<div class="form-group">
							                    <label for="fname">Name</label>
							                    <input type="text" name="name" class="form-control" id="name" placeholder="">
							                </div>
							                <div class="form-group">
							                	<label for="Cphone">Contact Number</label>
							                	<input type="text" class="form-control" name="Cphone" id="Cphone" placeholder="">
							                </div>	
							                <div class="form-group">
							                	<label for="Cphone">Select Topic</label>
							                	<select class="form-control custom-select">
							                		<option></option>
							                		<option>Topic 1</option>
							                		<option>Topic 2</option>
							                		<option>Topic 3</option>
							                		<option>Topic 4</option>
							                		<option>Topic 5</option>
							                	</select>	
							                </div>
							                <div class="pt-3 mb-3"><button type="button" class="btn btn-them btn-md" id="SaveDetail">Submit</button></div> 
								  		</form>	
						  			</div>
						  			<div class="col-lg-6">
						  				<p>Reached us for Support</p>
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
						                </div>
						  			</div>	
						  		</div>
						  	</div>	
  `,
	styles: [
	]
})
export class CustomerSupportComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

}
