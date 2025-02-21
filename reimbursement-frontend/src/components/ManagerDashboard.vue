<template>
  <div class="manager-dashboard">
    <h1>Solicitações dos Subordinados</h1>
    <button @click="openProjectForm">Criar Novo Projeto</button>
    
    <ExpenseList
      :expenses="expenseStore.expenses"
      @edit="editExpense"
      @delete="deleteExpense"
    />
    
    <ExpenseResponseForm 
      v-if="selectedExpense" 
      :expense="selectedExpense" 
      @response-submitted="handleResponse" 
      @cancel="closeResponseModal" 
    />
    
    <ProjectForm 
      v-if="showProjectForm" 
      @project-created="handleProjectCreated" 
      @cancel="closeProjectForm" 
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import ExpenseResponseForm from './ExpenseResponseForm.vue';
import ProjectForm from './ProjectForm.vue';
import { useExpenseStore } from '../stores/expense';
import { useProjectStore } from '../stores/project';

export default defineComponent({
  name: 'ManagerDashboard',
  components: { ExpenseResponseForm, ProjectForm },
  setup() {
    const expenseStore = useExpenseStore();
    const projectStore = useProjectStore();

    onMounted(() => {
      expenseStore.fetchManagerExpenses();
      projectStore.fetchProjects();
    });

    const sortedExpenses = computed(() => {
      return expenseStore.expenses.slice().sort((a, b) => {
        if (a.status === 'pending' && b.status !== 'pending') return -1;
        if (a.status !== 'pending' && b.status === 'pending') return 1;
        return a.id - b.id;
      });
    });

    const selectedExpense = ref(null);
    function openResponseModal(expense: any) {
      selectedExpense.value = { ...expense };
    }
    function closeResponseModal() {
      selectedExpense.value = null;
    }
    async function handleResponse({ id, status, comment }: { id: number; status: 'success' | 'rejected'; comment: string }) {
      await expenseStore.updateManagerExpense(id, { status, comment });
      closeResponseModal();
    }

    const showProjectForm = ref(false);
    function openProjectForm() {
      showProjectForm.value = true;
    }
    function closeProjectForm() {
      showProjectForm.value = false;
    }
    async function handleProjectCreated(projectData: any) {
      await projectStore.createProject(projectData);
      closeProjectForm();
    }
    function editExpense(expense: any) {
      openResponseModal(expense)
    }

    function deleteExpense(expense: any) {
      expenseStore.deleteEmployeeExpense(expense.id)
    }


    return {
      sortedExpenses,
      selectedExpense,
      openResponseModal,
      closeResponseModal,
      handleResponse,
      showProjectForm,
      openProjectForm,
      closeProjectForm,
      handleProjectCreated,
      expenseStore,
      projectStore,
      editExpense,
      deleteExpense
    };
  }
});
</script>

<style scoped>
.manager-dashboard {
  padding: 1rem;
  font-family: Arial, sans-serif;
}

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
