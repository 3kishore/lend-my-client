import { TemplateRef } from "@angular/core";
import { IButton } from "../../atoms/button/button.interface";

export interface IModal {
  title: string;
  description?: string;
  templateRef?: TemplateRef<any>;
  data: any;
  showCloseBtn: boolean;
  closeBtnLabel?: string;
  exportForm?: boolean;
  buttonList: Array<IModalButton>;
  restrictOutSieClick: boolean;
  showOnlyPfd?: boolean;
}

export interface IModalButton {
  button: IButton;
  action?: Function;
}
