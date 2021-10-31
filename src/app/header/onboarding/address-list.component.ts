import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { delay } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication.service';
import { ADDRESS, ProductList, Store, USER_RESPONSE } from 'src/app/interface';
import { RootService } from 'src/app/root.service';
import { SubSink } from 'subsink';
import { StoreListComponent } from './store-list.component';

@Component({
	selector: 'app-address-list',
	template: `
     <!-- The Modal -->
     <div class="modal-contents" [loader]="preventAbuse">
      <!-- Modal Header -->
      <div class="modal-header">
        <h4 class="modal-title">{{'select_address' | translate}}</h4>
        <button type="button" (click)="!preventAbuse ? onClose() : ''" class="close" data-dismiss="modal">&times;</button>
      </div>
      <!-- Modal body -->
      <form method="post" (ngSubmit)="submit_address();error=''" class="bootstrap-form needs-validation">
        <div class="modal-body">
        <div class="alerts alert-danger" role="alert" *ngIf="error">
      			<h5 class="alert-heading text-center">Error!</h5>
      			<p class="mb-0 text-center">{{error}}</p>
    		  </div>
          <div class="superviser_content">
          <div class="supervisor_list demo-radio-button">
	  <div class="d-flex">
		<label _ngcontent-man-c117="">{{'address_list' | translate}}</label>
  		<div class="ml-auto"><a class="cursr" (click)="click();">+ {{'add_address' | translate}}</a></div>
  	</div>
             <div class="message-center" *ngFor="let address of list[0].address | myfilterAddress">
                  <div class="radeio-list">					  	
                      <input name="Supervisor" (change)="onChange($event.target.value)" [value]="address?.addressID" [checked]="address?.addressID === checked_address" type="radio" [id]="address?.addressID" class="with-gap radio-col-black cursr">
                      <label class="cursr" [for]="address?.addressID">{{address?.fullAddress | lowercase}} <br>{{(address?.cityName | lowercase) + ', ' + (address?.countryName | titlecase) + ' ' + address?.addressPincode}} </label>
                  </div>				  
              </div>
          </div>
         </div>
          <div class="modal-footer">
            <button class="btn btn-them btn-md w-100" [disabled]="preventAbuse" type="submit">{{ preventAbuse ? ('wait' | translate) : ('done' | translate) }} </button>
          </div>
        </div>
      </form>
    </div>
  `,
	styles: [
		`.modal-contents {
			position: relative;
			display: flex;
			flex-direction: column;
			width: 100%;
			pointer-events: auto;
			background-color: #fff;
			background-clip: padding-box;
			border-radius: .3rem;
			outline: 0;
		}
		.alerts{
			position: relative;
			padding: .75rem 0.25rem;
			margin-bottom: 2rem;
			border-radius: .25rem;
		}`
	], changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressListComponent implements OnInit, OnDestroy {
	error: string = '';
	list: { status: string, product: { productID: string, qty?: string, productPrice?: string }, address: ADDRESS[] }[] = [];
	preventAbuse = false;
	logged_user: USER_RESPONSE = null;
	checked_address: string;
	subs = new SubSink();
	constructor(
		private bsModal: BsModalRef,
		private root: RootService,
		private cd: ChangeDetectorRef,
		private modal: BsModalService,
		private auth: AuthenticationService) {
		// getting auth user data
		this.subs.add(this.auth.user.subscribe(user => {
			if (user) {
				this.logged_user = user;
			}
			if (user === null) {
				this.logged_user = null;
			}
		}));
		// for updating address-list
		this.subs.add(this.root.update$.subscribe(status => {
			if (status === 'update_address_list') {
				this.list[0].address = this.logged_user.address;
				this.cd.markForCheck();
			}
		}));
	}
	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
	click = () => {
		$('.AddressSidebar').addClass('opensidebar');
	}
	ngOnInit(): void {
		jQuery(() => {
			$('.closeSidebar').on('click', function () {
				$('.AddressSidebar').removeClass('opensidebar');
			});
		});
		this.checked_address = this.list[0].address?.filter(a => a.addressIsDefault === 'Yes').length > 0 ? this.list[0].address?.filter(a => a.addressIsDefault === 'Yes')[0].addressID : '';
	}
	onClose = () => {
		this.bsModal.hide();
	}
	onChange = (e: string) => {
		this.checked_address = e;
	}
	submit_address = () => {
		if (!this.checked_address) {
			this.error = 'Please select delivery address?.'
		}
		if (this.checked_address) {
			this.preventAbuse = true;
			this.get_store(JSON.stringify(
				{
					currentLat: this.list[0].address?.filter(a => a.addressID === this.checked_address)[0].addressLati,
					currentLong: this.list[0].address?.filter(a => a.addressID === this.checked_address)[0].addressLongi,
				}
			));
		}
	}
	openStore = (stores: Store[]) => {
		this.onClose();
		const initialState = {
			list: [{
				status: this.list[0].status,
				product: this.list[0].product,
				address: this.list[0].address,
				stores: stores
			}]
		};
		this.modal.show(StoreListComponent, { id: 939, initialState });
	}
	get_store = (cordinate: string) => {
		this.subs.add(this.root.store(cordinate).pipe(delay(500)).subscribe((res: { status: string; data: Store[]; message: string; }) => {
			if (res.status === 'true') {
				this.list[0].address?.map(a => {
					if (a.addressID === this.checked_address) {
						a.addressIsDefault = 'Yes';
					} else {
						a.addressIsDefault = 'No';
					}
				});
				this.preventAbuse = false;
				this.openStore(res.data);
			}
			if (res.status === 'false') {
				this.error = 'No store is found on selected address?.';
				this.preventAbuse = false;
				this.cd.markForCheck();
				if (localStorage.getItem('USER_LOGGED')) {
					const tempUser = JSON.parse(localStorage.getItem('USER_LOGGED')) as USER_RESPONSE;
					tempUser.storeID = '';
					this.auth.updateUser(tempUser);
					localStorage.setItem('USER_LOGGED', JSON.stringify(tempUser));
				}
				if (sessionStorage.getItem('USER_LOGGED')) {
					const tempUser = JSON.parse(sessionStorage.getItem('USER_LOGGED')) as USER_RESPONSE;
					tempUser.storeID = '';
					this.auth.updateUser(tempUser);
					sessionStorage.setItem('USER_LOGGED', JSON.stringify(tempUser));
				}
			}
		}, (err: any) => {
			this.preventAbuse = false;
			throw new Error(`Oops! Something went wrong while fetching store: ${err}`);
		}));
	}
}
