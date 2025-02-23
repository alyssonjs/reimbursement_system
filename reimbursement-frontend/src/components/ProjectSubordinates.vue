<template>
    <section class="section">
      <h3>Associar Subordinados</h3>
      <div class="subordinates">
        <label
          v-for="user in subordinates"
          :key="user.id"
          class="checkbox-label"
        >
          <input
            type="checkbox"
            :value="user.id"
            v-model="selectedSubordinateIds"
          />
          <span class="checkbox-text">{{ user.name }} - {{ user.email }}</span>
        </label>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  
  const props = defineProps<{
    subordinates: Array<{ id: number; name: string; email: string }>,
    subordinateIds: number[]
  }>();
  
  const emit = defineEmits(['update:subordinateIds']);
  
  const selectedSubordinateIds = computed({
    get: () => props.subordinateIds || [],
    set: (value: number[]) => {
        emit('update:subordinateIds', [...value]);
    }
  });
  </script>
  
  <style scoped>
  .section {
    margin-bottom: 1.5rem;
  }
  
  .subordinates {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  
  .checkbox-label {
    font-size: 0.9rem;
    color: #2c3e50;
    display: flex;
    align-items: center;
    background: #f8f9fa;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    transition: background 0.2s ease-in-out;
    cursor: pointer;
  }
  
  .checkbox-label:hover {
    background: #e3e7eb;
  }
  
  input[type="checkbox"] {
    margin-right: 0.5rem;
    accent-color: #3498db;
  }
  
  .checkbox-text {
    font-weight: 500;
  }
  </style>
  