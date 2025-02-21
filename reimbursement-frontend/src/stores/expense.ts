import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './auth';
import type { Expense, ExpenseInput, ExpenseUpdate } from '../types'

const apiUrl = import.meta.env.VITE_API_URL;

export const useExpenseStore = defineStore('expense', {
  state: () => ({
    expenses: [] as Expense[],
    loading: false,
    error: '' as string | null,
  }),
  actions: {
    async fetchEmployeeExpenses() {
      this.loading = true;
      try {
        const authStore = useAuthStore();
        const response = await axios.get(`${apiUrl}/v1/employee/expenses`, {
          headers: { Authorization: `Bearer ${authStore.token}` },
        });
        this.expenses = response.data;
      } catch (err: any) {
        this.error = err.response?.data?.error || err.message;
      } finally {
        this.loading = false;
      }
    },
    async createEmployeeExpense(expenseData: ExpenseInput | FormData) {
      this.loading = true;
      try {
        const authStore = useAuthStore();
        const response = await axios.post(`${apiUrl}/v1/employee/expenses`, expenseData, {
          headers: { 
            Authorization: `Bearer ${authStore.token}`,
            'Content-Type': expenseData instanceof FormData ? 'multipart/form-data' : 'application/json'
          },
        });
        this.expenses.push(response.data);
      } catch (err: any) {
        this.error = err.response?.data?.error || err.message;
      } finally {
        this.loading = false;
      }
    },
    async updateEmployeeExpense(expenseId: number, expenseData: Partial<ExpenseInput>) {
      this.loading = true;
      try {
        const authStore = useAuthStore();
        const response = await axios.put(`${apiUrl}/v1/employee/expenses/${expenseId}`, expenseData, {
          headers: { Authorization: `Bearer ${authStore.token}` },
        });
        const index = this.expenses.findIndex(exp => exp.id === expenseId);
        if (index !== -1) {
          this.expenses[index] = response.data;
        }
      } catch (err: any) {
        this.error = err.response?.data?.error || err.message;
      } finally {
        this.loading = false;
      }
    },
    async deleteEmployeeExpense(expenseId: number) {
      this.loading = true;
      try {
        const authStore = useAuthStore();
        await axios.delete(`${apiUrl}/v1/employee/expenses/${expenseId}`, {
          headers: { Authorization: `Bearer ${authStore.token}` },
        });
        this.expenses = this.expenses.filter(exp => exp.id !== expenseId);
      } catch (err: any) {
        this.error = err.response?.data?.error || err.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchManagerExpenses() {
      this.loading = true;
      try {
        const authStore = useAuthStore();
        const response = await axios.get(`${apiUrl}/v1/manager/expenses`, {
          headers: { Authorization: `Bearer ${authStore.token}` },
        });
        this.expenses = response.data;
      } catch (err: any) {
        this.error = err.response?.data?.error || err.message;
      } finally {
        this.loading = false;
      }
    },
    async updateManagerExpense(expenseId: number, expenseData: Partial<ExpenseInput & ExpenseUpdate>) {
      this.loading = true;
      try {
        const authStore = useAuthStore();
        const response = await axios.put(`${apiUrl}/v1/manager/expenses/${expenseId}`, expenseData, {
          headers: { Authorization: `Bearer ${authStore.token}` },
        });
        const index = this.expenses.findIndex(exp => exp.id === expenseId);
        if (index !== -1) {
          this.expenses[index] = response.data;
        }
      } catch (err: any) {
        this.error = err.response?.data?.error || err.message;
      } finally {
        this.loading = false;
      }
    }
  },
});
