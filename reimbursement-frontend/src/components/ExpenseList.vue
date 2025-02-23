<template>
  <div class="cards-container">
    <ExpenseCard
      v-for="expense in paginatedExpenses"
      :key="expense.id"
      :expense="expense"
      @click="$emit('view', expense)"
      @delete="$emit('delete', expense)"
    />
    <Pagination
      :totalItems="totalItems"
      :pageSize="pageSize"
      v-model:currentPage="currentPage"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Expense } from '@/types';
import ExpenseCard from '@/components/ExpenseCard.vue';
import Pagination from '@/components/Pagination.vue';

const props = defineProps<{
  expenses: Expense[];
}>();

const currentPage = ref(1);
const pageSize = ref(5);

const totalItems = computed(() => props.expenses.length);

const paginatedExpenses = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return props.expenses.slice(start, start + pageSize.value);
});
</script>

<style scoped>
.cards-container {
  display: flex;
  flex-direction: column;
}
</style>
