<template>
  <nav>
    <router-link to="/employee/expenses">Minhas Solicitações</router-link>
    <router-link to="/manager/dashboard" v-if="authStore.role === 'manager'">Dashboard</router-link>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>