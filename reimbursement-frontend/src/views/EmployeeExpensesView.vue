<template>
  <div class="employee-expenses-view">
    <EmployeeDashboard />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import EmployeeDashboard from '@/components/EmployeeDashboard.vue';

const expenses = ref([]);

onMounted(async () => {
  const response = await axios.get('/api/expenses');
  expenses.value = response.data;
});

</script>

<style scoped>
.employee-expenses-view {
  padding: 2rem;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

a {
  display: inline-block;
  margin-top: 1rem;
  text-decoration: none;
  color: #42b983;
}
</style>