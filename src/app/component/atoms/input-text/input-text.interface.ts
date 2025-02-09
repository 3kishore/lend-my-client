import { FormControl } from "@angular/forms";

export interface IErrorMessage {
  errorType: string;
  errorMessage: string;
}

export interface IFormInputText {
  id: string;
  label?: string;
  isDisabled: boolean;
  formControl: FormControl;
  placeHolderText: string;
  iconConfig?: string;
  errorList?: Array<IErrorMessage>;
  customClass?: string;
}