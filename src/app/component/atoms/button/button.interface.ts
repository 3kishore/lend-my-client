import { TemplateRef } from "@angular/core";
import { EButtonType } from "./button-type.enum";

/**
 * @description Interface IButton defines the properties of a Button component
 */
export interface IButton {
  type: EButtonType;
  customclass?: string;
  id: string;
  label: string;
  isDisabled?: boolean;
  btnTemplate?: TemplateRef<any>;
  isActive?: boolean;
  leftIconPath?: string;
  rightIconPath?: string;
  routeLink?: string;
}
