import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://virtual-api-store.herokuapp.com',
});
