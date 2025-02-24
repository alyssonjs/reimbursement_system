<template>
    <div class="tag-item">
      <BaseInput
        label="Name:"
        type="text"
        v-model="localTag.tag"
        placeholder="Enter tag name"
        required
      />
      <BaseInput
        label="Value:"
        type="text"
        v-model="formattedBudget"
        placeholder="R$ 0,00"
        required
      />
      <button type="button" class="btn-remove" @click="$emit('remove')">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  import BaseInput from '@/components/form/BaseInput.vue'
  
  // Props: each tag has a name and an allocated_budget (stored in cents)
  const props = defineProps<{
    tag: { tag: string; allocated_budget: number }
  }>()
  
  const emit = defineEmits<{
    (e: 'update', updatedTag: { tag: string; allocated_budget: number }): void,
    (e: 'remove'): void
  }>()
  
  // Create a local copy of the tag for two-way binding
  const localTag = ref({ ...props.tag })
  
  // Watch localTag and emit updates upward
  watch(localTag, (newVal) => {
    emit('update', newVal)
  }, { deep: true })
  
  // Computed property to format allocated_budget as Brazilian currency.
  // We assume allocated_budget is stored in cents.
  const formattedBudget = computed({
    get() {
      const numericValue = localTag.value.allocated_budget;
      return (numericValue / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
    },
    set(value: string) {
      // Remove any non-digit characters
      const digits = value.replace(/\D/g, '');
      // Convert to number (in cents)
      localTag.value.allocated_budget = digits ? parseFloat(digits) : 0;
    }
  });
  </script>
  
  <style scoped>
  .tag-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    background: #f8f9fa;
    padding: 0.75rem;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  
  .btn-remove {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 4px;
    transition: background-color 0.3s;
    color: #e74c3c;
  }
  
  .btn-remove:hover {
    background-color: #e74c3c33;
  }
  </style>
  