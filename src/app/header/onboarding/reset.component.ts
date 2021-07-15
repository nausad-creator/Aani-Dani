import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/authentication.service';
import { FORGOT, USER_RESPONSE } from 'src/app/interface';
import { RootService } from 'src/app/root.service';
import { OtpComponent } from './otp.component';
interface Reset {
  loginuserID: string;
  userNewPassword: string;
  userReNewPassword: string;
  languageID: string;
}
@Component({
  selector: 'app-reset',
  template: `
    <!--Modal Reset Password-->
    <div class="modal-contents">
      <div class="modal-header text-center d-block position-relative" style="border: none;">
         <a (click)="!preventAbuse ? openOTP({
          userMobile: list[0].userMobile,
	        userID: list[0].userID,
	        status: 'true',
	        message: ''
         }) : ''" class="backicon cursr"><img src="assets/images/back-icon.png" alt="icon"></a>
         <h5 class="modal-title" id="exampleModalLabel">Reset Password?</h5>
         <p class="mb-0" style="color: #6a7081;">Please type the verification code sent to your mobile number</p>
      </div>
      <div class="modal-body">
      <form class="text-left profile-form" [formGroup]="resetForm" (ngSubmit)="onReset(resetForm.value)">             
        <div class="form-row">
          <div class="col-md-12 col-sm-12 form-group">
              <a class="pasword-hideshow cursr" (click)="new=!new"><i class="fa " [ngClass]="{'fa-eye': !new, 'fa-eye-slash': new}"></i></a>
              <input #userNewPassword type="password" [type]=" new ? 'password' : 'text' " formControlName="userNewPassword" (keydown.space)="$event.preventDefault()" placeholder="Enter new password" class="form-control" id="NewPassword" name="NewPassword" />
              <small class="text-danger" *ngIf="resetForm.controls['userNewPassword'].hasError('required')">Please enter new password.</small>
              <small class="text-danger" *ngIf="resetForm.controls['userNewPassword'].hasError('pattern') && (resetForm.controls['userNewPassword'].dirty || resetForm.controls['userNewPassword'].touched)">Password needs to be at least eight characters, one uppercase letter and one number.</small>
          </div>
          <div class="col-md-12 col-sm-12 form-group">
              <a class="pasword-hideshow cursr" (click)="confirm=!confirm"><i class="fa " [ngClass]="{'fa-eye': !confirm, 'fa-eye-slash': confirm}"></i></a>
              <input #userReNewPassword type="password" [type]=" confirm ? 'password' : 'text' " formControlName="userReNewPassword" (keydown.space)="$event.preventDefault()" class="form-control" placeholder="Enter re-new password" id="ConfirmPassword" name="ConfirmPassword" />
              <small class="text-danger" *ngIf="resetForm.controls['userReNewPassword'].hasError('required')">Please enter Re-enter new password.</small>
              <small class="text-danger " *ngIf="resetForm.hasError('confirmedValidator')">Re-enter Password is not match.</small>
          </div>  
          <div class="col-md-12 col-sm-12 mt-3">                      
              <button type="submit" [disabled]="preventAbuse" class="btn btn-them btn-md w-100">{{ preventAbuse ? 'Wait..' : 'Reset Password' }}</button>            
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
export class ResetComponent implements OnInit {
  bModalRef: BsModalRef;
  resetForm: FormGroup;
  message: string;
  error: string;
  new = true;
  confirm = true;
  preventAbuse = false;
  list: USER_RESPONSE[] = [];
  event: EventEmitter<{ data: string, res: number }> = new EventEmitter();
  @ViewChild('userNewPassword', { static: false }) userNewPassword: ElementRef;
  @ViewChild('userReNewPassword', { static: false }) userReNewPassword: ElementRef;
  constructor(
    private modal: BsModalService,
    private bsModal: BsModalRef,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
    private auth: AuthenticationService,
    private root: RootService
  ) { }
  ngOnInit(): void {
    this.resetForm = this.fb.group({
        userNewPassword: ['', Validators.compose([Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)])],
        userReNewPassword: [''],
        loginuserID: [this.list[0].userID]
      }, { validators: this.checkPasswords });
  }
  checkPasswords = (group: FormGroup) => {
    const password = group.get('userNewPassword').value;
    const confirmPassword = group.get('userReNewPassword').value;
    if (password && confirmPassword) {
      return password === confirmPassword ? null : { confirmedValidator: true };
    }
  }
  onReset = (post: Reset) => {
    if (!post.userNewPassword && !post.userNewPassword) {
            this.userNewPassword.nativeElement.focus();
            this.resetForm.get('userNewPassword').setValidators([Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)]);
            this.resetForm.get('userNewPassword').updateValueAndValidity({ onlySelf: true });
            this.resetForm.get('userReNewPassword').setValidators([Validators.required]);
            this.resetForm.get('userReNewPassword').updateValueAndValidity({ onlySelf: true });
    }
    if (post.userNewPassword && !post.userReNewPassword) {
            this.userReNewPassword.nativeElement.focus();
            this.resetForm.get('userReNewPassword').setValidators([Validators.required]);
            this.resetForm.get('userReNewPassword').updateValueAndValidity({ onlySelf: true });
    }
    this.markFormTouched(this.resetForm);
    if (this.resetForm.valid && this.findInvalidControlsReset().length === 0) {
            this.error = '';
            this.preventAbuse = true;
            this.reset(JSON.stringify(this.resetForm.value)).then((data: USER_RESPONSE) => {
            if (data) {
                sessionStorage.setItem('USER_LOGGED', JSON.stringify(data));
						    localStorage.removeItem('USER_LOGGED');
                this.auth.updateUser(data);
					      this.preventAbuse = false;
                this.triggerEvent('Confirmed');
                this.root.update_user_status$.next('302');
                setTimeout(() => {
                    this.onClose()
                    this.resetForm.reset();
                    this.toastr.success('Password updated successfully');
            });
            } else {
                    this.triggerEvent('Error');
                    this.error = 'error occured, please try again later.';
                    this.cd.markForCheck();
            }
      }).catch((error) => {
        this.error = error;
        console.error(error);
        this.cd.markForCheck();
      });
    }
  }
  reset = (post: string) => {
        return new Promise((resolve, reject) => {
              this.auth.resetPassword(post).subscribe((res: USER_RESPONSE) => {
                    if (res) {
                            resolve(res);
                    } else {
                            reject('error occured, please try again later!');
                    }
                    }, () => reject('error occured, please try again later!'));
            });
  }
  triggerEvent = (item: string) => {
		this.event.emit({ data: item, res: 200 });
	}
  findInvalidControlsReset = () => {
    const invalid = [];
    const controls = this.resetForm.controls;
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
  onClose = () => {
    this.bsModal.hide();
  }
  openOTP = (res: FORGOT) => {
    this.onClose();
    const initialState = {
      list: [{
        res,
        msg: '',
        status: 'forget'
      }]
    };
    this.bsModal = this.modal.show(OtpComponent, { id: 101, initialState });
  }
}
