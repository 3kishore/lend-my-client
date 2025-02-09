import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../../services/api/account.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  tokenValidationInprogress = true;

  isTokenValid = false;

  message = '';

  resetPassword: FormGroup;

  confirmPassMismatch = false;

  isPasswordChanged = false;

  changePasswordErrorMsg = '';

  queryParams: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accService: AccountService,
    private fb: FormBuilder
  ) {
    this.resetPassword = this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()><.])[A-Za-z\d!@#$%^&*()><.]{12,20}$/),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      }
    );

    this.resetPassword.valueChanges.subscribe({
      next: (resp) => {
        this.confirmPassMismatch = false;
        if(resp.confirmPassword && !this.resetPassword.get('confirmPassword').errors) {
          this.confirmPassMismatch = (resp.password !== resp.confirmPassword);
        }
      }
    })
  }


  ngOnInit(): void {
    console.log(window.location.pathname)
    this.activatedRoute.params.subscribe({
      next: (resp: any) => {
        console.log(resp)
        this.queryParams = resp;
        this.tokenValidationInprogress = false;
        this.isTokenValid = true;
        // this.validateToken(resp.token);

      }
    })
  }

  validateToken(token) {
    this.accService.validateToken(token).subscribe({
      next: (resp) => {
        this.tokenValidationInprogress = false;
        if(resp.status) {
          this.isTokenValid = true;
        } else {
          this.isTokenValid = false;
          this.message = resp.message;
        }
      }, error: () => {
        this.tokenValidationInprogress = false;
        this.isTokenValid = false;
        this.message = 'Something went wrong kindly retry.';
      }
    })
  }

  changePassword() {
    const payload = {
      requestId: this.queryParams.requestId,
      email: this.queryParams.email,
      password: this.resetPassword.value.password
    }
    console.log(payload)
    this.accService.changePassword(payload).subscribe({
      next: (resp) => {
        this.tokenValidationInprogress = false;
        if(resp?.status) {
          this.isPasswordChanged = true;
        } else {
          this.changePasswordErrorMsg = resp?.message ? resp?.message : 'Something went wrong kindly retry.';
        }
      }, error: () => {
        this.changePasswordErrorMsg = 'Something went wrong kindly retry.';
      }
    })
  }

  goToLogin() {
    this.router.navigate(['/login'])
  }
}
