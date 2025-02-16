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
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

a {
  margin: 0 0.5rem;
  text-decoration: none;
  color: #42b983;
}
</style>