<template>
    <span :class="chipClass">
      {{ statusLabel }}
    </span>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  
  const props = defineProps({
    status: {
      type: String,
      required: true,
      validator: (value: string) => {
        const allowedValues = [
          'aceito',
          'accepted',
          'pendente',
          'pending',
          'rejeitado',
          'rejected',
        ];
        return allowedValues.includes(value.toLowerCase());
      },
    },
  });
  
  const chipClass = computed(() => {
    const statusLower = props.status.toLowerCase();
    if (statusLower === 'aceito' || statusLower === 'accepted') {
      return 'chip chip--accepted';
    } else if (statusLower === 'pendente' || statusLower === 'pending') {
      return 'chip chip--pending';
    } else if (statusLower === 'rejeitado' || statusLower === 'rejected') {
      return 'chip chip--rejected';
    } else {
      return 'chip chip--default';
    }
  });
  
  const statusLabel = computed(() => {
    return props.status.charAt(0).toUpperCase() + props.status.slice(1);
  });
  </script>
  
  <style scoped>
  .chip {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: 16px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: capitalize;
    color: #fff;
  }
  
  .chip--accepted {
    background-color: #28a745;
  }
  
  .chip--pending {
    background-color: #ffc107;
    color: #000;
  }
  
  .chip--rejected {
    background-color: #e74c3c;
  }
  
  .chip--default {
    background-color: #6c757d;
  }
  </style>
  