<template>
  <table class="expense-table">
    <thead>
      <tr>
        <th>Valor (R$)</th>
        <th>Data</th>
        <th>Tags</th>
        <th>Projeto</th>
        <th>Status</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="expense in expenses" :key="expense.id">
        <td>{{ expense.amount }}</td>
        <td>{{ expense.date }}</td>
        <td>{{ expense.project_tag.tag }}</td>
        <td>{{ expense.project.name }}</td>
        <td>{{ expense.status }}</td>
        <td>
          <button @click="$emit('edit', expense)">Editar</button>
          <button @click="$emit('delete', expense)">Excluir</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import type { Expense } from '@/types'

export default defineComponent({
  name: 'ExpenseList',
  props: {
    expenses: {
      type: Array as PropType<Expense[]>,
      required: true,
    },
  },
});
</script>

<style scoped>
.expense-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

.expense-table th,
.expense-table td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}

.expense-table th {
  background-color: #f5f5f5;
}

.expense-table tr:nth-child(even) {
  background-color: #fafafa;
}

.expense-table button {
  margin-right: 0.3rem;
}
</style>
