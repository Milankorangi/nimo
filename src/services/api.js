import axios from 'axios';
import { BASE_URL } from '../utils/constants';

export const getCoinsList = (per_page, page) => axios.get(`${BASE_URL}/coins/markets`, {
  params: {
    vs_currency: 'usd',
    per_page: per_page,
    page: page
  },
});

export const getCoinsGlobal = () => axios.get(`${BASE_URL}/global`);


export const getCoinDetails = (id) => axios.get(`${BASE_URL}/coins/${id}`);
