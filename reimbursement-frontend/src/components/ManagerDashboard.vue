<template>
  <div class="manager-dashboard">
    <h1>Solicitações dos Subordinados</h1>
    
    <ExpenseList
      :expenses="expenseStore.expenses"
      @view="openResponseModal"
      @delete="deleteExpense"
    />
    
    <ModalWrapper v-if="selectedExpense">
      <ExpenseResponseForm 
        :expense="selectedExpense" 
        @response-submitted="handleResponse" 
        @cancel="closeResponseModal" 
      />
    </ModalWrapper>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ExpenseList from '@/components/ExpenseList.vue';
import ExpenseResponseForm from '@/components/ExpenseResponseForm.vue';
import ModalWrapper from '@/components/ModalWrapper.vue';
import { useExpenseStore } from '@/stores/expense';
import { useProjectStore } from '@/stores/project';

const expenseStore = useExpenseStore();
const projectStore = useProjectStore();

onMounted(() => {
  expenseStore.fetchManagerExpenses();
  projectStore.fetchProjects();
});

const selectedExpense = ref(null);

function openResponseModal(expense: any) {
  selectedExpense.value = { ...expense };
}

function closeResponseModal() {
  selectedExpense.value = null;
}

async function handleResponse({ id, status, comment }: { id: number; status: 'accepted' | 'rejected'; comment: string }) {
  await expenseStore.updateExpenseStatus(id, { status, comment });
  closeResponseModal();
}

function deleteExpense(expense: any) {
  expenseStore.deleteEmployeeExpense(expense.id);
}
</script>

<style scoped>
.manager-dashboard {
  padding: 1rem;
  font-family: Arial, sans-serif;
}

.manager-dashboard h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
</style>
