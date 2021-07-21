import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/authentication.service';
import { ADDRESS, USER_RESPONSE } from 'src/app/interface';
import { RootService } from 'src/app/root.service';
import { SubSink } from 'subsink';

@Component({
	selector: 'app-saved-addresses',
	template: `
    <div class="tab-pane fade show active" id="SavedAddresses" role="tabpanel" aria-labelledby="profile-tab" *ngIf="user">
    <div class="titleAccount">
         <h5>Saved Address {{'(' + user.address.length + ')'}}</h5>						  			
     </div>
     <div class="addresDisplay" *ngIf="user.address.length > 0">
         <div class="addresItem pt-3" *ngFor="let address of user.address | myfilterAddress; let last = last;">
             <div class="d-flex">
                 <h6 class=""><b>{{address.addressType | titlecase}}</b></h6>
                 <div *ngIf="address.addressIsDefault === 'Yes'" class="iconEdit ml-auto text-success"><i class="icofont-check"></i> <small>Default</small></div>
             </div>
             <p>{{address.fullAddress}} <br>{{address.cityName + ' ' + address.countryName + ' ' + address.addressPincode}} </p>
             <div>
                 <a (click)="click();add_or_edit=false; data=address" class="mr-3 cursr">Edit</a>
                 <a class="mr-3 cursr" (click)="onMarkAsDefault(address.addressID)" *ngIf="address.addressIsDefault === 'No'">Mark as Default</a>
               <a class="cursr" (click)="onDelete(address.addressID)">Delete</a>
             </div>
             <br *ngIf="last">
             <div *ngIf="last" class="pt-3"><button type="button" (click)="click(); add_or_edit=true" class="btn btn-them btn-md">+ Add New Address</button></div>
         </div>
     </div>	
     <div class="addresDisplay" *ngIf="user.address.length === 0">
        <div class="addresItem pt-3">
            <!-- <div>
                <p class="text-center">No address found.</p>
            </div> -->
            <!-- <br> -->
            <div class="pt-1"><button type="button" (click)="click(); add_or_edit=true" class="btn btn-them btn-md">+ Add New Address</button></div>
        </div>
    </div>	
</div>
<app-shared-address (updateAddress)="update($event)" [add]="add_or_edit" [data]="data"><app-shared-address>
  `,
	styles: [
	], changeDetection: ChangeDetectionStrategy.OnPush
})
export class SavedAddressesComponent implements OnInit {
	user: USER_RESPONSE;
	add_or_edit: boolean;
	data: ADDRESS;
	subs = new SubSink();
	constructor(
		private cd: ChangeDetectorRef,
		private auth: AuthenticationService,
		private toastr: ToastrService,
		private root: RootService,
		private route: ActivatedRoute,
	) { }
	ngOnInit(): void {
		this.update({ status: 200 });
		jQuery(() => {
			$('.closeSidebar').on('click', function () {
				$('.AddressSidebar').removeClass('opensidebar');
			});
		});
		// query changes
		if (this.route.snapshot.queryParams.tag && this.route.snapshot.queryParams.tag === 'add_new') {
			this.add_or_edit = true;
			setTimeout(() => {
				this.click();
			}, 500);
		}
	}
	update = (status: { status: number }) => {
		if (status.status === 200) {
			this.subs.add(this.auth.user.subscribe(user => {
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
	}
	click = () => {
		$('.AddressSidebar').addClass('opensidebar');
	}
	onDelete = (addressID: string) => {
		this.auth.deleteAddress(JSON.stringify({
			addressID: addressID,
			loginuserID: this.user.userID,
			languageID: '1',
		})).subscribe(r => {
			if (r.status === 'true') {
				const index = this.user.address.indexOf(this.user.address.filter(r => r.addressID === addressID)[0], 0);
				this.user.address.splice(index, 1);
				if (localStorage.getItem('USER_LOGGED')) {
					this.auth.updateUser(this.user);
					localStorage.setItem('USER_LOGGED', JSON.stringify(this.user));
				}
				if (sessionStorage.getItem('USER_LOGGED')) {
					this.auth.updateUser(this.user);
					sessionStorage.setItem('USER_LOGGED', JSON.stringify(this.user));
				}
				this.update({ status: 200 });
				this.root.update_user_status$.next('update_header');
				this.toastr.success('address deleted successfully');
			}
		})
	}
	onMarkAsDefault = (addressID: string) => {
		this.auth.setDefault(JSON.stringify({
			addressID: addressID,
			loginuserID: this.user.userID,
			languageID: '1',
		})).subscribe(r => {
			if (r.status === 'true') {
				const list = this.user.address;
				list.map(a => {
					if (a.addressID === addressID) {
						a.addressIsDefault = 'Yes';
					} else {
						a.addressIsDefault = 'No';
					}
				});
				const index = this.user.address.indexOf(this.user.address.filter(r => r.addressID === addressID)[0], 0);
				if (localStorage.getItem('USER_LOGGED')) {
					this.user.address = list;
					this.auth.updateUser(this.user);
					localStorage.setItem('USER_LOGGED', JSON.stringify(this.user));
				}
				if (sessionStorage.getItem('USER_LOGGED')) {
					this.user.address = list;
					this.auth.updateUser(this.user);
					sessionStorage.setItem('USER_LOGGED', JSON.stringify(this.user));
				}
				this.update({ status: 200 });
				this.root.update_user_status$.next('update_header');
				this.toastr.success('default changed successfully');
			}
		})
	}
}
