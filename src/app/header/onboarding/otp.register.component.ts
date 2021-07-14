import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/authentication.service';
import { FORGOT, USER_RESPONSE } from 'src/app/interface';
import { ForgotComponent } from './forgot.component';
import { ResetComponent } from './reset.component';
interface List {
	res: FORGOT
	msg: string;
	status: string;
}
interface Otp {
	loginrestaurantID: string;
	restaurantOTP: string;
	languageID: string;
	userOTP1: string;
	userOTP2: string;
	userOTP3: string;
	userOTP4: string;
}
@Component({
	selector: 'app-otp-register',
	template: `
    <!--Modal OTP Verification-->
	    <div class="modal-contents">
	      <div class="modal-header text-center d-block position-relative" style="border: none;">
	         <a (click)="!preventAbuse ? openForgot() : ''" class="backicon cursr"><img src="assets/images/back-icon.png" alt="icon"></a>
	         <h5 class="modal-title" id="exampleModalLabel">Verification</h5>
	         <p class="mb-0" style="color: #6a7081;">Please enter the 4 - digit OTP <br>received on your email/ mobile number</p>
	      </div>

	      <div class="modal-body">
			  <!-- error handler -->
			  <div class="alert alert-danger" role="alert" *ngIf="error">
        			<h5 class="alert-heading text-center">Error!</h5>
        			<p class="mb-0 text-center">{{error}}</p>
      			</div>
      			<!-- handler end -->
		      <form class="text-left profile-form otp-adding" [formGroup]="verificationForm" (ngSubmit)="onSubmitOTP(verificationForm.value)" action="post">             
		        <div class="row digit-group">
		          <div class="col-3 form-group">             
		             <input type="text" id="digit-5" #userOTP1 formControlName="userOTP1" name="digit-5" data-next="digit-6" class="form-control" value="">
		          </div>
		          <div class="col-3 form-group">    
		             <input type="text" id="digit-6" #userOTP2 formControlName="userOTP2" name="digit-6" data-next="digit-7" data-previous="digit-5" class="form-control" value="">
		          </div>
		          <div class="col-3 form-group">    
		             <input type="text" id="digit-7" #userOTP3 formControlName="userOTP3" name="digit-7" data-next="digit-8" data-previous="digit-6" class="form-control" value="">
		          </div>
		          <div class="col-3 form-group">    
		             <input type="text" id="digit-8" #userOTP4 formControlName="userOTP4" name="digit-8" data-next="digit-9" data-previous="digit-7" class="form-control" value="">
		          </div>        
		          
		          <div class="col-md-12 col-sm-12 mb-2 mt-3 text-center">
		              <a (click)="onResendClick(); error=''" class="text-blue cursr">Resend OTP</a>
		              <button type="submit" [disabled]="preventAbuse" class="btn btn-them btn-md w-100 mt-2">{{ preventAbuse ? 'Wait..' : 'Submit' }}</button>
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
export class OtpRegisterComponent implements OnInit {
	bModalRef: BsModalRef;
	verificationForm: FormGroup;
	error: string;
	status: string;
	list: USER_RESPONSE[] = [];
	preventAbuse = false;
	@ViewChild('userOTP1', { static: false }) userOTP1: ElementRef;
	@ViewChild('userOTP2', { static: false }) userOTP2: ElementRef;
	@ViewChild('userOTP3', { static: false }) userOTP3: ElementRef;
	@ViewChild('userOTP4', { static: false }) userOTP4: ElementRef;
	constructor(
		private modal: BsModalService,
		private bsModal: BsModalRef,
		private toastr: ToastrService,
		private cd: ChangeDetectorRef,
		private fb: FormBuilder,
		private auth: AuthenticationService
	) {}
	onResendClick = () => {
		this.auth.otpResendVerification(JSON.stringify(this.verificationForm.value)).subscribe(
			(res) => {
				if (res === 'true') {
					this.verificationForm.get('userOTP1').patchValue('');
					this.verificationForm.get('userOTP2').patchValue('');
					this.verificationForm.get('userOTP3').patchValue('');
					this.verificationForm.get('userOTP4').patchValue('');
					this.verificationForm.markAsUntouched();
					this.toastr.success('OTP successfully resend');
				} else {
					this.error = 'error occured, please try again later!';
					this.cd.markForCheck();
				}
			}, (error) => {
				console.error(error);
			}
		);
	}
	onSubmitOTP = (post: Otp) => {
		this.checkInputFocus(post);
		if (!post.userOTP1) {
			this.verificationForm.get('userOTP1').setValidators([Validators.pattern('^[0-9]*$'), Validators.required]);
			this.verificationForm.get('userOTP1').updateValueAndValidity({ onlySelf: true });
		}
		if (!post.userOTP2) {
			this.verificationForm.get('userOTP2').setValidators([Validators.pattern('^[0-9]*$'), Validators.required]);
			this.verificationForm.get('userOTP2').updateValueAndValidity({ onlySelf: true });
		}
		if (!post.userOTP3) {
			this.verificationForm.get('userOTP3').setValidators([Validators.pattern('^[0-9]*$'), Validators.required]);
			this.verificationForm.get('userOTP3').updateValueAndValidity({ onlySelf: true });
		}
		if (!post.userOTP4) {
			this.verificationForm.get('userOTP4').setValidators([Validators.pattern('^[0-9]*$'), Validators.required]);
			this.verificationForm.get('userOTP4').updateValueAndValidity({ onlySelf: true });
		}
		this.markFormTouched(this.verificationForm);
		if (this.verificationForm.valid && this.findInvalidControls().length === 0) {
			this.preventAbuse = true;
			this.verificationForm.get('userOTP').patchValue(`${post.userOTP1}${post.userOTP2}${post.userOTP3}${post.userOTP4}`)
			this.submitOTP(JSON.stringify(this.verificationForm.value)).then((res: USER_RESPONSE) => {
                sessionStorage.setItem('USER_LOGGED', JSON.stringify(res));
				localStorage.removeItem('USER_LOGGED');
                this.auth.updateUser(res);
				setTimeout(() => {
					this.preventAbuse = false;
					this.verificationForm.reset();
                    this.onClose();
				}, 100);
			}).catch((error) => {
				this.error = error;
				this.preventAbuse = false;
				this.cd.markForCheck();
			});
		}
	}
	checkInputFocus = (post: Otp) => {
		let temp = false;
		Object.keys(post).forEach((key) => {
			if (key === 'userOTP1' && !post[key] && !temp) {
				this.userOTP1.nativeElement.focus();
				temp = true;
			}
			if (key === 'userOTP2' && !post[key] && !temp) {
				this.userOTP2.nativeElement.focus();
				temp = true;
			}
			if (key === 'userOTP3' && !post[key] && !temp) {
				this.userOTP3.nativeElement.focus();
				temp = true;
			}
			if (key === 'userOTP4' && !post[key] && !temp) {
				this.userOTP4.nativeElement.focus();
				temp = true;
			}
		});
	}
	submitOTP = (post: string) => {
		return new Promise((resolve, reject) => {
			this.auth.otpVerification(post).subscribe((response) => {
				if (response) {
					resolve(response);
				} else {
					reject('Invalid OTP!');
				}
			}, () => reject('Invalid OTP!'));
		});
	}
	findInvalidControls = () => {
		const invalid = [];
		const controls = this.verificationForm.controls;
		for (const name in controls) {
			if (controls[name].invalid) {
				invalid.push(name);
			}
		}
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
	focus = () => {
		$('.digit-group').find('input').each(function () {
			$(this).attr('maxlength', 1);
			$(this).on('keyup', function (e) {
				const parent = $($(this).parent());
				if (e.keyCode === 8 || e.keyCode === 37) {
					const prev = parent.closest('div').prev().find('input#' + $(this).data('previous'));
					if (prev.length) {
						$(prev).select();
					}
				} else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
					const next = parent.closest('div').next().find('input#' + $(this).data('next'));
					if (next.length) {
						$(next).select();
					} else {
						if (parent.data('autosubmit')) {
							parent.submit();
						}
					}
				}
			});
		});
	}
	onClose = () => {
		this.bsModal.hide();
	}
	openForgot = () => {
		this.onClose();
		this.bsModal = this.modal.show(ForgotComponent, { id: 100 });
	}
	ngOnInit(): void {
		this.verificationForm = this.fb.group({
			userOTP1: [null, Validators.compose([Validators.pattern('^[0-9]*$')])],
			userOTP2: [null, Validators.compose([Validators.pattern('^[0-9]*$')])],
			userOTP3: [null, Validators.compose([Validators.pattern('^[0-9]*$')])],
			userOTP4: [null, Validators.compose([Validators.pattern('^[0-9]*$')])],
			languageID: ['1'],
			userOTP: [''],
			loginuserID: [this.list[0].userID],
			userMobile: [this.list[0].userMobile],
		});
		this.focus();
		this.status = `${this.list[0].userStatus}`;
	}
}
