import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountService } from '../../../services/api/account.service';
import { AppDataService } from '../../../utils/storage/app-data.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  readonly dialogRef = inject(MatDialogRef<ForgotPasswordComponent>);
  
  resetPassWord: FormGroup;

  isPassResetFailed = false;

  isVerifyMailTriggered = false;

  message = '';

  // attemptCount = 0;

  constructor(
    private fb: FormBuilder,
    private accService: AccountService,
    private dataService: AppDataService
  ) {
    this.resetPassWord = this.fb.group({
      userId: ['', Validators.compose([Validators.required, Validators.pattern(/^\d{10}$|^[^\s@]+@[^\s@]+\.[^\s@]+$/)])]
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onResetPassword() {
    this.dataService.updateAppLoader(true);
    this.accService.resetPass(this.resetPassWord.value).subscribe({
      next: (resp) => {
        if(resp.status) {
          this.isVerifyMailTriggered = true;
          this.message = resp.message ? resp.message : `Reset password link hasbeen sent to your email. Kindly check the inbox of ${resp.content.email}`
        } else {
          this.isPassResetFailed = true;
          this.message = resp.message ? resp.message : 'Something went wrong please try again time later.';
        }
        this.dataService.updateAppLoader(false);
      }, error: (err) => {
        this.isPassResetFailed = true;
        this.message = 'Something went wrong please try again time later.';
        this.dataService.updateAppLoader(false);
      }
    })
  }
}
