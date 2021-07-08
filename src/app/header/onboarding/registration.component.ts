import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthenticationService } from 'src/app/authentication.service';
import { USER_RESPONSE } from 'src/app/interface';
import { LoginComponent } from './login.component';

@Component({
	selector: 'app-registration',
	template: `
    <!--Modal Signup -->
		<div class="modal-contents">
		  <div class="modal-header">
		   <h5 class="modal-title w-100 text-center" id="exampleModalLabel">Sign up</h5>
		   <button type="button" (click)="!preventAbuse ? onClose() : ''" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">×</span></button>
		  </div>
		  <div class="modal-body">
			  <form class="text-left profile-form" [formGroup]="registerForm" (ngSubmit)="onClickregister(registerForm.value);"> 				 	
				<div class="CandidateRegister">	
				  <div class="form-row">
					  <div class="col-md-12 col-sm-12 form-group">
						 <input type="text" #userFullNameInput formControlName="userFullName" id="name" class="form-control" placeholder="Name">
						 <small class="text-danger small" *ngIf="registerForm.controls['userFullName'].hasError('required')">Please enter name.</small>
						 <small class="text-danger small" *ngIf="registerForm.controls['userFullName'].hasError('minlength')">Input fields will not be less than 3 characters.</small>
                      	 <small class="text-danger small" *ngIf="registerForm.controls['userFullName'].hasError('maxlength')">Input fields will not be more than 60 characters.</small>
					  </div> 
					  <div class="col-md-12 col-sm-12 form-group">
						 <input type="text" #userNameInput formControlName="userName" id="uname" class="form-control" placeholder="Username">
						 <small class="text-danger small" *ngIf="registerForm.controls['userName'].hasError('required')">Please enter user name.</small>
					  </div> 
					  <div class="col-md-12 col-sm-12 form-group">
					  	 <a class="pasword-hideshow cursr" (click)="hideNew=!hideNew"><i class="fa " [ngClass]="{'fa-eye': !hideNew, 'fa-eye-slash': hideNew}"></i></a>
						 <input type="password" [type]=" hideNew ? 'password' : 'text' " #userPasswordInput (keydown.space)="$event.preventDefault();" formControlName="userPassword" id="defaultPassword" class="form-control" placeholder="Password">
						 <small class="text-danger small" *ngIf="registerForm.controls['userPassword'].hasError('required')">Please enter password.</small>
						 <small class="text-danger" *ngIf="registerForm.controls['userPassword'].hasError('pattern') && (registerForm.controls['userPassword'].dirty || registerForm.controls['userPassword'].touched)">Password needs to be at least eight characters, one uppercase letter and one number.</small>
					  </div>
					  <div class="col-md-12 col-sm-12 form-group">
					  	 <a class="pasword-hideshow cursr" (click)="hideReenter=!hideReenter"><i class="fa " [ngClass]="{'fa-eye': !hideReenter, 'fa-eye-slash': hideReenter}"></i></a>
						 <input type="password" [type]=" hideReenter ? 'password' : 'text' " #userRePasswordInput (keydown.space)="$event.preventDefault();" formControlName="userRePassword" id="confirmtPassword" class="form-control" placeholder="Confirm Password">
						 <small class="text-danger small" *ngIf="registerForm.controls['userRePassword'].hasError('required')">Please re-enter password.</small>
						 <small class="text-danger " *ngIf="registerForm.hasError('confirmedValidator')">Re-enter Password is not match.</small>
					  </div>
					  <div class="col-md-12 col-sm-12 form-group">
						<input type="text" id="Email" #userEmailInput (keydown.space)="$event.preventDefault();" formControlName="userEmail" class="form-control" placeholder="Email Address">
						<small class="text-danger small" *ngIf="registerForm.controls['userEmail'].hasError('required')">Please enter email.</small>
						<small class="text-danger" *ngIf="registerForm.controls['userEmail'].hasError('emailAlreadyExist')">email already exist.</small>
						<small class="text-danger small" *ngIf="registerForm.controls['userEmail'].hasError('pattern')">Please enter valid email.</small>
					  </div>
					  <div class="col-md-12 col-sm-12 form-group">
						<input type="text" maxlength="10" id="phone" #userMobileInput (keydown.space)="$event.preventDefault();" formControlName="userMobile" class="form-control" placeholder="Mobile Number">
						<small class="text-danger small" *ngIf="registerForm.controls['userMobile'].hasError('required')">Please enter mobile.</small>
						<small class="text-danger" *ngIf="registerForm.controls['userMobile'].hasError('mobileExist')">mobile already exist.</small>
						<small class="text-danger" *ngIf="registerForm.controls['userMobile'].hasError('pattern') && (registerForm.controls['userMobile'].dirty || registerForm.controls['userMobile'].touched)">Please enter valid mobile number.</small>
					  </div> 			
				  </div> 
				  <div class="form-row pt-3">
					  <div class="col">
						<button type="submit" [disabled]="preventAbuse" class="btn btn-them btn-md w-100" data-toggle="modal" data-target="#OTPVerification">{{ preventAbuse ? 'Wait..' : 'Sign Up' }}</button>
					  </div> 
				  </div>  	
				  <div class="pt-3 signupbtn text-center">
					  <span>Already having account?</span> <a class="cursr ml-1" (click)="openlogin()" data-toggle="modal">Login</a>
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
	}`
	], changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit {
	bModalRef: BsModalRef;
	registerForm: FormGroup;
	error: string;
	hideNew = true;
	hideReenter = true;
	preventAbuse = false;
	event: EventEmitter<{ data: string, res: number }> = new EventEmitter();
	@ViewChild('userFullNameInput', { static: false }) userFullName: ElementRef;
	@ViewChild('userEmailInput', { static: false }) userEmail: ElementRef;
	@ViewChild('userNameInput', { static: false }) userName: ElementRef;
	@ViewChild('userMobileInput', { static: false }) userMobile: ElementRef;
	@ViewChild('userPasswordInput', { static: false }) userPassword: ElementRef;
	@ViewChild('userRePasswordInput', { static: false }) userRePassword: ElementRef;
	constructor(
		private modal: BsModalService,
		private bsModal: BsModalRef,
		private fb: FormBuilder,
		private auth: AuthenticationService,
		private cd: ChangeDetectorRef
	) {
		// for register
		this.registerForm = this.fb.group({
			userFullName: [''],
			userName: [''],
			userPassword: ['', Validators.compose([Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)])],
			userRePassword: [''],
			userEmail: ['', Validators.compose([Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
			userMobile: ['', Validators.compose([Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
			nationalityID: ['102'],
			userDOB: ['2000-12-24'],
			languageID: ['1'],
			loginuserID: ['0']
		}, { validators: this.checkPasswords });
	}
	checkPasswords = (group: FormGroup) => {
		const password = group.get('userPassword').value;
		const confirmPassword = group.get('userRePassword').value;
		if (password && confirmPassword) {
		  return password === confirmPassword ? null : { confirmedValidator: true };
		}
	  }
	onClickregister = async (post: {
		userFullName: string;
		userName: string;
		userPassword: string;
		userRePassword: string;
		userEmail: string;
		userMobile: string;
	}) => {
		this.checkInputFocus(post);
		if (!this.checkControlPost(post)) {
			this.markFormTouched(this.registerForm);
			if (this.registerForm.valid && this.findInvalidControlsregister().length === 0) {
				this.error = '';
				this.preventAbuse = true
				// checking for duplicate user!!!!
				await this.duplicate(JSON.stringify(post)).then(async (r: {
					status: string;
					message: string;
				}) => {
					if (r.status === 'true') {
						this.register(JSON.stringify(post)).then((success: USER_RESPONSE) => {
							this.preventAbuse = false;
							setTimeout(() => {
								this.onClose()
								this.registerForm.reset();
								this.triggerEvent('Confirmed');
							}, 100);
						}).catch((error: string) => {
							this.error = error;
							this.preventAbuse = false;
							this.triggerEvent('Error');
							this.cd.markForCheck();
						});
					}
					if (r.status === 'false') {
						this.preventAbuse = false;
						this.registerForm.controls.doctorEmail.setErrors({ emailAlreadyExist: true });
						this.registerForm.controls.doctorMobile.setErrors({ mobileExist: true });
						this.cd.markForCheck();
					}
				}).catch(() => {
					this.preventAbuse = false;
					this.error = 'some error occured, try again.';
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
					reject('some error occured.');
				}
			}, () => {
				reject('some error occured.');
			}
			);
		});
	}
	checkInputFocus = (post: {
		userFullName: string;
		userName: string;
		userPassword: string;
		userRePassword: string;
		userEmail: string;
		userMobile: string;
	}) => {
		let temp = false;
		Object.keys(post).forEach((key) => {
			if (key === 'userFullName' && !post[key] && !temp) {
				this.userFullName.nativeElement.focus();
				temp = true;
			}
			if (key === 'userName' && !post[key] && !temp) {
				this.userName.nativeElement.focus();
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
	checkControlPost = (post: {
		userFullName: string;
		userName: string;
		userPassword: string;
		userRePassword: string;
		userEmail: string;
		userMobile: string;
	}) => {
		let invalid = false;
		Object.keys(post).forEach((key: string) => {
			if (key === 'userFullName' && !this.registerForm.get(`${key}`).value) {
				this.registerForm.get(`${key}`).setValidators([Validators.required, Validators.maxLength(60), Validators.minLength(3)]);
				this.registerForm.get(`${key}`).updateValueAndValidity({ onlySelf: true });
				return invalid = true;
			}
			if (key === 'userName' && !this.registerForm.get(`${key}`).value) {
				this.registerForm.get(`${key}`).setValidators([Validators.required, Validators.maxLength(60), Validators.minLength(3)]);
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
		this.bsModal = this.modal.show(LoginComponent, { id: 99 });
	}
}
