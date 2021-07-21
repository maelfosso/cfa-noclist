import axios, { AxiosResponse } from "axios"
import crypto from "crypto";

const API_URL = 'http://localhost:8888';
const HEADER_BADSEC_AUTHENTICATION_TOKEN = 'badsec-authentication-token';
const MAX_RETRIES = 2;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const requestMayFailed = async (axiosRequest: Promise<AxiosResponse<any>>) : Promise<AxiosResponse<any>> => {
  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      const response = await axiosRequest;
      return response;
    } catch (e) {
      attempt++;
    }
  }

  throw new Error('REQUEST_FAILED');
}

export const auth = async (): Promise<string> => {
  try {
    const response = await requestMayFailed(axios.get(`${API_URL}/auth`));
    return response.headers[HEADER_BADSEC_AUTHENTICATION_TOKEN];
  } catch (e) {
    throw new Error(`GET_AUTH_TOKEN_ERROR : ${e.message}`);
  }
}

export const users = async (): Promise<string> => {
  let token: string;

  try {
    token = await auth();
  } catch (e) {
    throw new Error(e.message);
  }

  if (!token) {
    throw new Error('AUTH_TOKEN_NOT_RECEIVED');
  }

  const tokenSHA256 = crypto.createHash('sha256').update(`${token}/users`).digest('hex');

  try {
    const response = await requestMayFailed(axios.get(API_URL + '/users', {
      headers: {
        'X-Request-Checksum': tokenSHA256
      }
    }));
    return response.data;
  } catch (e) {
    throw new Error(`GET_USERS_ERROR : ${e.message}`);
  }
}
