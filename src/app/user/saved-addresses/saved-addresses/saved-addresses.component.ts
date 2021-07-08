import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saved-addresses',
  template: `
    <div class="tab-pane fade show active" id="SavedAddresses" role="tabpanel" aria-labelledby="profile-tab">
						 		<div class="titleAccount">
						  			<h5>Saved Address (2)</h5>						  			
						  		</div>
						  		<div class="addresDisplay">
						  			<div class="addresItem pt-3">
						  				<div class="d-flex">
								  			<h6 class=""><b>Home</b></h6>
								  			<div class="iconEdit ml-auto text-success"><i class="icofont-check"></i> <small>Default</small></div>
								  		</div>
								  		<p>3876 Ibn Aram Riyadh, Riyadh Province <br>Saudi Arabia 12486 </p>
								  		<a href="#" class="SaveAddress">Edit</a>
						  			</div>

						  			<div class="addresItem pt-3">
						  				<div class="d-flex">
								  			<h6 class=""><b>Office</b></h6>
								  			
								  		</div>
								  		<p>3876 Ibn Aram Riyadh, Riyadh Province <br>Saudi Arabia 12486 </p>
								  		<div>
								  			<a href="#" class="mr-3 SaveAddress">Edit</a>
								  			<a href="#">Mark as Default</a>
								  		</div>
								  		<br>
								  		<div class="pt-3"><button type="button" class="btn btn-them btn-md SaveAddress">+ Add New Address</button></div>
						  			</div>
						  		</div>	
						 	</div>
							 <app-shared-address><app-shared-address>
  `,
  styles: [
  ]
})
export class SavedAddressesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
	$('.SaveAddress').on('click', function () {
		$('.AddressSidebar').addClass('opensidebar');
	});
	$('.closeSidebar').on('click', function () {
		$('.AddressSidebar').removeClass('opensidebar');
	});
  }

}
