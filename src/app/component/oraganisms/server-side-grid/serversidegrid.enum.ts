import { EBadgeType } from '../../atoms/badge/badge-type.enum';

export enum ServerSidegridSortOrder {
  UNSORTED = '',
  ASC = 'ASC',
  DESC = 'DESC',
}

/**
 * @description types of filters supported by the grid component
 */
export enum EGridFilterType {
  CHECKBOX = 'CHECKBOX',
  STRING = 'STRING',
  NUMBER = 'NUMBER',
}

export enum RefreshAction {
  NEXT = 'NEXT',
  BACK = 'BACK',
  FAST_FORWARD = 'FAST FORWARD',
  FAST_BACKWARD = 'FAST BACKWARD',
}

export enum badgeIconPath {
  CRITICAL = '../../../../assets/icons/critical-warning.svg',
  HIGH = '../../../../assets/icons/issue-high.svg',
  WARNING = '../../../../assets/icons/issue-low.svg',
  ENABLED = '../../../../assets/icons/success.svg',
  DISABLED = '../../../../assets/icons/question.svg',
  ACTIVE = '../../../../assets/icons/success.svg',
  RUNNING = '../../../../assets/icons/success.svg',
  STOPPED = '../../../../assets/icons/failed.svg',
  AVAILABLE = '../../../../assets/icons/success.svg',
  SUCCESSFUL = '../../../../assets/icons/success.svg',
  FAILED = '../../../../assets/icons/failed.svg',
  INACTIVE = '../../../../assets/icons/question.svg',
  SUCCESS = '../../../../assets/icons/success.svg',
  NOT_AVAILABLE = '../../../../assets/icons/question.svg',
  DOWN = '../../../../assets/icons/failed.svg',
  CONNECTED = '../../../../assets/icons/success.svg',
  DISCONNECTED = '../../../../assets/icons/question.svg',
  NOT_CONNECTED = '../../../../assets/icons/question.svg',
  NOT_ENABLED = '../../../../assets/icons/question.svg',
  REGISTERED = '../../../../assets/icons/success.svg',
  NOT_REGISTERED = '../../../../assets/icons/question.svg',
  ON = '../../../../assets/icons/on.svg',
  OFF = '../../../../assets/icons/off.svg',
  NOT_STARTED = '../../../../assets/icons/question.svg',
  STARTED = '../../../../assets/icons/success.svg',
  UP = '../../../../assets/icons/success.svg',
  STRONG = '../../../../assets/icons/success.svg',
  ENABLING = '../../../../assets/icons/loader.svg',
  DISABLING = '../../../../assets/icons/loader.svg',
  APPROVED = '../../../../assets/icons/success.svg',
  REJECTED = '../../../../assets/icons/cancelation.svg',
  PENDING = '../../../../assets/icons/loader.svg',
  CHANGE_REQUEST = '../../../../assets/icons/loader.svg',
  SUSPENSION = 'https://img.icons8.com/stencil/20/hibernate.png',
  EXPIRED = '../../../../assets/icons/expired.svg',
  CANCELLATION = '../../../../assets/icons/cancelation.svg',
  ACCEPTED = '../../../../assets/icons/success.svg',
  TERMINATED = 'https://img.icons8.com/color/25/offboarding.png',
  REACTIVATION = 'https://img.icons8.com/external-basicons-color-edtgraphics/25/external-switch-on-ui-edtim-lineal-color-edtim-2.png',
  CESSATION = 'https://img.icons8.com/external-tal-revivo-fresh-tal-revivo/25/external-hand-gesture-for-stop-or-blocked-layout-landing-fresh-tal-revivo.png'
}

export enum badgeTheme {
  CRITICAL = EBadgeType.FAILED,
  HIGH = EBadgeType.WARNING,
  WARNING = EBadgeType.PRIMARY,
  ENABLED = EBadgeType.SUCCESS,
  DISABLED = EBadgeType.DISABLED,
  ACTIVE = EBadgeType.SUCCESS,
  RUNNING = EBadgeType.SUCCESS,
  STOPPED = EBadgeType.FAILED,
  AVAILABLE = EBadgeType.SUCCESS,
  NOT_AVAILABLE = EBadgeType.DISABLED,
  SUCCESSFUL = EBadgeType.SUCCESS,
  FAILED = EBadgeType.FAILED,
  INACTIVE = EBadgeType.DISABLED,
  SUCCESS = EBadgeType.SUCCESS,
  DOWN = EBadgeType.FAILED,
  CONNECTED = EBadgeType.SUCCESS,
  DISCONNECTED = EBadgeType.DISABLED,
  NOT_CONNECTED = EBadgeType.DISABLED,
  NOT_ENABLED = EBadgeType.DISABLED,
  REGISTERED = EBadgeType.SUCCESS,
  NOT_REGISTERED = EBadgeType.DISABLED,
  ON = EBadgeType.SUCCESS,
  OFF = EBadgeType.DISABLED,
  NOT_STARTED = EBadgeType.DISABLED,
  STARTED = EBadgeType.SUCCESS,
  UP = EBadgeType.SUCCESS,
  STRONG = EBadgeType.SUCCESS,
  ENABLING = EBadgeType.SUCCESS,
  DISABLING = EBadgeType.SUCCESS,
  APPROVED = EBadgeType.SUCCESS,
  REJECTED = EBadgeType.SUCCESS,
  PENDING = EBadgeType.SUCCESS,
  CHANGE_REQUEST = EBadgeType.SUCCESS,
  SUSPENSION = EBadgeType.SUCCESS,
  EXPIRED = EBadgeType.SUCCESS,
  CANCELLATION = EBadgeType.SUCCESS,
  ACCEPTED = EBadgeType.SUCCESS,
  TERMINATED = EBadgeType.SUCCESS,
  REACTIVATION = EBadgeType.SUCCESS,
  CESSATION = EBadgeType.SUCCESS
}
