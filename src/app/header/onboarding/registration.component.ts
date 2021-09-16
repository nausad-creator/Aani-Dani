import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl, ValidationErrors } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication.service';
import { Country, Nationality, ProductList, USER_RESPONSE } from 'src/app/interface';
import { selectCountryList, selectNationalyList, State } from 'src/app/reducers';
import { LoginComponent } from './login.component';
import { OtpRegisterComponent } from './otp.register.component';

@Component({
	selector: 'app-registration',
	template: `
    <!--Modal Signup -->
<div class="modal-contents" [loader]="preventAbuse">
	<div class="modal-header">
		<h5 class="modal-title w-100 text-center" id="exampleModalLabel">{{'sign_up' | translate}}</h5>
		<button type="button" (click)="!preventAbuse ? onClose() : ''" class="close" data-dismiss="modal"
			aria-label="Close"> <span aria-hidden="true">×</span></button>
	</div>
	<div class="modal-body">
		<form class="text-left profile-form" [formGroup]="registerForm"
			(ngSubmit)="onClickregister(registerForm.value);">
			<div class="CandidateRegister">
				<div class="form-row">
					<div class="col-md-12 col-sm-12 form-group">
						<input type="text" #userFullNameInput formControlName="userFullName"
							id="name" class="form-control"
							[placeholder]="'full_name' | translate">
						<small class="text-danger small"
							*ngIf="registerForm.controls['userFullName'].hasError('required')">{{'please_enter_name'
							| translate}}</small>
						<small class="text-danger small"
							*ngIf="registerForm.controls['userFullName'].hasError('minlength')">{{'input_fields_will_not_be_less_than_3_characters'
							| translate}}</small>
						<small class="text-danger small"
							*ngIf="registerForm.controls['userFullName'].hasError('maxlength')">{{'input_fields_will_not_be_more_than_60_characters'
							| translate}}</small>
					</div>
					<div class="col-md-12 col-sm-12 form-group">
						<input type="text" (blur)="check_email()" id="Email" #userEmailInput
							(keydown.space)="$event.preventDefault();"
							formControlName="userEmail" class="form-control"
							[placeholder]="'email_address' | translate">
						<small class="text-danger small"
							*ngIf="registerForm.controls['userEmail'].hasError('required')">{{'please_enter_email'
							| translate}}</small>
						<small class="text-danger"
							*ngIf="registerForm.controls['userEmail'].hasError('emailAlreadyExist')">email
							already exist.</small>
						<small class="text-danger small"
							*ngIf="registerForm.controls['userEmail'].hasError('pattern')">{{'please_enter_valid_email'
							| translate}}</small>
					</div>
					<div class="col-md-12 col-sm-12 form-group">
						<div class="form-row">
							<div class="col-sm-3 col-4">
							<ng-select [items]="countries$ | async"
							formControlName="countryCode"
           						bindLabel="countryDialCode" [closeOnSelect]="true" [searchable]="false"
							[clearable]="false" class="customCountry"
							bindValue="countryDialCode">
							</ng-select>
							</div>
							<div class="col-sm-9 col-8">
								<input type="text" (blur)="check_phone()" maxlength="10"
									id="phone" #userMobileInput
									(keydown.space)="$event.preventDefault();"
									formControlName="userMobile"
									class="form-control"
									[placeholder]="'mobile_number' | translate">
								<small class="text-danger small"
									*ngIf="registerForm.controls['userMobile'].hasError('required')">{{'please_enter_mobile'
									| translate}}</small>
								<small class="text-danger"
									*ngIf="registerForm.controls['userMobile'].hasError('mobileExist')">mobile
									already exist.</small>
								<small class="text-danger"
									*ngIf="registerForm.controls['userMobile'].hasError('pattern') && (registerForm.controls['userMobile'].dirty || registerForm.controls['userMobile'].touched)">{{'please_enter_valid_mobile_number'
									| translate}}</small>
							</div>
						</div>
					</div>
					<div class="col-md-12 col-sm-12 form-group">
						<a class="pasword-hideshow cursr" (click)="hideNew=!hideNew"><i
								class="fa "
								[ngClass]="{'fa-eye': !hideNew, 'fa-eye-slash': hideNew}"></i></a>
						<input type="password" [type]=" hideNew ? 'password' : 'text' "
							#userPasswordInput (keydown.space)="$event.preventDefault();"
							formControlName="userPassword" id="defaultPassword"
							class="form-control" [placeholder]="'password' | translate">
						<small class="text-danger small"
							*ngIf="registerForm.controls['userPassword'].hasError('required')">{{'please_enter_password'
							| translate}}</small>
						<small class="text-danger"
							*ngIf="registerForm.controls['userPassword'].hasError('pattern') && (registerForm.controls['userPassword'].dirty || registerForm.controls['userPassword'].touched)">{{'password_with_8_char_uppercase_and_number'
							| translate}}</small>
					</div>
					<div class="col-md-12 col-sm-12 form-group">
						<a class="pasword-hideshow cursr" (click)="hideReenter=!hideReenter"><i
								class="fa "
								[ngClass]="{'fa-eye': !hideReenter, 'fa-eye-slash': hideReenter}"></i></a>
						<input type="password" [type]=" hideReenter ? 'password' : 'text' "
							#userRePasswordInput (keydown.space)="$event.preventDefault();"
							formControlName="userRePassword" id="confirmtPassword"
							class="form-control"
							[placeholder]="'confirm_password' | translate">
						<small class="text-danger small"
							*ngIf="registerForm.controls['userRePassword'].hasError('required')">{{'please_re_enter_password'
							| translate}}</small>
						<small class="text-danger "
							*ngIf="registerForm.hasError('confirmedValidator')">{{'re_entered_password_is_not_match'
							| translate}}</small>
					</div>
					<div class="col-md-12 col-sm-12 form-group">
						<a class="pasword-hideshow cursr"><i [owlDateTimeTrigger]="dt5"
								class="fa fa-calendar"></i></a>
						<input type="text" class="form-control" #userDOBInput
							(keyup)="onKeyDate(userDOBInput.value)"
							(blur)="onBlur(userDOBInput.value)" maxlength=14 [max]="maxDate"
							placeholder="mm/dd/yyyy*" formControlName="userDOB" id="dob"
							name="userDOB" [owlDateTime]="dt5">
						<owl-date-time [pickerType]="'calendar'" #dt5></owl-date-time>
						<small class="text-danger small"
							*ngIf="registerForm.controls['userDOB'].hasError('required')">{{'please_select_dob'
							| translate}}</small>
						<small class="text-danger small"
							*ngIf="registerForm.controls.userDOB.errors">{{registerForm.controls.userDOB.errors.message}}</small>
					</div>
					<div class="col-md-12 col-sm-12 form-group">
						<ng-select [closeOnSelect]="true" [searchable]="true"
							bindLabel="nationalityName" bindValue="nationalityID"
							appearance="outline" #userNationInput
							formControlName="nationalityID" [items]="nationalities$ | async"
							[clearable]="true" class="custom"
							[placeholder]="'select_nationality' | translate">
						</ng-select>
						<small class="text-danger small"
							*ngIf="registerForm.controls['nationalityID'].hasError('required')">{{'please_select_nationality'
							| translate}}</small>
					</div>
				</div>
				<div class="form-row pt-3">
					<div class="col">
						<button type="submit" [disabled]="preventAbuse"
							class="btn btn-them btn-md w-100">{{ preventAbuse ? ('wait' |
							translate) : ('sign_up' | translate) }}</button>
					</div>
				</div>
				<div class="pt-3 signupbtn text-center">
					<span>{{'already_having_account' | translate}}?</span> <a class="cursr ml-1"
						(click)="openlogin()" data-toggle="modal">Login</a>
				</div>
			</div>
		</form>
	</div>
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
	.ng-select.ng-select-single.custom ::ng-deep .ng-select-container {
        	height: 37.5px;
		font-size: 1rem;
		background-clip: padding-box;
		border: 1px solid #ced4da;
		border-radius: 0.25rem;
		background-color: #ECECEC;
		border-color: #E6E6E6;
		opacity: 1;
		height: calc(1.8em + .75rem + 2px);
      	}
	.ng-select.custom ::ng-deep .ng-select-container .ng-placeholder {
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
	.ng-select.ng-select-single.customCountry ::ng-deep .ng-select-container {
        	height: 37.5px;
		font-size: 1rem;
		background-clip: padding-box;
		border: 1px solid #ced4da;
		border-radius: 0.25rem;
		background-color: #ECECEC;
		border-color: #E6E6E6;
		opacity: 1;
		height: calc(1.8em + .75rem + 2px);
      	}
	.ng-select.customCountry ::ng-deep .ng-select-container .ng-placeholder {
    		color:#C2C2C2;
  	}
	.ng-select.ng-select-single.customCountry ::ng-deep .ng-select-container {
    		padding-right: 5px;
	}
	.ng-select.customCountry ::ng-deep .ng-clear-wrapper {
    		color: #999;
    		top: 1px;
	}
	::ng-deep .cdk-overlay-container {
    		z-index: 1200 !important;
  	}
	input[name="userDOB"] {
  		word-spacing: -3px;
	}`
	], changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit {
	bModalRef: BsModalRef;
	registerForm: FormGroup;
	error: string;
	hideNew = true;
	hideReenter = true;
	maxDate = new Date();
	preventAbuse = false;
	list: { status: string, product: ProductList }[] = [];
	nationalities$: Observable<Nationality[]> = this.store.select(selectNationalyList);
	countries$: Observable<Country[]> = this.store.select(selectCountryList);
	event: EventEmitter<{ data: string, res: number }> = new EventEmitter();
	@ViewChild('userFullNameInput', { static: false }) userFullName: ElementRef;
	@ViewChild('userEmailInput', { static: false }) userEmail: ElementRef;
	@ViewChild('userMobileInput', { static: false }) userMobile: ElementRef;
	@ViewChild('userPasswordInput', { static: false }) userPassword: ElementRef;
	@ViewChild('userRePasswordInput', { static: false }) userRePassword: ElementRef;
	@ViewChild('userDOBInput', { static: false }) userDOBInput: ElementRef;
	@ViewChild('userNationInput', { static: false }) userNationInput: NgSelectComponent;
	constructor(
		private modal: BsModalService,
		private bsModal: BsModalRef,
		private fb: FormBuilder,
		private store: Store<State>,
		private auth: AuthenticationService,
		private cd: ChangeDetectorRef
	) {
		// for register
		this.registerForm = this.fb.group({
			userFullName: [''],
			userEmail: ['', Validators.compose([Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
			userMobile: ['', Validators.compose([Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
			userPassword: ['', Validators.compose([Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)])],
			userRePassword: [''],
			userDOB: ['', Validators.compose([this.dateMaximum])],
			nationalityID: [null],
			countryCode: ['+966'],
			languageID: ['1'],
			loginuserID: ['0']
		}, { validators: this.checkPasswords });
	}
	dateMaximum(control: AbstractControl): ValidationErrors {
		const error = {
			name: '',
			message: ''
		};
		if (control.value == null) {
			return null;
		}
		const controlDate = moment(control.value, 'YYYY-MM-DD');
		if (!controlDate.isValid()) {
			return null;
		}
		const validationDate = moment(new Date());
		if (controlDate.isAfter(validationDate)) {
			error.name = 'invalidDOB';
			error.message = `Date should not after ${moment(new Date(), 'MM-DD-YYYY').format('MM-DD-YYYY')}.`;
			return error;
		}
		return null;
	}
	checkPasswords = (group: FormGroup) => {
		const password = group.get('userPassword').value;
		const confirmPassword = group.get('userRePassword').value;
		if (password && confirmPassword) {
			return password === confirmPassword ? null : { confirmedValidator: true };
		}
	}
	check_email = async () => {
		// checking for duplicate user!!!!
		if (this.registerForm.get('userEmail').value && this.registerForm.get('userEmail').valid) {
			await this.duplicate(JSON.stringify({
				loginuserID: "0",
				languageID: "1",
				userEmail: this.registerForm.get('userEmail').value,
				userMobile: "",
			})).then(async (r: {
				status: string;
				message: string;
			}) => {
				if (r.status === 'false') {
					this.registerForm.controls.userEmail.setErrors({ emailAlreadyExist: true });
					this.cd.markForCheck();
				}
			}).catch(() => {
				this.error = 'Oops! Something went wrong!';
				this.cd.markForCheck();
			});
		}
	}
	check_phone = async () => {
		// checking for duplicate user!!!!
		if (this.registerForm.get('userMobile').value && this.registerForm.get('userMobile').valid) {
			await this.duplicate(JSON.stringify({
				loginuserID: "0",
				languageID: "1",
				userEmail: "",
				userMobile: this.registerForm.get('userMobile').value,
			})).then(async (r: {
				status: string;
				message: string;
			}) => {
				if (r.status === 'false') {
					this.registerForm.controls.userMobile.setErrors({ mobileExist: true });
					this.cd.markForCheck();
				}
			}).catch(() => {
				this.error = 'Oops! Something went wrong!';
				this.cd.markForCheck();
			});
		}
	}
	onClickregister = async (post: {
		userFullName: string;
		userEmail: string;
		userMobile: string;
		userPassword: string;
		userRePassword: string;
		userDOB: string;
		nationalityID: string;
	}) => {
		this.checkInputFocus(post);
		if (!this.checkControlPost(post)) {
			this.markFormTouched(this.registerForm);
			if (this.registerForm.valid && this.findInvalidControlsregister().length === 0) {
				this.error = '';
				this.preventAbuse = true;
				this.register(JSON.stringify(post)).then((success: USER_RESPONSE) => {
					this.preventAbuse = false;
					setTimeout(() => {
						this.onClose()
						this.registerForm.reset();
						this.triggerEvent('Confirmed');
						this.openOTP(success);
					}, 100);
				}).catch((error: string) => {
					this.error = error;
					this.preventAbuse = false;
					this.triggerEvent('Error');
					this.cd.markForCheck();
				});
			}
		}
		if (this.checkControlPost(post)) {
			this.markFormTouched(this.registerForm);
		}
	}
	register = (post: string) => {
		return new Promise((resolve, reject) => {
			this.auth.signup(post).subscribe((r: {
				data: USER_RESPONSE[];
				status: string;
				message: string;
			}) => {
				if (r.status === 'true') {
					resolve(r.data[0]);
				} else {
					reject('Oops! Something went wrong!');
				}
			}, () => {
				reject('Oops! Something went wrong!');
			}
			);
		});
	}
	checkInputFocus = (post: {
		userFullName: string;
		userEmail: string;
		userMobile: string;
		userPassword: string;
		userRePassword: string;
		userDOB: string;
		nationalityID: string;
	}) => {
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
			if (key === 'userPassword' && !post[key] && !temp) {
				this.userPassword.nativeElement.focus();
				temp = true;
			}
			if (key === 'userRePassword' && !post[key] && !temp) {
				this.userRePassword.nativeElement.focus();
				temp = true;
			}
			if (key === 'userDOB' && !post[key] && !temp) {
				this.userDOBInput.nativeElement.focus();
				temp = true;
			}
			if (key === 'nationalityID' && !post[key] && !temp) {
				this.userNationInput.focus();
				temp = true;
			}
		});
	}
	checkControlPost = (post: {
		userFullName: string;
		userEmail: string;
		userMobile: string;
		userPassword: string;
		userRePassword: string;
		userDOB: string;
		nationalityID: string;
	}) => {
		let invalid = false;
		Object.keys(post).forEach((key: string) => {
			if (key === 'userFullName' && !this.registerForm.get(`${key}`).value) {
				this.registerForm.get(`${key}`).setValidators([Validators.required, Validators.maxLength(60), Validators.minLength(3)]);
				this.registerForm.get(`${key}`).updateValueAndValidity({ onlySelf: true });
				return invalid = true;
			}
			if (key === 'userEmail' && !this.registerForm.get(`${key}`).value) {
				this.registerForm.get(`${key}`).setValidators([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]);
				this.registerForm.get(`${key}`).updateValueAndValidity({ onlySelf: true });
				return invalid = true;
			}
			if (key === 'userMobile' && !this.registerForm.get(`${key}`).value) {
				this.registerForm.get(`${key}`).setValidators([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)]);
				this.registerForm.get(`${key}`).updateValueAndValidity({ onlySelf: true });
				return invalid = true;
			}
			if (key === 'userPassword' && !this.registerForm.get(`${key}`).value) {
				this.registerForm.get(`${key}`).setValidators([Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)]);
				this.registerForm.get(`${key}`).updateValueAndValidity({ onlySelf: true });
				return invalid = true;
			}
			if (key === 'userRePassword' && !this.registerForm.get(`${key}`).value) {
				this.registerForm.get(`${key}`).setValidators([Validators.required]);
				this.registerForm.get(`${key}`).updateValueAndValidity({ onlySelf: true });
				return invalid = true;
			}
			if (key === 'userDOB' && !this.registerForm.get(`${key}`).value) {
				this.registerForm.get(`${key}`).setValidators([Validators.required, this.dateMaximum]);
				this.registerForm.get(`${key}`).updateValueAndValidity({ onlySelf: true });
				return invalid = true;
			}
			if (key === 'nationalityID' && !this.registerForm.get(`${key}`).value) {
				this.registerForm.get(`${key}`).setValidators([Validators.required]);
				this.registerForm.get(`${key}`).updateValueAndValidity({ onlySelf: true });
				return invalid = true;
			}
		});
		return invalid;
	}
	duplicate = (post: string) => {
		return new Promise((resolve, reject) => {
			this.auth.checkDuplication(post).subscribe((response) => {
				resolve(response);
			}, error => { reject(error); });
		});
	}
	openOTP = (res: USER_RESPONSE) => {
		this.onClose();
		const initialState = {
			list: [{
				user: res,
				status: 'Location',
				product: this.list[0].product
			}]
		};
		this.bsModal = this.modal.show(OtpRegisterComponent, { id: 199, initialState });
	}
	markFormTouched = (group: FormGroup | FormArray) => {
		Object.keys(group.controls).forEach((key: string) => {
			const control = group.controls[key];
			if (control instanceof FormGroup || control instanceof FormArray) {
				control.markAsTouched();
				this.markFormTouched(control);
			} else {
				control.markAsTouched();
			}
		});
	}
	triggerEvent = (item: string) => {
		this.event.emit({ data: item, res: 200 });
	}
	findInvalidControlsregister = () => {
		const invalid = [];
		const controls = this.registerForm.controls;
		for (const name in controls) {
			if (controls[name].invalid) {
				invalid.push(name);
			}
		}
		return invalid;
	}
	onClose = () => {
		this.bsModal.hide();
	}
	ngOnInit(): void {
	}
	openlogin = () => {
		this.onClose();
		const initialState = {
			list: [{
				status: 'Location',
				product: this.list[0].product
			}]
		};
		this.bsModal = this.modal.show(LoginComponent, { id: 99, initialState });
	}
	onKeyDate = (value: string) => {
		let input = value;
		if (/\D\/$/.test(input)) { input = input.substr(0, input.length - 3); }
		const values = input.split('/').map((v) => v.replace(/\D/g, ''));
		if (values[0]) { values[0] = this.checkValue(values[0], 12); }
		if (values[1]) { values[1] = this.checkValue(values[1], 31); }
		const output = values.map((v, i) => v.length === 2 && i < 2 ? v + ' / ' : v);
		this.userDOBInput.nativeElement.value = output.join('').substr(0, 14);
	}
	checkValue = (str: string, max: number) => {
		if (str.charAt(0) !== '0' || str === '00') {
			let num = +str;
			if (isNaN(num) || num <= 0 || num > max) { num = 1; }
			str = num > +(max.toString().charAt(0)) && num.toString().length === 1 ? '0' + num : num.toString();
		}
		return str;
	}
	onBlur = (value: string) => {
		const input = value;
		const values = input.split('/').map((v) => v.replace(/\D/g, ''));
		let output = '';
		if (values.length === 3) {
			const year = values[2].length !== 4 ? +(values[2]) + 2000 : +(values[2]);
			const month = +(values[0]) - 1;
			const day = +(values[1]);
			const d = new Date(year, month, day);
			if (!isNaN(+d)) {
				document.getElementById('dob').innerText = d.toString();
				const dates = [d.getMonth() + 1, d.getDate(), d.getFullYear()];
				output = dates.map((v) => {
					v = v;
					return v.toString().length === 1 ? '0' + v : v;
				}).join(' / ');
			}
		}
		if (output) {
			this.userDOBInput.nativeElement.value = output.replace(/\s/g, '');
			this.registerForm.get('userDOB').setValue(new Date(+output.split('/')[2], +output.split('/')[0] - 1, +output.split('/')[1]), { emitEvent: false });
			this.registerForm.get('userDOB').updateValueAndValidity({ emitEvent: false });
			this.cd.markForCheck();
		}
		if (!output) {
			this.userDOBInput.nativeElement.value = '';
			this.registerForm.get('userDOB').patchValue('', { emitEvent: false });
			this.registerForm.get('userDOB').updateValueAndValidity({ emitEvent: false });
			this.cd.markForCheck();
		}
	}
}
