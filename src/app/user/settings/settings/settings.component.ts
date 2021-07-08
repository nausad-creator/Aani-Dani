import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  template: `
    <div class="tab-pane fade show active" id="Settings" role="tabpanel" aria-labelledby="contact-tab">
						  		<div class="titleAccount">
						  			<h5>Settings</h5>						  			
						  		</div>
						  		<div class="reviewSection tabSetting">
				      				<ul class="nav nav-tabs" id="myTab" role="tablist">
									  <li class="nav-item">
									    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#ChangePassword" role="tab" aria-controls="home" aria-selected="true">Change Password</a>
									  </li>
									  <li class="nav-item">
									    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#ManageNotifications" role="tab" aria-controls="profile" aria-selected="false">Manage Notifications</a>
									  </li>							  
									</ul>
									<div class="tab-content" id="myTabContent">
									  <div class="tab-pane fade active show" id="ChangePassword" role="tabpanel" aria-labelledby="home-tab">
									  	<div class="pt-3">
									  		<div class="row">
							  					<div class="col-lg-6">
											  		<form action="#" method="post" role="form" class="">
											  			<div class="form-group">
										                    <label for="Change">Change Password</label>
										                    <input type="password" name="Change" class="form-control" id="Change" placeholder="">
										                </div>
										                <div class="form-group">
										                    <label for="New">New Password</label>
										                    <input type="password" name="New" class="form-control" id="New" placeholder="">
										                </div>
										                <div class="form-group">
										                    <label for="Retype">Retype New Password</label>
										                    <input type="password" name="Retype" class="form-control" id="Retype" placeholder="">
										                </div>								            
										                <div class="pt-3 mb-3"><button type="button" class="btn btn-them btn-md" data-toggle="modal" data-target="#RequestOTP">Request OTP</button></div> 
											  		</form>
										  		</div>
										  		<div class="col-lg-6">
										  			<h6>Secure password tips:</h6>
										  			<ul class="pl-3">
										  				<li>Use at least 8 characters, a combination of numbers and letters is best.</li>
										  				<li>Do not use the same password you have used with us previouly.</li>
										  				<li>Use at least 8 characters, a combination of numbers and letters is best.</li>
										  				<li>Do not use the same password you have used with us previouly.</li>
										  			</ul>	
										  		</div>	
									  		</div>
									  	</div>
									  </div>

									  <div class="tab-pane fade" id="ManageNotifications" role="tabpanel" aria-labelledby="profile-tab">
									  	<div class="switchgroup pt-3">
											<div class="swtitem d-flex align-items-center">
												<label for="swc1" class="mb-0"><b>My Orders</b> <p>Latest updates on my orders</p></label>
												<label class="switch ml-auto">
													<input id="swc1" type="checkbox" checked="checked">
													<span class="slider"></span>
												</label>											
											</div>										
											<div class="swtitem d-flex align-items-center">
												<label for="swc2" class="mb-0"><b>Reminders</b> <p>Price Drops, Back in Stock, New Products etc.</p></label>
												<label class="switch ml-auto">
													<input id="swc2" type="checkbox">
													<span class="slider"></span>
												</label>											
											</div>
											<div class="swtitem d-flex align-items-center">
												<label for="swc3" class="mb-0"><b>New Offers</b> <p>Top Details & Offers</p></label>
												<label class="switch ml-auto">
													<input id="swc3" type="checkbox">
													<span class="slider"></span>
												</label>											
											</div>
											<div class="swtitem d-flex align-items-center">
												<label for="swc4" class="mb-0"><b>Feedback & Reviews</b> <p>Ratting & Reviews for your purchase</p></label>
												<label class="switch ml-auto">
													<input id="swc4" type="checkbox" checked="checked">
													<span class="slider"></span>
												</label>											
											</div>											
										</div>	
									  </div>
									</div>
				      			</div>		
						  	</div>
  `,
  styles: [
  ]
})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
