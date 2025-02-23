<template>
    <div class="expense-card" @click="onEdit">
      <div class="card-row top-row">
        <div class="project-name">{{ expense.project.name }}</div>
        <div class="date">{{ expense.date }}</div>
        <div class="requester" v-if="authStore.role === 'manager' && expense.user.name">
          Solicitante: {{ expense.user.name }}
        </div>
      </div>
      <div class="card-row bottom-row">
        <div class="bottom-left">
          <div class="value">
            {{ Number(expense.amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
          </div>
          <div class="tag">{{ expense.project_tag.tag }}</div>
        </div>
        <div class="bottom-right">
          <div class="status">
            <Chip :status="expense.status" />
          </div>
          <div v-if="expense.status === 'pending' && authStore.role === 'employee'">
            <div class="actions" @click.stop>
                <i class="fas fa-trash-alt delete-icon" @click="onDelete" title="Deletar"></i>
            </div>
          </div >
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { Expense } from '@/types';
  import Chip from '@/components/Chip.vue';
  import { useAuthStore } from '@/stores/auth';
  
  const props = defineProps<{
    expense: Expense;
  }>();
  
  const emit = defineEmits<{
    (e: 'edit', expense: Expense): void;
    (e: 'delete', expense: Expense): void;
  }>();
  
  const authStore = useAuthStore();
  
  function onEdit() {
    emit('edit', props.expense);
  }
  
  function onDelete() {
    emit('delete', props.expense);
  }
  </script>
  
  <style scoped>
  .expense-card {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
    cursor: pointer;
    transition: box-shadow 0.3s;
  }
  
  .expense-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .card-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  
  .top-row {
    margin-bottom: 0.5rem;
  }
  
  .project-name {
    font-size: 1.1rem;
    font-weight: 600;
    color: #3498db;
  }
  
  .date {
    font-size: 0.9rem;
    color: #7f8c8d;
  }
  
  .requester {
    width: 100%;
    font-size: 0.9rem;
    color: #2c3e50;
    margin-top: 0.25rem;
  }
  
  .bottom-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .bottom-left {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .value {
    font-size: 1rem;
    font-weight: 500;
    color: #2c3e50;
  }
  
  .tag {
    font-size: 0.9rem;
    color: #2c3e50;
  }
  
  .bottom-right {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .status {
    flex-grow: 1;
  }
  
  .actions {
    display: flex;
    align-items: center;
  }
  
  .delete-icon {
    font-size: 1.2rem;
    color: #e74c3c;
    cursor: pointer;
    transition: color 0.3s;
  }
  
  .delete-icon:hover {
    color: #c0392b;
  }
  </style>
  