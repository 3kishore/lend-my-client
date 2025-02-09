import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-application-success',
  standalone: true,
  imports: [],
  templateUrl: './application-success.component.html',
  styleUrl: './application-success.component.scss'
})
export class ApplicationSuccessComponent {
  readonly dialogRef = inject(MatDialogRef<ApplicationSuccessComponent>);

  checkLoanStatus() {
    this.dialogRef.close(true)
  }

  submitAnotherRequest() {
    this.dialogRef.close(false)
  }
}
