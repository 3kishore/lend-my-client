import { EBadgeType } from "./badge-type.enum";
import { EIconAlignment } from "./icon-alignment.enum";

export interface IBadge {
  id: string,
  type: EBadgeType;
  customClass?: string;
  iconAlignment?: EIconAlignment;
  iconPath?: string;
  content: {
    content: string | number;
    value?: string | number;
  }
  toolTip?: string;
  isIconActionable?: boolean;
}
