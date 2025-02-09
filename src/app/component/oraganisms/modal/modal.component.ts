import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { ButtonComponent } from '../../atoms/button/button.component';
import { EButtonType } from '../../atoms/button/button-type.enum';
import { IModal, IModalButton } from './modal.interface';
import { IButton } from '../../atoms/button/button.interface';
import { APP } from '../../../utils/constants/APP.const';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ButtonComponent, MatDialogModule],
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {

  cancelButton: IButton = {
    type: EButtonType.SECONDARY,
    customclass: APP.MODAL.BUTTON.CUSTOM_CLASS.SECONDARY,
    id: APP.MODAL.BUTTON.LABEL.CANCEL,
    label: APP.MODAL.BUTTON.LABEL.CANCEL,
    isDisabled: false,
    isActive: false
  }

  confirmButton = {
    type: EButtonType.PRIMARY,
    customclass: APP.MODAL.BUTTON.CUSTOM_CLASS.PRIMARY,
    id: 'Confirm',
    label: 'Confirm',
    isDisabled: false,
    isActive: true
  }

  modalData: IModal;

  constructor(
    private _mdr: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: IModal
  ) { this.modalData = data }

  ngOnInit(): void {
    this._mdr.disableClose = this.modalData.restrictOutSieClick;
  }

  buttonClick($event: IModalButton) {
    if($event.action) {
      $event.action();
    }
  }

  close() {
    this._mdr.close(false);
  }

  submitExportForm() {
    this._mdr.close(true);
  }

  onFormChange($event: any) {
    // this.exportFormValue = $event;
    // this.exportButton.isDisabled = !$event.valid;
  }
}
