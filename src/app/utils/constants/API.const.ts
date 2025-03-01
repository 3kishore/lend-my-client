import { environment } from "../../../environments/environment"

export const API = {
  GET_BASE_URL: () => {
    return environment.apiURL;
  },
  VALIDATE_TOKEN: (token: string) => {
    return `${API.GET_BASE_URL()}posts/${token}`
  },
  AUTHENTICATE: () => {
    return `${API.GET_BASE_URL()}account/authorization`
  },
  CREATE_USER: () => {
    return `${API.GET_BASE_URL()}account/create-agent`
  },
  RESET_PASSWORD_REQUEST: () => {
    return `${API.GET_BASE_URL()}account/request-to-password-reset`
  },
  TOKEN_VALIDATION: () => {
    return `${API.GET_BASE_URL()}posts`
  },
  CHANGE_PASSWORD: () => {
    return `${API.GET_BASE_URL()}account/reset-password`;
  },
  GET_MY_SUPPORT_TICKETS: () => {
    return `${API.GET_BASE_URL()}account/get-my-support-tickets`;
    // return 'https://jsonplaceholder.typicode.com/posts';
  },
  CREATE_SUPPORT_TICKET: () => {
    return `${API.GET_BASE_URL()}account/create-new-support-ticket`;
    // return 'https://jsonplaceholder.typicode.com/posts';
  },
  GET_MY_PARTNER_SUPPORT_TICKETS: () => {
    return `${API.GET_BASE_URL()}account/my-partner-support-tickets`;
    // return 'https://jsonplaceholder.typicode.com/posts';
  },
  UPDATE_ISSUE_DETAILS: () => {
    return `${API.GET_BASE_URL()}account/update-ticket-status`;
    // return 'https://jsonplaceholder.typicode.com/posts';
  },
  GET_ISSUE_DETAILS: () => {
    return `${API.GET_BASE_URL()}account/get-ticket-details`;
    // return 'https://jsonplaceholder.typicode.com/posts';
  },
  LOGOUT: () => {
    return `${API.GET_BASE_URL()}posts`
  },
  GET_MY_APPLICATIONS_STATUS: () => {
    return `${API.GET_BASE_URL()}user/get-my-loan-requests`
  },
  GET_ALL_LOAN_REQUESTS: () => {
    return `${API.GET_BASE_URL()}user/get-all-loan-requests`
  },
  UPDATE_LOAN_STATUS: () => {
    return `${API.GET_BASE_URL()}user/update-loan-status`
  },
  UPDATE_BANK_DETAILS: () => {
    return `${API.GET_BASE_URL()}user/update-available-bank`
  },
  GET_MY_COMMISSIONS: () => {
    return `${API.GET_BASE_URL()}user/get-my-commission-details`
  },
  GET_CUSTOMER_DETAILS: () => {
    return `${API.GET_BASE_URL()}user/get-client-details`
  },
  CHANGE_APPLICATIONS_STATUS: () => {
    return `${API.GET_BASE_URL()}posts`
  },
  APPLY_FOR_LOAN: () => {
    return `${API.GET_BASE_URL()}user/raise-loan-request`
  },
  GET_BANK_DETAILS: () => {
    return `${API.GET_BASE_URL()}posts`
  },
}
