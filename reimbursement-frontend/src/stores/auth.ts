import { defineStore } from 'pinia';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
  }),
  actions: {
    login(email: string, password: string) {
      return axios.post(`${apiUrl}/login`, { email, password }).then((response) => {
        this.token = response.data.token;
        localStorage.setItem('token', this.token);
      });
    },
  },
});