export const API_URL = "https://take-home-test.onrender.com";
export const LOGIN_URL = `${API_URL}/auth/login`;
export const CREATE_COMPANY_URL = `${API_URL}/company/create`;
export const GET_COMPANIES_URL = `${API_URL}/company/all`;
export const GET_COMPANIES_USER_URL = `${API_URL}/company/list`;
export const UPLOADS_URL = `${API_URL}/uploads`;
export const ADD_IMAGE_URL = `${API_URL}/company`;

export enum Role {
  INPUTER = "inputer",
  VIEWER = "viewer",
}
