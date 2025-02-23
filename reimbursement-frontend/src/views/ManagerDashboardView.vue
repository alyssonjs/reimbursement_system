<template>
  <div class="manager-dashboard-view">
    <ManagerDashboard />
  </div>
</template>

<script setup lang="ts">
import ManagerDashboard from '@/components/ManagerDashboard.vue';

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