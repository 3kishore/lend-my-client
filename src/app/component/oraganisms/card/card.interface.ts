import { TemplateRef } from "@angular/core";

export interface ICard {
  heading: string;
  headingNote?: string;
  block: Array<IBlock>;
  action?: Array<IAction>;
  actionTemplate?: TemplateRef<any>;
}

interface IBlock {
  heading?: string;
  description: string;
}

interface IAction {
  label: string;
  action?: Function;
}
