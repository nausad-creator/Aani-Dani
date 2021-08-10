import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-notifications',
	template: `
    <div class="tab-pane fade show active" id="Notifications" role="tabpanel" aria-labelledby="contact-tab">
						  		<div class="titleAccount">
						  			<h5>{{'notifications' | translate}}</h5>						  			
						  		</div>	
						  		<div class="notificationlist">
									<ul>
										<li>
											<div class="notfi-circle"><i class="fas fa-bell"></i></div>
											<div class="notifi-text">
												<p class="m-0"> lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
												<span>Aug 20, 2020 - 4:50 PM</span>						
											</div>
											<div class="deletebtn ml-auto text-right">
												<a href="#" class="d-block">More Details</a>
												<a href="#" class="text-danger"><i class="fas fa-bell"></i></a>
											</div>
										</li>
										<li>
											<div class="notfi-circle"><i class="fas fa-bell"></i></div>
											<div class="notifi-text">
												<p class="m-0"> lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
												<span>Aug 20, 2020 - 4:50 PM</span>						
											</div>
											<div class="deletebtn ml-auto text-right">
												<a href="#" class="d-block">More Details</a>
												<a href="#" class="text-danger"><i class="fas fa-bell"></i></a>
											</div>
										</li>
										<li>
											<div class="notfi-circle"><i class="fas fa-bell"></i></div>
											<div class="notifi-text">
												<p class="m-0"> lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
												<span>Aug 20, 2020 - 4:50 PM</span>						
											</div>
											<div class="deletebtn ml-auto text-right">
												<a href="#" class="d-block">More Details</a>
												<a href="#" class="text-danger"><i class="fas fa-bell"></i></a>
											</div>
										</li>
										<li>
											<div class="notfi-circle"><i class="fas fa-bell"></i></div>
											<div class="notifi-text">
												<p class="m-0"> lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
												<span>Aug 20, 2020 - 4:50 PM</span>						
											</div>
											<div class="deletebtn ml-auto text-right">
												<a href="#" class="d-block">More Details</a>
												<a href="#" class="text-danger"><i class="fas fa-bell"></i></a>
											</div>
										</li>
										
									</ul>
								</div>	
						  	</div>
  `,
	styles: [
	]
})
export class NotificationsComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

}
