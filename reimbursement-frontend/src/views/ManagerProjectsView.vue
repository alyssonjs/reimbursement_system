<template>
  <div class="project-lists-view">
    <ProjectsList />
  </div>
</template>

<script setup lang="ts">
import ProjectsList from '@/components/ProjectsList.vue';

</script>

<style scoped>
.employee-expenses-view {
  padding: 2rem;
  font-family: 'Roboto', sans-serif;
  background-color: #f7f9fa;
  color: #2c3e50;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #3498db;
}

a {
  display: inline-block;
  margin-top: 1rem;
  text-decoration: none;
  color: #3498db;
  font-weight: 500;
  transition: color 0.3s;
}

a:hover {
  color: #2980b9;
}

@media (max-width: 600px) {
  .employee-expenses-view {
    padding: 1rem;
  }
  
  h1 {
    font-size: 1.75rem;
  }
}
</style>
