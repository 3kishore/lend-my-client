import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../atoms/button/button.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/api/account.service';
import { SessionStorageService } from '../../../utils/storage/session-storage.service';
import { IButton } from '../../atoms/button/button.interface';
import { EButtonType } from '../../atoms/button/button-type.enum';
import { APP } from '../../../utils/constants/APP.const';
import { AppDataService } from '../../../utils/storage/app-data.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateAccountComponent } from '../../oraganisms/create-account/create-account.component';
import { ForgotPasswordComponent } from '../../oraganisms/forgot-password/forgot-password.component';
import { CommonHelperService } from '../../../utils/helpers/common-helper.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonComponent, CreateAccountComponent, ForgotPasswordComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  component$ = new Subscription();

  invalidCred!: boolean;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private sessionStorage: SessionStorageService,
    private dataService: AppDataService,
    private commonHelperService: CommonHelperService
  ) {}

  loginForm!: FormGroup;

  inputType: string = 'password';

  loginButton: IButton = {
    type: EButtonType.SECONDARY,
    customclass: `${APP.BUTTON.CUSTOM_CLASS.SECONDARY} w-full justify-center`,
    id: 'login',
    label: 'Login',
    isDisabled: true,
    isActive: false
  }
// 'login': ['userId', 'password'],
  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        userId: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^\d{10}$|^[^\s@]+@[^\s@]+\.[^\s@]+$/)])),
        password: new FormControl('', Validators.required)
      }
    )
    this.loginForm.valueChanges.subscribe({
      next: (_) => {
        console.log(this.loginForm.invalid)
        this.loginButton.isDisabled = this.loginForm.invalid
      }
    })
  }

  typeChange(type: string) {
    this.inputType = type;
  }

  btnSubmit() {
    this.dataService.updateAppLoader(true);
    this.component$.add(
      this.accountService.auth(this.loginForm.value).subscribe({
        next: (resp) => {
          if(resp.status) {
            this.commonHelperService.storeItemToSession(APP.SESSION_ITEM_KEYS.SESSION, resp.content, true);
            this.router.navigate([APP.ROUTES.LOAN_APPLICATION_STATUS]);
            setTimeout(() => {
              this.dataService.updateAppLoader(false);
            }, 150);
          } else {
            this.invalidCred = true;
            setTimeout(() => {
              this.dataService.updateAppLoader(false);
            }, 150);
          }
        },
        error: (err) => {
          this.invalidCred = true;
          setTimeout(() => {
            this.dataService.updateAppLoader(false);
          }, 150);
          console.log(err);
        }
      })
    )
  }



  readonly dialog = inject(MatDialog);

  createUser(): void {
    this.dialog.open(CreateAccountComponent);
  }

  forgotPassword(): void {
    this.dialog.open(ForgotPasswordComponent);
  }
}
