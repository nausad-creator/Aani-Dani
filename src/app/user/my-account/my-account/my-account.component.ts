import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { DatePickerDirective, IDatePickerDirectiveConfig } from 'ng2-date-picker';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication.service';
import { Nationality, UserUpdate, USER_RESPONSE } from 'src/app/interface';
import { selectNationalyList, State } from 'src/app/reducers';

@Component({
	selector: 'app-my-account',
	template: `
    <div class="tab-pane fade show active" id="ProfileInfo" role="tabpanel" aria-labelledby="home-tab">
						  		<div class="titleAccount d-flex">
						  			<h5>Profile Information</h5>
						  			<div class="iconEdit ml-auto"><a (click)="toggleDisable()" class="cursr" id="EditProfi"><i class="icofont-pencil-alt-2"></i> Edit</a></div>
						  		</div>
						  		<div class="profileContent pt-3">
						  			<form (ngSubmit)="onClickUpdate(profileForm.getRawValue())" [formGroup]="profileForm" method="post" role="form" class="ProfileForm NotEditable">
						                <div class="form-row">
						                  <div class="col-md-4 form-group">
						                    <label for="fname">First Name<span class="required-field"></span></label>
						                    <input type="text" name="fname" #userFullNameInput (keyup)="onInputName(userFullNameInput.value)" formControlName="userFullName" class="form-control" id="fname" placeholder="Enter First Name">
											<small class="text-danger small" *ngIf="profileForm.controls['userFullName'].hasError('required')">Please enter name.</small>
						 					<small class="text-danger small" *ngIf="profileForm.controls['userFullName'].hasError('minlength')">Input fields will not be less than 3 characters.</small>
                      	 					<small class="text-danger small" *ngIf="profileForm.controls['userFullName'].hasError('maxlength')">Input fields will not be more than 60 characters.</small>
						                  </div>
						                  <div class="col-md-4 form-group">
						                    <label for="lname">Last Name<span class="required-field"></span></label>
						                    <input type="text" name="fname" class="form-control" id="lname" placeholder="Enter Last Name">
						                  </div>
						                </div>

						                <div class="form-row">
						                	<div class="col-md-4 form-group">
							                    <label for="email">Email Address<span class="required-field"></span></label>
							                    <input type="email" class="form-control" #userEmailInput (keyup)="onInputEmail(userEmailInput.value)" formControlName="userEmail" name="email" id="email" placeholder="Enter Email">
												<small class="text-danger small" *ngIf="profileForm.controls['userEmail'].hasError('required')">Please enter email.</small>
												<small class="text-danger" *ngIf="profileForm.controls['userEmail'].hasError('emailAlreadyExist')">email already exist.</small>
												<small class="text-danger small" *ngIf="profileForm.controls['userEmail'].hasError('pattern')">Please enter valid email.</small>
							                </div>
							                <div class="col-md-4 form-group">
							                    <label for="nationlity">Nationality<span class="required-field"></span></label>
												<ng-select [closeOnSelect]="true" [searchable]="true" bindLabel="nationalityName" bindValue="nationalityID" labelById="nationlity"
                  								appearance="outline" formControlName="nationalityID" [items]="nationalities$ | async"
                  								[clearable]="true" class="custom" placeholder="Select Nationality">
               									 </ng-select>
												<small class="text-danger small" *ngIf="profileForm.controls['nationalityID'].hasError('required')">Please select nationality.</small>
							                </div>
							                <div class="col-md-4 form-group">
							                    <label for="date">Date of Birth<span class="required-field"></span></label>
							                    <input #dateDirectivePicker="dpDayPicker" 
                  								(keydown)="$event.preventDefault()" 
                  								[theme]="'dp-material dp-main'" 
                  								[mode]="'day'" 
                  								[dpDayPicker]="configDate" 
                  								class="form-control DateNobor"
                   								placeholder="dd/mm/yyyy"
												formControlName="userDOB" name="date" class="form-control" id="date">
												<a [ngClass]="{'noPointer': profileForm.controls.userDOB.disabled}" class="pasword-hideshowLogin cursr"><i (click)="datePickerDirective.api.open()" class="fa fa-calendar"></i></a>
												<small class="text-danger small" *ngIf="profileForm.controls['userDOB'].hasError('required')">Please select DOB.</small>
							                </div>
						                </div>

						                <div class="form-row">
						                	<div class="col-md-4">
						                		<label for="phone">Mobile Number<span class="required-field"></span></label>
						                		<div class="form-row">
						                			<div class="col-md-4 form-group"><input type="text" formControlName="countryCode" class="form-control w-100" name="cCode" id="phone" placeholder="Code" readonly></div>
						                			<div class="col-md-8 form-group">
														<input type="text"  maxlength="10" formControlName="userMobile" class="form-control w-100" name="phone" id="phonecode" placeholder="Enter Mobile">
														<small class="text-danger small" *ngIf="profileForm.controls['userMobile'].hasError('required')">Please enter mobile.</small>
														<small class="text-danger" *ngIf="profileForm.controls['userMobile'].hasError('mobileExist')">mobile already exist.</small>
														<small class="text-danger" *ngIf="profileForm.controls['userMobile'].hasError('pattern') && (profileForm.controls['userMobile'].dirty || profileForm.controls['userMobile'].touched)">Please enter valid number.</small>
													</div>
						                		</div>	
						                	</div>	
						                </div>	

						                <div class=""><button type="submit" [disabled]="preventAbuse" class="btn btn-them btn-md" id="SaveDetail">{{ preventAbuse ? 'Wait..' : 'Save' }}</button></div>
						            </form>
						  		</div>	
						  	</div>
  `,
	styles: [
		`.ng-select.ng-select-single.custom ::ng-deep .ng-select-container {
        height: 37.5px;
        font-size: 1rem;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
		background-color: #ECECEC;
		background-color: #e9ecef;
    	opacity: 1;
    	border-color: #E6E6E6;
    	height: calc(1.8em + .75rem + 2px);
      }
	  .ng-select .ng-select-container.custom ::ng-deep .ng-placeholder {
    	color:#C2C2C2;
  	   }
	  .ng-select.ng-select-single.custom ::ng-deep .ng-select-container {
    	padding-right: 5px;
	   }
	   .ng-select.custom ::ng-deep .ng-arrow-wrapper {
   		display:none
		}
		.ng-select.custom ::ng-deep .ng-clear-wrapper {
    	color: #999;
    	top: 1px;
		}
	   .noPointer{
		pointer-events:none;
		}
	  .required-field::before {
        content: '*';
        color: rgb(247, 83, 83);
      }`
	], changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyAccountComponent implements OnInit {
	user: USER_RESPONSE = localStorage.getItem('USER_LOGGED') ? JSON.parse(localStorage.getItem('USER_LOGGED')) : JSON.parse(sessionStorage.getItem('USER_LOGGED')) as USER_RESPONSE;
	nationalities$: Observable<Nationality[]> = this.store.select(selectNationalyList);
	profileForm: FormGroup;
	preventAbuse = false;
	@ViewChild('userFullNameInput', { static: false }) userFullName: ElementRef;
	@ViewChild('userEmailInput', { static: false }) userEmail: ElementRef;
	@ViewChild('userNameInput', { static: false }) userName: ElementRef;
	@ViewChild('userMobileInput', { static: false }) userMobile: ElementRef;
	@ViewChild('dateDirectivePicker') datePickerDirective: DatePickerDirective;
	configDate: IDatePickerDirectiveConfig = {
		weekDayFormat: 'dd',
		showGoToCurrent: true,
		appendTo: document.body,
		closeOnSelectDelay: 0,
		onOpenDelay: 0,
		format: 'DD MMM, YYYY',
		locale: moment.locale(),
		max: moment(new Date(), 'DD/MM/YYYY').format('DD MMM, YYYY'),
	  };
	constructor(
		private fb: FormBuilder,
		private toastr: ToastrService,
		private service: AuthenticationService,
		private store: Store<State>,
		private cd: ChangeDetectorRef) { }
	toggleDisable() {
		Object.keys(this.profileForm.getRawValue()).forEach((key: string) => {
			if (this.profileForm.get(`${key}`).disabled) {
				this.profileForm.get(`${key}`).enable();
			} else {
				this.profileForm.get(`${key}`).disable();
			}
		});
	}
	async ngOnInit(): Promise<void> {
		this.intialize();
		this.jquery();
		this.toggleDisable();
	}
	intialize = () => {
		this.profileForm = this.fb.group({
			nationalityID: [this.user.nationalityID && this.user.nationalityID !== '0' ? this.user.nationalityID : null],
			userDOB: [this.user.userDOB ? moment(moment(`${this.user.userDOB}`).toDate(), 'DD/MM/YYYY').format('DD MMM, YYYY') : null],
			loginuserID: [this.user.userID],
			languageID: [this.user.languageID],
			userEmail: [this.user.userEmail ? this.user.userEmail : null, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)],
			userFullName: [this.user.userFullName ? this.user.userFullName : null],
			userMobile: [this.user.userMobile ? this.user.userMobile : null, Validators.compose([Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')])],
			userProfilePicture: [this.user.userProfilePicture ? this.user.userProfilePicture : null],
			countryCode: [this.user.userCountryCode]
		});
	}
	// on click update
	onClickUpdate = (post: UserUpdate) => {
		this.checkInputFocus(post);
		if (!this.checkControlPost(post)) {
			this.markFormTouched(this.profileForm);
			if (this.profileForm.valid && this.findInvalidControls().length === 0) {
				this.preventAbuse = true;
				this.update(JSON.stringify(post)).then((res: string) => {
					if (res) {
						if (localStorage.getItem('USER_LOGGED')) {
							localStorage.setItem('USER_LOGGED', res);
							this.user = JSON.parse(res);
						}
						if (sessionStorage.getItem('USER_LOGGED')) {
							sessionStorage.setItem('USER_LOGGED', res);
							this.user = JSON.parse(res);
						}
						this.intialize();
						setTimeout(() => {
							this.toggleDisable();
							this.preventAbuse = false;
							$('.ProfileForm').addClass('NotEditable');
							$('#EditProfi').removeClass('d-none');
							this.toastr.success('Profile updated successfully');
							this.cd.markForCheck();
						}, 500);
					}
					if (!res) {
						this.preventAbuse = false;
						this.cd.markForCheck();
						this.toastr.error('some error occured, please try again later', '',{positionClass: 'toast-center-center-error'});
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
	update = (post: string) => {
		return new Promise((resolve, reject) => {
			this.service.updateProfile(post).subscribe((res) => {
				if (res.status === 'true') {
					resolve(JSON.stringify(res.data[0]));
				} else {
					reject(res.message);
				}
			}, () => {
				reject('Error occured');
			}
			);
		});
	}
	checkInputFocus = (post: UserUpdate) => {
		let temp = false;
		Object.keys(post).forEach((key) => {
			if (key === 'userFullName' && !post[key] && !temp) {
				this.userFullName.nativeElement.focus();
				temp = true;
			}
			if (key === 'userEmail' && !post[key] && !temp) {
				this.userEmail.nativeElement.focus();
				temp = true;
			}
			if (key === 'userMobile' && !post[key] && !temp) {
				this.userMobile.nativeElement.focus();
				temp = true;
			}
		});
	}
	checkControlPost = (post: UserUpdate) => {
		let invalid = false;
		Object.keys(post).forEach((key: string) => {
			if (key === 'userFullName' && !this.profileForm.get(`${key}`).value) {
				this.profileForm.get(`${key}`).setValidators([Validators.required, Validators.maxLength(60), Validators.minLength(3)]);
				this.profileForm.get(`${key}`).updateValueAndValidity({ onlySelf: true });
				return invalid = true;
			}
			if (key === 'userEmail' && !this.profileForm.get(`${key}`).value) {
				this.profileForm.get(`${key}`).setValidators([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]);
				this.profileForm.get(`${key}`).updateValueAndValidity({ onlySelf: true });
				return invalid = true;
			}
			if (key === 'userMobile' && !this.profileForm.get(`${key}`).value) {
				this.profileForm.get(`${key}`).setValidators([Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]);
				this.profileForm.get(`${key}`).updateValueAndValidity({ onlySelf: true });
				return invalid = true;
			}
			if (key === 'userDOB' && !this.profileForm.get(`${key}`).value) {
				this.profileForm.get(`${key}`).setValidators([Validators.required]);
				this.profileForm.get(`${key}`).updateValueAndValidity({ onlySelf: true });
				return invalid = true;
			}
			if (key === 'nationalityID' && !this.profileForm.get(`${key}`).value) {
				this.profileForm.get(`${key}`).setValidators([Validators.required]);
				this.profileForm.get(`${key}`).updateValueAndValidity({ onlySelf: true });
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
		const controls = this.profileForm.controls;
		for (const name in controls) {
			if (controls[name].invalid) {
				invalid.push(name);
			}
		}
		return invalid;
	}
	// restricting user from input space in first place
	onInputName = (value: string) => {
		this.userFullName.nativeElement.value = value.replace(/^\s+/g, '');
	}
	onInputEmail = (value: string) => {
		this.userEmail.nativeElement.value = value.replace(/^\s+/g, '');
	}
	onInputMoblie = (value: string) => {
		this.userMobile.nativeElement.value = value.replace(/^\s+/g, '');
	}
	jquery = () => {
		$('#EditProfi').on('click', function () {
			$('.ProfileForm').removeClass('NotEditable');
			$(this).addClass('d-none');
		});
	}
}
