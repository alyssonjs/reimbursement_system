<template>
  <div class="manager-dashboard-view">
    <ManagerDashboard />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import ManagerDashboard from '@/components/ManagerDashboard.vue';

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