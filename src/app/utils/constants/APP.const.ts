export const APP = {
  ROUTES: {
    LOGIN: 'login',
    FORGOT_PASSWORD: 'forgot-password',
    RESET_PASSWORD: 'reset-password',
    REQUEST_ID: '/:requestId',
    EMAIL: '/:email',
    HOME: 'home',
    LOAN_APPLICATION_STATUS: 'loan-application-status',
    APPLY_LOAN: 'apply-loan',
    CLIENT_DETAIL: 'client-detail',
    CLIENT_ID: '/:clientId',
    MY_COMMISSIONS: 'my-commissions',
    EXECUTIVE_VIEW: 'executive-view',
    MY_SUPPORT_TICKETS: 'my-support-ticket',
    CREATE_NEW_SUPPORT_TICKET: 'create-new-support-ticket',
    EXECUTIVE_SUPPORT_TICKET: 'executive-support-ticket',
    VIEW_TICKET_DETAILS: 'view-ticket-details',
    PARTNER_ID: '/:partnerId',
    ISSUE_ID: '/:issueId'
  },
  NUMERIC_fILTER_OPTIONS: [
    {
      label: 'More than (>)',
      value: 'moreThan',
      operator: '>',
    },
    {
      label: 'Less than (<)',
      value: 'lessThan',
      operator: '<',
    },
    {
      label: 'Equal to (=)',
      value: 'equalTo',
      operator: '=',
    },
  ],
  MODAL: {
    EXPORT_FORM: {
      FORM_CONTROL_NAME: {
        FILE_NAME: 'fileName',
        FORMAT: 'format',
      },
      LABEL: {
        FILE_NAME: 'File Name:',
        FORMAT: 'Format:',
      },
      PLACEHOLDER: {
        ENTER_FILE_NAME: 'Enter file name.',
        SELECT_FORMAT: 'Select format.',
      },
      ERROR_MESSAGE: {
        FILE_NAME_REQUIRED: 'File name is required.',
        FILE_NAME_MIN_LENGTH: 'File name should contain at least 3 characters.',
        FILE_NAME_MAX_LENGTH: 'File name should not exceed 50 characters.',
        FORMAT_REQUIRED: 'Format is required.',
      },
    },
    BUTTON: {
      LABEL: {
        CANCEL: 'Cancel',
        EXPORT: 'Export',
        ENABLE_DRAIN_MODE: 'Enable Drain Mode',
        DISABLE_DRAIN_MODE: 'Disable Drain Mode',
        TERMINATE_SESSION: 'Terminate Session',
        TERMINATE_PROCESS: 'Terminate Process',
        TERMINATE_APPLICATION: 'Terminate Application',
        CONFIRM_CHANGES: 'Confirm Changes'
      },
      CUSTOM_CLASS: {
        BTN_SECONDARY: 'btn-secondary',
        BTN_PRIMARY: 'btn-primary',
        BTN_PRIMARY_DANGER: 'btn-primary danger',
        SECONDARY: 'secondary',
        PRIMARY: 'primary'
      },
    },
  },
  BUTTON: {
    CUSTOM_CLASS: {
      BTN_SECONDARY: 'btn-secondary',
      BTN_PRIMARY: 'btn-primary',
      BTN_PRIMARY_DANGER: 'btn-primary danger',
      SECONDARY: 'secondary',
      PRIMARY: 'primary'
    },
  },
  SESSION_ITEM_KEYS: {
    SESSION: 'session'
  },
  SCREENS_SIZE: {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
    EXTRA_LARGE: 'extra large'
  },
  MESSAGE: {
    SUPPORT_TICKET_API_ERROR_MSG: 'Something went wrong while we refreshing your support ticket.',
    KINDLY_RETRY_SOMETIME_LATER: 'Kindly retry sometime later.',
    NO_DATA_FOUND_FOR_YOUR_USER: 'No data found for your user id.'
  },
  TITLE: {
    ERROR_OCCURED: 'Error Occured',
    NO_DATA: 'No Data'
  }
}
