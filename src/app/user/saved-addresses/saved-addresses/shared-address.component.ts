import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/authentication.service';
import { USER_RESPONSE, ADDRESS, AddressComponents } from 'src/app/interface';
import { LocationService } from 'src/app/location.service';
import { RootService } from 'src/app/root.service';
import { SubSink } from 'subsink';

@Component({
	selector: 'app-shared-address',
	template: `
    <!--Address Sidebar -->
	<div class="AddressSidebar">
		<div class="Sidebar-content">
			<a (click)="changeQuery()" class="closeSidebar cursr">&times;</a>	
			<h5>{{'save_delivery_address' | translate}}</h5>
			<div id="map" style="height:240px;"></div>
			<form class="text-left form-addree" (ngSubmit)="add ? onClickAdd(addressAddEditForm.getRawValue()) : onClickUpdate(addressAddEditForm.getRawValue())" [formGroup]="addressAddEditForm">	
				<div class="typeAddress">
					<div class="row" *ngIf="address_Type.length > 0">
						<div class="col-4" *ngFor="let item of address_Type"><a (click)="addressAddEditForm.get('addressType').patchValue(item.type); addressAddEditForm.get('addressTitle').patchValue(item.type)" [ngClass]="{'selected': item.type===addressAddEditForm.get('addressType').value}" class="cursr" name="addressType"><i class="icofont-home"></i> {{item.type | translate}}</a></div>
					</div>		
				</div>	
				<div class="form-group">
				<input type="text" id="autoGoogle" formControlName="addressBlockNo" ngx-google-places-autocomplete
                    		[options]='options' #placesRef="ngx-places" (onAddressChange)="handleAddressAdd($event)"
                    		class="form-control bg-white" [placeholder]="'address' | translate">
                    		<small class="text-danger small" *ngIf="addressAddEditForm.controls['addressBlockNo'].hasError('required')">{{'please_enter_address' | translate}}</small>
				</div>
				<div class="form-group">
				<input type="text" formControlName="addressBuildingName" id="House" class="form-control bg-white" [placeholder]="'house_no_flat_no' | translate">
                    		<small class="text-danger small" *ngIf="addressAddEditForm.controls['addressBuildingName'].hasError('required')">{{'please_enter_house_flat' | translate}}</small>
				</div>
				<div class="form-group">
				<input type="text" formControlName="addressLandmark" id="Landmark" class="form-control bg-white" [placeholder]="'landmark' | translate">
                    		<small class="text-danger small" *ngIf="addressAddEditForm.controls['addressLandmark'].hasError('required')">{{'please_enter_landmark' | translate}}</small>
				</div>
				<div class="form-group">
				<input type="text" maxlength="10" id="Mobile" formControlName="addressMobile" class="form-control bg-white" [placeholder]="'mobile_number' | translate">
                    		<small class="text-danger small" *ngIf="addressAddEditForm.controls['addressMobile'].hasError('required')">{{'please_enter_mobile' | translate}}</small>
				<small class="text-danger" *ngIf="addressAddEditForm.controls['addressMobile'].hasError('pattern') && (addressAddEditForm.controls['addressMobile'].dirty || addressAddEditForm.controls['addressMobile'].touched)">{{'please_enter_valid_mobile_number' | translate}}</small>
				</div>
				<div class="pt-3">
                    		<small class="text-danger text-center small" *ngIf="addressAddEditForm.controls['addressType'].hasError('required')">{{'please_select_address_type' | translate}}</small>
				<button type="submit" class="btn btn-them btn-md w-100"  data-toggle="modal"> {{preventAbuse ? ('please_wait...' | translate) : ('save_address_and_proceed' | translate)}}</button>
				</div>																						
			</form>
		</div>	
	</div>
  `,
	styles: [
		`.selected{
            color: #007bff
        }`
	], changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharedAddressComponent implements OnInit, OnChanges, OnDestroy {
	user: USER_RESPONSE;
	@Input() add: boolean;
	@Input() data: ADDRESS;
	@Output() updateAddress: EventEmitter<{ status: number }> = new EventEmitter();
	addressAddEditForm: FormGroup;
	preventAbuse = false;
	options = {
		types: [],
		componentRestrictions: { country: 'SA' }
	};
	address_Type = [
		{
			type: 'home',
			id: '1'
		},
		{
			type: 'work',
			id: '2'
		},
		{
			type: 'other',
			id: '3'
		}
	]
	subs = new SubSink();
	@ViewChild('placesRef') placesRef: GooglePlaceDirective;
	constructor(
		private fb: FormBuilder,
		private toastr: ToastrService,
		private service: AuthenticationService,
		private loc: LocationService,
		private cd: ChangeDetectorRef,
		private root: RootService,
		private auth: AuthenticationService,
		private router: Router,
		private route: ActivatedRoute) {
		this.subs.add(this.service.user.subscribe(user => {
			if (user) {
				this.user = user;
				this.cd.markForCheck();
			}
			if (user === null) {
				this.user = null;
				this.cd.markForCheck();
			}
		}));
	}
	changeQuery = () => {
		this.router.navigate([], {
			relativeTo: this.route,
			queryParams: { tag: 'changed' },
			replaceUrl: true,
			queryParamsHandling: 'merge'
		});
	}
	ngOnDestroy(): void {
	}
	ngOnChanges(changes: SimpleChanges): void {
		if (this.add) {
			this.getCurrentLocation();
		}
		if (!this.add && this.data) {
			this.subs.add(this.loc.getLocationFromLatLng(+this.data.addressLati, +this.data.addressLongi).subscribe(
				(add: { components: AddressComponents[], formatted_address: string }) => {
					if (add.components.length > 0) {
						const formatted = add.formatted_address.split(', ');
						this.map(+this.data.addressLati, +this.data.addressLongi, `<div id="content"><div id="siteNotice"></div>${formatted.length >= 2 ? `${formatted[0]}, ${formatted[1]}` : `${formatted[0]}`} <br /> ${add.components.filter(c => c.types.find(t => t === 'locality'))[0].long_name ? add.components.filter(c => c.types.find(t => t === 'locality'))[0].long_name : ''}</div>`, 18);
						this.addressAddEditForm.get('addressBlockNo').patchValue(formatted.length >= 2 ? `${formatted[0]}, ${formatted[1]}` : `${formatted[0]}`);
						this.addressAddEditForm.get('addressLandmark').patchValue(add.components.filter(c => c.types.find(t => t === 'sublocality'))[0].long_name ? add.components.filter(c => c.types.find(t => t === 'sublocality'))[0].long_name : '');
						this.addressAddEditForm.get('addressPincode').patchValue(add.components.filter(c => c.types.filter(t => t === 'postal_code')[0])[0].long_name ? add.components.filter(c => c.types.filter(t => t === 'postal_code')[0])[0].long_name : '0');
						this.addressAddEditForm.get('cityName').patchValue(add.components.filter(c => c.types.find(t => t === 'locality'))[0].long_name ? add.components.filter(c => c.types.find(t => t === 'locality'))[0].long_name : '');
						this.addressAddEditForm.get('state').patchValue(add.components.filter(c => c.types.find(t => t === 'administrative_area_level_1'))[0].long_name ? add.components.filter(c => c.types.find(t => t === 'administrative_area_level_1'))[0].long_name : '');
						this.addressAddEditForm.get('countryName').patchValue(add.components.filter(c => c.types.find(t => t === 'country'))[0].long_name ? add.components.filter(c => c.types.find(t => t === 'country'))[0].long_name : 'Saudi Arabia');
						this.addressAddEditForm.get('addressLati').patchValue(+this.data.addressLati);
						this.addressAddEditForm.get('addressLongi').patchValue(+this.data.addressLongi);
						this.addressAddEditForm.get('addressID').patchValue(this.data.addressID);
						this.addressAddEditForm.get('addressMobile').patchValue(this.data.addressMobile);
						this.addressAddEditForm.get('addressType').patchValue(this.data.addressType);
						this.addressAddEditForm.get('addressTitle').patchValue(this.data.addressTitle);
						this.addressAddEditForm.get('addressBuildingName').patchValue(this.data.addressBuildingName);
						this.addressAddEditForm.get('addressIsDefault').patchValue(this.data.addressIsDefault === 'Yes' ? 'Yes' : 'No');
						this.cd.markForCheck();
					}
				}, err => console.error(err)));
		}
	}
	handleAddressAdd = (address: Address) => {
		this.subs.add(this.loc.getLocationFromLatLng(address.geometry.location.lat(), address.geometry.location.lng()).subscribe(
			(add: { components: AddressComponents[], formatted_address: string }) => {
				if (add.components.length > 0) {
					const formatted = add.formatted_address.split(', ');
					this.map(address.geometry.location.lat(), address.geometry.location.lng(), `<div id="content"><div id="siteNotice"></div>${formatted.length >= 2 ? `${formatted[0]}, ${formatted[1]}` : `${formatted[0]}`} <br /> ${add.components.filter(c => c.types.find(t => t === 'locality'))[0].long_name ? add.components.filter(c => c.types.find(t => t === 'locality'))[0].long_name : ''}</div>`, 18);
					this.addressAddEditForm.get('addressBlockNo').patchValue(formatted.length >= 2 ? `${formatted[0]}, ${formatted[1]}` : `${formatted[0]}`);
					this.addressAddEditForm.get('addressLandmark').patchValue(add.components.filter(c => c.types.find(t => t === 'sublocality'))[0].long_name ? add.components.filter(c => c.types.find(t => t === 'sublocality'))[0].long_name : '');
					this.addressAddEditForm.get('addressPincode').patchValue(add.components.filter(c => c.types.filter(t => t === 'postal_code')[0])[0].long_name ? add.components.filter(c => c.types.filter(t => t === 'postal_code')[0])[0].long_name : '0');
					this.addressAddEditForm.get('cityName').patchValue(add.components.filter(c => c.types.find(t => t === 'locality'))[0].long_name ? add.components.filter(c => c.types.find(t => t === 'locality'))[0].long_name : '');
					this.addressAddEditForm.get('state').patchValue(add.components.filter(c => c.types.find(t => t === 'administrative_area_level_1'))[0].long_name ? add.components.filter(c => c.types.find(t => t === 'administrative_area_level_1'))[0].long_name : '');
					this.addressAddEditForm.get('countryName').patchValue(add.components.filter(c => c.types.find(t => t === 'country'))[0].long_name ? add.components.filter(c => c.types.find(t => t === 'country'))[0].long_name : 'Saudi Arabia');
					this.addressAddEditForm.get('addressLati').patchValue(address.geometry.location.lat());
					this.addressAddEditForm.get('addressLongi').patchValue(address.geometry.location.lng());
					this.cd.markForCheck();
				}
			}, err => console.error(err)));
	}
	async ngOnInit(): Promise<void> {
		this.intialize();
	}
	getCurrentLocation = () => {
		this.loc.get().subscribe((res: { add: { components: AddressComponents[], formatted_address: string }; position_latitude: number; position_longitude: number; }) => {
			if (res.add.components.length > 0) {
				const formatted = res.add.formatted_address.split(', ');
				this.map(res.position_latitude, res.position_longitude, `<div id="content"><div id="siteNotice"></div>${formatted.length >= 2 ? `${formatted[0]}, ${formatted[1]}` : `${formatted[0]}`} <br /> ${res.add.components.filter(c => c.types.find(t => t === 'locality'))[0].long_name ? res.add.components.filter(c => c.types.find(t => t === 'locality'))[0].long_name : ''}</div>`, 18);
				this.addressAddEditForm.get('addressBlockNo').patchValue(formatted.length >= 2 ? `${formatted[0]}, ${formatted[1]}` : `${formatted[0]}`);
				this.addressAddEditForm.get('addressLandmark').patchValue(res.add.components.filter(c => c.types.find(t => t === 'sublocality'))[0].long_name ? res.add.components.filter(c => c.types.find(t => t === 'sublocality'))[0].long_name : '');
				this.addressAddEditForm.get('addressPincode').patchValue(res.add.components.filter(c => c.types.filter(t => t === 'postal_code')[0])[0].long_name ? res.add.components.filter(c => c.types.filter(t => t === 'postal_code')[0])[0].long_name : '0');
				this.addressAddEditForm.get('cityName').patchValue(res.add.components.filter(c => c.types.find(t => t === 'locality'))[0].long_name ? res.add.components.filter(c => c.types.find(t => t === 'locality'))[0].long_name : '');
				this.addressAddEditForm.get('state').patchValue(res.add.components.filter(c => c.types.find(t => t === 'administrative_area_level_1'))[0].long_name ? res.add.components.filter(c => c.types.find(t => t === 'administrative_area_level_1'))[0].long_name : '');
				this.addressAddEditForm.get('countryName').patchValue(res.add.components.filter(c => c.types.find(t => t === 'country'))[0].long_name ? res.add.components.filter(c => c.types.find(t => t === 'country'))[0].long_name : 'Saudi Arabia');
				this.addressAddEditForm.get('addressLati').patchValue(res.position_latitude);
				this.addressAddEditForm.get('addressLongi').patchValue(res.position_longitude);
				this.cd.markForCheck();
			}
		}, err => console.error(err));
	}
	intialize = () => {
		this.addressAddEditForm = this.fb.group({
			loginuserID: [this.user.userID],
			languageID: [this.user.languageID],
			addressID: [''],
			addressTitle: [''],
			addressBuildingName: [''],
			addressBlockNo: [''],
			addressIsDefault: [this.user.address.length === 0 ? 'Yes' : 'No'],
			addressMobile: ['', Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
			addressStreetName: [''],
			addressLongi: [''],
			addressLati: [''],
			houseNoFlatNo: [''],
			addressLandmark: [''],
			addressPincode: [''],
			state: [''],
			cityName: [''],
			addressType: [''],
			countryName: [''],
			countryID: ['1']
		});
	}
	// on click update
	onClickAdd = (post: {
		addressBlockNo: string;
		houseNoFlatNo: string;
		addressLandmark: string;
		addressMobile: string;
		addressType: string;
	}) => {
		if (!this.checkControlPost(post)) {
			this.markFormTouched(this.addressAddEditForm);
			if (this.addressAddEditForm.valid && this.findInvalidControls().length === 0) {
				this.preventAbuse = true;
				this.add_address(JSON.stringify(post)).then((res: ADDRESS) => {
					if (res) {
						this.user.address.push(res)
						if (localStorage.getItem('USER_LOGGED')) {
							localStorage.setItem('USER_LOGGED', JSON.stringify(this.user));
						}
						if (sessionStorage.getItem('USER_LOGGED')) {
							sessionStorage.setItem('USER_LOGGED', JSON.stringify(this.user));
						}
						this.changeQuery();
						this.auth.updateUser(this.user);
						this.clearControls();
						setTimeout(() => {
							$('.AddressSidebar').removeClass('opensidebar');
							this.updateAddress.emit({ status: 200 });
							this.preventAbuse = false;
							this.toastr.success('Address added successfully');
							this.cd.markForCheck();
							this.getCurrentLocation();
							this.root.update_user_status$.next('update_header');
							this.addressAddEditForm.get(`loginuserID`).patchValue(this.user.userID);
							this.addressAddEditForm.get(`languageID`).patchValue(this.user.languageID);
							this.addressAddEditForm.get(`countryName`).patchValue('Saudi Arabia');
							this.addressAddEditForm.get(`countryID`).patchValue('1');
							this.addressAddEditForm.get(`addressIsDefault`).patchValue('No');
						}, 500);
					}
					if (!res) {
						this.preventAbuse = false;
						this.cd.markForCheck();
						this.toastr.error('some error occured, please try again later', '', { positionClass: 'toast-center-center-error' });
					}
				}).catch((error) => {
					console.error(error);
					this.preventAbuse = false;
					this.cd.markForCheck();
					this.toastr.error('some error occured, please try again later', '', {
						positionClass: 'toast-center-center-error',
					});
				});
			}
		}
	}
	// on click update
	onClickUpdate = (post: {
		addressBlockNo: string;
		houseNoFlatNo: string;
		addressLandmark: string;
		addressMobile: string;
		addressType: string;
	}) => {
		if (!this.checkControlPost(post)) {
			this.markFormTouched(this.addressAddEditForm);
			if (this.addressAddEditForm.valid && this.findInvalidControls().length === 0) {
				this.preventAbuse = true;
				this.update(JSON.stringify(post)).then((res: ADDRESS) => {
					if (res) {
						const index = this.user.address.indexOf(this.user.address.filter(r => r.addressID === this.data.addressID)[0], 0);
						this.user.address.splice(index, 1);
						this.user.address.push(res)
						if (localStorage.getItem('USER_LOGGED')) {
							localStorage.setItem('USER_LOGGED', JSON.stringify(this.user));
						}
						if (sessionStorage.getItem('USER_LOGGED')) {
							sessionStorage.setItem('USER_LOGGED', JSON.stringify(this.user));
						}
						this.clearControls();
						this.auth.updateUser(this.user);
						setTimeout(() => {
							$('.AddressSidebar').removeClass('opensidebar');
							this.updateAddress.emit({ status: 200 })
							this.preventAbuse = false;
							this.toastr.success('Address updated successfully');
							this.cd.markForCheck();
							this.root.update_user_status$.next('update_header');
							this.addressAddEditForm.get(`loginuserID`).patchValue(this.user.userID);
							this.addressAddEditForm.get(`languageID`).patchValue(this.user.languageID);
							this.addressAddEditForm.get(`countryName`).patchValue('Saudi Arabia');
							this.addressAddEditForm.get(`countryID`).patchValue('1');
							this.addressAddEditForm.get(`addressIsDefault`).patchValue('No');
						}, 500);
					}
					if (!res) {
						this.preventAbuse = false;
						this.cd.markForCheck();
						this.toastr.error('some error occured, please try again later', '', { positionClass: 'toast-center-center-error' });
					}
				}).catch((error) => {
					console.error(error);
					this.preventAbuse = false;
					this.cd.markForCheck();
					this.toastr.error('some error occured, please try again later', '', {
						positionClass: 'toast-center-center-error',
					});
				});
			}
		}
	}
	clearControls = () => {
		Object.keys(this.addressAddEditForm.getRawValue()).forEach((key: string) => {
			this.addressAddEditForm.get(`${key}`).patchValue('');
			if (this.addressAddEditForm.get(`${key}`).validator) {
				const validator = this.addressAddEditForm.get(`${key}`).validator({} as AbstractControl);
				if (validator && validator.required) {
					this.addressAddEditForm.get(`${key}`).clearValidators();
					this.addressAddEditForm.get(`${key}`).updateValueAndValidity({ onlySelf: true });
				}
			}
		});
	}
	add_address = (post: string) => {
		return new Promise((resolve, reject) => {
			this.service.addAddress(post).subscribe((res) => {
				if (res.status === 'true') {
					resolve(res.data[0]);
				} else {
					reject(res.message);
				}
			}, () => reject('Error occured'));
		});
	}
	update = (post: string) => {
		return new Promise((resolve, reject) => {
			this.service.editAddress(post).subscribe((res) => {
				if (res.status === 'true') {
					resolve(res.data[0]);
				} else {
					reject(res.message);
				}
			}, () => reject('Error occured'));
		});
	}
	edit_address = (post: string) => {
		return new Promise((resolve, reject) => {
			this.service.addAddress(post).subscribe((res) => {
				if (res.status === 'true') {
					resolve(JSON.stringify(res.data[0]));
				} else {
					reject(res.message);
				}
			}, () => reject('Error occured'));
		});
	}
	checkControlPost = (post: {
		addressBlockNo: string;
		houseNoFlatNo: string;
		addressLandmark: string;
		addressMobile: string;
		addressType: string;
	}) => {
		let invalid = false;
		Object.keys(post).forEach((key: string) => {
			if (key === 'addressBlockNo' && !this.addressAddEditForm.get(`${key}`).value) {
				this.addressAddEditForm.get(`${key}`).setValidators([Validators.required]);
				this.addressAddEditForm.get(`${key}`).updateValueAndValidity({ onlySelf: true });
				return invalid = true;
			}
			if (key === 'addressBuildingName' && !this.addressAddEditForm.get(`${key}`).value) {
				this.addressAddEditForm.get(`${key}`).setValidators([Validators.required]);
				this.addressAddEditForm.get(`${key}`).updateValueAndValidity({ onlySelf: true });
				return invalid = true;
			}
			if (key === 'addressLandmark' && !this.addressAddEditForm.get(`${key}`).value) {
				this.addressAddEditForm.get(`${key}`).setValidators([Validators.required]);
				this.addressAddEditForm.get(`${key}`).updateValueAndValidity({ onlySelf: true });
				return invalid = true;
			}
			if (key === 'addressMobile' && !this.addressAddEditForm.get(`${key}`).value) {
				this.addressAddEditForm.get(`${key}`).setValidators([Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]);
				this.addressAddEditForm.get(`${key}`).updateValueAndValidity({ onlySelf: true });
				return invalid = true;
			}
			if (key === 'addressType' && !this.addressAddEditForm.get(`${key}`).value) {
				this.addressAddEditForm.get(`${key}`).setValidators([Validators.required]);
				this.addressAddEditForm.get(`${key}`).updateValueAndValidity({ onlySelf: true });
				return invalid = true;
			}
		});
		return invalid;
	}
	markFormTouched = (group: FormGroup) => {
		Object.keys(group.controls).forEach((key: string) => {
			const control = group.controls[key];
			if (control instanceof FormGroup) {
				control.markAsTouched();
				this.markFormTouched(control);
			} else {
				control.markAsTouched();
			}
		});
	}
	findInvalidControls = () => {
		const invalid = [];
		const controls = this.addressAddEditForm.controls;
		for (const name in controls) {
			if (controls[name].invalid) {
				invalid.push(name);
			}
		}
		return invalid;
	}
	map = (lat: number, lng: number, contentString?: string, zoom = 4) => {
		var myLatlng = new google.maps.LatLng(lat, lng);
		var myOptions = {
			zoom: zoom,
			center: myLatlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		var map = new google.maps.Map(document.getElementById("map"), myOptions);
		var infowindow = new google.maps.InfoWindow({
			content: contentString ? contentString : ''
		});
		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			icon: 'assets/images/map-marker.png',
			title: "Address"
		});
		google.maps.event.addListener(marker, 'click', function () {
			infowindow.open(map, marker);
		});
	}
}
