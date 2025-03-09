import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../atoms/button/button.component';
import { IButton } from '../../atoms/button/button.interface';
import { EButtonType } from '../../atoms/button/button-type.enum';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss'
})
export class ConfirmationModalComponent {

  readonly dialogRef = inject(MatDialogRef<ConfirmationModalComponent>);

  readonly data = inject<any>(MAT_DIALOG_DATA);

  cancelBtnConfig: IButton = {
    id: 'cancel',
    label: 'Cancel',
    type: EButtonType.SECONDARY
  }

  confirmBtnConfig: IButton = {
    id: 'confirm',
    label: 'confirm',
    type: EButtonType.PRIMARY
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    this.dialogRef.close(true);
  }
}
