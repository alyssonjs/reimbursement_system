import { defineStore } from 'pinia';
import { useAuthStore } from './auth';
import axios from 'axios';

export const useSubordinateStore = defineStore('subordinate', {
  state: () => ({
    subordinates: [] as Array<{ id: number; name: string; email: string }>,
  }),
  actions: {
    async fetchSubordinates() {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const authStore = useAuthStore();
        const response = await axios.get(`${apiUrl}/v1/manager/subordinates`, {
          headers: { Authorization: `Bearer ${authStore.token}` },
        });

        this.subordinates = response.data;
      } catch (error) {
        console.error('Erro ao buscar subordinados:', error);
      }
    },
  },
});
