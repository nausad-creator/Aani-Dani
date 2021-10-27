import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthenticationService } from 'src/app/authentication.service';
import { LoginComponent } from './login.component';
import { OtpComponent } from './otp.component';
import { ToastrService } from 'ngx-toastr';
import { FORGOT } from 'src/app/interface';

@Component({
	selector: 'app-forgot',
	template: `
    <!--Modal Forgot Password-->
    <div class="modal-contents" [loader]="preventAbuse">
      <div class="modal-header text-center d-block position-relative" style="border: none;">
         <a (click)="!preventAbuse ? openforgetForm() : ''" class="backicon cursr"><img src="assets/images/back-icon.png" alt="icon"></a>
         <h5 class="modal-title" id="exampleModalLabel">{{'forgot_password' | translate}}?</h5>
         <p class="mb-0" style="color: #6a7081;">{{'enter_register_email_or_mobile_to_reset_password' | translate}}</p>
      </div>
      <div class="modal-body">
        <!-- error handler -->
      <div class="alert alert-danger" role="alert" *ngIf="error">
        <h5 class="alert-heading text-center">Error!</h5>
        <p class="mb-0 text-center">{{error}}</p>
      </div>
      <!-- handler end -->
      <form class="text-left profile-form" [formGroup]="forgetForm" (ngSubmit)="onSubmitEmailOrMobile(forgetForm.value)">             
        <div class="form-row">
          <div class="col-md-12 col-sm-12 mb-2 form-group">
              <input type="text" id="Email-Mobile" #forgotEmail (keydown.space)="$event.preventDefault()" formControlName="userEmail" class="form-control" [placeholder]="'enter_email_or_mobile' | translate">
              <small class="text-danger" *ngIf="forgetForm.controls['userEmail'].hasError('required')">{{'this_field_is_required' | translate}}</small>
              <small class="text-danger" *ngIf="forgetForm.controls['userEmail'].hasError('pattern') && (forgetForm.controls['userEmail'].dirty || forgetForm.controls['userEmail'].touched)">{{'please_enter_valid_email_or_mobile' | translate}}</small>
          </div>        
          <div class="col-md-12 col-sm-12 mb-2 mt-3">                      
              <button type="submit" [disabled]="preventAbuse" class="btn btn-them btn-md w-100">{{ preventAbuse ? ('wait' | translate) : ('send_otp' | translate) }}</button>            
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
	]
})
export class ForgotComponent {
	bModalRef: BsModalRef;
	preventAbuse = false;
	error: string;
	forgetForm: FormGroup;
	@ViewChild('forgotEmail', { static: false }) forgotEmail: ElementRef;
	constructor(
		private modal: BsModalService,
		private bsModal: BsModalRef,
		private fb: FormBuilder,
		private auth: AuthenticationService,
		private toastr: ToastrService,
		private cd: ChangeDetectorRef
	) {
		this.forgetForm = this.fb.group({
			userEmail: ['', Validators.compose([Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
			userMobile: [''],
			languageID: ['1'],
			userCountryCode: ['+91']
		});
	}
	onSubmitEmailOrMobile = (post: { userEmail: string; userMobile: string; languageID: string }) => {
		if (!this.checkControlPost(post)) {
			this.markFormTouched(this.forgetForm);
			if (this.forgetForm.valid) {
				this.error = '';
				this.preventAbuse = true
				if (!isNaN(+post.userEmail)) {
					this.forgetForm.get('userMobile').patchValue(post.userEmail);
					this.forgetForm.get('userEmail').patchValue('');
					this.forgetPassword(JSON.stringify(this.forgetForm.value)).then((res: FORGOT) => {
						this.preventAbuse = false
						setTimeout(() => {
							this.forgetForm.reset();
							this.openOTP({
								userMobile: res.userMobile ? res.userMobile : post.userEmail,
								userID: res.userID ? res.userID : '1',
								status: res.status ? res.status : 'false',
								message: res.message ? res.message : 'New_User'
							}, 'mobile number');
							this.toastr.success('We have sent otp on your registered mobile.');
						}, 100);
					}).catch((error) => {
						this.error = error;
						this.cd.markForCheck();
					});
				} else {
					this.forgetForm.get('userEmail').patchValue(post.userEmail);
					this.forgetForm.get('userMobile').patchValue('');
					this.forgetPassword(JSON.stringify(this.forgetForm.value)).then((res: FORGOT) => {
						this.preventAbuse = false
						setTimeout(() => {
							this.forgetForm.reset();
							this.openOTP({
								userMobile: res.userMobile ? res.userMobile : post.userEmail,
								userID: res.userID ? res.userID : '1',
								status: res.status ? res.status : 'false',
								message: res.message ? res.message : 'New_User'
							}, 'email address');
							this.toastr.success('We have sent otp on your registered email.');
						}, 100);
					}).catch((error) => {
						this.error = error;
						this.cd.markForCheck();
					});
				}
			}
		}
	}
	checkControlPost = (post: {
		userEmail: string;
	}) => {
		let invalid = false;
		Object.keys(post).forEach((key: string) => {
			if (key === 'userEmail' && !this.forgetForm.get(`${key}`).value) {
				this.forgotEmail.nativeElement.focus();
				this.forgetForm.get(`${key}`).setValidators([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)]);
				this.forgetForm.get(`${key}`).updateValueAndValidity({ onlySelf: true });
				return invalid = true;
			}
		});
		return invalid;
	}
	forgetPassword = (data: string) => {
		return new Promise((resolve, reject) => {
			this.auth.forgot(data).subscribe((res: FORGOT) => {
				if (res.status === 'true') {
					resolve(res);
				} else {
					reject('Invalid username!');
				}
			}, () => reject('Oops! Something went wrong!'));
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
	onClose = () => {
		this.bsModal.hide();
	}
	openforgetForm = () => {
		this.onClose();
		this.bsModal = this.modal.show(LoginComponent, { id: 99 });
	}
	openOTP = (res: FORGOT, msg: string) => {
		this.onClose();
		const initialState = {
			list: [{
				res,
				msg,
				status: 'forget'
			}]
		};
		this.bsModal = this.modal.show(OtpComponent, { id: 101, initialState });
	}
}
