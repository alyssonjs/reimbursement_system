<template>
  <div class="dashboard">
    <h1>Minhas Solicitações</h1>
    <button class="btn-create" @click="openCreateForm">
      Criar Novo Reembolso
    </button>
    <ExpenseForm
      v-if="showCreateForm"
      :availableProjects="availableProjects"
      @expense-created="handleExpenseCreated"
      @cancel="closeForm"
    />
    <ExpenseDetailsModal
      v-if="selectedExpense"
      :expense="selectedExpense"
      :availableProjects="availableProjects"
      @close="closeExpenseDetails"
      @expense-updated="handleExpenseUpdatedFromModal"
    />
    <ExpenseList
      :expenses="expenseStore.expenses"
      @view="openExpenseDetails"
      @delete="deleteExpense"
    />

    <div v-if="expenseStore.loading || projectStore.loading" class="loading">
      Carregando...
    </div>
    <div v-if="expenseStore.error" class="error">
      {{ expenseStore.error }}
    </div>
    <div v-if="projectStore.error" class="error">
      {{ projectStore.error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ExpenseList from '@/components/ExpenseList.vue'
import ExpenseForm from '@/components/ExpenseForm.vue'
import ExpenseDetailsModal from '@/components/ExpenseDetailsModal.vue'
import { useExpenseStore } from '@/stores/expense'
import { useProjectStore } from '@/stores/project'
import type { Expense, Project } from '@/types'

const expenseStore = useExpenseStore()
const projectStore = useProjectStore()

const showCreateForm = ref(false)
const selectedExpense = ref<Expense | null>(null)

onMounted(() => {
  expenseStore.fetchEmployeeExpenses()
  projectStore.fetchEmployeeProjects()
})

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
  await expenseStore.createEmployeeExpense(formData)
  closeForm()
}

async function handleExpenseUpdatedFromModal(formData: FormData) {
  if (selectedExpense.value) {
    await expenseStore.updateEmployeeExpense(selectedExpense.value.id, formData)
    closeExpenseDetails()
  }
}

function openCreateForm() {
  selectedExpense.value = null
  showCreateForm.value = true
}

function openExpenseDetails(expense: Expense) {
  showCreateForm.value = false
  selectedExpense.value = expense
}

function closeForm() {
  showCreateForm.value = false
}

function closeExpenseDetails() {
  selectedExpense.value = null
}

async function deleteExpense(expense: Expense) {
  await expenseStore.deleteEmployeeExpense(expense.id)
}
</script>

<style scoped>
.dashboard {
  padding: 2rem;
  font-family: 'Roboto', sans-serif;
  background-color: #f7f9fa;
  color: #2c3e50;
}

.dashboard h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #3498db;
  font-weight: 700;
  text-align: center;
}

.btn-create {
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  display: block;
  margin: 0 auto 1.5rem;
}

.btn-create:hover:not(:disabled) {
  background-color: #2980b9;
}

.loading {
  text-align: center;
  font-size: 1rem;
  color: #7f8c8d;
  margin-top: 1rem;
}

.error {
  color: #e74c3c;
  text-align: center;
  margin-top: 1rem;
}

@media (max-width: 600px) {
  .dashboard {
    padding: 1rem;
  }
  .dashboard h1 {
    font-size: 1.75rem;
  }
  .btn-create {
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
  }
}
</style>
