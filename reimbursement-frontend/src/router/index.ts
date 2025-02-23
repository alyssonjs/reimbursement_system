import { createRouter, createWebHistory } from 'vue-router';
import type { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import EmployeeExpensesView from '../views/EmployeeExpensesView.vue';
import ManagerDashboardView from '../views/ManagerDashboardView.vue';
import ManagerProjectsView from '../views/ManagerProjectsView.vue';
import { useAuthStore } from '../stores/auth';

export const routes: Array<RouteRecordRaw> = [
  { 
    path: '/', 
    name: 'Home', 
    component: HomeView, 
    meta: { requiresAuth: true } 
  },
  { 
    path: '/login', 
    name: 'Login', 
    component: LoginView,
    meta: {requiresAuth: false}
  },
  { 
    path: '/employee/expenses', 
    name: 'EmployeeExpenses', 
    component: EmployeeExpensesView, 
    meta: { requiresAuth: true, role: 'employee' } 
  },
  { 
    path: '/manager/dashboard', 
    name: 'ManagerDashboard', 
    component: ManagerDashboardView, 
    meta: { requiresAuth: true, role: 'manager' } 
  },
  { 
    path: '/manager/projects', 
    name: 'ManagerProjects', 
    component: ManagerProjectsView, 
    meta: { requiresAuth: true, role: 'manager' } 
  },
  { 
    path: '/:catchAll(.*)*', 
    redirect: '/login' 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
  
  const authStore = useAuthStore();

  const isAuthenticated = !!authStore.token;
  const userRole = authStore.role;

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'Login' });
  }

  if (to.name === 'Login' && isAuthenticated) {
    if (userRole === 'manager') {
      return next({ name: 'ManagerDashboard' });
    } else if (userRole === 'employee') {
      return next({ name: 'EmployeeExpenses' });
    }
  }

  if (to.meta.role && to.meta.role !== userRole) {
    if (userRole === 'manager') {
      return next({ name: 'ManagerDashboard' });
    } else if (userRole === 'employee') {
      return next({ name: 'EmployeeExpenses' });
    }
  }

  next();
});

export default router;
