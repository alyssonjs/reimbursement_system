import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import EmployeeExpensesView from '@/views/EmployeeExpensesView.vue';
import ManagerDashboardView from '@/views/ManagerDashboardView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/employee/expenses',
    name: 'EmployeeExpenses',
    component: EmployeeExpensesView,
  },
  {
    path: '/manager/dashboard',
    name: 'ManagerDashboard',
    component: ManagerDashboardView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
