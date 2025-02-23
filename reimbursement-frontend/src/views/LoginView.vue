<template>
  <div class="login-view">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">E-mail:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Senha:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Entrar</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  try {
    await authStore.login(email.value, password.value);
    router.push(authStore.role === 'manager' ? '/manager/dashboard' : '/employee/expenses');
  } catch (err) {
    error.value = err;
  }
};
</script>

<style scoped>
.login-view {
  max-width: 400px;
  margin: 3rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #3498db;
}

.form-group {
  margin-bottom: 1.25rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #3498db;
  outline: none;
}

button {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover:not(:disabled) {
  background-color: #2980b9;
}

.error {
  color: #e74c3c;
  margin-top: 1rem;
  text-align: center;
}
</style>
