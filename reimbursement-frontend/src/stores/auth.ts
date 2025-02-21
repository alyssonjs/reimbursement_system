import { defineStore } from 'pinia';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    role: localStorage.getItem('role') || '',
    userInfos: JSON.parse(localStorage.getItem('userInfos') || '{}'),
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await axios.post(`${apiUrl}/login`, { email, password });
        this.token = response.data.token;
        this.role = response.data.role;
        this.userInfos = response.data.user_infos;
        localStorage.setItem('token', this.token);
        localStorage.setItem('role', this.role);
        localStorage.setItem('userInfos', JSON.stringify(this.userInfos));
      } catch (error) {
        throw error;
      }
    },
    logout() {
      this.token = '';
      this.role = '';
      this.userInfos = {};
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('userInfos');
    },
  },
});
