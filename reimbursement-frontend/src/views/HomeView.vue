<template>
  <div class="home-view">
    <h1>Bem-vindo ao Sistema de Reembolsos</h1>
    <p>Gerencie suas solicitações de reembolso de forma eficiente.</p>
    <router-link to="/login" v-if="!authStore.token">Login</router-link>
    <router-link to="/employee/expenses" v-if="authStore.token && authStore.role === 'employee'">Minhas Solicitações</router-link>
    <router-link to="/manager/dashboard" v-if="authStore.token && authStore.role === 'manager'">Dashboard</router-link>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
</script>

<style scoped>
.home-view {
  text-align: center;
  padding: 2rem;
  font-family: 'Roboto', sans-serif;
  background-color: #f7f9fa;
  color: #2c3e50;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #3498db;
  font-weight: 700;
}

p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

a {
  margin: 0 0.5rem;
  text-decoration: none;
  color: #3498db;
  font-weight: 500;
  transition: color 0.3s;
}

a:hover {
  color: #2980b9;
}

/* Ajustes responsivos para dispositivos móveis */
@media (max-width: 600px) {
  .home-view {
    padding: 1rem;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  p {
    font-size: 1rem;
  }
}
</style>
