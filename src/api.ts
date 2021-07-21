import axios from "axios"

const API_URL = 'http://localhost:8888';

export const auth = async () => {
  try {
    const response = await axios.get(API_URL + '/auth');
    return response.data;
  } catch (e) {
    throw new Error('GET_AUTH_TOKEN_ERROR');
  }
}

