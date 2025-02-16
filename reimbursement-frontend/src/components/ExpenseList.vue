<template>
  <div class="expense-list">
    <ul>
      <li v-for="expense in expenses" :key="expense.id" class="expense-item">
        <p><strong>Valor:</strong> R$ {{ expense.amount }}</p>
        <p><strong>Data:</strong> {{ expense.date }}</p>
        <p><strong>Descrição:</strong> {{ expense.description }}</p>
        <p><strong>Localização:</strong> {{ expense.location }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps({
  expenses: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.expense-list {
  margin-top: 1rem;
}

.expense-item {
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
}

p {
  margin: 0.5rem 0;
}
</style>