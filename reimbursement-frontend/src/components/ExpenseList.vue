<template>
  <div class="table-responsive">
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
        <tr v-for="expense in paginatedExpenses" :key="expense.id">
          <td>{{ expense.amount }}</td>
          <td>{{ expense.date }}</td>
          <td>{{ expense.project_tag.tag }}</td>
          <td>{{ expense.project.name }}</td>
          <td>
            <Chip :status="expense.status" />
          </td>
          <td>
            <span class="action-icon edit" @click="$emit('edit', expense)" title="Editar">
              <i class="fas fa-edit"></i>
            </span>
            <span class="action-icon delete" @click="$emit('delete', expense)" title="Excluir">
              <i class="fas fa-trash-alt"></i>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :totalItems="totalItems"
      :pageSize="pageSize"
      v-model:currentPage="currentPage"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue';
import type { Expense } from '@/types';
import Pagination from '@/components/Pagination.vue';
import Chip from '@/components/Chip.vue';

export default defineComponent({
  name: 'ExpenseList',
  components: {
    Pagination,
    Chip,
  },
  props: {
    expenses: {
      type: Array as PropType<Expense[]>,
      required: true,
    },
  },
  setup(props) {
    const currentPage = ref(1);
    const pageSize = ref(5);
    const totalItems = computed(() => props.expenses.length);
    const paginatedExpenses = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value;
      return props.expenses.slice(start, start + pageSize.value);
    });
    return {
      currentPage,
      pageSize,
      totalItems,
      paginatedExpenses,
    };
  },
});
</script>

<style scoped>
.table-responsive {
  overflow-x: auto;
}

.expense-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  font-family: 'Roboto', sans-serif;
  color: #2c3e50;
}

.expense-table th,
.expense-table td {
  border: 1px solid #ccc;
  padding: 0.75rem;
  text-align: left;
}

.expense-table th {
  background-color: #3498db;
  color: #fff;
  font-weight: 700;
}

.expense-table tr:nth-child(even) {
  background-color: #f7f9fa;
}

.expense-table tr:hover {
  background-color: #ecf0f1;
}

/* Estilos para os ícones de ação */
.action-icon {
  cursor: pointer;
  margin-right: 0.5rem;
  font-size: 1.2rem;
  transition: color 0.3s;
}

.action-icon.edit {
  color: #3498db;
}

.action-icon.edit:hover {
  color: #2980b9;
}

.action-icon.delete {
  color: #e74c3c;
}

.action-icon.delete:hover {
  color: #c0392b;
}

@media (max-width: 600px) {
  .expense-table th,
  .expense-table td {
    padding: 0.5rem;
    font-size: 0.85rem;
  }
}
</style>
