<template>
  <div class="manager-dashboard-view">
    <h1>Dashboard de Reembolsos</h1>
    <ExpenseList :expenses="expenses" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import ExpenseList from '@/components/ExpenseList.vue';

const expenses = ref([]);

onMounted(async () => {
  const response = await axios.get('/api/expenses');
  expenses.value = response.data;
});
</script>

<style scoped>
.manager-dashboard-view {
  padding: 2rem;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
</style>