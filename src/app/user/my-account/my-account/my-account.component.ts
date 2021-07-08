import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-account',
  template: `
    <div class="tab-pane fade show active" id="ProfileInfo" role="tabpanel" aria-labelledby="home-tab">
						  		<div class="titleAccount d-flex">
						  			<h5>Profile Information</h5>
						  			<div class="iconEdit ml-auto"><a class="cursr" id="EditProfi"><i class="icofont-pencil-alt-2"></i> Edit</a></div>
						  		</div>
						  		<div class="profileContent pt-3">
						  			<form action="#" method="post" role="form" class="ProfileForm NotEditable">
						                <div class="form-row">
						                  <div class="col-md-4 form-group">
						                    <label for="fname">First Name</label>
						                    <input type="text" name="fname" class="form-control" id="fname" placeholder="Shreyansh">
						                  </div>
						                  <div class="col-md-4 form-group">
						                    <label for="lname">Last Name</label>
						                    <input type="text" name="fname" class="form-control" id="lname" placeholder="Singh">
						                  </div>
						                </div>

						                <div class="form-row">
						                	<div class="col-md-4 form-group">
							                    <label for="email">Email Address</label>
							                    <input type="email" class="form-control" name="email" id="email" placeholder="shreyansh@gmail.com">
							                </div>
							                <div class="col-md-4 form-group">
							                    <label for="nationlity">Nationlity</label>
							                    <input type="text" name="nationlity" class="form-control" id="nationlity" placeholder="Saudi Arabia">
							                </div>
							                <div class="col-md-4 form-group">
							                    <label for="date">Date of Birth</label>
							                    <input type="date" name="date" class="form-control" id="date" placeholder="19/07/1976">
							                </div>
						                </div>

						                <div class="form-row">
						                	<div class="col-md-4">
						                		<label for="phone">Mobile Number</label>
						                		<div class="form-row">
						                			<div class="col-md-4 form-group"><input type="text" class="form-control w-100" name="cCode" id="phone" placeholder="AE +96"></div>
						                			<div class="col-md-8 form-group"><input type="text" class="form-control w-100" name="phone" id="phone" placeholder="96996969696"></div>
						                		</div>	
						                	</div>	
						                </div>	

						                <div class=""><button type="button" class="btn btn-them btn-md" id="SaveDetail">Save</button></div>
						            </form>
						  		</div>	
						  	</div>
  `,
  styles: [
  ]
})
export class MyAccountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
	$('#EditProfi').on('click', function(){
	    $('.ProfileForm').removeClass('NotEditable');
	    $(this).addClass('d-none');
	});
	//
	$('#SaveDetail').on('click', function(){
	    $('.ProfileForm').addClass('NotEditable');
	    $('#EditProfi').removeClass('d-none');
	});
  }

}
