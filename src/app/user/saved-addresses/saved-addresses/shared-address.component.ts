import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-shared-address',
    template: `
    <!--Address Sidebar -->
	<div class="AddressSidebar">
		<div class="Sidebar-content">
			<a class="closeSidebar" href="javascript:voild(0)">&times;</a>	
			<h5>Save Delivery Address</h5>
			<div id="map" style="height:250px;"></div>
			<form class="text-left form-addree">	
				<div class="typeAddress">
					<div class="row">
						<div class="col-4"><a href="#"><i class="icofont-home"></i> Home</a></div>
						<div class="col-4"><a href="#"><i class="icofont-briefcase"></i> Work</a></div>
						<div class="col-4"><a href="#"><i class="icofont-google-map"></i> Other</a></div>
					</div>		
				</div>	

				<div class="form-group">
					<input type="text" id="Address" class="form-control bg-white" placeholder="Address">
				</div>
				<div class="form-group">
					<input type="text" id="House" class="form-control bg-white" placeholder="House No, Flat No">
				</div>
				<div class="form-group">
					<input type="text" id="Landmark" class="form-control bg-white" placeholder="Landmark">
				</div>
				<div class="form-group">
					<input type="text" id="Mobile" class="form-control bg-white" placeholder="Mobile no">
				</div>
				<div class="pt-3">
					<a href="javascript:voil(0)" class="btn btn-them btn-md w-100"  data-toggle="modal" data-target="#SuccesfullOrder"> Save Address & Proceed</a>
				</div>																						
			</form>
		</div>	
	</div>
  `,
    styles: [
    ]
})
export class SharedAddressComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
        var myLatlng = new google.maps.LatLng(19.166333311623656, 72.84795350867314);
        var myOptions = {
            zoom: 14,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        var map = new google.maps.Map(document.getElementById("map"), myOptions);

        var contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            ' Srinivas Tower, 100 Feet <br /> Road,1st Stage, BTM Layout' +
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            icon: 'images/map-marker.png',
            title: "Address"
        });

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });	
    }

}
