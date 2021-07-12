import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/authentication.service';
import { ChangePassword, USER_RESPONSE } from 'src/app/interface';
import { SubSink } from 'subsink';
import { ConfirmedValidator } from './confirmed';
import { ConfirmedValidatorForSameOldAndCurrentPassword } from './un-confirmed';

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
											  		<form [formGroup]="change" (ngSubmit)="onClickChange(change.value)" method="post" role="form" class="">
											  			<div class="form-group">
										                <label for="Change">Current Password<span class="required-field"></span></label>
														<div class="form-group inputWithIcon">
										                <input type="password" #currentInput [type]=" current ? 'password' : 'text'" name="password" class="form-control" formControlName="userCurrentPassword" id="Change" (keydown.space)="$event.preventDefault()" placeholder="Enter current password">
														<a class="cursr" (click)="current=!current"><i class="fa " [ngClass]="{'fa-eye': !current, 'fa-eye-slash': current}"></i></a>
            											<small class="text-danger" *ngIf="change.controls['userCurrentPassword'].hasError('required')">Please enter current password.</small>
           												<small class="text-danger" *ngIf="change.controls['userCurrentPassword'].hasError('invalidCurrentPassword')">Please enter valid current password.</small>
														</div>
										                </div>
										                <div class="form-group">
										                <label for="New">New Password<span class="required-field"></span></label>
														<div class="form-group inputWithIcon">
										                <input type="password" #newInput [type]=" new ? 'password' : 'text' " formControlName="userNewPassword" (keydown.space)="$event.preventDefault()" name="userNewPassword" class="form-control" id="New" placeholder="Enter new password">
														<a class="cursr" (click)="new=!new"><i class="fa " [ngClass]="{'fa-eye': !new, 'fa-eye-slash': new}"></i></a>
            											<small class="text-danger" *ngIf="change.controls['userNewPassword'].hasError('required')">Please enter new password.</small>
            											<small class="text-danger" *ngIf="change.controls['userNewPassword'].hasError('confirmedValidatorOldAndCurrent')">New password and current password should not be same.</small>
              											<small class="text-danger" *ngIf="change.controls['userNewPassword'].hasError('pattern') && (change.controls['userNewPassword'].dirty || change.controls['userNewPassword'].touched)">Password needs to be at least eight characters, one uppercase letter and one number.</small>
														</div>
										                </div>
										                <div class="form-group">
										                <label for="Retype">Retype New Password<span class="required-field"></span></label>
														<div class="form-group inputWithIcon">
														<input type="password" #newReenterInput [type]=" confirm ? 'password' : 'text'" formControlName="userNewRePassword" name="ConNewPassword" class="form-control" (keydown.space)="$event.preventDefault()" id="Retype" placeholder="Re-enter new password">
														<a class="cursr" (click)="confirm=!confirm"><i class="fa " [ngClass]="{'fa-eye': !confirm, 'fa-eye-slash': confirm}"></i></a>
             											<small class="text-danger" *ngIf="change.controls['userNewRePassword'].hasError('required')">Please enter Re enter new password.</small>
             											<small class="text-danger" *ngIf="change.controls['userNewRePassword'].hasError('confirmedValidator')">Re enter new password is not match.</small>
														</div>
										                </div>								            
										                <div class="pt-3 mb-3"><button type="submit" class="btn btn-them btn-md">{{preventAbuse ? 'Please wait..' : 'Request OTP'}}</button></div> 
											  		</form>
										  		</div>
										  		<div class="col-lg-6">
										  			<h6>Secure password tips:</h6>
										  			<ul class="pl-3">
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
		`.required-field::before {
			content: "*";
			color: rgb(243, 75, 75);
		  }
		  .inputWithIcon input [type="password"] {
			padding-right: 40px;
		  }
		  .inputWithIcon {
			position: relative;
		  }
		  .inputWithIcon i {
			position: absolute;
			right: 0px;
			top: 3px;
			padding: 9px 12px;
		  }`
	], changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
	change: FormGroup;
	new = true;
	current = true;
	confirm = true;
	subs = new SubSink();
	user: USER_RESPONSE;
	preventAbuse = false;
	@ViewChild('currentInput', { static: false }) currentInput: ElementRef;
	@ViewChild('newInput', { static: false }) newInput: ElementRef;
	@ViewChild('newReenterInput', { static: false }) newReenterInput: ElementRef;
	constructor(
		readonly router: Router,
		private auth: AuthenticationService,
		private cd: ChangeDetectorRef,
		private fb: FormBuilder,
		private toastr: ToastrService
	) {
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
		// form
		this.change = this.fb.group({
			userCurrentPassword: [null],
			userNewPassword: [null, Validators.compose([Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)])],
			userNewRePassword: [null],
			loginuserID: [this.user.userID],
			languageID: ['1']
		}, {
			validators: [
				ConfirmedValidator('userNewPassword', 'userNewRePassword'),
				ConfirmedValidatorForSameOldAndCurrentPassword('userCurrentPassword', 'userNewPassword'),
			],
		});
	}
	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
	ngOnInit(): void {
	}
	onClickChange = (post: ChangePassword) => {
		this.checkInputFocus(post);
		if (!this.checkControlPost(post)) {
			this.markFormTouched(this.change);
			if (this.change.valid && this.findInvalidControls().length === 0) {
				this.preventAbuse = true;
				this.changePromise(JSON.stringify(post)).then((res: string) => {
					this.preventAbuse = false;
					if (res === 'true') {
						this.toastr.success('Password Changed successfully');
						setTimeout(() => { this.logout(); }, 300);
					}
					if (res !== 'true') {
						this.toastr.error('some error occured, please try again later', '', {
							positionClass: 'toast-center-center-error'
						});
					}
				}).catch((error) => {
					this.preventAbuse = false;
					if (error === 'Please enter valid current password.') {
						this.change.get('userCurrentPassword').setErrors({ invalidCurrentPassword: true });
						this.cd.markForCheck();
					} else {
						this.toastr.error('some error occured, please try again later', '',
							{
								positionClass: 'toast-center-center-error'
							});
					}
					console.error(error);
				});
			}
		}
		if (this.checkControlPost(post)) {
			this.markFormTouched(this.change);
		}
	}
	checkInputFocus = (post: ChangePassword) => {
		let temp = false;
		Object.keys(post).forEach((key) => {
			if (key === 'userCurrentPassword' && !post[key] && !temp) {
				this.currentInput.nativeElement.focus();
				temp = true;
			}
			if (key === 'userNewPassword' && !post[key] && !temp) {
				this.newInput.nativeElement.focus();
				temp = true;
			}
			if (key === 'userNewRePassword' && !post[key] && !temp) {
				this.newReenterInput.nativeElement.focus();
				temp = true;
			}
		});
	}
	checkControlPost = (post: ChangePassword) => {
		let invalid = false;
		Object.keys(post).forEach((key: string) => {
			if (key === 'userCurrentPassword' && !this.change.get(`${key}`).value) {
				this.change.get(`${key}`).setValidators([Validators.required]);
				this.change.get(`${key}`).updateValueAndValidity({ onlySelf: true });
				return invalid = true;
			}
			if (key === 'userNewPassword' && !this.change.get(`${key}`).value) {
				this.change.get(`${key}`).setValidators([Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)]);
				this.change.get(`${key}`).updateValueAndValidity({ onlySelf: true });
				return invalid = true;
			}
			if (key === 'userNewRePassword' && !this.change.get(`${key}`).value) {
				this.change.get(`${key}`).setValidators([Validators.required]);
				this.change.get(`${key}`).updateValueAndValidity({ onlySelf: true });
				return invalid = true;
			}
		});
		return invalid;
	}
	changePromise = (post: string) => {
		return new Promise((resolve, reject) => {
			this.subs.add(this.auth.changePassword(post).subscribe({
				error: (error) => reject(error),
				next: (response: {
					status: string;
					message: string;
				}) => {
					if (response.status === 'true') {
						resolve(response.status);
					} else {
						reject('Please enter valid current password.');
					}
				},
			}));
		});
	}
	logout = () => {
		// clear all localstorages and redirect to main public page
		if (this.subs) {
			this.subs.unsubscribe();
		}
		this.auth.logout();
	}
	findInvalidControls = () => {
		const invalid = [];
		const controls = this.change.controls;
		for (const name in controls) {
			if (controls[name].invalid) {
				invalid.push(name);
			}
		}
		return invalid;
	}
	markFormTouched(group: FormGroup): any {
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
}