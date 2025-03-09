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
  CREATE_BANKER: () => {
    return `${API.GET_BASE_URL()}account/create-banker`
  },
  GET_BANKERS_LIST: () => {
    return `${API.GET_BASE_URL()}account/get-bankers`
  },
  GET_BANKING_PARTNERS: () => {
    return `${API.GET_BASE_URL()}account/get-banking-partners`
  },
  GET_BANKING_PARTNERS_AND_BANKERS: () => {
    return `${API.GET_BASE_URL()}account/get-banking-partners-and-bankers`
  },
  ASSIGN_BANKER: () => {
    return `${API.GET_BASE_URL()}user/assign-banker`
    // return 'https://jsonplaceholder.typicode.com/posts';
  },
  GET_ASSIGNED_BANKERS: () => {
    return `${API.GET_BASE_URL()}user/get-assigned-bankers`
    // return 'https://jsonplaceholder.typicode.com/posts';
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
  GET_BANKER_DETAILS: () => {
    return `${API.GET_BASE_URL()}account/get-banker-details`;
    // return 'https://jsonplaceholder.typicode.com/posts';
  },
  GET_ASSIGNED_CUSTOMER_OF_BANKER: () => {
    return `${API.GET_BASE_URL()}user/get-assigned-customer-of-banker`;
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
  GET_MY_LEADS: () => {
    return `${API.GET_BASE_URL()}user/get-my-leads`
    // return 'https://jsonplaceholder.typicode.com/posts';
  },
  GET_COMPLETED_LOANS: () => {
    // return `${API.GET_BASE_URL()}user/get-completed-loans`
    return 'https://jsonplaceholder.typicode.com/posts';
  },
  GET_REJECTED_LOANS: () => {
    // return `${API.GET_BASE_URL()}user/get-rejected-loans`
    return 'https://jsonplaceholder.typicode.com/posts';
  },
  GET_LOAN_DETAILS: () => {
    return `${API.GET_BASE_URL()}user/get-loan-details`
    // return 'https://jsonplaceholder.typicode.com/posts';
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
  GET_ORDER_DETAILS: () => {
    return `${API.GET_BASE_URL()}user/get-order-details`
  },
  UPDATE_LOAN_DETAILS: () => {
    return `${API.GET_BASE_URL()}user/update-loan-details`
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
