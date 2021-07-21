import axios from "axios"
import crypto from "crypto";

const API_URL = 'http://localhost:8888';
const HEADER_BADSEC_AUTHENTICATION_TOKEN = 'badsec-authentication-token';

export const auth = async (): Promise<string> => {
  try {
    const response = await axios.get(API_URL + '/auth');
    console.log(response.headers[HEADER_BADSEC_AUTHENTICATION_TOKEN]);
    return response.headers[HEADER_BADSEC_AUTHENTICATION_TOKEN];
  } catch (e) {
    throw new Error('GET_AUTH_TOKEN_ERROR');
  }
}

export const users = async () => {
  let token: string;

  try {
    token = await auth();
  } catch (e) {
    throw new Error('GET_AUTH_TOKEN_ERROR');
  }

  if (!token) {
    throw new Error('AUTH_TOKEN_NOT_RECEIVED');
  }

  const tokenSHA256 = crypto.createHash('sha256').update(`${token}/users`).digest('hex');

  try {
    const response = await axios.get(API_URL + '/users', {
      headers: {
        'X-Request-Checksum': tokenSHA256
      }
    });
    return response.data;
  } catch (e) {
    throw new Error('GET_USERS_ERROR');
  }
}
