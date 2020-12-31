import { api } from '../services/api';

export const URL_USERS = `/exhibitions`;

export interface IExhibition {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  telephone: number;
  images: [{}];
}

export default {
  async index() {
    try {
      return await api.get<IExhibition[]>(`${URL_USERS}`);
    } catch (err) {
      console.error(`Your request (GET) to ${URL_USERS} FAILED. \n\n` + err);
    }
  },

  async create(data: FormData) {
    try {
      return await api.post<IExhibition>(`${URL_USERS}`, data);
    } catch (err) {
      console.error(`Your request (POST) to ${URL_USERS} FAILED. \n\n` + err);
    }
  },
};