<template>
  <div class="dashboard">
    <h1>Minhas Solicitações</h1>
    <button @click="openForm">Criar Nova Solicitação</button>

    <ExpenseForm
      v-if="showForm"
      :availableProjects="availableProjects"
      @expense-created="handleExpenseCreated"
      @cancel="closeForm"
    />

    <ExpenseList
      :expenses="expenseStore.expenses"
      @edit="editExpense"
      @delete="deleteExpense"
    />

    <div v-if="expenseStore.loading || projectStore.loading">Carregando...</div>
    <div v-if="expenseStore.error" class="error">{{ expenseStore.error }}</div>
    <div v-if="projectStore.error" class="error">{{ projectStore.error }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import ExpenseForm from './ExpenseForm.vue';
import ExpenseList from './ExpenseList.vue';
import { useExpenseStore } from '../stores/expense';
import { useProjectStore } from '../stores/project';
import type { Project, Expense } from '@/types'

export default defineComponent({
  name: 'EmployeeDashboard',
  components: { ExpenseForm, ExpenseList },
  setup() {
    const expenseStore = useExpenseStore();
    const projectStore = useProjectStore();
    const showForm = ref(false);

    onMounted(() => {
      expenseStore.fetchEmployeeExpenses();
      projectStore.fetchEmployeeProjects();
    });

    const availableProjects = computed(() =>
      projectStore.projects.map((p: Project) => ({
        id: p.id,
        name: p.name || `Projeto ${p.id}`,
        description: p.description,
        budget: p.budget,
        project_tags: (p.project_tags || []).map(pt => ({
          id: pt.id ?? 0,
          tag: pt.tag,
          allocated_budget: pt.allocated_budget,
        }))
      }))
    )

    async function handleExpenseCreated(formData: FormData) {
      await expenseStore.createEmployeeExpense(formData);
      closeForm();
    }

    function openForm() {
      showForm.value = true;
    }

    function closeForm() {
      showForm.value = false;
    }

    function editExpense(expense: Expense) {
      alert(`Editar solicitação com id ${expense.id}`);
    }

    async function deleteExpense(expense: Expense) {
      await expenseStore.deleteEmployeeExpense(expense.id);
    }

    return {
      expenseStore,
      projectStore,
      showForm,
      availableProjects,
      openForm,
      closeForm,
      handleExpenseCreated,
      editExpense,
      deleteExpense,
    };
  },
});
</script>

<style scoped>
.dashboard {
  padding: 1rem;
  font-family: Arial, sans-serif;
}
.dashboard button {
  margin-bottom: 1rem;
}
.error {
  color: red;
}
@media (max-width: 600px) {
  .dashboard {
    padding: 0.5rem;
  }
}
</style>
