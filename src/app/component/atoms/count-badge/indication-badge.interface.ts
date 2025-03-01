import { EIndicationBadge } from "./indication-badge-type.enum";

export interface IIndicationBadge {
  label: string;
  type: EIndicationBadge;
  count?: string | number;
}
