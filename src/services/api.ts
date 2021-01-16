import axios from 'axios';

/* export const api = axios.create({
  baseURL: 'http://localhost:3333'
}); */
export const api = axios.create({
  baseURL: 'https://a7f87251afba.ngrok.io'
});

export default api;