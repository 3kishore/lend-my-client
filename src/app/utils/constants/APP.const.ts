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
    EXECUTIVE_VIEW: 'executive-view'
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
  }
}
