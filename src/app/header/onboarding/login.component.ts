import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { map, take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication.service';
import { ADDRESS, ProductList, TempCartItems, USER_RESPONSE } from 'src/app/interface';
import { RootService } from 'src/app/root.service';
import { AddressListComponent } from './address-list.component';
import { AlertComponent } from './alert.component';
import { ForgotComponent } from './forgot.component';
import { RegistrationComponent } from './registration.component';

@Component({
	selector: 'app-login',
	template: `
    <!--Modal Login-->
<div class="modal-contents">
	<div class="modal-header">
		<h5 class="modal-title w-100 text-center" id="exampleModalLabel">{{'login' | translate}}</h5>
		<button type="button" (click)="!preventAbuse ? onClose() : ''" class="close" data-dismiss="modal"
			aria-label="Close"> <span aria-hidden="true">×</span></button>
	</div>
	<div class="modal-body">
		<div class="alert alert-danger" role="alert" *ngIf="error">
			<h5 class="alert-heading text-center">{{'error' | translate}}!</h5>
			<p class="mb-0 text-center">{{error}}</p>
		</div>
		<form class="text-left profile-form" [formGroup]="logIn" (ngSubmit)="onClickLogin(logIn.value);">
			<div class="form-row CandidateForm">
				<div class="col-md-12 col-sm-12 form-group">
					<label>{{'user_name' | translate}}<span class="required-field"></span></label>
					<input type="email" #emailInput (keydown.space)="$event.preventDefault();"
						formControlName="userMobile" id="Email" class="form-control"
						[placeholder]="'enter_username_or_email' | translate">
					<small class="text-danger"
						*ngIf="logIn.controls['userMobile'].hasError('required')">{{'this_field_is_required' | translate}}</small>
					<small class="text-danger"
						*ngIf="logIn.controls['userMobile'].hasError('pattern') && (logIn.controls['userMobile'].dirty || logIn.controls['userMobile'].touched)">{{'please_enter_valid_email_or_mobile' | translate}}</small>
				</div>
				<div class="col-md-12 col-sm-12 form-group">
					<div class="row">
						<div class="col"><label>{{'password' | translate}}<span
									class="required-field"></span></label></div>
						<div class="col text-right"><a class="cursr" id="forgot"
								(click)="openForgot()" style="color:#2660C0;"
								data-toggle="modal">{{'forgot' | translate}}?</a></div>
					</div>
					<div>
						<a class="pasword-hideshowLogin cursr" (click)="hide=!hide"><i
								class="fa "
								[ngClass]="{'fa-eye': !hide, 'fa-eye-slash': hide}"></i></a>
						<input #passwordInput type="password"
							[type]=" hide ? 'password' : 'text' " id="password"
							(keydown.space)="$event.preventDefault()"
							[placeholder]="'enter_password' | translate" class="form-control"
							formControlName="userPassword" name="password"
							autocomplete="off">
						<small class="text-danger"
							*ngIf="logIn.controls['userPassword'].hasError('required')">{{'this_field_is_required' | translate}}</small>
					</div>
				</div>
				<div class="col-md-12 col-sm-12">
					<div class="row pt-3">
						<div class="col">
							<button type="submit" [disabled]="preventAbuse"
								class="btn btn-them btn-md w-100">{{ preventAbuse ?
								('wait' | translate) : ('log_in' | translate) }}</button>
						</div>
					</div>
					<div class="text-center">
						<div class="custom-control custom-checkbox pl-0 pt-3">
							<input type="checkbox" formControlName="terms"
								class="custom-control-input" id="customCheck"
								name="example1">
							<label class="custom-control-label" for="customCheck">{{'keep_me_signed' | translate}}</label>
						</div>
					</div>
				</div>
				<div class="col-md-12 col-sm-12 mt-3 signupbtn text-center">
					<br>
					<span>{{'new_here' | translate}}?</span> <a class="cursr ml-1" (click)="openRegistration()"
						data-toggle="modal">{{'create_an_account' | translate}}</a>
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
	.required-field::before {
    		content: "*";
    		color: red;
  	}`
	], changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
	bModalRef: BsModalRef;
	logIn: FormGroup;
	error: string;
	hide = true;
	list: { status: string, product?: ProductList }[] = [];
	preventAbuse = false;
	event: EventEmitter<{ data: string, res: number }> = new EventEmitter();
	@ViewChild('emailInput', { static: false }) emailInput: ElementRef;
	@ViewChild('passwordInput', { static: false }) passwordInput: ElementRef;
	constructor(
		private modal: BsModalService,
		private bsModal: BsModalRef,
		private fb: FormBuilder,
		private auth: AuthenticationService,
		private cd: ChangeDetectorRef,
		private root: RootService) {
		// for Login
		this.logIn = this.fb.group({
			userMobile: ['', Validators.compose([Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
			userPassword: [''],
			languageID: ['1'],
			terms: [false],
		});
	}
	onClickLogin = (post: {
		userMobile: string;
		userPassword: string;
		terms: boolean;
	}) => {
		this.checkInputFocus(post);
		if (!this.checkControlPost(post)) {
			this.markFormTouched(this.logIn);
			if (this.logIn.valid && this.findInvalidControlsLogin().length === 0) {
				this.error = '';
				this.preventAbuse = true
				this.login(JSON.stringify(post)).then((success: USER_RESPONSE) => {
					success.storeID = '';
					if (post.terms === true) {
						localStorage.setItem('USER_LOGGED', JSON.stringify(success));
						sessionStorage.removeItem('USER_LOGGED');
					} else {
						sessionStorage.setItem('USER_LOGGED', JSON.stringify(success));
						localStorage.removeItem('USER_LOGGED');
					}
					this.auth.updateUser(success);
					this.preventAbuse = false;
					setTimeout(() => {
						this.root.forceReload();
						if (this.list[0].status === 'Location') {
							if (success.address.length > 0) {
								this.onClose();
								this.openAddress(success.address, this.list[0].product, this.list[0].status);
							}
							if (success.address.length === 0) {
								this.onClose();
								setTimeout(() => {
									this.modal.show(AlertComponent, { id: 93, animated: false, ignoreBackdropClick: true, keyboard: false, class: 'modal-sm modal-dialog-centered' });
								}, 700);
							}
							this.root.update_user_status$.next('update_header');
						}
						if (this.list[0].status === 'Header') {
							this.triggerEvent('Confirmed');
							this.root.update_user_status$.next('update_header');
							this.root.update_user_status$.next('refresh_or_reload');
							this.onClose();
						}
						this.logIn.reset();
					}, 500);
				}).catch((error: string) => {
					this.error = error;
					this.preventAbuse = false;
					this.triggerEvent('Error');
					this.cd.markForCheck();
				});
			} else { this.logIn.controls.terms.setValue(false); }
		}
		if (this.checkControlPost(post)) {
			this.markFormTouched(this.logIn);
		}
	}
	login = (post: string) => {
		return new Promise((resolve, reject) => {
			this.auth.signIn(post).subscribe((r: { data: USER_RESPONSE[]; status: string; message: string; }) => {
				if (r.status === 'true') {
					resolve(r.data[0]);
				} else {
					reject('Invalid username and password');
				}
			}, () => {
				reject('Oops! Something went wrong.');
			}
			);
		});
	}
	openAddress = (add: ADDRESS[], product: ProductList, status: string) => {
		const initialState = {
			list: [{
				status: status,
				product: product,
				address: add
			}]
		};
		this.bsModal = this.modal.show(AddressListComponent, { id: 499, initialState });
	}
	checkInputFocus = (post: { userMobile: string; userPassword: string; terms: boolean; }) => {
		let temp = false;
		Object.keys(post).forEach((key) => {
			if (key === 'userMobile' && !post[key] && !temp) {
				this.emailInput.nativeElement.focus();
				temp = true;
			}
			if (key === 'userPassword' && !post[key] && !temp) {
				this.passwordInput.nativeElement.focus();
				temp = true;
			}
		});
	}
	checkControlPost = (post: {
		userMobile: string;
		userPassword: string;
		terms: boolean;
	}) => {
		let invalid = false;
		Object.keys(post).forEach((key: string) => {
			if (key === 'userMobile' && !this.logIn.get(`${key}`).value) {
				this.logIn.get(`${key}`).setValidators([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)]);
				this.logIn.get(`${key}`).updateValueAndValidity({ onlySelf: true });
				return invalid = true;
			}
			if (key === 'userPassword' && !this.logIn.get(`${key}`).value) {
				this.logIn.get(`${key}`).setValidators([Validators.required]);
				this.logIn.get(`${key}`).updateValueAndValidity({ onlySelf: true });
				return invalid = true;
			}
		});
		return invalid;
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
	findInvalidControlsLogin = () => {
		const invalid = [];
		const controls = this.logIn.controls;
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
	openRegistration = () => {
		this.onClose();
		const initialState = {
			list: [{
				status: 'Location',
				product: this.list[0].product
			}]
		};
		this.bsModal = this.modal.show(RegistrationComponent, { id: 999, initialState });
	}
	openForgot = () => {
		this.onClose();
		this.bsModal = this.modal.show(ForgotComponent, { id: 100 });
	}
	ngOnInit(): void {
	}
}
