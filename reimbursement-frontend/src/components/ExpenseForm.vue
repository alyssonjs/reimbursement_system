<template>
  <form @submit.prevent="submitExpense">
    <input v-model="amount" type="number" placeholder="Valor (R$)" />
    <input v-model="date" type="date" />
    <input v-model="location" placeholder="Localização" />
    <button type="submit">Enviar</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const amount = ref<number>();
const date = ref<string>('');
const location = ref<string>('');

const submitExpense = () => {
  axios.post('/api/expenses', {
    amount: amount.value,
    date: date.value,
    location: location.value,
  });
};
</script>