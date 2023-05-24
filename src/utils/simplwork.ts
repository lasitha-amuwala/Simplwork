import axios from 'axios';

export const SimplworkClient = (token: string) => {
  return axios.create({
    baseURL: 'https://simplwork.com/api/',
    headers: {
      "Content-Type": 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};
